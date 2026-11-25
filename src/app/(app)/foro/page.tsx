import type { Metadata } from "next";
import Link from "next/link";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { formatDate } from "@/lib/utils/format-date";
import { getForumRepository } from "@/repositories";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Foro",
};

export default async function ForumPage() {
  const auth = getAuthService();
  const session = await auth.getSession();
  const repo = getForumRepository();
  const threads = await repo.listThreads();

  return (
    <section className="appSection forum">
      <div className="wrap">
        <MarketingPageHeader
          eyebrow="Espacio abierto"
          title="Foro comunitario"
          lead={`Hola ${session?.user.name ?? "vecino"} — comparte ideas, preguntas y buenas prácticas de convivencia.`}
        />
        <article className="forumPanel" style={{ marginBottom: 22 }}>
          <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.92rem" }}>
            Solo el equipo administrador puede abrir nuevos hilos. Si tienes
            cuenta, puedes comentar dentro de los hilos publicados.
          </p>
        </article>
        <div>
            {threads.map((thread) => (
              <Link
                key={thread.id}
                href={`/foro/${thread.id}`}
                className="threadLink"
              >
                <h3>{thread.title}</h3>
                <p>{thread.excerpt}</p>
                <p className="threadMeta">
                  {thread.authorName} · {thread.replyCount} respuestas ·{" "}
                  {formatDate(thread.lastActivityAt)}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}