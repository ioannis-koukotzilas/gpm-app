import { FeaturedImage } from './featuredImage';

export class Vehicle {
  slug: string | null;
  title: string | null;
  featuredImage: FeaturedImage | null;
  passengerCapacity?: string | null;

  constructor(slug: string | null, title: string | null, featuredImage: FeaturedImage | null, passengerCapacity?: string | null) {
    this.slug = slug;
    this.title = title;
    this.featuredImage = featuredImage;
    this.passengerCapacity = passengerCapacity;
  }
}
