import { mockContactMessages } from "@/data/mock/contact";
import { mockForumThreads } from "@/data/mock/forum";
import { mockLandingCarousel } from "@/data/mock/landing-carousel";
import { landingImages } from "@/ui/landing/landing-images";
import { mockUsers, MOCK_DEMO_PASSWORD } from "@/data/mock/users";
import type { ContactMessage } from "@/domain/contact";
import type { ForumThread } from "@/domain/forum";
import type {
  LandingServiceInput,
  LandingServiceItem,
} from "@/domain/landing-service";
import type { User, UserRole } from "@/domain/user";

/** Almacén mutable en memoria para la fase MOCK (sustituible por Supabase). */
const users: User[] = [...mockUsers];
const threads: ForumThread[] = structuredClone(mockForumThreads);
const contactMessages: ContactMessage[] = [...mockContactMessages];
const LEGACY_MANTENCION_PHOTOS = [
  "photo-1557597774-9d273605008b",
  "photo-1593508512255-86ab42a8e620",
] as const;

function normalizeCarouselImage(img: string): string {
  if (LEGACY_MANTENCION_PHOTOS.some((id) => img.includes(id))) {
    return landingImages.mantencion;
  }
  return img;
}

const carouselItems: LandingServiceItem[] = structuredClone(
  mockLandingCarousel,
).map((item) => ({
  ...item,
  img: normalizeCarouselImage(item.img),
}));

const passwordByUserId = new Map<string, string>(
  mockUsers.map((u) => [u.id, MOCK_DEMO_PASSWORD]),
);

