export type MarketingNavLink = { href: string; label: string };

export const marketingPublicLinks: MarketingNavLink[] = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#seguridad", label: "Seguridad" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/foro", label: "Foro" },
  { href: "/contacto", label: "Contacto" },
];

export const marketingCmsLinks: MarketingNavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/foro", label: "Foro" },
];

export function resolveMarketingNavLinks(options: {
  onAdminRoute: boolean;
  isAdmin: boolean;
}): MarketingNavLink[] {
  if (options.onAdminRoute) {
    return marketingCmsLinks;
  }
  if (options.isAdmin) {
    return marketingPublicLinks.filter((item) => item.href !== "/contacto");
  }
  return marketingPublicLinks;
}