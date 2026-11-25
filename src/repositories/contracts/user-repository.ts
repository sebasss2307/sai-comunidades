import type { User, UserRole } from "@/domain/user";

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface UpdateProfileInput {
  name: string;
  email: string;
  avatarUrl?: string;
}

export type UpdateProfileResult =
  | { user: User }
  | { error: "NOT_FOUND" | "EMAIL_TAKEN" };

export type UpdateUserResult =
  | { user: User }
  | { error: "NOT_FOUND" | "EMAIL_TAKEN" };

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  listAll(): Promise<User[]>;
  create(input: CreateUserInput): Promise<User>;
  update(id: string, input: UpdateUserInput): Promise<UpdateUserResult>;
  updateProfile(id: string, input: UpdateProfileInput): Promise<UpdateProfileResult>;
  delete(id: string): Promise<boolean>;
  countAdmins(): Promise<number>;
  validateCredentials(email: string, password: string): Promise<User | null>;
}