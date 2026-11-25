import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type ProfileActionState = { error?: string; ok?: boolean };

export async function updateProfileAction(
  _prev: ProfileActionState,
  _formData: FormData,
): Promise<ProfileActionState> {
  return { error: STATIC_HOST_MESSAGE };
}