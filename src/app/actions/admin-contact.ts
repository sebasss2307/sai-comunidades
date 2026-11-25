"use server";

import { revalidatePath } from "next/cache";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin } from "@/auth/authorization";
import { getContactRepository } from "@/repositories";

export type AdminContactActionState = { error?: string; ok?: boolean };

export async function setContactReadAction(
  messageId: string,
  read: boolean,
): Promise<AdminContactActionState> {
  const auth = getAuthService();
  try {
    requireAdmin(await auth.getSession());
  } catch {
    return { error: "No autorizado." };
  }

  const repo = getContactRepository();
  const updated = await repo.setRead(messageId, read);
  if (!updated) {
    return { error: "Mensaje no encontrado." };
  }

  revalidatePath("/admin/contacto");
  revalidatePath("/admin");
  return { ok: true };
}