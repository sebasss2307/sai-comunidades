import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { mockForumThreads } from "@/data/mock/forum";
import { formatDate } from "@/lib/utils/format-date";
import { getForumRepository } from "@/repositories";
import { ReplyForm } from "@/ui/forum/reply-form";

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

  return (
    <section className="appSection forum">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <Link href="/foro" className="backLink">
          ← Volver al foro
        </Link>
        <h1 className="appPageTitle" style={{ marginTop: 16 }}>
          {thread.title}
        </h1>
        <div style={{ marginTop: 28 }}>
          {thread.posts.map((post) => (
            <article className="post" key={post.id}>
              <div className="postMeta">
                <span className="avatar">
                  {post.authorName.trim().charAt(0).toUpperCase()}
                </span>
                <b>{post.authorName}</b>
                <span>·</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <p style={{ margin: "12px 0 0", color: "#626d65" }}>
                {post.body}
              </p>
            </article>
          ))}
        </div>
        <article className="forumPanel" style={{ marginTop: 24 }}>
          <ReplyForm threadId={thread.id} />
        </article>
      </div>
    </section>
  );
}