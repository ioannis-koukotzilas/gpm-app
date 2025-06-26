export class FeaturedImage {
  srcSet: string | null;
  altText: string | null;

  constructor(srcSet: string | null, altText: string | null) {
    this.srcSet = srcSet;
    this.altText = altText;
  }
}
