"use server";

import { contactSchema, type ContactFormValues } from "@/lib/schemas/contact";
import { getContactRepository } from "@/repositories";

export type ContactActionState = {
  ok?: boolean;
  error?: string;
};

export async function submitContactAction(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw: ContactFormValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const repo = getContactRepository();
  await repo.create(parsed.data);
  return { ok: true };
}