function newId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export const inMemoryStore = {
  users: {
    all: (): User[] => [...users],
    findByEmail: (email: string): User | null =>
      users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null,
    findById: (id: string): User | null => users.find((u) => u.id === id) ?? null,
    create: (input: {
      email: string;
      name: string;
      password: string;
    }): User => {
      const user: User = {
        id: newId("usr"),
        email: input.email.toLowerCase(),
        name: input.name,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      passwordByUserId.set(user.id, input.password);
      return user;
    },
    validatePassword: (userId: string, password: string): boolean =>
      passwordByUserId.get(userId) === password,
    update: (
      id: string,
      input: {
        name: string;
        email: string;
        role: UserRole;
        password?: string;
      },
    ):
      | { user: User }
      | { error: "NOT_FOUND" | "EMAIL_TAKEN" } => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return { error: "NOT_FOUND" };
      const email = input.email.toLowerCase();
      if (
        users.some((u) => u.id !== id && u.email.toLowerCase() === email)
      ) {
        return { error: "EMAIL_TAKEN" };
      }
      users[index] = {
        ...users[index],
        name: input.name.trim(),
        email,
        role: input.role,
      };
      if (input.password && input.password.length > 0) {
        passwordByUserId.set(id, input.password);
      }
      return { user: structuredClone(users[index]) };
    },
    updateProfile: (
      id: string,
      input: { name: string; email: string; avatarUrl?: string },
    ):
      | { user: User }
      | { error: "NOT_FOUND" | "EMAIL_TAKEN" } => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return { error: "NOT_FOUND" };
      const email = input.email.toLowerCase();
      if (
        users.some((u) => u.id !== id && u.email.toLowerCase() === email)
      ) {
        return { error: "EMAIL_TAKEN" };
      }
      const avatarUrl = input.avatarUrl?.trim();
      users[index] = {
        ...users[index],
        name: input.name.trim(),
        email,
        avatarUrl: avatarUrl ? avatarUrl : undefined,
      };
      return { user: structuredClone(users[index]) };
    },
    delete: (id: string): boolean => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return false;
      users.splice(index, 1);
      passwordByUserId.delete(id);
      return true;
    },
    countAdmins: (): number =>
      users.filter((user) => user.role === "admin").length,
  },
  forum: {
    allThreads: (): ForumThread[] => structuredClone(threads),
    getThread: (id: string): ForumThread | null => {
      const thread = threads.find((t) => t.id === id);
      return thread ? structuredClone(thread) : null;
    },
    createThread: (input: {
      title: string;
      body: string;
      authorId: string;
      authorName: string;
    }): ForumThread => {
      const now = new Date().toISOString();
      const threadId = newId("thr");
      const postId = newId("pst");
      const thread: ForumThread = {
        id: threadId,
        title: input.title,
        excerpt: input.body.slice(0, 120),
        authorId: input.authorId,
        authorName: input.authorName,
        replyCount: 0,
        lastActivityAt: now,
        posts: [
          {
            id: postId,
            threadId,
            authorId: input.authorId,
            authorName: input.authorName,
            body: input.body,
            createdAt: now,
          },
        ],
      };
      threads.unshift(thread);
      return structuredClone(thread);
    },
    addReply: (input: {
      threadId: string;
      body: string;
      authorId: string;
      authorName: string;
    }): ForumThread | null => {
      const thread = threads.find((t) => t.id === input.threadId);
      if (!thread) return null;
      const now = new Date().toISOString();
      thread.posts.push({
        id: newId("pst"),
        threadId: input.threadId,
        authorId: input.authorId,
        authorName: input.authorName,
        body: input.body,
        createdAt: now,
      });
      thread.replyCount = Math.max(0, thread.posts.length - 1);
      thread.lastActivityAt = now;
      return structuredClone(thread);
    },
    deleteThread: (id: string): boolean => {
      const index = threads.findIndex((thread) => thread.id === id);
      if (index === -1) return false;
      threads.splice(index, 1);
      return true;
    },
    deletePost: (
      threadId: string,
      postId: string,
    ): { thread: ForumThread } | { error: "NOT_FOUND" | "POST_NOT_FOUND" | "LAST_POST" } => {
      const thread = threads.find((item) => item.id === threadId);
      if (!thread) return { error: "NOT_FOUND" };
      const postIndex = thread.posts.findIndex((post) => post.id === postId);
      if (postIndex === -1) return { error: "POST_NOT_FOUND" };
      if (thread.posts.length === 1) return { error: "LAST_POST" };

      thread.posts.splice(postIndex, 1);
      if (postIndex === 0) {
        thread.excerpt = thread.posts[0].body.slice(0, 120);
        thread.authorId = thread.posts[0].authorId;
        thread.authorName = thread.posts[0].authorName;
      }
      thread.replyCount = Math.max(0, thread.posts.length - 1);
      thread.lastActivityAt = thread.posts.at(-1)?.createdAt ?? thread.lastActivityAt;
      return { thread: structuredClone(thread) };
    },
  },
  contact: {
    all: (): ContactMessage[] => [...contactMessages],
    create: (input: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
      const message: ContactMessage = {
        ...input,
        id: newId("msg"),
        createdAt: new Date().toISOString(),
        read: false,
      };
      contactMessages.unshift(message);
      return message;
    },
    countUnread: (): number => contactMessages.filter((m) => !m.read).length,
    setRead: (id: string, read: boolean): ContactMessage | null => {
      const index = contactMessages.findIndex((m) => m.id === id);
      if (index === -1) return null;
      contactMessages[index] = { ...contactMessages[index], read };
      return structuredClone(contactMessages[index]);
    },
  },
  carousel: {
    all: (): LandingServiceItem[] => structuredClone(carouselItems),
    create: (input: LandingServiceInput): LandingServiceItem => {
      const item: LandingServiceItem = {
        id: newId("svc"),
        ...input,
        title: input.title.trim(),
        body: input.body.trim(),
        alt: input.alt.trim(),
        num: input.num.trim(),
      };
      carouselItems.push(item);
      return structuredClone(item);
    },
    update: (
      id: string,
      input: LandingServiceInput,
    ): LandingServiceItem | null => {
      const index = carouselItems.findIndex((item) => item.id === id);
      if (index === -1) return null;
      carouselItems[index] = {
        ...carouselItems[index],
        ...input,
        title: input.title.trim(),
        body: input.body.trim(),
        alt: input.alt.trim(),
        num: input.num.trim(),
      };
      return structuredClone(carouselItems[index]);
    },
    delete: (id: string): boolean => {
      const index = carouselItems.findIndex((item) => item.id === id);
      if (index === -1) return false;
      carouselItems.splice(index, 1);
      return true;
    },
  },
};