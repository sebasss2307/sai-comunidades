"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteForumPostAction } from "@/app/actions/admin-forum";
import type { ForumPost } from "@/domain/forum";

type Props = {
  threadId: string;
  threadTitle: string;
  post: ForumPost;
  onDeleted: (postId: string) => void;
};

export function ForumPostDeleteButton({
  threadId,
  threadTitle,
  post,
  onDeleted,
}: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const confirmDelete = () => {
    startTransition(async () => {
      const result = await deleteForumPostAction(threadId, post.id);
      if (result.error) {
        setError(result.error);
        return;
      }
      setConfirmOpen(false);
      setError(null);
      onDeleted(post.id);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        className={`forumPostDeleteBtn${
          confirmOpen ? " forumPostDeleteBtn--armed" : ""
        }`}
        aria-label={`Eliminar comentario de ${post.authorName}`}
        disabled={pending}
        onClick={() => {
          setError(null);
          setConfirmOpen(true);
        }}
      >
        <Trash2 aria-hidden size={18} strokeWidth={2} />
      </button>

      {confirmOpen ? (
        <div
          className="adminContactModalBackdrop adminUsersConfirmLayer"
          role="presentation"
          onClick={() => {
            if (!pending) {
              setConfirmOpen(false);
              setError(null);
            }
          }}
        >
          <div
            className="adminContactModal adminUsersConfirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`delete-post-${post.id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={`delete-post-${post.id}`}>Eliminar comentario</h2>
            <p>
              ¿Eliminar el comentario de <strong>{post.authorName}</strong> en{" "}
              <strong>{threadTitle}</strong>? Esta acción no se puede deshacer.
            </p>
            {error ? (
              <div className="authErrorBanner" role="alert">
                {error}
              </div>
            ) : null}
            <div className="adminContactModalActions">
              <button
                type="button"
                className="btn light"
                disabled={pending}
                onClick={() => {
                  setConfirmOpen(false);
                  setError(null);
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
                {pending ? "Eliminando…" : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}