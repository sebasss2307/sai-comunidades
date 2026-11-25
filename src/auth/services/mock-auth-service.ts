import { cookies } from "next/headers";

import { isBetterAuthEnabled } from "@/auth/better-auth/placeholder";
import { isGitHubPagesBuild } from "@/lib/is-github-pages";
import {
  type AuthService,
  userToSessionUser,
} from "@/auth/services/auth-service";
import { AUTH_COOKIE_NAME, type Session } from "@/auth/types";
import { MOCK_DEMO_PASSWORD } from "@/data/mock/users";
import { getUserRepository } from "@/repositories";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function encodeSession(session: Session): string {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

function decodeSession(raw: string): Session | null {
  try {
    const json = Buffer.from(raw, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as Session;
    if (!parsed.user?.id || !parsed.expiresAt) return null;
    if (new Date(parsed.expiresAt).getTime() < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function setSessionCookie(session: Session | null): Promise<void> {
  if (isGitHubPagesBuild()) return;
  const cookieStore = await cookies();
  if (!session) {
    cookieStore.delete(AUTH_COOKIE_NAME);
    return;
  }
  cookieStore.set(AUTH_COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

function buildSession(user: ReturnType<typeof userToSessionUser>): Session {
  const expiresAt = new Date(
    Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  ).toISOString();
  return { user, expiresAt };
}

export class MockAuthService implements AuthService {
  async login(email: string, password: string): Promise<Session | null> {
    const repo = getUserRepository();
    const user = await repo.validateCredentials(email, password);
    if (!user) return null;
    const session = buildSession(userToSessionUser(user));
    await setSessionCookie(session);
    return session;
  }

  async register(input: {
    email: string;
    name: string;
    password: string;
  }): Promise<Session> {
    const repo = getUserRepository();
    const user = await repo.create(input);
    const session = buildSession(userToSessionUser(user));
    await setSessionCookie(session);
    return session;
  }

  async logout(): Promise<void> {
    await setSessionCookie(null);
  }

  async getSession(): Promise<Session | null> {
    if (isGitHubPagesBuild()) return null;
    const cookieStore = await cookies();
    const raw = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!raw) return null;
    return decodeSession(raw);
  }

  async syncSessionForUser(userId: string): Promise<Session | null> {
    const repo = getUserRepository();
    const user = await repo.findById(userId);
    if (!user) return null;
    const session = buildSession(userToSessionUser(user));
    await setSessionCookie(session);
    return session;
  }

  async impersonateDemo(
    role: "guest" | "user" | "admin",
  ): Promise<Session | null> {
    if (role === "guest") {
      await setSessionCookie(null);
      return null;
    }
    const repo = getUserRepository();
    const email =
      role === "admin" ? "admin@demo.com" : "miembro@demo.com";
    const user = await repo.validateCredentials(email, MOCK_DEMO_PASSWORD);
    if (!user) return null;
    const session = buildSession(userToSessionUser(user));
    await setSessionCookie(session);
    return session;
  }
}

export function getAuthService(): AuthService {
  if (isBetterAuthEnabled()) {
    throw new Error(
      "Better Auth aún no está configurado. Use AUTH_MODE=mock.",
    );
  }
  return new MockAuthService();
}