"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

import {
  deleteForumPostAction,
  deleteForumThreadAction,
} from "@/app/actions/admin-forum";
import type { ForumThread } from "@/domain/forum";
import { formatDate } from "@/lib/utils/format-date";
import { NewThreadForm } from "@/ui/forum/new-thread-form";

type Props = {
  threads: ForumThread[];
};

type ConfirmTarget =
  | { kind: "thread"; thread: ForumThread }
  | { kind: "post"; thread: ForumThread; postId: string; authorName: string }
  | null;

export function AdminForumPanel({ threads }: Props) {
  const [localThreads, setLocalThreads] = useState(threads);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setLocalThreads(threads);
  }, [threads]);

  const confirmDelete = () => {
    if (!confirmTarget) return;
    startTransition(async () => {
      const result =
        confirmTarget.kind === "thread"
          ? await deleteForumThreadAction(confirmTarget.thread.id)
          : await deleteForumPostAction(
              confirmTarget.thread.id,
              confirmTarget.postId,
            );

      if (result.error) {
        setActionError(result.error);
        return;
      }

      if (confirmTarget.kind === "thread") {
        setLocalThreads((current) =>
          current.filter((thread) => thread.id !== confirmTarget.thread.id),
        );
        if (expandedId === confirmTarget.thread.id) {
          setExpandedId(null);
        }
      } else {
        setLocalThreads((current) =>
          current.map((thread) => {
            if (thread.id !== confirmTarget.thread.id) return thread;
            const posts = thread.posts.filter(
              (post) => post.id !== confirmTarget.postId,
            );
            return {
              ...thread,
              posts,
              replyCount: Math.max(0, posts.length - 1),
              lastActivityAt: posts.at(-1)?.createdAt ?? thread.lastActivityAt,
            };
          }),
        );
      }

      setConfirmTarget(null);
      setActionError(null);
    });
  };

  return (
    <div className="adminForumPanel">
      <article className="forumPanel adminForumCreate">
        <p className="adminForumNote">
          Solo los administradores pueden abrir nuevos hilos. Los miembros
          registrados pueden comentar en los hilos existentes.
        </p>
        <NewThreadForm />
      </article>

      {localThreads.length === 0 ? (
        <p className="adminContactEmpty">No hay hilos publicados.</p>
      ) : (
        <ul className="adminForumList">
          {localThreads.map((thread) => {
            const expanded = expandedId === thread.id;
            return (
              <li key={thread.id} className="adminForumThread infoCard">
                <div className="adminForumThreadHead">
                  <div>
                    <h3>{thread.title}</h3>
                    <p className="adminForumThreadMeta">
                      {thread.authorName} · {thread.posts.length} publicaciones
                      · {formatDate(thread.lastActivityAt)}
                    </p>
                  </div>
                  <div className="adminUsersRowActions">
                    <button
                      type="button"
                      className="btn light"
                      onClick={() =>
                        setExpandedId(expanded ? null : thread.id)
                      }
                    >
                      {expanded ? "Ocultar comentarios" : "Ver comentarios"}
                    </button>
                    <Link
                      href={`/foro/${thread.id}`}
                      className="btn light"
                      style={{ textAlign: "center" }}
                    >
                      Ver público ↗
                    </Link>
                    <button
                      type="button"
                      className="btn"
                      disabled={pending}
                      onClick={() => {
                        setActionError(null);
                        setConfirmTarget({ kind: "thread", thread });
                      }}
                    >
                      Eliminar hilo
                    </button>
                  </div>
                </div>

                {expanded ? (
                  <ul className="adminForumPosts">
                    {thread.posts.map((post, index) => (
                      <li key={post.id} className="adminForumPost">
                        <div>
                          <b>{post.authorName}</b>
                          <span className="adminForumPostMeta">
                            {" "}
                            · {formatDate(post.createdAt)}
                            {index === 0 ? " · Apertura" : " · Comentario"}
                          </span>
                          <p>{post.body}</p>
                        </div>
                        <button
                          type="button"
                          className="btn"
                          disabled={pending}
                          onClick={() => {
                            setActionError(null);
                            setConfirmTarget({
                              kind: "post",
                              thread,
                              postId: post.id,
                              authorName: post.authorName,
                            });
                          }}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {confirmTarget ? (
        <div
          className="adminContactModalBackdrop adminUsersConfirmLayer"
          role="presentation"
          onClick={() => {
            setConfirmTarget(null);
            setActionError(null);
          }}
        >
          <div
            className="adminContactModal adminUsersConfirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="admin-forum-delete-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="admin-forum-delete-title">
              {confirmTarget.kind === "thread"
                ? "Eliminar hilo"
                : "Eliminar comentario"}
            </h2>
            <p>
              {confirmTarget.kind === "thread" ? (
                <>
                  ¿Eliminar el hilo <strong>{confirmTarget.thread.title}</strong>
                  ? Se borrarán todas sus publicaciones.
                </>
              ) : (
                <>
                  ¿Eliminar el comentario de{" "}
                  <strong>{confirmTarget.authorName}</strong> en{" "}
                  <strong>{confirmTarget.thread.title}</strong>?
                </>
              )}
            </p>
            {actionError ? (
              <div className="authErrorBanner" role="alert">
                {actionError}
              </div>
            ) : null}
            <div className="adminContactModalActions">
              <button
                type="button"
                className="btn light"
                onClick={() => {
                  setConfirmTarget(null);
                  setActionError(null);
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn"
                disabled={pending}
                onClick={confirmDelete}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}