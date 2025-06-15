export class Service {
  slug!: string;
  title!: string;
  content?: string | null;
  featuredImage?: FeaturedImage | null;

  constructor(
    slug: string,
    title: string,
    content: string,
    featuredImage?: FeaturedImage | null
  ) {
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.featuredImage = featuredImage;
  }
}

export class FeaturedImage {
  srcSet!: string;
  altText!: string;

  constructor(srcSet: string, altText: string) {
    this.srcSet = srcSet;
    this.altText = altText;
  }
}
