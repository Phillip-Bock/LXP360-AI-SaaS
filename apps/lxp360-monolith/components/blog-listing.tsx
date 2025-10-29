"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react"
import { getImageUrl } from "@/lib/sanity/image"

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage: any
  category: {
    title: string
    slug: { current: string }
    color?: string
  }
  author: {
    name: string
    image?: any
  }
  publishedAt: string
  readTime?: number
  featured?: boolean
}

interface BlogListingProps {
  posts: BlogPost[]
  categories: Array<{ title: string; slug: { current: string } }>
}

export function BlogListing({ posts, categories }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2)
  const regularPosts = posts.filter((post) => !post.featured)

  const filteredPosts = regularPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category.slug.current === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] font-lato">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0056B8]/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#EF06C8]/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#019EF3]/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0056B8]/20 border border-[#0056B8]/30 mb-6">
              <span className="text-[#019EF3] text-sm font-medium">Insights & Innovation</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold text-white mb-6">
              Insights at the{" "}
              <span className="bg-gradient-to-r from-[#019EF3] via-[#0056B8] to-[#EF06C8] bg-clip-text text-transparent">
                Intersection of Learning
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover the power of features that make our AI platform fast, flexible, and easy to integrate into your
              business, more faster, and grow stronger.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-[#0056B8] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug.current}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0056B8]/20 to-[#EF06C8]/20 border border-white/10 hover:border-[#0056B8]/50 transition-all duration-300">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        {post.featuredImage && (
                          <Image
                            src={getImageUrl(post.featuredImage) || "/placeholder.svg"}
                            alt={post.featuredImage.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/50 to-transparent" />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: `${post.category.color || "#0056B8"}20`,
                              color: post.category.color || "#0056B8",
                            }}
                          >
                            {post.category.title}
                          </span>
                          <span className="text-sm text-gray-400">{formatDate(post.publishedAt)}</span>
                        </div>
                        <h3 className="text-2xl font-montserrat font-bold text-white mb-3 group-hover:text-[#019EF3] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-300 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {post.author.image && (
                              <Image
                                src={getImageUrl(post.author.image, 40, 40) || "/placeholder.svg"}
                                alt={post.author.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            )}
                            <span className="text-sm text-gray-400">{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#019EF3] group-hover:gap-3 transition-all">
                            <span className="text-sm font-medium">Read More</span>
                            <ArrowRight className="w-4 h-4" weight="bold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-[#0056B8] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category.slug.current}
                onClick={() => setSelectedCategory(category.slug.current)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.slug.current
                    ? "bg-[#0056B8] text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link href={`/blog/${post.slug.current}`} className="group block h-full">
                  <div className="h-full flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0056B8]/10 to-[#EF06C8]/10 border border-white/10 hover:border-[#0056B8]/50 transition-all duration-300">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {post.featuredImage && (
                        <Image
                          src={getImageUrl(post.featuredImage) || "/placeholder.svg"}
                          alt={post.featuredImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${post.category.color || "#0056B8"}20`,
                            color: post.category.color || "#0056B8",
                          }}
                        >
                          {post.category.title}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
                      </div>
                      <h3 className="text-xl font-montserrat font-bold text-white mb-2 group-hover:text-[#019EF3] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        {post.readTime && <span className="text-xs text-gray-400">{post.readTime} min read</span>}
                        <div className="flex items-center gap-2 text-[#019EF3] group-hover:gap-3 transition-all ml-auto">
                          <span className="text-sm font-medium">Read More</span>
                          <ArrowRight className="w-4 h-4" weight="bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0056B8]/20 via-[#EF06C8]/20 to-[#019EF3]/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EF06C8]/30 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent">
                Intelligent Together
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From automation to innovation our cutting-edge AI solutions help businesses work smarter, move faster, and
              grow stronger.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0056B8] hover:bg-[#019EF3] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
