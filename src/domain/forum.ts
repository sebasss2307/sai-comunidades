export interface ForumPost {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface ForumThread {
  id: string;
  title: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  replyCount: number;
  lastActivityAt: string;
  posts: ForumPost[];
}

export interface CreateThreadInput {
  title: string;
  body: string;
  authorId: string;
  authorName: string;
}

export interface CreateReplyInput {
  threadId: string;
  body: string;
  authorId: string;
  authorName: string;
}