import { FeaturedImage } from './featuredImage';

export class Service {
  slug: string | null;
  title: string | null;
  content: string | null;
  featuredImage: FeaturedImage | null;

  constructor(slug: string | null, title: string | null, content: string | null, featuredImage: FeaturedImage | null) {
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.featuredImage = featuredImage;
  }
}
