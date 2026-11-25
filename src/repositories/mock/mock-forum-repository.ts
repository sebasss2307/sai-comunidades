import { inMemoryStore } from "@/data/mock/in-memory-store";
import type {
  CreateReplyInput,
  CreateThreadInput,
  ForumThread,
} from "@/domain/forum";
import type { ForumRepository } from "@/repositories/contracts/forum-repository";

export class MockForumRepository implements ForumRepository {
  async listThreads(): Promise<ForumThread[]> {
    return inMemoryStore.forum.allThreads();
  }

  async getThreadById(id: string): Promise<ForumThread | null> {
    return inMemoryStore.forum.getThread(id);
  }

  async createThread(input: CreateThreadInput): Promise<ForumThread> {
    return inMemoryStore.forum.createThread(input);
  }

  async addReply(input: CreateReplyInput): Promise<ForumThread | null> {
    return inMemoryStore.forum.addReply(input);
  }

  async deleteThread(id: string): Promise<boolean> {
    return inMemoryStore.forum.deleteThread(id);
  }

  async deletePost(threadId: string, postId: string) {
    return inMemoryStore.forum.deletePost(threadId, postId);
  }
}