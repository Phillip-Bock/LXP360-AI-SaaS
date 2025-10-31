"use client"

import { useRouter } from "next/navigation"
import { sanityClient } from "@/lib/sanity/client"
import { BlogListing } from "@/components/blog-listing"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { useEffect, useState } from "react"

export default function BlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlogData() {
      try {
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

        const [postsData, categoriesData] = await Promise.all([
          sanityClient.fetch(postsQuery),
          sanityClient.fetch(categoriesQuery),
        ])

        setPosts(postsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading blog data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [])

  if (loading) {
    return (
      <>
        <PublicHeader
          onSignInClick={() => router.push("/auth/login")}
          onSignUpClick={() => router.push("/auth/signup")}
        />
        <div className="min-h-screen bg-[#001D3D] flex items-center justify-center">
          <div className="text-[#F5F5F5] text-xl font-[family-name:var(--font-lato)]">Loading blog...</div>
        </div>
        <PublicFooter />
      </>
    )
  }

  return (
    <>
      <PublicHeader
        onSignInClick={() => router.push("/auth/login")}
        onSignUpClick={() => router.push("/auth/signup")}
      />
      <BlogListing posts={posts} categories={categories} />
      <PublicFooter />
    </>
  )
}
