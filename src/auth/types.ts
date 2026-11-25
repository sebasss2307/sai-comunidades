import type { UserRole } from "@/domain/user";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Session {
  user: SessionUser;
  expiresAt: string;
}

export type AuthMode = "mock" | "better-auth";

export const AUTH_COOKIE_NAME = "sai_session";