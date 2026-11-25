export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}