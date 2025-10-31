"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Lightbulb, ShieldCheck, Target, Crosshair, Eye, Handshake } from "@phosphor-icons/react"

interface AboutPageProps {
  data?: {
    heroSection?: {
      headline: string
      description: string
      ctaText: string
      ctaLink: string
      heroImages: Array<{ asset: { url: string } }>
      stats: Array<{ value: string; label: string; color: string }>
    }
    partnerLogos?: Array<{ logo: { asset: { url: string } }; companyName: string }>
    missionSection?: {
      tagline: string
      headline: string
      description: string
      bulletPoints: string[]
      ctaText: string
      ctaLink: string
      image: { asset: { url: string } }
    }
    valuesSection?: {
      headline: string
      values: Array<{ title: string; description: string; icon: string }>
    }
    testimonialsSection?: {
      headline: string
      testimonials: Array<{
        quote: string
        authorName: string
        authorPhoto: { asset: { url: string } }
        highlightedWords: string[]
      }>
    }
    teamSection?: {
      headline: string
      teamMembers: Array<{
        name: string
        role: string
        photo: { asset: { url: string } }
      }>
    }
  }
}

const iconMap: Record<string, any> = {
  Lightbulb,
  ShieldCheck,
  Target,
  Crosshair,
  Eye,
  Handshake,
}

