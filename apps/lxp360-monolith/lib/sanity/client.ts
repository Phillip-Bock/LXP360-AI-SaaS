import { createClient } from "next-sanity"
import { sanityConfig } from "./config"

// Client-safe Sanity client (no token) - can be used in both client and server components
export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: true, // Use CDN for faster reads
})

// Helper function to fetch data with TypeScript support
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, any>
  tags?: string[]
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 0 : 3600, // Revalidate every hour in production
      tags,
    },
  })
}
