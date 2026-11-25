import { z } from "zod";

export const adminUpdateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Correo inválido"),
  role: z.enum(["user", "admin"]),
  password: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => value.length === 0 || value.length >= 8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});

export type AdminUpdateUserValues = z.infer<typeof adminUpdateUserSchema>;