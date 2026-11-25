import type { SiteMetrics } from "@/domain/analytics";

export let mockVisitCount = 12847;
export let mockVisitsToday = 142;

export function recordMockVisit(): void {
  mockVisitCount += 1;
  mockVisitsToday += 1;
}

export function getBaseMetrics(
  registeredUsers: number,
  forumThreads: number,
  contactMessages: number,
  unreadContactMessages: number,
): SiteMetrics {
  return {
    totalVisits: mockVisitCount,
    visitsToday: mockVisitsToday,
    registeredUsers,
    forumThreads,
    contactMessages,
    unreadContactMessages,
  };
}