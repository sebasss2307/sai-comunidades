import type {
  CreateReplyInput,
  CreateThreadInput,
  ForumThread,
} from "@/domain/forum";

export type DeleteForumPostResult =
  | { thread: ForumThread }
  | { error: "NOT_FOUND" | "POST_NOT_FOUND" | "LAST_POST" };

export interface ForumRepository {
  listThreads(): Promise<ForumThread[]>;
  getThreadById(id: string): Promise<ForumThread | null>;
  createThread(input: CreateThreadInput): Promise<ForumThread>;
  addReply(input: CreateReplyInput): Promise<ForumThread | null>;
  deleteThread(id: string): Promise<boolean>;
  deletePost(threadId: string, postId: string): Promise<DeleteForumPostResult>;
}