import type { AdminUpdateUserValues } from "@/lib/schemas/admin-user";
import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type AdminUserActionState = { error?: string; ok?: boolean };

export async function updateUserAction(
  _input: AdminUpdateUserValues,
): Promise<AdminUserActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function deleteUserAction(
  _userId: string,
): Promise<AdminUserActionState> {
  return { error: STATIC_HOST_MESSAGE };
}