"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import {
  createThreadAction,
  type ForumActionState,
} from "@/app/actions/forum";

const initial: ForumActionState = {};

export function NewThreadForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createThreadAction,
    initial,
  );

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [state.ok, router]);

  return (
    <form action={formAction} className="postForm" style={{ marginBottom: 0 }}>
      <b style={{ color: "var(--green)", display: "block", marginBottom: 12 }}>
        Nuevo hilo
      </b>
      {state.error ? (
        <div className="authErrorBanner" role="alert">
          {state.error}
        </div>
      ) : null}
      <label>
        <span className="fieldLabel">Título del hilo</span>
        <input name="title" className="field" required />
      </label>
      <label>
        <span className="fieldLabel">Mensaje inicial</span>
        <textarea name="body" className="field" rows={4} required />
      </label>
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Publicando…" : "Publicar hilo ↗"}
      </button>
    </form>
  );
}