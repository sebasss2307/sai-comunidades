"use server";

import { revalidatePath } from "next/cache";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin } from "@/auth/authorization";
import {
  adminUpdateUserSchema,
  type AdminUpdateUserValues,
} from "@/lib/schemas/admin-user";
import { getUserRepository } from "@/repositories";

export type AdminUserActionState = { error?: string; ok?: boolean };

async function requireAdminSession() {
  const auth = getAuthService();
  return requireAdmin(await auth.getSession());
}

export async function updateUserAction(
  input: AdminUpdateUserValues,
): Promise<AdminUserActionState> {
  try {
    await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  const parsed = adminUpdateUserSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const repo = getUserRepository();
  const existing = await repo.findById(parsed.data.id);
  if (!existing) {
    return { error: "Usuario no encontrado." };
  }

  if (
    existing.role === "admin" &&
    parsed.data.role === "user" &&
    (await repo.countAdmins()) <= 1
  ) {
    return { error: "Debe quedar al menos un administrador." };
  }

  const result = await repo.update(parsed.data.id, {
    name: parsed.data.name,
    email: parsed.data.email,
    role: parsed.data.role,
    password: parsed.data.password || undefined,
  });

  if ("error" in result) {
    if (result.error === "EMAIL_TAKEN") {
      return { error: "Ese correo ya está en uso." };
    }
    return { error: "Usuario no encontrado." };
  }

  revalidatePath("/admin/usuarios");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteUserAction(
  userId: string,
): Promise<AdminUserActionState> {
  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  if (userId === session.user.id) {
    return { error: "No puedes eliminar tu propia cuenta." };
  }

  const repo = getUserRepository();
  const existing = await repo.findById(userId);
  if (!existing) {
    return { error: "Usuario no encontrado." };
  }

  if (existing.role === "admin" && (await repo.countAdmins()) <= 1) {
    return { error: "No puedes eliminar al único administrador." };
  }

  const deleted = await repo.delete(userId);
  if (!deleted) {
    return { error: "No se pudo eliminar el usuario." };
  }

  revalidatePath("/admin/usuarios");
  revalidatePath("/admin");
  return { ok: true };
}