import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/ui/components/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-200/50 via-background to-background dark:from-brand-900/30" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-950/40 dark:text-brand-200">
            <Sparkles className="h-3.5 w-3.5" />
            Comunidad activa · MOCK data
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Tu barrio,{" "}
            <span className="text-brand-700 dark:text-brand-300">conectado</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted text-pretty">
            SAI Comunidades es una landing contemporánea para descubrir
            iniciativas locales, conversar en el foro y contactar al equipo —
            lista para escalar con Better Auth y Supabase.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/registro">
              <Button className="px-5">
                Unirme a la comunidad
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" className="px-5">
                Escribir al equipo
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-400/20 to-transparent blur-2xl" />
          <div className="relative rounded-[2rem] border border-border bg-surface-elevated p-6 shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["+120", "Vecinos activos"],
                ["24", "Propuestas este mes"],
                ["8", "Eventos locales"],
                ["100%", "Participación"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-surface-muted/60 p-4"
                >
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-sm text-muted">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">
              Métricas ilustrativas para la etapa de diseño. Los datos reales
              vendrán del panel admin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}