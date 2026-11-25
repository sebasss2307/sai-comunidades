import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  subject: z.string().min(3, "Asunto requerido"),
  message: z.string().min(10, "Mensaje muy corto"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;