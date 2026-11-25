import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin } from "@/auth/authorization";
import { getUserRepository } from "@/repositories";
import { AdminUsersTable } from "@/ui/admin/admin-users-table";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Usuarios · Admin",
};

export default async function AdminUsersPage() {
  const auth = getAuthService();
  let session;
  try {
    session = requireAdmin(await auth.getSession());
  } catch {
    redirect("/");
  }
  const repo = getUserRepository();
  const users = await repo.listAll();

  return (
    <>
      <MarketingPageHeader
        eyebrow="Comunidad"
        title="Usuarios"
        lead={`${users.length} cuentas en el entorno MOCK.`}
      />
      <AdminUsersTable users={users} currentUserId={session.user.id} />
    </>
  );
}