"use server";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin, requireForumAccess } from "@/auth/authorization";
import {
  newThreadSchema,
  replySchema,
  type NewThreadFormValues,
  type ReplyFormValues,
} from "@/lib/schemas/forum";
import { getForumRepository } from "@/repositories";
import { revalidatePath } from "next/cache";

export type ForumActionState = { error?: string; ok?: boolean };

export async function createThreadAction(
  _prev: ForumActionState,
  formData: FormData,
): Promise<ForumActionState> {
  const auth = getAuthService();
  let session;
  try {
    session = requireAdmin(await auth.getSession());
  } catch {
    return { error: "Solo un administrador puede crear hilos." };
  }

  const raw: NewThreadFormValues = {
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
  };
  const parsed = newThreadSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const repo = getForumRepository();
  await repo.createThread({
    ...parsed.data,
    authorId: session.user.id,
    authorName: session.user.name,
  });
  revalidatePath("/foro");
  revalidatePath("/admin/foro");
  revalidatePath("/admin");
  return { ok: true };
}

export async function createReplyAction(
  threadId: string,
  _prev: ForumActionState,
  formData: FormData,
): Promise<ForumActionState> {
  const auth = getAuthService();
  let session;
  try {
    session = requireForumAccess(await auth.getSession());
  } catch {
    return { error: "Debes iniciar sesión para responder." };
  }

  const raw: ReplyFormValues = {
    body: String(formData.get("body") ?? ""),
  };
  const parsed = replySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const repo = getForumRepository();
  const updated = await repo.addReply({
    threadId,
    body: parsed.data.body,
    authorId: session.user.id,
    authorName: session.user.name,
  });
  if (!updated) return { error: "Hilo no encontrado" };

  revalidatePath("/foro");
  revalidatePath(`/foro/${threadId}`);
  return {};
}