export type MarketingNavLink = { href: string; label: string };

export const marketingPublicLinks: MarketingNavLink[] = [
  { href: "/", label: "Inicio" },
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

export function isForumPath(pathname: string): boolean {
  return pathname === "/foro" || pathname.startsWith("/foro/");
}

export function isProfilePath(pathname: string): boolean {
  return pathname === "/perfil" || pathname.startsWith("/perfil/");
}

export function isContactPath(pathname: string): boolean {
  return pathname === "/contacto" || pathname.startsWith("/contacto/");
}

export function isSectionNavPath(pathname: string): boolean {
  return isForumPath(pathname) || isProfilePath(pathname);
}

export function sectionNavTitle(pathname: string): string {
  if (isForumPath(pathname)) return "FORO";
  if (isProfilePath(pathname)) return "MI PERFIL";
  return "";
}

export function resolveMarketingNavLinks(options: {
  onAdminRoute: boolean;
  isAdmin: boolean;
  onContactRoute?: boolean;
}): MarketingNavLink[] {
  let links: MarketingNavLink[];
  if (options.onAdminRoute) {
    links = marketingCmsLinks;
  } else if (options.isAdmin) {
    links = marketingPublicLinks.filter((item) => item.href !== "/contacto");
  } else {
    links = [...marketingPublicLinks];
  }
  if (options.onContactRoute) {
    links = links.filter((item) => item.href !== "/contacto");
  }
  return links;
}