import type { Session } from "@/auth/types";
import { canAccessForum, isAdmin } from "@/domain/user";

export function requireSession(session: Session | null): Session {
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export function requireForumAccess(session: Session | null): Session {
  const s = requireSession(session);
  if (!canAccessForum(s.user)) {
    throw new Error("FORBIDDEN");
  }
  return s;
}

export function requireAdmin(session: Session | null): Session {
  const s = requireSession(session);
  if (!isAdmin(s.user)) {
    throw new Error("FORBIDDEN");
  }
  return s;
}