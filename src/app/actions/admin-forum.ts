"use server";

import { revalidatePath } from "next/cache";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin } from "@/auth/authorization";
import { getForumRepository } from "@/repositories";

export type AdminForumActionState = { error?: string; ok?: boolean };

async function requireAdminSession() {
  const auth = getAuthService();
  return requireAdmin(await auth.getSession());
}

export async function deleteForumThreadAction(
  threadId: string,
): Promise<AdminForumActionState> {
  try {
    await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  const repo = getForumRepository();
  const deleted = await repo.deleteThread(threadId);
  if (!deleted) {
    return { error: "Hilo no encontrado." };
  }

  revalidatePath("/admin/foro");
  revalidatePath("/foro");
  revalidatePath(`/foro/${threadId}`);
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteForumPostAction(
  threadId: string,
  postId: string,
): Promise<AdminForumActionState> {
  try {
    await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  const repo = getForumRepository();
  const result = await repo.deletePost(threadId, postId);
  if ("error" in result) {
    if (result.error === "LAST_POST") {
      return {
        error:
          "No puedes eliminar la única publicación. Elimina el hilo completo.",
      };
    }
    return { error: "Comentario no encontrado." };
  }

  revalidatePath("/admin/foro");
  revalidatePath("/foro");
  revalidatePath(`/foro/${threadId}`);
  return { ok: true };
}