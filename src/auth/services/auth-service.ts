import type { Session, SessionUser } from "@/auth/types";
import type { User } from "@/domain/user";
import type { CreateUserInput } from "@/repositories/contracts/user-repository";

export interface AuthService {
  login(email: string, password: string): Promise<Session | null>;
  register(input: CreateUserInput): Promise<Session>;
  logout(): Promise<void>;
  getSession(): Promise<Session | null>;
  syncSessionForUser(userId: string): Promise<Session | null>;
  impersonateDemo(role: "guest" | "user" | "admin"): Promise<Session | null>;
}

export function userToSessionUser(user: User): SessionUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatarUrl: user.avatarUrl,
  };
}