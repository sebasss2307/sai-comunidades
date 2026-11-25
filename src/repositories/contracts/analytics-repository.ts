import type { SiteMetrics } from "@/domain/analytics";

export interface AnalyticsRepository {
  getMetrics(): Promise<SiteMetrics>;
  recordVisit(): Promise<void>;
}