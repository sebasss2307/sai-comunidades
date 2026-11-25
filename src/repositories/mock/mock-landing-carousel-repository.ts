import { inMemoryStore } from "@/data/mock/in-memory-store";
import type {
  LandingServiceInput,
  LandingServiceItem,
} from "@/domain/landing-service";
import type { LandingCarouselRepository } from "@/repositories/contracts/landing-carousel-repository";

export class MockLandingCarouselRepository implements LandingCarouselRepository {
  async listAll(): Promise<LandingServiceItem[]> {
    return inMemoryStore.carousel.all();
  }

  async create(input: LandingServiceInput): Promise<LandingServiceItem> {
    return inMemoryStore.carousel.create(input);
  }

  async update(
    id: string,
    input: LandingServiceInput,
  ): Promise<LandingServiceItem | null> {
    return inMemoryStore.carousel.update(id, input);
  }

  async delete(id: string): Promise<boolean> {
    return inMemoryStore.carousel.delete(id);
  }
}