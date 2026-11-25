import type {
  LandingServiceInput,
  LandingServiceItem,
} from "@/domain/landing-service";

export interface LandingCarouselRepository {
  listAll(): Promise<LandingServiceItem[]>;
  create(input: LandingServiceInput): Promise<LandingServiceItem>;
  update(
    id: string,
    input: LandingServiceInput,
  ): Promise<LandingServiceItem | null>;
  delete(id: string): Promise<boolean>;
}