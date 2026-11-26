"use client";

import { userToSessionUser } from "@/auth/services/auth-service";
import type { Session } from "@/auth/types";
import { mockUsers } from "@/data/mock/users";

const STORAGE_KEY = "sai-mock-client-session";

export const DEMO_SESSION_CHANGE_EVENT = "sai-demo-session-change";

export function notifyDemoSessionChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(DEMO_SESSION_CHANGE_EVENT));
}

export function readClientDemoSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed.user?.id || !parsed.expiresAt) return null;
    if (new Date(parsed.expiresAt).getTime() < Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeClientDemoSession(session: Session | null): void {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    notifyDemoSessionChange();
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  notifyDemoSessionChange();
}

export function isClientDemoUiEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true"
  );
}

export type ClientDemoRole = "guest" | "user" | "admin";

export function getClientDemoRole(): ClientDemoRole {
  const session = readClientDemoSession();
  if (!session) return "guest";
  return session.user.role === "admin" ? "admin" : "user";
}

export function impersonateClientDemo(role: ClientDemoRole): Session | null {
  if (role === "guest") {
    writeClientDemoSession(null);
    return null;
  }
  const user = mockUsers.find((item) =>
    role === "admin" ? item.role === "admin" : item.role === "user",
  );
  if (!user) return null;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const session: Session = { user: userToSessionUser(user), expiresAt };
  writeClientDemoSession(session);
  return session;
}