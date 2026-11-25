import { getBaseMetrics, recordMockVisit } from "@/data/mock/analytics";
import { inMemoryStore } from "@/data/mock/in-memory-store";
import type { SiteMetrics } from "@/domain/analytics";
import type { AnalyticsRepository } from "@/repositories/contracts/analytics-repository";
import { MockForumRepository } from "@/repositories/mock/mock-forum-repository";

const forumRepo = new MockForumRepository();

export class MockAnalyticsRepository implements AnalyticsRepository {
  async getMetrics(): Promise<SiteMetrics> {
    const users = inMemoryStore.users.all();
    const threads = await forumRepo.listThreads();
    const messages = inMemoryStore.contact.all();
    const unread = inMemoryStore.contact.countUnread();
    return getBaseMetrics(users.length, threads.length, messages.length, unread);
  }

  async recordVisit(): Promise<void> {
    recordMockVisit();
  }
}