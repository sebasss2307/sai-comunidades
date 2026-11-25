import type { AnalyticsRepository } from "@/repositories/contracts/analytics-repository";
import type { ContactRepository } from "@/repositories/contracts/contact-repository";
import type { ForumRepository } from "@/repositories/contracts/forum-repository";
import type { LandingCarouselRepository } from "@/repositories/contracts/landing-carousel-repository";
import type { UserRepository } from "@/repositories/contracts/user-repository";
import { MockAnalyticsRepository } from "@/repositories/mock/mock-analytics-repository";
import { MockContactRepository } from "@/repositories/mock/mock-contact-repository";
import { MockForumRepository } from "@/repositories/mock/mock-forum-repository";
import { MockLandingCarouselRepository } from "@/repositories/mock/mock-landing-carousel-repository";
import { MockUserRepository } from "@/repositories/mock/mock-user-repository";

export type DataProvider = "mock" | "supabase";

const provider: DataProvider =
  (process.env.DATA_PROVIDER as DataProvider | undefined) ?? "mock";

function assertMockOnly(): void {
  if (provider !== "mock") {
    throw new Error(
      "Solo el proveedor MOCK está implementado. Configure Supabase más adelante.",
    );
  }
}

let userRepository: UserRepository | null = null;
let forumRepository: ForumRepository | null = null;
let contactRepository: ContactRepository | null = null;
let analyticsRepository: AnalyticsRepository | null = null;
let landingCarouselRepository: LandingCarouselRepository | null = null;

export function getUserRepository(): UserRepository {
  assertMockOnly();
  userRepository ??= new MockUserRepository();
  return userRepository;
}

export function getForumRepository(): ForumRepository {
  assertMockOnly();
  forumRepository ??= new MockForumRepository();
  return forumRepository;
}

export function getContactRepository(): ContactRepository {
  assertMockOnly();
  contactRepository ??= new MockContactRepository();
  return contactRepository;
}

export function getAnalyticsRepository(): AnalyticsRepository {
  assertMockOnly();
  analyticsRepository ??= new MockAnalyticsRepository();
  return analyticsRepository;
}

export function getLandingCarouselRepository(): LandingCarouselRepository {
  assertMockOnly();
  landingCarouselRepository ??= new MockLandingCarouselRepository();
  return landingCarouselRepository;
}