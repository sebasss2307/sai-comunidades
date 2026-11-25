import Link from "next/link";
import { LogIn, LogOut, MessageSquare, Shield, UserPlus } from "lucide-react";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { logoutAction } from "@/app/actions/auth";
import { isAdmin } from "@/domain/user";
import { Button } from "@/ui/components/button";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/foro", label: "Foro" },
  { href: "/contacto", label: "Contacto" },
];

export async function SiteHeader() {
  const auth = getAuthService();
  const session = await auth.getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm text-white">
            SAI
          </span>
          <span>Comunidades</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-foreground/80 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {session && isAdmin(session.user) ? (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-brand-700 dark:text-brand-300"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden text-sm text-muted sm:inline">
                {session.user.name}
              </span>
              <form action={logoutAction}>
                <Button type="submit" variant="ghost" className="px-3">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Salir</span>
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/iniciar-sesion">
                <Button variant="ghost" className="px-3">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Entrar</span>
                </Button>
              </Link>
              <Link href="/registro">
                <Button className="px-3">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Registro</span>
                </Button>
              </Link>
            </>
          )}
          <Link href="/foro" className="md:hidden">
            <Button variant="secondary" className="px-3">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}