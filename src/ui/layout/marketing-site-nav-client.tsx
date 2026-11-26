"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { publicAssetPath } from "@/lib/public-asset-path";
import { MarketingNavActions } from "@/ui/layout/marketing-nav-actions";
import {
  isContactPath,
  isSectionNavPath,
  resolveMarketingNavLinks,
  sectionNavTitle,
} from "@/ui/layout/marketing-nav-model";
import { NavMenuButton } from "@/ui/layout/nav-menu-button";
import { useAppPathname } from "@/ui/layout/use-app-pathname";
import { useNavDrawer } from "@/ui/layout/use-nav-drawer";

type Props = {
  isLoggedIn: boolean;
  userName: string | null;
  isAdmin: boolean;
};

export function MarketingSiteNavClient({
  isLoggedIn,
  userName: _userName,
  isAdmin,
}: Props) {
  const { open, close, toggle, panelId } = useNavDrawer();
  const pathname = useAppPathname();
  const onAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");
  const onContactRoute = isContactPath(pathname);
  const onSectionNav = isSectionNavPath(pathname);
  const sectionTitle = sectionNavTitle(pathname);

  const navLinks = useMemo(
    () => resolveMarketingNavLinks({ onAdminRoute, isAdmin, onContactRoute }),
    [onAdminRoute, isAdmin, onContactRoute],
  );

  const isMemberSession =
    isLoggedIn && !isAdmin && !onAdminRoute && !onSectionNav;

  const navinnerClass = [
    "wrap",
    "navinner",
    onSectionNav ? "navinner--forum navinner--profile" : "",
    !onSectionNav && isLoggedIn ? "navinner--auth" : "",
    !onSectionNav && onAdminRoute ? "navinner--cms" : "",
    !onSectionNav && isLoggedIn && isAdmin ? "navinner--admin-session" : "",
    isMemberSession ? "navinner--member-session" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const navActions = (
    <MarketingNavActions
      isLoggedIn={isLoggedIn}
      isAdmin={isAdmin}
      onNavigate={close}
      showContact={!onContactRoute}
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
          {onSectionNav ? (
            <>
              <Link className="navBackBtn" href="/" onClick={close}>
                <span className="navBackBtn__icon" aria-hidden>
                  ←
                </span>
                <span className="navBackBtn__label">Volver</span>
              </Link>
              <p className="navForumTitle" aria-current="page">
                {sectionTitle}
              </p>
              <div className="navForumActions navDrawer__actions">
                {navActions}
              </div>
              <NavMenuButton
                open={open}
                panelId={panelId}
                onToggle={toggle}
              />
              <div
                id={panelId}
                className={`navForumMobilePanel${
                  open ? " navForumMobilePanel--open" : ""
                }`}
              >
                <div className="navActions navDrawer__actions">{navActions}</div>
              </div>
            </>
          ) : (
            <>
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
                      className={
                        item.href === "/foro"
                          ? "navDrawer__link navDrawer__link--foro"
                          : "navDrawer__link"
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="navActions navDrawer__actions">{navActions}</div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}