import { z } from "zod";

export const newThreadSchema = z.object({
  title: z.string().min(5, "Título muy corto"),
  body: z.string().min(10, "Mensaje muy corto"),
});

export const replySchema = z.object({
  body: z.string().min(3, "Respuesta muy corta"),
});

export type NewThreadFormValues = z.infer<typeof newThreadSchema>;
export type ReplyFormValues = z.infer<typeof replySchema>;