import Link from "next/link";

import { formatDate } from "@/lib/utils/format-date";
import { getForumRepository } from "@/repositories";

export async function LandingForumTeaser() {
  const repo = getForumRepository();
  const threads = (await repo.listThreads()).slice(0, 3);

  return (
    <div className="forumPanel">
      <div className="tabs">
        <span className="tab active">Destacados</span>
        <Link className="tab" href="/foro">
          Ver foro completo
        </Link>
      </div>
      <div className="forumNotice" style={{ marginBottom: 16 }}>
        <b>Plataforma MOCK:</b> el foro real requiere cuenta de miembro. Los datos
        siguen la arquitectura de repositorios lista para Supabase.
      </div>
      {threads.length === 0 ? (
        <div className="empty">Aún no hay hilos publicados.</div>
      ) : (
        threads.map((thread) => (
          <article className="post" key={thread.id}>
            <div className="postMeta">
              <span className="avatar">
                {thread.authorName.trim().charAt(0).toUpperCase()}
              </span>
              <b>{thread.authorName}</b>
              <span>·</span>
              <span>{formatDate(thread.lastActivityAt)}</span>
              <span className="tag">Gestión</span>
            </div>
            <h3>{thread.title}</h3>
            <p>{thread.excerpt}</p>
            <div className="postActions">
              <Link className="textBtn" href={`/foro/${thread.id}`}>
                Leer hilo ↗
              </Link>
            </div>
          </article>
        ))
      )}
      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link className="btn" href="/registro">
          Crear cuenta para participar ↗
        </Link>
        <Link className="btn light" href="/iniciar-sesion">
          Ya tengo cuenta
        </Link>
      </div>
    </div>
  );
}