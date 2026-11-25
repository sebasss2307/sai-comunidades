import { inMemoryStore } from "@/data/mock/in-memory-store";
import type { User } from "@/domain/user";
import type {
  CreateUserInput,
  UpdateProfileInput,
  UpdateUserInput,
  UserRepository,
} from "@/repositories/contracts/user-repository";

export class MockUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return inMemoryStore.users.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return inMemoryStore.users.findById(id);
  }

  async listAll(): Promise<User[]> {
    return inMemoryStore.users.all();
  }

  async create(input: CreateUserInput): Promise<User> {
    const existing = inMemoryStore.users.findByEmail(input.email);
    if (existing) {
      throw new Error("Ya existe una cuenta con este correo.");
    }
    return inMemoryStore.users.create(input);
  }

  async update(id: string, input: UpdateUserInput) {
    return inMemoryStore.users.update(id, input);
  }

  async updateProfile(id: string, input: UpdateProfileInput) {
    return inMemoryStore.users.updateProfile(id, input);
  }

  async delete(id: string): Promise<boolean> {
    return inMemoryStore.users.delete(id);
  }

  async countAdmins(): Promise<number> {
    return inMemoryStore.users.countAdmins();
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = inMemoryStore.users.findByEmail(email);
    if (!user) return null;
    const valid = inMemoryStore.users.validatePassword(user.id, password);
    return valid ? user : null;
  }
}