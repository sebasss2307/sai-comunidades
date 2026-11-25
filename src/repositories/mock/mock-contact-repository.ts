import { inMemoryStore } from "@/data/mock/in-memory-store";
import type { ContactMessage, ContactMessageInput } from "@/domain/contact";
import type { ContactRepository } from "@/repositories/contracts/contact-repository";

export class MockContactRepository implements ContactRepository {
  async listAll(): Promise<ContactMessage[]> {
    return inMemoryStore.contact.all();
  }

  async create(input: ContactMessageInput): Promise<ContactMessage> {
    return inMemoryStore.contact.create(input);
  }

  async countUnread(): Promise<number> {
    return inMemoryStore.contact.countUnread();
  }

  async setRead(id: string, read: boolean): Promise<ContactMessage | null> {
    return inMemoryStore.contact.setRead(id, read);
  }
}