export default function AboutPage({ data }: AboutPageProps) {
  const { scrollYProgress } = useScroll()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Default data for placeholder
  const defaultData = {
    heroSection: {
      headline: "Empowering growth through smart technology",
      description:
        "LXP360 delivers AI-powered, adaptive learning experiences that transform workforce development. Training the Future for the Future.",
      ctaText: "Contact",
      ctaLink: "/contact",
      heroImages: [
        { asset: { url: "/business-team-meeting.png" } },
        { asset: { url: "/collaborative-workspace.png" } },
        { asset: { url: "/office-teamwork.jpg" } },
      ],
      stats: [
        { value: "98%", label: "Customer Satisfaction", color: "cyan" },
        { value: "50%", label: "Revenue Growth", color: "magenta" },
      ],
    },
    partnerLogos: [
      { logo: { asset: { url: "/generic-company-logo.png" } }, companyName: "Partner 1" },
      { logo: { asset: { url: "/generic-company-logo.png" } }, companyName: "Partner 2" },
      { logo: { asset: { url: "/generic-company-logo.png" } }, companyName: "Partner 3" },
      { logo: { asset: { url: "/generic-company-logo.png" } }, companyName: "Partner 4" },
      { logo: { asset: { url: "/generic-company-logo.png" } }, companyName: "Partner 5" },
    ],
    missionSection: {
      tagline: "Building strong brands through technology",
      headline: "Creating impact through innovative solutions",
      description:
        "We combine cutting-edge AI technology with deep learning expertise to deliver transformative training experiences. Our platform adapts to each learner's needs, ensuring maximum engagement and measurable results.",
      bulletPoints: [
        "AI-powered adaptive learning paths",
        "Real-time analytics and insights",
        "Seamless integration with existing systems",
      ],
      ctaText: "Get Started",
      ctaLink: "/contact",
      image: { asset: { url: "/team-collaboration.png" } },
    },
    valuesSection: {
      headline: "Dedicated to delivering value every day",
      values: [
        {
          title: "Innovation",
          description:
            "We push boundaries with cutting-edge AI technology to create learning experiences that inspire growth.",
          icon: "Lightbulb",
        },
        {
          title: "Integrity",
          description:
            "We build trust through transparency, ethical practices, and unwavering commitment to our clients.",
          icon: "ShieldCheck",
        },
        {
          title: "Reliability",
          description:
            "We deliver consistent, high-quality results that organizations can depend on for their success.",
          icon: "Target",
        },
        {
          title: "Accessibility",
          description: "We ensure learning is available to everyone, anywhere, on any device with inclusive design.",
          icon: "Eye",
        },
        {
          title: "Security First",
          description: "We protect your data with enterprise-grade security and compliance standards.",
          icon: "ShieldCheck",
        },
        {
          title: "Transparency",
          description: "We provide clear insights and open communication throughout your learning journey.",
          icon: "Handshake",
        },
      ],
    },
    testimonialsSection: {
      headline: "Trusted by businesses loved by users",
      testimonials: [
        {
          quote:
            "This software has transformed our business operations. The seamless integration and intuitive design have made our processes faster and more efficient. The customer support is outstanding, and the features are incredibly user-friendly. We've seen a measurable increase since we started using the system.",
          authorName: "Jenny Jones",
          authorPhoto: { asset: { url: "/professional-woman-headshot.png" } },
          highlightedWords: ["customer", "scalability", "ease of use"],
        },
        {
          quote:
            "The platform has exceeded our expectations in every way. The ability to tailor it to our needs has been a huge advantage. Our team has been able to collaborate more effectively, and the results have been transformative for our organization.",
          authorName: "Michael Chen",
          authorPhoto: { asset: { url: "/professional-man-headshot.png" } },
          highlightedWords: ["tailor", "collaborate", "transformative"],
        },
      ],
    },
    teamSection: {
      headline: "Passionate innovators behind our success",
      teamMembers: [
        {
          name: "Jerome Bell",
          role: "Chief Officer",
          photo: { asset: { url: "/professional-man-portrait.png" } },
        },
        {
          name: "Dianne Russell",
          role: "Marketing Director",
          photo: { asset: { url: "/professional-woman-portrait.png" } },
        },
        {
          name: "Bessie Cooper",
          role: "Success Manager",
          photo: { asset: { url: "/professional-person-portrait.png" } },
        },
      ],
    },
  }

  const pageData = data || defaultData

  // Auto-advance testimonials
  useEffect(() => {
    if (!pageData.testimonialsSection?.testimonials) return
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % pageData.testimonialsSection.testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [pageData.testimonialsSection])

  // Highlight words in testimonial
  const highlightWords = (text: string, words: string[]) => {
    if (!words || words.length === 0) return text

    let result = text
    words.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi")
      result = result.replace(
        regex,
        `<span class="bg-gradient-to-r from-[#019EF3] via-[#EF06C8] to-[#019EF3] bg-clip-text text-transparent font-bold">${word}</span>`,
      )
    })
    return result
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-lato">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0056B8]/20 via-transparent to-[#EF06C8]/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0056B8]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EF06C8]/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold leading-tight">
                {pageData.heroSection.headline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="inline-block mr-3"
                  >
                    {word === "smart" || word === "technology" ? (
                      <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
              >
                {pageData.heroSection.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  href={pageData.heroSection.ctaLink}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#0056B8] to-[#019EF3] rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-[#0056B8]/50 transition-all duration-300 hover:scale-105"
                >
                  {pageData.heroSection.ctaText}
                </Link>
              </motion.div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                {pageData.heroSection.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    className="space-y-1"
                  >
                    <div
                      className={`text-4xl md:text-5xl font-montserrat font-bold ${
                        stat.color === "cyan"
                          ? "text-[#019EF3]"
                          : stat.color === "magenta"
                            ? "text-[#EF06C8]"
                            : "text-[#0056B8]"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image Collage */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[600px]"
            >
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-4 h-full">
                {pageData.heroSection.heroImages.slice(0, 3).map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                    className={`relative rounded-2xl overflow-hidden border-2 border-[#019EF3]/30 shadow-lg shadow-[#0056B8]/20 hover:scale-105 transition-transform duration-300 ${
                      index === 0
                        ? "col-span-1 row-span-1"
                        : index === 1
                          ? "col-span-1 row-span-2"
                          : "col-span-1 row-span-1"
                    }`}
                  >
                    <Image
                      src={img.asset.url || "/placeholder.svg"}
                      alt={`Hero image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0056B8]/40 to-transparent" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Logos Scrolling Banner */}
      {pageData.partnerLogos && pageData.partnerLogos.length > 0 && (
        <section className="py-16 border-y border-gray-800 overflow-hidden">
          <div className="flex gap-16 animate-scroll">
            {[...pageData.partnerLogos, ...pageData.partnerLogos].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
              >
                <Image
                  src={partner.logo.asset.url || "/placeholder.svg"}
                  alt={partner.companyName}
                  width={160}
                  height={60}
                  className="h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mission Section */}
      {pageData.missionSection && (
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0056B8]/5 to-transparent" />

          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <p className="text-[#019EF3] font-semibold mb-4">{pageData.missionSection.tagline}</p>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#EF06C8]" />
                <div className="flex gap-2">
                  {pageData.partnerLogos?.slice(0, 5).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#019EF3]/50" />
                  ))}
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#EF06C8]" />
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-montserrat font-bold leading-tight">
                  {pageData.missionSection.headline.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-3">
                      {word === "impact" || word === "innovative" ? (
                        <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent">
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  ))}
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">{pageData.missionSection.description}</p>

                <ul className="space-y-3">
                  {pageData.missionSection.bulletPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#0056B8] to-[#019EF3] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="pt-4"
                >
                  <Link
                    href={pageData.missionSection.ctaLink}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#0056B8] to-[#019EF3] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#0056B8]/50 transition-all duration-300 hover:scale-105"
                  >
                    {pageData.missionSection.ctaText}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] rounded-2xl overflow-hidden border-2 border-[#019EF3]/30 shadow-2xl shadow-[#0056B8]/20"
              >
                <Image
                  src={pageData.missionSection.image.asset.url || "/placeholder.svg"}
                  alt="Mission"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0056B8]/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {pageData.valuesSection && (
        <section className="py-32 px-4 bg-gradient-to-b from-transparent via-[#0A0A0A] to-transparent">
          <div className="container mx-auto max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-20"
            >
              {pageData.valuesSection.headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {word === "delivering" || word === "value" ? (
                    <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.valuesSection.values.map((value, index) => {
                const IconComponent = iconMap[value.icon] || Lightbulb
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 hover:border-[#019EF3]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#0056B8]/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0056B8]/0 to-[#EF06C8]/0 group-hover:from-[#0056B8]/10 group-hover:to-[#EF06C8]/10 rounded-2xl transition-all duration-300" />

                    <div className="relative z-10 space-y-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0056B8] to-[#019EF3] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={28} weight="duotone" className="text-white" />
                      </div>

                      <h3 className="text-2xl font-montserrat font-semibold">{value.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {pageData.testimonialsSection && pageData.testimonialsSection.testimonials.length > 0 && (
        <section className="py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0056B8]/5 via-transparent to-[#EF06C8]/5" />

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-20"
            >
              {pageData.testimonialsSection.headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {word === "businesses" || word === "users" ? (
                    <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </motion.h2>

            <div className="relative">
              {pageData.testimonialsSection.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentTestimonial === index ? 1 : 0,
                    scale: currentTestimonial === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`${currentTestimonial === index ? "relative" : "absolute inset-0 pointer-events-none"}`}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-[#019EF3]/30 shadow-2xl shadow-[#0056B8]/20">
                    {/* Author Photo */}
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#019EF3]">
                        <Image
                          src={testimonial.authorPhoto.asset.url || "/placeholder.svg"}
                          alt={testimonial.authorName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="flex-1 space-y-4">
                      <div className="text-6xl text-[#019EF3] font-serif leading-none">"</div>
                      <p
                        className="text-xl md:text-2xl leading-relaxed text-gray-200"
                        dangerouslySetInnerHTML={{
                          __html: highlightWords(testimonial.quote, testimonial.highlightedWords || []),
                        }}
                      />
                      <div className="pt-4">
                        <p className="font-montserrat font-semibold text-lg">{testimonial.authorName}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Dots Navigation */}
              {pageData.testimonialsSection.testimonials.length > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  {pageData.testimonialsSection.testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentTestimonial === index ? "w-8 bg-[#019EF3]" : "w-2 bg-gray-600 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {pageData.teamSection && pageData.teamSection.teamMembers.length > 0 && (
        <section className="py-32 px-4 bg-gradient-to-b from-transparent to-[#0A0A0A]">
          <div className="container mx-auto max-w-7xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-20"
            >
              {pageData.teamSection.headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {word === "innovators" || word === "success" ? (
                    <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.teamSection.teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-[#019EF3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0056B8]/30"
                >
                  <div className="relative h-[500px]">
                    <Image
                      src={member.photo.asset.url || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <h3 className="text-2xl font-montserrat font-bold">{member.name}</h3>
                    <p className="text-[#019EF3] font-semibold">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CSS for scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
