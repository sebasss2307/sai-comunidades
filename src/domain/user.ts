export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  avatarUrl?: string;
}

export interface PublicUser {
  id: string;
  name: string;
  role: UserRole;
}

export function isAdmin(user: Pick<User, "role">): boolean {
  return user.role === "admin";
}

export function canAccessForum(user: Pick<User, "role"> | null): boolean {
  return user !== null && (user.role === "user" || user.role === "admin");
}