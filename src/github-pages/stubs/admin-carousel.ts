import type { LandingCarouselFormValues } from "@/lib/schemas/landing-carousel";
import { STATIC_HOST_MESSAGE } from "@/github-pages/stubs/static-only";

export type AdminCarouselActionState = { error?: string; ok?: boolean };

export async function createCarouselItemAction(
  _input: LandingCarouselFormValues,
): Promise<AdminCarouselActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function updateCarouselItemAction(
  _id: string,
  _input: LandingCarouselFormValues,
): Promise<AdminCarouselActionState> {
  return { error: STATIC_HOST_MESSAGE };
}

export async function deleteCarouselItemAction(
  _id: string,
): Promise<AdminCarouselActionState> {
  return { error: STATIC_HOST_MESSAGE };
}