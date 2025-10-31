import { sanityClient } from './sanity/client'

// Example: Fetch all videos
export async function getAllVideos() {
  return sanityClient.fetch(`
    *[_type == "video"] | order(publishedAt desc) {
      _id,
      title,
      description,
      "slug": slug.current,
      "videoUrl": videoFile.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      duration,
      publishedAt
    }
  `)
}

// Example: Fetch hero video by slug
export async function getHeroVideo(slug: string) {
  return sanityClient.fetch(`
    *[_type == "video" && slug.current == $slug][0] {
      _id,
      title,
      description,
      "videoUrl": videoFile.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      duration
    }
  `, { slug })
}

// Example: Fetch all images
export async function getAllImages() {
  return sanityClient.fetch(`
    *[_type == "imageAsset"] {
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      altText,
      tags
    }
  `)
}

// Example: Fetch single image by ID
export async function getImageById(id: string) {
  return sanityClient.fetch(`
    *[_type == "imageAsset" && _id == $id][0] {
      _id,
      title,
      description,
      "imageUrl": image.asset->url,
      altText,
      tags
    }
  `, { id })
}
