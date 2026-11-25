import type { ContactMessage } from "@/domain/contact";

export const mockContactMessages: ContactMessage[] = [
  {
    id: "msg_01",
    name: "Carolina R.",
    email: "carolina@example.com",
    subject: "Quiero sumarme como voluntaria",
    message: "Tengo experiencia en organización de eventos comunitarios.",
    createdAt: "2025-11-20T16:40:00.000Z",
    read: false,
  },
  {
    id: "msg_02",
    name: "Miguel P.",
    email: "miguel@example.com",
    subject: "Consulta sobre talleres",
    message: "¿Hay cupos para el taller de huerta urbana?",
    createdAt: "2025-11-19T11:05:00.000Z",
    read: true,
  },
];