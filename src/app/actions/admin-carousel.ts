"use server";

import { revalidatePath } from "next/cache";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { requireAdmin } from "@/auth/authorization";
import {
  landingCarouselItemSchema,
  type LandingCarouselFormValues,
} from "@/lib/schemas/landing-carousel";
import { getLandingCarouselRepository } from "@/repositories";

export type AdminCarouselActionState = { error?: string; ok?: boolean };

async function requireAdminSession() {
  const auth = getAuthService();
  return requireAdmin(await auth.getSession());
}

function revalidateLanding() {
  revalidatePath("/");
  revalidatePath("/admin/carrusel");
  revalidatePath("/admin");
}

export async function createCarouselItemAction(
  input: LandingCarouselFormValues,
): Promise<AdminCarouselActionState> {
  try {
    await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  const parsed = landingCarouselItemSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const repo = getLandingCarouselRepository();
  await repo.create(parsed.data);
  revalidateLanding();
  return { ok: true };
}

export async function updateCarouselItemAction(
  id: string,
  input: LandingCarouselFormValues,
): Promise<AdminCarouselActionState> {
  try {
    await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  const parsed = landingCarouselItemSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos inválidos." };
  }

  const repo = getLandingCarouselRepository();
  const updated = await repo.update(id, parsed.data);
  if (!updated) {
    return { error: "Elemento no encontrado." };
  }

  revalidateLanding();
  return { ok: true };
}

export async function deleteCarouselItemAction(
  id: string,
): Promise<AdminCarouselActionState> {
  try {
    await requireAdminSession();
  } catch {
    return { error: "No autorizado." };
  }

  const repo = getLandingCarouselRepository();
  const deleted = await repo.delete(id);
  if (!deleted) {
    return { error: "Elemento no encontrado." };
  }

  revalidateLanding();
  return { ok: true };
}