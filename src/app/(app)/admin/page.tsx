import type { Metadata } from "next";

import { getAnalyticsRepository } from "@/repositories";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminDashboardPage() {
  const analytics = getAnalyticsRepository();
  const metrics = await analytics.getMetrics();

  const tiles = [
    { label: "Visitas totales", value: metrics.totalVisits.toLocaleString("es-AR") },
    { label: "Visitas hoy", value: metrics.visitsToday.toLocaleString("es-AR") },
    { label: "Usuarios registrados", value: metrics.registeredUsers.toString() },
    {
      label: "Mensajes de contacto",
      value: `${metrics.contactMessages} (${metrics.unreadContactMessages} sin leer)`,
    },
    { label: "Hilos del foro", value: metrics.forumThreads.toString() },
  ];

  return (
    <>
      <MarketingPageHeader
        eyebrow="Panel"
        title="Dashboard"
        lead="Vista rápida de métricas MOCK. Conecta Supabase para persistencia real."
      />
      <div className="metricGrid">
        {tiles.map((tile) => (
          <article className="metricCard" key={tile.label}>
            <span>{tile.label}</span>
            <strong>{tile.value}</strong>
          </article>
        ))}
      </div>
    </>
  );
}