"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { ArrowRight, Play, Sparkles, Layers, BarChart3 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ContactFormPopup } from "@/components/contact-form-popup"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { DevRoleSelector } from "@/components/dev/role-selector"
import { urlFor } from "@/lib/sanity/image"

interface HomePageProps {
  data: any
}

export function HomePage({ data }: HomePageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") // Added missing password state variable for sign-in form
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const [signupError, setSignupError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSignupLoading, setIsSignupLoading] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const router = useRouter()

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const featuresRef = useRef<HTMLDivElement>(null)
  const screenshotsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [showDemoVideo, setShowDemoVideo] = useState(false)

  const [activeCompany, setActiveCompany] = useState<"lxd" | "lxp">("lxd")
  const [activeStatement, setActiveStatement] = useState(0)
  const scrollSectionRef = useRef<HTMLDivElement>(null)

  const heroTitle = data?.heroTitle || "Engineering the Future of Learning"
  const heroSubtitle = data?.heroSubtitle || "Transform workforce development with AI-powered learning experiences"
  const heroCtaText = data?.heroCtaText || "Get Started"
  const clientLogosTitle = data?.clientLogosTitle || "Strategic Partners"
  const featuresTitle = data?.featuresTitle || "Powerful Features for Modern Learning"
  const platformTitle = data?.platformTitle || "See LXP360 in Action"
  const testimonialsTitle = data?.testimonialsTitle || "What Our Clients Say"

  // Static fallback features
  const features = data?.features || [
    {
      title: "AI-Powered Content Creation",
      description: "Generate engaging learning content in minutes with our advanced AI engine",
      icon: "Sparkle",
    },
    {
      title: "Unified Learning Ecosystem",
      description: "All your learning tools in one place - authoring, delivery, and analytics",
      icon: "Stack",
    },
    {
      title: "Real-Time Analytics",
      description: "Track learner progress and measure training effectiveness with powerful insights",
      icon: "ChartLine",
    },
  ]

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: password,
      })

      if (signInError) {
        setError(signInError.message)
        setIsLoading(false)
        return
      }

      if (!authData?.session) {
        setError("Sign in failed. Please try again.")
        setIsLoading(false)
        return
      }

      setShowSignIn(false)
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")
    setIsSignupLoading(true)

    try {
      const supabase = createClient()
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
          },
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) {
        setSignupError(signUpError.message)
        setIsSignupLoading(false)
        return
      }

      if (authData?.user && !authData.session) {
        setSignupError("Success! Please check your email to confirm your account.")
        setIsSignupLoading(false)
        return
      }

      setShowSignUp(false)
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsSignupLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-flip-down")
          }
        })
      },
      { threshold: 0.8 }, // Only trigger when 80% of card is visible
    )

    // Observe each individual feature card
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll(".feature-card")
      cards.forEach((card) => observer.observe(card))
    }

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".fade-in-item")
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-fade-in-up")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (screenshotsRef.current) {
      fadeObserver.observe(screenshotsRef.current)
    }

    if (aboutRef.current) {
      fadeObserver.observe(aboutRef.current)
    }

    return () => {
      observer.disconnect()
      fadeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            const company = entry.target.getAttribute("data-company") as "lxd" | "lxp"

            setActiveStatement(index)
            setActiveCompany(company)
          }
        })
      },
      {
        threshold: 0.6,
        rootMargin: "-20% 0px -20% 0px",
      },
    )

    if (scrollSectionRef.current) {
      const statements = scrollSectionRef.current.querySelectorAll(".statement-item")
      statements.forEach((statement) => observer.observe(statement))
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!data?.testimonials || data.testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % data.testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [data?.testimonials])

  const nextTestimonial = () => {
    if (!data?.testimonials || data.testimonials.length === 0) return
    setCurrentTestimonial((prev) => (prev + 1) % data.testimonials.length)
  }

  const prevTestimonial = () => {
    if (!data?.testimonials || data.testimonials.length === 0) return
    setCurrentTestimonial((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length)
  }

  // Get icon component from Lucide
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'Sparkle': Sparkles,
      'Stack': Layers,
      'ChartLine': BarChart3,
    }
    return iconMap[iconName] || Sparkles
  }

  const isVideoFile = (asset: any) => {
    if (!asset) return false
    // Check _ref for file type
    if (asset._ref) {
      return asset._ref.startsWith("file-")
    }
    // Check _type for file type
    if (asset._type === "file") return true
    return false
  }

  const getFileUrl = (asset: any) => {
    // Handle nested asset reference structure: { asset: { _ref: "..." } }
    const ref = asset?.asset?._ref || asset?._ref
    if (!ref) {
      console.log("[v0] No file reference found in:", asset)
      return null
    }
    const match = ref.match(/^file-([a-f0-9]+)-(\w+)$/)
    if (!match) {
      console.log("[v0] File reference doesn't match pattern:", ref)
      return null
    }
    const [, id, extension] = match
    const url = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uhgji0b7"}/production/${id}.${extension}`
    console.log("[v0] Generated file URL:", url)
    return url
  }

  const getImageUrl = (asset: any, width?: number, height?: number): string | null => {
    if (!asset || isVideoFile(asset)) return null
    try {
      let builder = urlFor(asset)
      if (width) builder = builder.width(width)
      if (height) builder = builder.height(height)
      const url = builder.url()
      // Return null if URL is empty or invalid
      return url && url.trim() !== "" ? url : null
    } catch (error) {
      console.error("[v0] Error generating image URL:", error, asset)
      return null
    }
  }

  useEffect(() => {
    console.log("[v0] Hero background data:", data?.heroBackground)
    console.log("[v0] Is video file:", isVideoFile(data?.heroBackground))
    console.log("[v0] Video URL:", getFileUrl(data?.heroBackground))
  }, [data?.heroBackground])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <PublicHeader
        onSignInClick={() => setShowSignIn(true)}
        onSignUpClick={() => setShowSignUp(true)}
        onContactClick={() => setShowContact(true)}
      />

      <div className="pt-[73px]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001D3D] via-[#003066] to-[#001D3D] z-0" />

          {/* Glowing orbs - behind video with negative z-index */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-400 rounded-full filter blur-[150px] opacity-5 animate-pulse" />
            <div
              className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-400 rounded-full filter blur-[120px] opacity-5 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
            <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60" />
            <div
              className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-float opacity-70"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Content - highest z-index */}
          <div className="container mx-auto relative z-20">
            <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent font-lato animate-gradient-x drop-shadow-2xl">
                {heroTitle}
              </h1>

              <p
                className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto font-montserrat animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                {heroSubtitle}
              </p>

              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Button size="lg" className="btn-primary btn-lg min-h-[44px]" onClick={() => setShowSignUp(true)}>
                  {heroCtaText}
                  <ArrowRight className="ml-2 w-5 h-5" weight="bold" />
                </Button>
                <Button size="lg" className="btn-secondary btn-lg min-h-[44px]" onClick={() => setShowDemoVideo(true)}>
                  <Play className="mr-2 w-5 h-5" weight="fill" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          className="py-24 bg-gradient-to-b from-[#0A0A0F] to-[#001D3D] relative overflow-hidden"
        >
          <div className="absolute inset-0 tech-grid opacity-5" />
          <div className="glow-orb glow-orb-magenta w-96 h-96 top-20 right-10" style={{ animationDelay: "1s" }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-lato">{featuresTitle}</h2>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {features.map((feature: any, index: number) => {
                const IconComponent = getIcon(feature.icon)

                return (
                  <div key={index} className="feature-card opacity-0 group">
                    <div className="py-6 px-12 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-2 border-[#0056B8] hover:border-[#019EF3] shadow-[0_15px_40px_-10px_rgba(0,86,184,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(1,158,243,0.8)] transition-all duration-500 hover:-translate-y-2">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Icon section */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#7103A0] to-[#C705A7] flex items-center justify-center shadow-lg shadow-[#7103A0]/30">
                            <IconComponent className="w-10 h-10 text-white" weight="duotone" />
                          </div>
                        </div>

                        {/* Content section */}
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-3xl font-bold text-white mb-3 font-lato group-hover:text-[#019EF3] transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-white/70 text-lg leading-relaxed font-montserrat">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0056B8] to-transparent opacity-50" />
        </section>

        {/* Company Showcase Section - LXD360 & LXP360 */}
        <section className="py-32 bg-gradient-to-b from-[#0A0A0F] via-[#001D3D] to-[#0A0A0F] relative overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-5" />
          <div className="glow-orb glow-orb-cyan w-96 h-96 top-1/4 left-1/4 animate-pulse" />
          <div
            className="glow-orb glow-orb-magenta w-96 h-96 bottom-1/4 right-1/4 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-lato bg-gradient-to-r from-cyan-300 via-blue-300 to-magenta-300 bg-clip-text text-transparent animate-gradient-x">
                Training the Future for the Future
              </h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-montserrat">
                Discover how LXD360 and LXP360 are revolutionizing corporate learning through innovation and technology.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* LXD360 Card */}
              <div className="group relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500 via-blue-500/20 to-cyan-500 rounded-3xl blur-3xl group-hover:blur-[100px] transition-all duration-1000 animate-pulse" />
                <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-3xl border-4 border-cyan-500/50 shadow-[0_0_80px_-20px_rgba(1,158,243,0.8)] hover:shadow-[0_0_120px_-20px_rgba(1,158,243,1)] transition-all duration-700 p-8 hover:-translate-y-4">
                  <div className="mb-8">
                    <Image
                      src="/lxd360-logo.png"
                      alt="LXD360 Logo"
                      width={400}
                      height={200}
                      className="w-full h-auto drop-shadow-[0_0_40px_rgba(1,158,243,0.6)]"
                    />
                  </div>
                  <div className="space-y-6 text-white">
                    <p className="text-xl leading-relaxed font-montserrat">
                      LXD360 LLC is a corporate learning technology consulting firm that transforms how organizations
                      develop and deliver employee training.
                    </p>
                    <p className="text-lg leading-relaxed font-montserrat text-white/80">
                      Combining neuroscience-based instructional design, AI integration, and immersive learning
                      technologies to serve enterprise clients across highly regulated industries.
                    </p>
                  </div>
                </div>
              </div>

              {/* LXP360 Card */}
              <div className="group relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-magenta-500 via-blue-500/20 to-magenta-500 rounded-3xl blur-3xl group-hover:blur-[100px] transition-all duration-1000 animate-pulse" />
                <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-2xl rounded-3xl border-4 border-magenta-500/50 shadow-[0_0_80px_-20px_rgba(239,6,200,0.8)] hover:shadow-[0_0_120px_-20px_rgba(239,6,200,1)] transition-all duration-700 p-8 hover:-translate-y-4">
                  <div className="mb-8">
                    <Image
                      src="/lxp360-logo.png"
                      alt="LXP360 Logo"
                      width={400}
                      height={200}
                      className="w-full h-auto drop-shadow-[0_0_40px_rgba(239,6,200,0.6)]"
                    />
                  </div>
                  <div className="space-y-6 text-white">
                    <p className="text-xl leading-relaxed font-montserrat">
                      LXP360 is LXD360's proprietary unified learning ecosystem that solves the costly inefficiency of
                      managing multiple disconnected learning tools.
                    </p>
                    <p className="text-lg leading-relaxed font-montserrat text-white/80">
                      Integrating content authoring, learner experience delivery, analytics, and AI-powered content
                      generation into a single cohesive system with subscription-based pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EF06C8] to-transparent opacity-50" />
        </section>

        {/* CTA Section */}
        <section className="relative h-[300px] bg-gradient-to-r from-[#001D3D] via-[#003066] to-[#001D3D] overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-10" />
          <div className="glow-orb glow-orb-cyan w-96 h-96 top-1/2 left-1/4 -translate-y-1/2" />
          <div className="glow-orb glow-orb-magenta w-96 h-96 top-1/2 right-1/4 -translate-y-1/2" />

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-lato text-balance">
                The future is already here, don't get left in the past!
              </h2>

              <Button
                size="lg"
                className="bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#EF06C8] hover:from-[#003066] hover:via-[#0056B8] hover:to-[#019EF3] text-white font-semibold px-12 py-8 text-xl min-h-[60px] rounded-lg shadow-2xl shadow-[#EF06C8]/50 hover:shadow-[#EF06C8]/80 hover:scale-110 transition-all duration-500 whitespace-nowrap"
                onClick={() => setShowContact(true)}
              >
                Schedule Your Demo Now!
                <ArrowRight className="ml-3 w-6 h-6" weight="bold" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <PublicFooter />
      </div>

      <Dialog open={showDemoVideo} onOpenChange={setShowDemoVideo}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#232323]">Platform Demo</DialogTitle>
            <DialogDescription>See LXP360 in action</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
            <p className="text-white/70">Demo video player coming soon</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign In Dialog */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#232323]">Welcome Back</DialogTitle>
            <DialogDescription>Sign in to access your learning dashboard</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignIn} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="min-h-[44px]"
                name="email"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                value={password} // Fixed to use password state instead of email
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="min-h-[44px]"
                name="password"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-[#0056B8] hover:bg-[#0056B8]/90 text-white min-h-[44px]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignIn(false)
                  setShowSignUp(true)
                }}
                className="text-[#0056B8] hover:underline underline"
              >
                Sign up
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUp} onOpenChange={setShowSignUp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#232323]">Create Account</DialogTitle>
            <DialogDescription>Start your learning journey today</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="signup-firstname">First Name</Label>
                <Input
                  id="signup-firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isSignupLoading}
                  className="min-h-[44px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-lastname">Last Name</Label>
                <Input
                  id="signup-lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isSignupLoading}
                  className="min-h-[44px]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="name@email.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                disabled={isSignupLoading}
                className="min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                disabled={isSignupLoading}
                minLength={8}
                className="min-h-[44px]"
              />
            </div>
            {signupError && <p className="text-sm text-destructive">{signupError}</p>}
            <Button
              type="submit"
              className="w-full bg-[#0056B8] hover:bg-[#0056B8]/90 text-white min-h-[44px]"
              disabled={isSignupLoading}
            >
              {isSignupLoading ? "Creating account..." : "Create Account"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignUp(false)
                  setShowSignIn(true)
                }}
                className="text-[#0056B8] hover:underline underline"
              >
                Sign in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      <ContactFormPopup open={showContact} onOpenChange={setShowContact} />

      {/* Dev Role Selector - only shows in development mode */}
      <DevRoleSelector />
    </div>
  )
}
