import { FeaturedImage } from './featuredImage';

export class Service {
  id: number;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  featuredImage: FeaturedImage | null;
  summaryTitle?: string | null;

  constructor(id: number, slug: string | null, title: string | null, excerpt: string | null, content: string | null, featuredImage: FeaturedImage | null, summaryTitle?: string | null) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.excerpt = excerpt;
    this.content = content;
    this.featuredImage = featuredImage;
    this.summaryTitle = summaryTitle;
  }
}
