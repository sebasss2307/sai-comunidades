"use client";

import type { AuthActionState } from "@/app/actions/auth";

export function AuthSubmitMessage({ state }: { state: AuthActionState }) {
  if (!state.error) return null;
  return (
    <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
      {state.error}
    </p>
  );
}