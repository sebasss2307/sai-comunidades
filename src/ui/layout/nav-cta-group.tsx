import Link from "next/link";

type NavCtaGroupProps = {
  onNavigate?: () => void;
  showContact?: boolean;
};

export function NavCtaGroup({
  onNavigate,
  showContact = true,
}: NavCtaGroupProps) {
  if (!showContact) return null;

  return (
    <Link
      className="btn navCtaCompact navCtaCompact--contact"
      href="/contacto"
      onClick={onNavigate}
    >
      Conversemos&nbsp;↗
    </Link>
  );
}