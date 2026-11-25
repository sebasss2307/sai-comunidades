import Link from "next/link";

type NavCtaGroupProps = {
  isAdmin: boolean;
  onNavigate?: () => void;
  showContact?: boolean;
  compact?: boolean;
};

export function NavCtaGroup({
  isAdmin,
  onNavigate,
  showContact = true,
  compact = false,
}: NavCtaGroupProps) {
  return (
    <>
      {isAdmin ? (
        <Link
          className="btn light navCtaCompact navCtaCompact--panel"
          href="/admin"
          onClick={onNavigate}
        >
          {compact ? "Panel admin" : "Panel de administración"}
        </Link>
      ) : null}
      {showContact ? (
        <Link
          className="btn navCtaCompact navCtaCompact--contact"
          href="/contacto"
          onClick={onNavigate}
        >
          Conversemos&nbsp;↗
        </Link>
      ) : null}
    </>
  );
}