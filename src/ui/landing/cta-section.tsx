import Link from "next/link";

import { Button } from "@/ui/components/button";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-brand-700 px-6 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Empieza a participar hoy
          </h2>
          <p className="mt-3 max-w-2xl text-brand-100">
            Crea tu cuenta demo, prueba el foro y explora el panel de
            administración con un clic usando el switcher de roles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/registro">
              <Button className="bg-white text-brand-800 hover:bg-brand-50">
                Crear cuenta
              </Button>
            </Link>
            <Link href="/foro">
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Ir al foro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}