"use client";

import { useEffect, useState } from "react";

import {
  DEMO_SESSION_CHANGE_EVENT,
  readClientDemoSession,
} from "@/auth/client-demo-session";
import { isAdmin } from "@/domain/user";
import type { User } from "@/domain/user";
import { AdminUsersTable } from "@/ui/admin/admin-users-table";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

type Props = {
  users: User[];
  serverCurrentUserId: string | null;
};

export function AdminUsersPageShell({ users, serverCurrentUserId }: Props) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(
    serverCurrentUserId,
  );
  const useClientGuard = process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true";

  useEffect(() => {
    const sync = () => {
      if (serverCurrentUserId) {
        setCurrentUserId(serverCurrentUserId);
        return;
      }
      if (!useClientGuard) return;
      const session = readClientDemoSession();
      if (session && isAdmin(session.user)) {
        setCurrentUserId(session.user.id);
        return;
      }
      setCurrentUserId(null);
    };

    sync();
    if (!useClientGuard || serverCurrentUserId) return;
    window.addEventListener(DEMO_SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(DEMO_SESSION_CHANGE_EVENT, sync);
  }, [serverCurrentUserId, useClientGuard]);

  if (!currentUserId) {
    return null;
  }

  return (
    <>
      <MarketingPageHeader
        eyebrow="Comunidad"
        title="Usuarios"
        lead={`${users.length} cuentas en el entorno MOCK.`}
      />
      <AdminUsersTable users={users} currentUserId={currentUserId} />
    </>
  );
}