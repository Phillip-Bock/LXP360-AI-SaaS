"use client"

import { useRouter } from "next/navigation"
import { sanityClient } from "@/lib/sanity/client"
import { BlogListing } from "@/components/blog-listing"
import { PublicHeader } from "@/components/public-header"
import { use } from "react"

async function getBlogData() {
  const postsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug,
      color
    },
    author,
    publishedAt,
    readTime,
    featured
  }`

  const categoriesQuery = `*[_type == "blogCategory"] | order(title asc) {
    title,
    slug
  }`

  const [posts, categories] = await Promise.all([sanityClient.fetch(postsQuery), sanityClient.fetch(categoriesQuery)])

  return { posts, categories }
}

export default function BlogPage() {
  const router = useRouter()
  const { posts, categories } = use(getBlogData())

  return (
    <>
      <PublicHeader
        onSignInClick={() => router.push("/auth/login")}
        onSignUpClick={() => router.push("/auth/signup")}
      />
      <BlogListing posts={posts} categories={categories} />
    </>
  )
}
