import { z } from "zod";

const avatarSchema = z
  .string()
  .max(350_000, "La imagen es demasiado grande")
  .optional()
  .transform((value) => value?.trim() ?? "")
  .refine(
    (value) =>
      value.length === 0 ||
      value.startsWith("data:image/") ||
      z.string().url().safeParse(value).success,
    { message: "Usa una imagen válida (JPG, PNG o WebP)" },
  );

export const profileSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Correo inválido"),
  avatarUrl: avatarSchema,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;