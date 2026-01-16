import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
export const sanityClient = createClient({
  projectId: "01lrn3ze",
  dataset: "development",
  useCdn: true, // CDN for faster responses in production
  apiVersion: "2026-01-16",
});

// Configure the image builder to easily create image URLs
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
