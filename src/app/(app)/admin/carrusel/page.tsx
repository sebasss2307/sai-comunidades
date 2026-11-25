import type { Metadata } from "next";
import Link from "next/link";

import { getLandingCarouselRepository } from "@/repositories";
import { AdminCarouselPanel } from "@/ui/admin/admin-carousel-panel";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Carrusel · Admin",
};

export default async function AdminCarouselPage() {
  const repo = getLandingCarouselRepository();
  const items = await repo.listAll();

  return (
    <>
      <MarketingPageHeader
        eyebrow="Landing"
        title="Carrusel principal"
        lead="Gestiona las tarjetas de la sección «Qué hacemos» en la página de inicio."
      />
      <p className="adminCarouselPublicLink">
        <Link href="/#servicios" className="backLink">
          Ver carrusel en la página principal →
        </Link>
      </p>
      <AdminCarouselPanel items={items} />
    </>
  );
}