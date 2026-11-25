"use server";

import { revalidatePath } from "next/cache";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireSession } from "@/auth/authorization";
import { profileSchema, type ProfileFormValues } from "@/lib/schemas/profile";
import { getUserRepository } from "@/repositories";

export type ProfileActionState = { error?: string; ok?: boolean };

export async function updateProfileAction(
  _prev: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const auth = getAuthService();
  let session;
  try {
    session = requireSession(await auth.getSession());
  } catch {
    return { error: "Debes iniciar sesión." };
  }

  const raw: ProfileFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    avatarUrl: String(formData.get("avatarUrl") ?? ""),
  };
  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const repo = getUserRepository();
  const result = await repo.updateProfile(session.user.id, {
    name: parsed.data.name,
    email: parsed.data.email,
    avatarUrl: parsed.data.avatarUrl || undefined,
  });

  if ("error" in result) {
    if (result.error === "EMAIL_TAKEN") {
      return { error: "Ese correo ya está en uso." };
    }
    return { error: "No se pudo actualizar el perfil." };
  }

  await auth.syncSessionForUser(session.user.id);

  revalidatePath("/perfil");
  revalidatePath("/foro");
  revalidatePath("/");
  return { ok: true };
}