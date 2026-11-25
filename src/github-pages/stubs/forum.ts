import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type ForumActionState = { error?: string; ok?: boolean };

export async function createThreadAction(
  _prev: ForumActionState,
  _formData: FormData,
): Promise<ForumActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function createReplyAction(
  _threadId: string,
  _prev: ForumActionState,
  _formData: FormData,
): Promise<ForumActionState> {
  return { error: STATIC_HOST_MESSAGE };
}