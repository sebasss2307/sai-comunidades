"use client";

import { useActionState } from "react";

import {
  createReplyAction,
  type ForumActionState,
} from "@/app/actions/forum";

const initial: ForumActionState = {};

export function ReplyForm({ threadId }: { threadId: string }) {
  const boundAction = createReplyAction.bind(null, threadId);
  const [state, formAction, pending] = useActionState(boundAction, initial);

  return (
    <form action={formAction} className="postForm" style={{ marginBottom: 0 }}>
      <b style={{ color: "var(--green)", display: "block", marginBottom: 12 }}>
        Tu respuesta
      </b>
      {state.error ? (
        <div className="authErrorBanner" role="alert">
          {state.error}
        </div>
      ) : null}
      <label>
        <span className="fieldLabel">Mensaje</span>
        <textarea name="body" className="field" rows={3} required />
      </label>
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Enviando…" : "Responder ↗"}
      </button>
    </form>
  );
}