import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type AdminContactActionState = { error?: string; ok?: boolean };

export async function setContactReadAction(
  _messageId: string,
  _read: boolean,
): Promise<AdminContactActionState> {
  return { error: STATIC_HOST_MESSAGE };
}