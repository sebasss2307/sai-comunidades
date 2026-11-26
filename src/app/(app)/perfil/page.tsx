import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { isGitHubPagesBuild } from "@/lib/is-github-pages";
import { getUserRepository } from "@/repositories";

import { ProfilePageShell } from "@/app/(app)/perfil/profile-page-shell";

export const metadata: Metadata = {
  title: "Mi perfil",
};

export default async function ProfilePage() {
  const isGhPages = isGitHubPagesBuild();
  const auth = getAuthService();
  const session = await auth.getSession();

  if (!session && !isGhPages) {
    redirect("/iniciar-sesion?next=/perfil");
  }

  let serverUser = null;
  if (session) {
    const repo = getUserRepository();
    serverUser = await repo.findById(session.user.id);
    if (!serverUser && !isGhPages) {
      redirect("/iniciar-sesion");
    }
  }

  return <ProfilePageShell serverUser={serverUser} />;
}