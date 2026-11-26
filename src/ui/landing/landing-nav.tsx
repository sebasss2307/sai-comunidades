"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  DEMO_SESSION_CHANGE_EVENT,
  readClientDemoSession,
} from "@/auth/client-demo-session";
import { isAdmin } from "@/domain/user";
import { publicAssetPath } from "@/lib/public-asset-path";
import { MarketingNavActions } from "@/ui/layout/marketing-nav-actions";
import { NavMenuButton } from "@/ui/layout/nav-menu-button";
import { useAppPathname } from "@/ui/layout/use-app-pathname";
import { useNavDrawer } from "@/ui/layout/use-nav-drawer";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#metodo", label: "Método" },
  { href: "#actualidad", label: "Ley 21.442" },
  { href: "#preguntas", label: "FAQ" },
  { href: "#foro", label: "Comunidad" },
];

type LandingNavProps = {
  initialIsAdmin?: boolean;
  initialIsLoggedIn?: boolean;
  initialUserName?: string | null;
};

export function LandingNav({
  initialIsAdmin = false,
  initialIsLoggedIn = false,
  initialUserName: _initialUserName = null,
}: LandingNavProps) {
  const { open, close, toggle, panelId } = useNavDrawer();
  const pathname = useAppPathname();
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [isAdminUser, setIsAdminUser] = useState(initialIsAdmin);

  useEffect(() => {
    const syncDemoSession = () => {
      if (process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true") {
        const session = readClientDemoSession();
        setIsLoggedIn(Boolean(session));
        setIsAdminUser(session ? isAdmin(session.user) : false);
        return;
      }
      setIsLoggedIn(initialIsLoggedIn);
      setIsAdminUser(initialIsAdmin);
    };

    syncDemoSession();

    if (process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true") {
      window.addEventListener(DEMO_SESSION_CHANGE_EVENT, syncDemoSession);
      return () => {
        window.removeEventListener(DEMO_SESSION_CHANGE_EVENT, syncDemoSession);
      };
    }
  }, [pathname, initialIsAdmin, initialIsLoggedIn]);

  const isMemberSession = isLoggedIn && !isAdminUser;

  const navinnerClass = [
    "wrap",
    "navinner",
    isLoggedIn ? "navinner--auth" : "",
    isLoggedIn && isAdminUser ? "navinner--admin-session" : "",
    isMemberSession ? "navinner--member-session" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const drawerActions = (
    <MarketingNavActions
      isLoggedIn={isLoggedIn}
      isAdmin={isAdminUser}
      onNavigate={close}
    />
  );

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>GESTIÓN RESIDENCIAL · SANTIAGO PONIENTE</span>
          <span className="topbarHideMobile">
            Una comunidad bien administrada se nota.
          </span>
        </div>
      </div>
      {open ? (
        <button
          type="button"
          className="navScrim"
          aria-label="Cerrar menú"
          onClick={close}
          tabIndex={-1}
        />
      ) : null}
      <header className={`nav${open ? " nav--open" : ""}`}>
        <div className={navinnerClass}>
          <Link className="brand" href="/#inicio" aria-label="SAI Comunidades, inicio">
            <Image
              src={publicAssetPath("/landing/logo.png")}
              alt="SAI Comunidades"
              width={140}
              height={58}
              priority
            />
          </Link>
          <NavMenuButton open={open} panelId={panelId} onToggle={toggle} />
          <div
            id={panelId}
            className={`navDrawer${open ? " navDrawer--open" : ""}`}
          >
            <p className="navDrawer__eyebrow">Explorar</p>
            <nav className="navDrawer__links" aria-label="Principal">
              {links.map((item) => (
                <a key={item.href} href={item.href} onClick={close}>
                  {item.label}
                </a>
              ))}
              <Link
                href="/foro"
                onClick={close}
                className="navDrawer__link navDrawer__link--foro"
              >
                Foro
              </Link>
            </nav>
            <div className="navActions navDrawer__actions">{drawerActions}</div>
          </div>
        </div>
      </header>
    </>
  );
}