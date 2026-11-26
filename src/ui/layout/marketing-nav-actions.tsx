import Link from "next/link";

import { LogoutButton } from "@/ui/layout/logout-button";
import { NavCtaGroup } from "@/ui/layout/nav-cta-group";

type MarketingNavActionsProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onNavigate?: () => void;
  showContact?: boolean;
};

export function MarketingNavActions({
  isLoggedIn,
  isAdmin,
  onNavigate,
  showContact = true,
}: MarketingNavActionsProps) {
  if (isLoggedIn) {
    return (
      <>
        {!isAdmin ? (
          <NavCtaGroup onNavigate={onNavigate} showContact={showContact} />
        ) : null}
        <div className="navAccountGroup">
          <LogoutButton className="btn light navLoginBtn">Salir</LogoutButton>
          <Link
            className="btn light navLoginBtn"
            href="/perfil"
            onClick={onNavigate}
          >
            Mi perfil
          </Link>
          {isAdmin ? (
            <Link
              className="btn light navLoginBtn"
              href="/admin"
              onClick={onNavigate}
            >
              Panel de admin
            </Link>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <>
      <NavCtaGroup onNavigate={onNavigate} showContact={showContact} />
      <Link
        className="btn light navLoginBtn"
        href="/iniciar-sesion"
        onClick={onNavigate}
      >
        Iniciar sesión
      </Link>
    </>
  );
}