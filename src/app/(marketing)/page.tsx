import type { Metadata } from "next";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { isAdmin } from "@/domain/user";
import { getLandingCarouselRepository } from "@/repositories";
import { SaiLandingPage } from "@/ui/landing/sai-landing-page";

export const metadata: Metadata = {
  title: "SAI Comunidades | Administración y gestión residencial",
  description:
    "SAI Comunidades: administración residencial, gestión de condominios, conocimiento en CCTV y supervisión operativa de seguridad en Santiago poniente.",
};

export const viewport = {
  themeColor: "#0f3b34",
  viewportFit: "cover",
};

export default async function MarketingHomePage() {
  const repo = getLandingCarouselRepository();
  const services = await repo.listAll();
  const session = await getAuthService().getSession();
  return (
    <SaiLandingPage
      services={services}
      initialNavIsAdmin={session ? isAdmin(session.user) : false}
      initialNavIsLoggedIn={Boolean(session)}
      initialNavUserName={session?.user.name ?? null}
    />
  );
}