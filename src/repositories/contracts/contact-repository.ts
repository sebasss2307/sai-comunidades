import type { ContactMessage, ContactMessageInput } from "@/domain/contact";

export interface ContactRepository {
  listAll(): Promise<ContactMessage[]>;
  create(input: ContactMessageInput): Promise<ContactMessage>;
  countUnread(): Promise<number>;
  setRead(id: string, read: boolean): Promise<ContactMessage | null>;
}