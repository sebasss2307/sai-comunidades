export interface LandingServiceItem {
  id: string;
  img: string;
  alt: string;
  num: string;
  title: string;
  body: string;
}

export type LandingServiceInput = Omit<LandingServiceItem, "id">;