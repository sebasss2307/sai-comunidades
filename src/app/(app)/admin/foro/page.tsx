import type { Metadata } from "next";

import { getForumRepository } from "@/repositories";
import { AdminForumPanel } from "@/ui/admin/admin-forum-panel";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Foro · Admin",
};

export default async function AdminForumPage() {
  const repo = getForumRepository();
  const threads = await repo.listThreads();

  return (
    <>
      <MarketingPageHeader
        eyebrow="Moderación"
        title="Foro comunitario"
        lead={`${threads.length} hilos activos (MOCK).`}
      />
      <AdminForumPanel threads={threads} />
    </>
  );
}