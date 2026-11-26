import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAuthService } from "@/auth/services/mock-auth-service";
import { isAdmin } from "@/domain/user";
import { mockForumThreads } from "@/data/mock/forum";
import { getForumRepository } from "@/repositories";
import { ReplyForm } from "@/ui/forum/reply-form";
import { ForumThreadPosts } from "@/ui/forum/forum-thread-posts";

export function generateStaticParams() {
  return mockForumThreads.map((thread) => ({ threadId: thread.id }));
}

type PageProps = {
  params: Promise<{ threadId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { threadId } = await params;
  const repo = getForumRepository();
  const thread = await repo.getThreadById(threadId);
  return { title: thread?.title ?? "Hilo" };
}

export default async function ThreadPage({ params }: PageProps) {
  const { threadId } = await params;
  const repo = getForumRepository();
  const thread = await repo.getThreadById(threadId);
  if (!thread) notFound();

  const session = await getAuthService().getSession();
  const viewerIsAdmin = session ? isAdmin(session.user) : false;

  return (
    <section className="appSection forum forumThreadPage">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <header className="forumThreadIntro">
          <Link href="/foro" className="backLink backLink--chip">
            <span className="backLink__icon" aria-hidden>
              ←
            </span>
            <span>Volver al foro</span>
          </Link>
          <h1 className="appPageTitle forumThreadTitle">{thread.title}</h1>
        </header>
        <div style={{ marginTop: 28 }}>
          <ForumThreadPosts
            threadId={thread.id}
            threadTitle={thread.title}
            posts={thread.posts}
            initialIsAdmin={viewerIsAdmin}
          />
        </div>
        <article className="forumPanel" style={{ marginTop: 24 }}>
          <ReplyForm threadId={thread.id} />
        </article>
      </div>
    </section>
  );
}