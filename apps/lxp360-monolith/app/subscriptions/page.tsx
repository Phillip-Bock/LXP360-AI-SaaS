"use client"
import { useState } from "react"
import { Check, Star, Sparkles, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { Users, Target, Buildings } from "@phosphor-icons/react"
import Link from "next/link"

interface PricingPlan {
  id: string
  name: string
  tagline: string
  description: string
  price: string
  priceDetail: string
  badge?: string
  features: string[]
  detailedFeatures: Array<{
    title: string
    items: string[]
  }>
  ctaText: string
  popular?: boolean
  enterprise?: boolean
}

export default function SubscriptionsPage() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>("pro")
  const [expandedFeatures, setExpandedFeatures] = useState<{ [key: string]: boolean }>({})

  const togglePlan = (planId: string) => {
    setExpandedPlan(expandedPlan === planId ? null : planId)
  }

  const toggleFeature = (key: string) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const pricingPlans: PricingPlan[] = [
    {
      id: "basic",
      name: "Micro Learning",
      tagline: "Perfect for self-paced learners",
      description: "Short, focused lessons designed for busy professionals who want to learn specific skills quickly.",
      price: "$49",
      priceDetail: "per course",
      features: [
        "Full course access with all lessons",
        "Certificate of completion",
        "Lifetime updates & new content",
        "Private community access",
        "Downloadable resources",
      ],
      detailedFeatures: [
        {
          title: "Course Content",
          items: [
            "50+ micro-courses across 3 categories",
            "5-15 minute bite-sized lessons",
            "Mobile-friendly learning",
            "Self-paced progression",
          ],
        },
        {
          title: "Support & Resources",
          items: [
            "Community forum access",
            "Email support (48h response)",
            "Downloadable worksheets",
            "Progress tracking dashboard",
          ],
        },
      ],
      ctaText: "Start Learning",
    },
    {
      id: "pro",
      name: "Programs",
      tagline: "Industry-level professional development",
      description: "Comprehensive learning programs with modules, scenario-based assessments, and expert mentorship.",
      price: "$299",
      priceDetail: "per program",
      badge: "MOST POPULAR",
      popular: true,
      features: [
        "Everything in Basic, plus:",
        "1-on-1 mentor sessions (5 hours)",
        "Code review & feedback",
        "Priority support (24h response)",
        "Exclusive workshops & webinars",
        "Career guidance & portfolio review",
      ],
      detailedFeatures: [
        {
          title: "Program Structure",
          items: [
            "Multi-course structured programs",
            "Comprehensive modules with lessons",
            "Scenario-based assessments",
            "Real-world project assignments",
            "Industry-recognized certification",
          ],
        },
        {
          title: "Mentorship & Support",
          items: [
            "5 hours of 1-on-1 mentoring",
            "Weekly group Q&A sessions",
            "Code & project reviews",
            "Priority support (24h response)",
            "Career coaching sessions",
          ],
        },
        {
          title: "Exclusive Benefits",
          items: [
            "Live workshops & masterclasses",
            "Industry expert webinars",
            "Networking opportunities",
            "Job placement assistance",
            "Alumni network access",
          ],
        },
      ],
      ctaText: "Enroll in Program",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Custom solutions for teams",
      description: "Tailored learning experiences for organizations looking to upskill their teams at scale.",
      price: "Custom",
      priceDetail: "contact for pricing",
      enterprise: true,
      features: [
        "Everything in Programs, plus:",
        "Custom course development",
        "Dedicated account manager",
        "Team analytics & reporting",
        "SSO & LMS integration",
        "Volume pricing discounts",
      ],
      detailedFeatures: [
        {
          title: "Enterprise Features",
          items: [
            "Custom branded learning portal",
            "Tailored curriculum design",
            "White-label options available",
            "API access for integrations",
            "Advanced analytics dashboard",
          ],
        },
        {
          title: "Team Management",
          items: [
            "Unlimited team members",
            "Team progress tracking",
            "Bulk enrollment tools",
            "Custom user roles & permissions",
            "Dedicated success manager",
          ],
        },
        {
          title: "Support & Services",
          items: [
            "24/7 priority support",
            "Onboarding & training",
            "Quarterly business reviews",
            "Custom SLA agreements",
            "On-site training options",
          ],
        },
      ],
      ctaText: "Schedule Consultation",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001D3D] via-[#0056B8]/20 to-[#001D3D] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-[#0056B8]/10 border border-[#019EF3]/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#019EF3]" />
            <span className="text-[#019EF3] text-sm font-semibold font-montserrat">FLEXIBLE LEARNING OPTIONS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#F5F5F5] mb-6 bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#7103A0] bg-clip-text text-transparent font-montserrat">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-[#F5F5F5]/80 max-w-3xl mx-auto leading-relaxed font-lato">
            From quick micro-lessons to comprehensive programs and enterprise solutions—find the perfect fit for your
            learning goals
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-gradient-to-br backdrop-blur-xl rounded-3xl p-8 border-2 transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? "from-[#7103A0]/40 to-[#0056B8]/40 border-[#7103A0]/50 shadow-2xl shadow-[#7103A0]/20 scale-105"
                  : plan.enterprise
                    ? "from-[#0056B8]/40 to-[#019EF3]/40 border-[#019EF3]/50 shadow-2xl shadow-[#019EF3]/20"
                    : "from-[#232323]/40 to-[#001D3D]/40 border-[#F5F5F5]/20 shadow-xl hover:border-[#0056B8]/50"
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#7103A0] to-[#019EF3] text-[#F5F5F5] px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 font-montserrat">
                    <Star className="w-4 h-4 fill-current" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-3xl font-black text-[#F5F5F5] mb-2 font-montserrat">{plan.name}</h3>
                <p className="text-[#019EF3] font-semibold mb-3 font-montserrat">{plan.tagline}</p>
                <p className="text-[#F5F5F5]/70 text-sm leading-relaxed font-lato">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#F5F5F5] font-montserrat">{plan.price}</span>
                  {!plan.enterprise && <span className="text-[#F5F5F5]/60 font-lato">USD</span>}
                </div>
                <p className="text-[#F5F5F5]/60 text-sm mt-1 font-lato">{plan.priceDetail}</p>
              </div>

              {/* Quick Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#3AD20C] mt-0.5 flex-shrink-0" />
                    <span
                      className={`text-[#F5F5F5]/90 font-lato ${feature.includes("Everything") ? "font-semibold text-[#F5F5F5]" : ""}`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Expandable Features */}
              <button
                onClick={() => togglePlan(plan.id)}
                className="w-full mb-6 flex items-center justify-between px-4 py-3 bg-[#F5F5F5]/5 hover:bg-[#F5F5F5]/10 rounded-xl transition-all duration-300 border border-[#F5F5F5]/10"
              >
                <span className="text-[#F5F5F5] font-semibold font-montserrat">View All Features</span>
                {expandedPlan === plan.id ? (
                  <ChevronUp className="w-5 h-5 text-[#F5F5F5]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#F5F5F5]" />
                )}
              </button>

              {expandedPlan === plan.id && (
                <div className="mb-8 space-y-4 animate-fadeIn">
                  {plan.detailedFeatures.map((section, secIdx) => (
                    <div key={secIdx}>
                      <button
                        onClick={() => toggleFeature(`${plan.id}-${secIdx}`)}
                        className="w-full flex items-center justify-between px-4 py-2 bg-[#F5F5F5]/5 hover:bg-[#F5F5F5]/10 rounded-lg transition-all"
                      >
                        <span className="text-[#F5F5F5] font-semibold text-sm font-montserrat">{section.title}</span>
                        {expandedFeatures[`${plan.id}-${secIdx}`] ? (
                          <ChevronUp className="w-4 h-4 text-[#F5F5F5]/60" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#F5F5F5]/60" />
                        )}
                      </button>
                      {expandedFeatures[`${plan.id}-${secIdx}`] && (
                        <div className="mt-2 pl-4 space-y-2 animate-fadeIn">
                          {section.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-start gap-2">
                              <Zap className="w-4 h-4 text-[#019EF3] mt-0.5 flex-shrink-0" />
                              <span className="text-[#F5F5F5]/70 text-sm font-lato">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {plan.enterprise ? (
                <Link
                  href="/contact"
                  className="block w-full bg-gradient-to-r from-[#019EF3] to-[#0056B8] text-[#F5F5F5] py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#019EF3]/50 transition-all duration-300 hover:scale-105 text-center font-montserrat border-[1.5px] border-[#7103A0]"
                >
                  {plan.ctaText}
                </Link>
              ) : (
                <button className="w-full bg-gradient-to-r from-[#0056B8] to-[#7103A0] text-[#F5F5F5] py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#0056B8]/50 transition-all duration-300 hover:scale-105 font-montserrat border-[1.5px] border-[#7103A0]">
                  {plan.ctaText}
                </button>
              )}

              {plan.enterprise && (
                <p className="text-center text-[#F5F5F5]/60 text-sm mt-4 font-lato">
                  Schedule a free consultation with our learning experts
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Course Categories Preview */}
        <div className="bg-gradient-to-br from-[#232323]/60 to-[#001D3D]/60 backdrop-blur-xl rounded-3xl p-12 border border-[#F5F5F5]/20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-[#F5F5F5] mb-4 font-montserrat">Explore Our Course Categories</h2>
            <p className="text-[#F5F5F5]/80 text-lg font-lato">
              Choose from three specialized learning paths designed for professional growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Team Development",
                description: "Build high-performing teams with collaborative learning",
                icon: Users,
                courses: "50+ Courses",
                color: "from-[#0056B8] to-[#019EF3]",
                href: "/team-development", // Added link to team development page
              },
              {
                name: "Personal Mastery",
                description: "Develop leadership skills and personal effectiveness",
                icon: Target,
                courses: "50+ Courses",
                color: "from-[#7103A0] to-[#019EF3]",
                href: "/personal-mastery", // Added link to personal mastery page
              },
              {
                name: "Corporate Training",
                description: "Industry-specific skills for professional excellence",
                icon: Buildings,
                courses: "50+ Courses",
                color: "from-[#019EF3] to-[#0056B8]",
                href: "/corporate-training", // Added link to corporate training page
              },
            ].map((category, idx) => (
              <Link key={idx} href={category.href}>
                <div className="bg-gradient-to-br from-[#232323]/50 to-[#001D3D]/50 rounded-2xl p-8 border border-[#F5F5F5]/20 hover:border-[#0056B8]/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-8 h-8 text-[#F5F5F5]" weight="duotone" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F5F5] mb-3 font-montserrat">{category.name}</h3>
                  <p className="text-[#F5F5F5]/70 mb-4 font-lato">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#019EF3] font-semibold font-montserrat">{category.courses}</span>
                    <span className="text-[#F5F5F5]/50 group-hover:text-[#019EF3] transition-colors font-lato">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#3AD20C]/10 border border-[#3AD20C]/30 rounded-full px-8 py-4">
            <Check className="w-6 h-6 text-[#3AD20C]" />
            <span className="text-[#3AD20C] font-semibold font-montserrat">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
