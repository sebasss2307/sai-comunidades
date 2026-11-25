import type { User } from "@/domain/user";

/** Contraseña mock para todos los usuarios demo: `demo1234` */
export const MOCK_DEMO_PASSWORD = "demo1234";

export const mockUsers: User[] = [
  {
    id: "usr_member_01",
    email: "miembro@demo.com",
    name: "Ana Comunidad",
    role: "user",
    createdAt: "2025-08-12T10:00:00.000Z",
  },
  {
    id: "usr_member_02",
    email: "vecino@demo.com",
    name: "Luis Vecino",
    role: "user",
    createdAt: "2025-09-01T14:30:00.000Z",
  },
  {
    id: "usr_admin_01",
    email: "admin@demo.com",
    name: "Admin SAI",
    role: "admin",
    createdAt: "2025-01-01T08:00:00.000Z",
  },
];