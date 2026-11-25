import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">SAI Comunidades</p>
          <p className="mt-1 max-w-md text-sm text-muted">
            Plataforma contemporánea para conectar vecinos, compartir iniciativas
            y participar del foro comunitario.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <Link href="/contacto" className="hover:text-foreground">
            Contacto
          </Link>
          <Link href="/foro" className="hover:text-foreground">
            Foro
          </Link>
          <Link href="/registro" className="hover:text-foreground">
            Crear cuenta
          </Link>
        </div>
      </div>
    </footer>
  );
}