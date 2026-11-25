import { Handshake, MessagesSquare, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: MessagesSquare,
    title: "Foro para miembros",
    description:
      "Los usuarios registrados participan en hilos, organizan actividades y comparten recursos.",
  },
  {
    icon: Handshake,
    title: "Contacto directo",
    description:
      "Formulario accesible para consultas y voluntariado, visible en el dashboard admin.",
  },
  {
    icon: ShieldCheck,
    title: "Roles claros",
    description:
      "Visitantes, miembros y administradores con rutas protegidas y autorización por rol.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-surface-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          Diseñado para crecer contigo
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Arquitectura en capas (UI · dominio · datos · repositorios · auth)
          preparada para Better Auth y Supabase sin reescribir la interfaz.
        </p>
        <FeaturesGrid />
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-2xl border border-border bg-background p-6"
        >
          <feature.icon className="h-8 w-8 text-brand-600" />
          <h3 className="mt-4 text-lg font-medium">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted">{feature.description}</p>
        </article>
      ))}
    </div>
  );
}