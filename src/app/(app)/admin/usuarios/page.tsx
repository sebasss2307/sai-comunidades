import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin } from "@/auth/authorization";
import { isGitHubPagesBuild } from "@/lib/is-github-pages";
import { getUserRepository } from "@/repositories";

import { AdminUsersPageShell } from "@/app/(app)/admin/usuarios/admin-usuarios-page-shell";

export const metadata: Metadata = {
  title: "Usuarios · Admin",
};

export default async function AdminUsersPage() {
  const isGhPages = isGitHubPagesBuild();
  const auth = getAuthService();
  let session = null;
  try {
    session = requireAdmin(await auth.getSession());
  } catch {
    if (!isGhPages) {
      redirect("/");
    }
  }

  const repo = getUserRepository();
  const users = await repo.listAll();

  return (
    <AdminUsersPageShell
      users={users}
      serverCurrentUserId={session?.user.id ?? null}
    />
  );
}