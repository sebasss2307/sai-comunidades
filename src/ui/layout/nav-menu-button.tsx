"use client";

type NavMenuButtonProps = {
  open: boolean;
  panelId: string;
  onToggle: () => void;
};

export function NavMenuButton({ open, panelId, onToggle }: NavMenuButtonProps) {
  return (
    <button
      type="button"
      className={`navMenuBtn${open ? " navMenuBtn--open" : ""}`}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
    >
      <span className="navMenuBtn__bar" />
      <span className="navMenuBtn__bar" />
      <span className="navMenuBtn__bar" />
    </button>
  );
}