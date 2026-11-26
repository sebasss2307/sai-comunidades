"use client";

import Link from "next/link";

import { useAppPathname } from "@/ui/layout/use-app-pathname";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { readClientDemoSession } from "@/auth/client-demo-session";
import { isAdmin } from "@/domain/user";
import { publicAssetPath } from "@/lib/public-asset-path";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/contacto", label: "Contacto" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/foro", label: "Foro" },
  { href: "/admin/carrusel", label: "Carrusel" },
];

type AdminLayoutShellProps = {
  children: ReactNode;
  serverAuthorized: boolean;
};

export function AdminLayoutShell({
  children,
  serverAuthorized,
}: AdminLayoutShellProps) {
  const pathname = useAppPathname();
  const [clientReady, setClientReady] = useState(serverAuthorized);
  const useClientGuard = process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true";

  useEffect(() => {
    if (serverAuthorized) {
      setClientReady(true);
      return;
    }
    if (!useClientGuard) return;

    const session = readClientDemoSession();
    if (session && isAdmin(session.user)) {
      setClientReady(true);
      return;
    }
    window.location.assign(publicAssetPath("/"));
  }, [serverAuthorized, useClientGuard]);

  if (!serverAuthorized && useClientGuard && !clientReady) {
    return null;
  }

  if (!serverAuthorized && !useClientGuard) {
    return null;
  }

  return (
    <section className="appSection appSection--admin">
      <div className="wrap adminWrap">
        <aside className="adminSidebar">
          <div className="eyebrow">Admin CMS</div>
          <nav className="adminNav" aria-label="Administración">
            {links.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin" || pathname === "/admin/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "adminNav__link--active" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="adminMain">{children}</div>
      </div>
    </section>
  );
}