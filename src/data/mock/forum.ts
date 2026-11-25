import type { ForumThread } from "@/domain/forum";

export const mockForumThreads: ForumThread[] = [
  {
    id: "thr_01",
    title: "Ideas para la feria barrial de primavera",
    excerpt: "¿Qué actividades les gustaría ver este año?",
    authorId: "usr_member_01",
    authorName: "Ana Comunidad",
    replyCount: 2,
    lastActivityAt: "2025-11-10T18:22:00.000Z",
    posts: [
      {
        id: "pst_01",
        threadId: "thr_01",
        authorId: "usr_member_01",
        authorName: "Ana Comunidad",
        body: "Propongo un rincón de trueque y talleres abiertos para vecinos.",
        createdAt: "2025-11-09T11:00:00.000Z",
      },
      {
        id: "pst_02",
        threadId: "thr_01",
        authorId: "usr_member_02",
        authorName: "Luis Vecino",
        body: "Me sumo: podríamos incluir música local y feria de emprendimientos.",
        createdAt: "2025-11-10T18:22:00.000Z",
      },
    ],
  },
  {
    id: "thr_02",
    title: "Voluntariado limpieza del parque",
    excerpt: "Organizamos jornada el sábado por la mañana.",
    authorId: "usr_member_02",
    authorName: "Luis Vecino",
    replyCount: 1,
    lastActivityAt: "2025-11-18T09:15:00.000Z",
    posts: [
      {
        id: "pst_03",
        threadId: "thr_02",
        authorId: "usr_member_02",
        authorName: "Luis Vecino",
        body: "Necesitamos 10 personas. Traigan guantes si pueden.",
        createdAt: "2025-11-17T20:00:00.000Z",
      },
      {
        id: "pst_04",
        threadId: "thr_02",
        authorId: "usr_admin_01",
        authorName: "Admin SAI",
        body: "Desde el equipo aportamos bolsas y refreshment.",
        createdAt: "2025-11-18T09:15:00.000Z",
      },
    ],
  },
];