import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type AdminForumActionState = { error?: string; ok?: boolean };

export async function deleteForumThreadAction(
  _threadId: string,
): Promise<AdminForumActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function deleteForumPostAction(
  _threadId: string,
  _postId: string,
): Promise<AdminForumActionState> {
  return { error: STATIC_HOST_MESSAGE };
}