"use client"

import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { sanityClient } from "@/lib/sanity/client"
import { getImageUrl } from "@/lib/sanity/image"
import { ArrowLeft, Clock, Calendar } from "@phosphor-icons/react/dist/ssr"
import { PublicHeader } from "@/components/public-header"
import { use } from "react"

async function getPost(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
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
    content,
    seo
  }`

  const post = await sanityClient.fetch(query, { slug })
  return post
}

async function getRelatedPosts(categorySlug: string, currentPostId: string) {
  const query = `*[_type == "blogPost" && category->slug.current == $categorySlug && _id != $currentPostId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      color
    },
    publishedAt
  }`

  return sanityClient.fetch(query, { categorySlug, currentPostId })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const post = use(getPost(params.slug))

  if (!post) {
    notFound()
  }

  const relatedPosts = use(getRelatedPosts(post.category.slug.current, post._id))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => (
        <figure className="my-8">
          <Image
            src={getImageUrl(value) || "/placeholder.svg"}
            alt={value.alt || "Blog image"}
            width={1200}
            height={675}
            className="rounded-xl"
          />
          {value.caption && <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>}
        </figure>
      ),
    },
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-montserrat font-bold text-white mt-12 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-montserrat font-bold text-white mt-8 mb-3">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-montserrat font-semibold text-white mt-6 mb-2">{children}</h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-[#0056B8] pl-6 py-2 my-6 italic text-gray-300">{children}</blockquote>
      ),
      normal: ({ children }: any) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
    },
    marks: {
      link: ({ children, value }: any) => (
        <a href={value.href} className="text-[#019EF3] hover:text-[#EF06C8] underline transition-colors">
          {children}
        </a>
      ),
      strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="px-2 py-1 bg-white/10 rounded text-[#019EF3] font-mono text-sm">{children}</code>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>,
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">{children}</ol>
      ),
    },
  }

  return (
    <>
      <PublicHeader
        onSignInClick={() => router.push("/auth/login")}
        onSignUpClick={() => router.push("/auth/signup")}
      />
      <div className="min-h-screen bg-[#0A0F1E] font-lato">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0056B8]/10 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#EF06C8]/20 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#019EF3] hover:text-[#EF06C8] transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5" weight="bold" />
              <span className="font-medium">Back to Blog</span>
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: `${post.category.color || "#0056B8"}20`,
                    color: post.category.color || "#0056B8",
                  }}
                >
                  {post.category.title}
                </span>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" weight="duotone" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" weight="duotone" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-6">
                {post.title}
              </h1>

              <p className="text-xl text-gray-300 mb-8">{post.excerpt}</p>

              <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                {post.author.image && (
                  <Image
                    src={getImageUrl(post.author.image, 60, 60) || "/placeholder.svg"}
                    alt={post.author.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-white">{post.author.name}</p>
                  {post.author.bio && <p className="text-sm text-gray-400">{post.author.bio}</p>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="aspect-[21/9] relative rounded-2xl overflow-hidden">
                  <Image
                    src={getImageUrl(post.featuredImage) || "/placeholder.svg"}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <article className="max-w-3xl mx-auto prose prose-invert prose-lg">
              <PortableText value={post.content} components={portableTextComponents} />
            </article>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-montserrat font-bold text-white mb-12 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost: any) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug.current}`}
                    className="group block overflow-hidden rounded-xl bg-gradient-to-br from-[#0056B8]/10 to-[#EF06C8]/10 border border-white/10 hover:border-[#0056B8]/50 transition-all duration-300"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {relatedPost.featuredImage && (
                        <Image
                          src={getImageUrl(relatedPost.featuredImage) || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{
                          backgroundColor: `${relatedPost.category.color || "#0056B8"}20`,
                          color: relatedPost.category.color || "#0056B8",
                        }}
                      >
                        {relatedPost.category.title}
                      </span>
                      <h3 className="text-lg font-montserrat font-bold text-white group-hover:text-[#019EF3] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
