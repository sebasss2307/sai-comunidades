import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type ContactActionState = {
  ok?: boolean;
  error?: string;
};

export async function submitContactAction(
  _prev: ContactActionState,
  _formData: FormData,
): Promise<ContactActionState> {
  return { error: STATIC_HOST_MESSAGE };
}