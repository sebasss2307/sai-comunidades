import { z } from "zod";

const imageUrlSchema = z
  .string()
  .min(1, "La imagen es obligatoria")
  .max(350_000, "La imagen es demasiado grande")
  .refine(
    (value) =>
      value.startsWith("data:image/") || z.string().url().safeParse(value).success,
    { message: "Usa una URL https o una imagen subida" },
  );

export const landingCarouselItemSchema = z.object({
  img: imageUrlSchema,
  alt: z.string().min(2, "Texto alternativo muy corto"),
  num: z.string().min(2, "Indicador muy corto"),
  title: z.string().min(2, "Título muy corto"),
  body: z.string().min(10, "Descripción muy corta"),
});

export type LandingCarouselFormValues = z.infer<typeof landingCarouselItemSchema>;