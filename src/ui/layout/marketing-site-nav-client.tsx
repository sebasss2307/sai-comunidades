"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { publicAssetPath } from "@/lib/public-asset-path";
import { LogoutButton } from "@/ui/layout/logout-button";
import { resolveMarketingNavLinks } from "@/ui/layout/marketing-nav-model";
import { NavCtaGroup } from "@/ui/layout/nav-cta-group";
import { NavMenuButton } from "@/ui/layout/nav-menu-button";
import { useAppPathname } from "@/ui/layout/use-app-pathname";
import { useNavDrawer } from "@/ui/layout/use-nav-drawer";

type Props = {
  isLoggedIn: boolean;
  userName: string | null;
  isAdmin: boolean;
};

function ProfileNavLabel({ userName }: { userName: string | null }) {
  const name = userName?.trim();
  if (!name) {
    return <>Mi perfil</>;
  }
  return (
    <>
      Mi perfil
      <span className="navUserName"> - {name}</span>
    </>
  );
}

export function MarketingSiteNavClient({
  isLoggedIn,
  userName,
  isAdmin,
}: Props) {
  const { open, close, toggle, panelId } = useNavDrawer();
  const pathname = useAppPathname();
  const onAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  const navLinks = useMemo(
    () => resolveMarketingNavLinks({ onAdminRoute, isAdmin }),
    [onAdminRoute, isAdmin],
  );

  const showMarketingCta = !onAdminRoute;
  const navinnerClass = [
    "wrap",
    "navinner",
    isLoggedIn ? "navinner--auth" : "",
    onAdminRoute ? "navinner--cms" : "",
    isLoggedIn && isAdmin && !onAdminRoute ? "navinner--admin-session" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const drawerActions = isLoggedIn ? (
    <>
      {showMarketingCta && isAdmin ? (
        <NavCtaGroup isAdmin compact showContact onNavigate={close} />
      ) : null}
      {showMarketingCta && !isAdmin ? (
        <NavCtaGroup
          isAdmin={false}
          showContact
          onNavigate={close}
        />
      ) : null}
      {!onAdminRoute ? (
        <div className="navAccountGroup">
          <Link className="btn light" href="/perfil" onClick={close}>
            <ProfileNavLabel userName={userName} />
          </Link>
          <LogoutButton className="btn light">Salir</LogoutButton>
        </div>
      ) : (
        <LogoutButton className="btn light">Salir</LogoutButton>
      )}
    </>
  ) : (
    <>
      <Link
        className="btn light navLoginBtn"
        href="/iniciar-sesion"
        onClick={close}
      >
        Entrar
      </Link>
      <Link className="btn light" href="/registro" onClick={close}>
        Registro
      </Link>
      {showMarketingCta ? (
        <NavCtaGroup isAdmin={isAdmin} onNavigate={close} />
      ) : null}
    </>
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
      <header className={`nav${open ? " nav--open" : ""}`}>
        {open ? (
          <button
            type="button"
            className="navScrim"
            aria-label="Cerrar menú"
            onClick={close}
            tabIndex={-1}
          />
        ) : null}
        <div className={navinnerClass}>
          <Link className="brand" href="/" aria-label="SAI Comunidades, inicio">
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
            <nav
              className="siteNavLinks navDrawer__links"
              aria-label="Principal"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="navDrawer__link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="navActions navDrawer__actions">{drawerActions}</div>
          </div>
        </div>
      </header>
    </>
  );
}