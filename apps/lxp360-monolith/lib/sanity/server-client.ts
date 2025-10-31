import { createClient } from "next-sanity"
import { sanityConfig } from "./config"

// Server-only Sanity client with API token - use this for mutations or private content
// This should ONLY be imported in Server Components, API routes, or server actions
export const sanityServerClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Don't use CDN for mutations
})

// Helper function for server-side mutations
export async function sanityMutate(mutations: any[]) {
  return sanityServerClient.mutate(mutations)
}
