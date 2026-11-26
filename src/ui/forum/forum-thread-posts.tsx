"use client";

import { useEffect, useState } from "react";

import {
  DEMO_SESSION_CHANGE_EVENT,
  readClientDemoSession,
} from "@/auth/client-demo-session";
import type { ForumPost } from "@/domain/forum";
import { isAdmin } from "@/domain/user";
import { formatDate } from "@/lib/utils/format-date";
import { ForumPostDeleteButton } from "@/ui/forum/forum-post-delete-button";

type Props = {
  threadId: string;
  threadTitle: string;
  posts: ForumPost[];
  initialIsAdmin: boolean;
};

export function ForumThreadPosts({
  threadId,
  threadTitle,
  posts,
  initialIsAdmin,
}: Props) {
  const [visiblePosts, setVisiblePosts] = useState(posts);
  const [isAdminUser, setIsAdminUser] = useState(initialIsAdmin);

  useEffect(() => {
    setVisiblePosts(posts);
  }, [posts]);

  useEffect(() => {
    const syncAdmin = () => {
      if (process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true") {
        const session = readClientDemoSession();
        setIsAdminUser(session ? isAdmin(session.user) : false);
        return;
      }
      setIsAdminUser(initialIsAdmin);
    };

    syncAdmin();

    if (process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true") {
      window.addEventListener(DEMO_SESSION_CHANGE_EVENT, syncAdmin);
      return () => {
        window.removeEventListener(DEMO_SESSION_CHANGE_EVENT, syncAdmin);
      };
    }
  }, [initialIsAdmin]);

  return (
    <div>
      {visiblePosts.map((post) => (
        <article className="post forumPost" key={post.id}>
          <div className="forumPost__row">
            <div className="forumPost__body">
              <div className="postMeta">
                <span className="avatar">
                  {post.authorName.trim().charAt(0).toUpperCase()}
                </span>
                <b>{post.authorName}</b>
                <span>·</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <p className="forumPost__text">{post.body}</p>
            </div>
            {isAdminUser ? (
              <ForumPostDeleteButton
                threadId={threadId}
                threadTitle={threadTitle}
                post={post}
                onDeleted={(postId) => {
                  setVisiblePosts((current) =>
                    current.filter((item) => item.id !== postId),
                  );
                }}
              />
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}