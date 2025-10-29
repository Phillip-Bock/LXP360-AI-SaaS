import { sanityFetch } from "./client"

// Example: Fetch all policies (Terms of Service, Privacy Policy, etc.)
export async function getPolicies() {
  const query = `*[_type == "policy"] | order(order asc) {
    _id,
    title,
    slug,
    content,
    lastUpdated
  }`

  return sanityFetch<any[]>({ query, tags: ["policy"] })
}

// Example: Fetch a single policy by slug
export async function getPolicyBySlug(slug: string) {
  const query = `*[_type == "policy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    lastUpdated
  }`

  return sanityFetch<any>({ query, params: { slug }, tags: ["policy"] })
}

// Example: Fetch landing page content
export async function getLandingPageContent() {
  const query = `*[_type == "landingPage"][0] {
    _id,
    heroTitle,
    heroSubtitle,
    heroVideo,
    features[] {
      title,
      description,
      icon
    }
  }`

  return sanityFetch<any>({ query, tags: ["landingPage"] })
}

// Example: Fetch all media assets
export async function getMediaAssets() {
  const query = `*[_type == "mediaAsset"] | order(_createdAt desc) {
    _id,
    title,
    description,
    file,
    fileType,
    _createdAt
  }`

  return sanityFetch<any[]>({ query, tags: ["media"] })
}

export async function getHomePageContent() {
  const query = `*[_type == "homePage"][0] {
    _id,
    heroTitle,
    heroSubtitle,
    heroBackground,
    heroCtaText,
    heroCtaLink,
    clientLogosTitle,
    clientLogos[] {
      logo,
      companyName,
      alt
    },
    featuresTitle,
    features[] {
      title,
      description,
      image,
      icon
    },
    platformTitle,
    platformScreenshots[] {
      image,
      title,
      description
    },
    testimonialsTitle,
    testimonials[] {
      quote,
      authorName,
      authorTitle,
      authorPhoto,
      companyName,
      companyLogo
    },
    aboutTitle,
    aboutDescription,
    aboutImage,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaButtonLink,
    ctaBackground
  }`

  return sanityFetch<any>({ query, tags: ["homePage"] })
}
