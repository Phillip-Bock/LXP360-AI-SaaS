import imageUrlBuilder from "@sanity/image-url"
import { sanityClient } from "./client"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  if (!source) return null
  return builder.image(source)
}

// Helper to get optimized image URL with default settings
export function getImageUrl(source: SanityImageSource, width = 800, height?: number) {
  if (!source) return "/placeholder.svg"

  let imageBuilder = urlFor(source)?.width(width).auto("format").quality(80)

  if (height && imageBuilder) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder?.url() || "/placeholder.svg"
}
