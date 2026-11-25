import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { getUserRepository } from "@/repositories";
import { ProfileForm } from "@/ui/forms/profile-form";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Mi perfil",
};

export default async function ProfilePage() {
  const auth = getAuthService();
  const session = await auth.getSession();
  if (!session) {
    redirect("/iniciar-sesion?next=/perfil");
  }

  const repo = getUserRepository();
  const user = await repo.findById(session.user.id);
  if (!user) {
    redirect("/iniciar-sesion");
  }

  return (
    <section className="appSection">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <MarketingPageHeader
          eyebrow="Cuenta"
          title="Mi perfil"
          lead="Actualiza tu nombre, correo y foto. Los cambios se guardan en el entorno MOCK."
        />
        <article className="forumPanel">
          <ProfileForm user={user} />
        </article>
      </div>
    </section>
  );
}