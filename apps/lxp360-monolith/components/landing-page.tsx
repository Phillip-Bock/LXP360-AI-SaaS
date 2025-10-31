"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Users, Medal, CheckCircle, Target, Sparkle, Briefcase, Books } from "@phosphor-icons/react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ScrollHeader } from "@/components/scroll-header"

export function LandingPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    console.log("[v0] Starting sign in process")

    try {
      let supabase
      try {
        supabase = createClient()
      } catch (clientError) {
        console.error("[v0] Failed to create Supabase client:", clientError)
        setError("Unable to connect to authentication service. Please check your Supabase configuration.")
        setIsLoading(false)
        return
      }

      console.log("[v0] Supabase client created, attempting sign in")

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Sign in response:", {
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        errorName: signInError?.name,
        errorMessage: signInError?.message,
        errorStatus: signInError?.status,
      })

      if (signInError) {
        console.log("[v0] Sign in error details:", signInError)

        if (signInError.message.includes("Email not confirmed")) {
          setError("Please confirm your email address before signing in. Check your inbox for the confirmation link.")
        } else if (signInError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again or sign up if you don't have an account.")
        } else {
          setError(signInError.message)
        }
        setIsLoading(false)
        return
      }

      if (!data?.session) {
        console.log("[v0] No session returned after sign in")
        setError("Sign in failed. Please check your credentials and try again.")
        setIsLoading(false)
        return
      }

      console.log("[v0] Attempting to initialize database...")
      try {
        const setupResponse = await fetch("/api/setup-database", { method: "POST" })
        const setupData = await setupResponse.json()
        console.log("[v0] Database setup result:", setupData)
      } catch (setupError) {
        console.log("[v0] Database setup failed (non-critical):", setupError)
        // Continue anyway - the app will work without RBAC tables
      }

      console.log("[v0] Sign in successful, redirecting to dashboard")
      setShowSignIn(false)
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      console.error("[v0] Sign in exception:", err)
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please check the browser console for details.",
      )
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError("")
    setIsSignupLoading(true)

    console.log("[v0] Starting sign up process")

    try {
      let supabase
      try {
        supabase = createClient()
      } catch (clientError) {
        console.error("[v0] Failed to create Supabase client:", clientError)
        setSignupError("Unable to connect to authentication service. Please check your Supabase configuration.")
        setIsSignupLoading(false)
        return
      }

      console.log("[v0] Supabase client created, attempting sign up")

      const { data, error: signUpError } = await supabase.auth.signUp({
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

      console.log("[v0] Sign up response:", {
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        errorName: signUpError?.name,
        errorMessage: signUpError?.message,
      })

      if (signUpError) {
        console.log("[v0] Sign up error details:", signUpError)

        if (signUpError.message.includes("already registered")) {
          setSignupError("This email is already registered. Please sign in instead.")
        } else if (signUpError.message.includes("Password")) {
          setSignupError("Password must be at least 8 characters long.")
        } else {
          setSignupError(signUpError.message)
        }
        setIsSignupLoading(false)
        return
      }

      if (data?.user && !data.session) {
        console.log("[v0] Email confirmation required")
        setSignupError("Success! Please check your email to confirm your account before signing in.")
        setIsSignupLoading(false)
        // Clear form
        setSignupEmail("")
        setSignupPassword("")
        setFirstName("")
        setLastName("")
        return
      }

      console.log("[v0] Attempting to initialize database...")
      try {
        const setupResponse = await fetch("/api/setup-database", { method: "POST" })
        const setupData = await setupResponse.json()
        console.log("[v0] Database setup result:", setupData)
      } catch (setupError) {
        console.log("[v0] Database setup failed (non-critical):", setupError)
        // Continue anyway
      }

      console.log("[v0] Sign up successful, redirecting to dashboard")
      setShowSignUp(false)
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      console.error("[v0] Sign up exception:", err)
      setSignupError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please check the browser console for details.",
      )
      setIsSignupLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* REPLACED STATIC HEADER WITH SCROLL-AWARE HEADER */}
      <ScrollHeader onSignInClick={() => setShowSignIn(true)} onSignUpClick={() => setShowSignUp(true)} />

      {/* ADDED PADDING-TOP TO ACCOUNT FOR FIXED HEADER */}
      <div className="pt-[73px]">
        <section className="relative bg-gradient-to-br from-[#001d3d] via-[#003066] to-[#00438f] text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Sparkle className="w-4 h-4 text-[#479dff]" weight="duotone" />
                <span className="text-sm font-medium">Start your 14-day free trial today</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Engineering the Future of Learning
              </h1>

              <p className="text-lg md:text-xl text-blue-100 leading-relaxed text-pretty max-w-2xl mx-auto">
                Leverage our comprehensive, science-backed framework to design and deploy learning experiences that
                deliver measurable results.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-[#003066] hover:bg-blue-50 font-semibold px-8 py-6 text-lg"
                  onClick={() => setShowSignUp(true)}
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 pt-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#479dff]" weight="duotone" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#479dff]" weight="duotone" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#479dff]" weight="duotone" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#f8fafc] border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0072f5]">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0072f5]">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Courses Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0072f5]">95%</div>
                <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0072f5]">24/7</div>
                <div className="text-sm text-muted-foreground mt-1">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="programs"
          className="py-20 bg-gradient-to-b from-white via-[#f8fafc] to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0072f5]/10 backdrop-blur-sm border border-[#0072f5]/20 mb-4">
                <Sparkle className="w-4 h-4 text-[#0072f5]" weight="duotone" />
                <span className="text-sm font-medium text-[#003066]">Complete Learning Ecosystem</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#001d3d] text-balance">
                Solutions That Drive Performance
              </h2>
              <p className="text-lg md:text-xl text-[#003066] leading-relaxed text-pretty">
                Create Hollywood-quality training in hours, not months. Deploy across your entire organization. Measure
                real business impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Service 1: LXP360 Platform */}
              <Card className="group border-[#0072f5]/20 hover:border-[#0072f5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-7 h-7 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                    LXP360 All-In-One Platform
                  </CardTitle>
                  <CardDescription className="text-[#003066] leading-relaxed">
                    Your complete learning technology stack in a single platform. AI-powered content creation, adaptive
                    learning paths, predictive analytics, and enterprise-grade infrastructure—all without the complexity
                    and cost of managing multiple vendors.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Deploy in 30 days with guaranteed 99.9% uptime</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>AI-powered content creation & adaptive paths</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Enterprise-grade infrastructure included</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                    Explore Platform
                  </Button>
                </CardContent>
              </Card>

              {/* Service 2: Custom Content */}
              <Card className="group border-[#0072f5]/20 hover:border-[#0072f5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Sparkle className="w-7 h-7 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                    Cinematic Custom Content Development
                  </CardTitle>
                  <CardDescription className="text-[#003066] leading-relaxed">
                    Hollywood production quality meets instructional science. Our in-house creative team transforms your
                    complex training challenges into immersive, story-driven experiences using 3D animation,
                    professional cinematography, and interactive simulations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>No more glorified PowerPoint presentations</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>3D animation & professional cinematography</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Training learners actually want to complete</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                    View Portfolio
                  </Button>
                </CardContent>
              </Card>

              {/* Service 3: Managed Infrastructure */}
              <Card className="group border-[#0072f5]/20 hover:border-[#0072f5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-7 h-7 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                    Managed Learning Infrastructure
                  </CardTitle>
                  <CardDescription className="text-[#003066] leading-relaxed">
                    Enterprise-grade platform hosting without the enterprise headaches. We handle everything—hosting,
                    security, integrations, updates, and optimization—while you focus on creating impact.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Seamless SSO & HRIS connectivity</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Dedicated success management included</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Focus on impact, not infrastructure</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Service 4: Content Library */}
              <Card className="group border-[#0072f5]/20 hover:border-[#0072f5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Books className="w-7 h-7 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                    Industry-Validated Content Library
                  </CardTitle>
                  <CardDescription className="text-[#003066] leading-relaxed">
                    Deploy professional training in 48 hours, not 48 weeks. Access 100+ courses spanning compliance,
                    leadership, and technical skills—all continuously updated for regulatory changes and industry best
                    practices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>White-label with your branding instantly</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Customize with your policies in minutes</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Continuously updated for compliance</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                    Browse Library
                  </Button>
                </CardContent>
              </Card>

              {/* Service 5: Strategic Architecture */}
              <Card className="group border-[#0072f5]/20 hover:border-[#0072f5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-7 h-7 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                    Strategic Learning Architecture
                  </CardTitle>
                  <CardDescription className="text-[#003066] leading-relaxed">
                    Transform learning from cost center to competitive advantage. Our executive consultants design
                    learning ecosystems that align directly to business strategy, optimize your technology investments,
                    and deliver measurable ROI.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Vendor-neutral guidance from practitioners</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Built learning functions at scale</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Measurable ROI & business alignment</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>

              {/* Service 6: Workforce Programs */}
              <Card className="group border-[#0072f5]/20 hover:border-[#0072f5] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-white" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                    Future-Ready Workforce Programs
                  </CardTitle>
                  <CardDescription className="text-[#003066] leading-relaxed">
                    Close critical skill gaps before they impact performance. Our adaptive upskilling and leadership
                    development programs combine AI-driven personalization with immersive scenario training to prepare
                    your workforce for digital transformation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Built-in compliance & performance support</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>Documented impact on retention</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-[#003066]">
                      <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                      <span>AI-driven personalization at scale</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                    Explore Programs
                  </Button>
                </CardContent>
              </Card>

              {/* Service 7: Immersive Technology - Full Width Highlight */}
              <Card className="group md:col-span-2 lg:col-span-3 border-[#0072f5]/30 hover:border-[#0072f5] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#0072f5]/5 to-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0072f5] to-[#00438f] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Medal className="w-8 h-8 text-white" weight="duotone" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <CardTitle className="text-2xl text-[#001d3d] group-hover:text-[#0072f5] transition-colors">
                        Immersive Technology Solutions
                      </CardTitle>
                      <CardDescription className="text-base text-[#003066] leading-relaxed max-w-4xl">
                        Train for high-stakes situations without the risk. Our VR simulations and AR performance support
                        deliver four times faster skill acquisition with 75% better retention than traditional methods.
                        From safety training to customer service scenarios, we guide you from proof-of-concept through
                        enterprise deployment with guaranteed business impact.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm text-[#003066]">
                        <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                        <span>4x faster skill acquisition</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-[#003066]">
                        <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                        <span>75% better retention rates</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm text-[#003066]">
                        <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                        <span>VR simulations & AR support</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm text-[#003066]">
                        <CheckCircle className="w-5 h-5 text-[#0072f5] mt-0.5 flex-shrink-0" weight="duotone" />
                        <span>Proof-of-concept to enterprise</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white group-hover:shadow-lg transition-all">
                        Experience VR Demo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-[#003066] mb-6 text-lg">
                Ready to transform your learning from cost center to competitive advantage?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-[#0072f5] hover:bg-[#0056b8] text-white font-semibold px-8"
                  onClick={() => setShowSignUp(true)}
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0072f5] text-[#0072f5] hover:bg-[#0072f5]/10 font-semibold px-8 bg-transparent"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gradient-to-br from-[#f8fafc] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#001d3d]">About LXP360</h2>
                  <p className="text-lg text-[#003066] leading-relaxed">
                    We are a team of learning scientists, instructional designers, and technology experts dedicated to
                    transforming how organizations approach training and development.
                  </p>
                  <p className="text-[#003066] leading-relaxed">
                    Founded in 2020, LXP360 has grown to serve over 500 organizations worldwide, helping them create
                    engaging learning experiences that drive real business results. Our platform combines cutting-edge
                    technology with proven learning science to deliver measurable outcomes.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div>
                      <div className="text-3xl font-bold text-[#0072f5]">500+</div>
                      <div className="text-sm text-muted-foreground">Organizations</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#0072f5]">50+</div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#0072f5]">10M+</div>
                      <div className="text-sm text-muted-foreground">Learning Hours</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#0072f5]">4.8/5</div>
                      <div className="text-sm text-muted-foreground">User Rating</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#0072f5] to-[#00438f] p-8 flex items-center justify-center">
                    <div className="text-center text-white space-y-4">
                      <Users className="w-20 h-20 mx-auto opacity-80" weight="duotone" />
                      <h3 className="text-2xl font-bold">Our Mission</h3>
                      <p className="text-blue-100">
                        To make world-class learning experiences accessible to every organization, empowering people to
                        reach their full potential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#001d3d] mb-4">Why Choose LXP360?</h2>
              <p className="text-lg text-[#003066] leading-relaxed">
                Everything you need to create, deliver, and measure effective learning experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0072f5]/10 flex items-center justify-center mx-auto">
                  <Sparkle className="w-8 h-8 text-[#0072f5]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold text-[#001d3d]">AI-Powered</h3>
                <p className="text-sm text-[#003066]">
                  Intelligent recommendations and adaptive learning paths personalized for each learner
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0072f5]/10 flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-[#0072f5]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold text-[#001d3d]">Results-Driven</h3>
                <p className="text-sm text-[#003066]">
                  Track ROI and measure the real impact of your learning programs on business outcomes
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0072f5]/10 flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-[#0072f5]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold text-[#001d3d]">Collaborative</h3>
                <p className="text-sm text-[#003066]">
                  Foster peer-to-peer learning with social features, discussions, and group activities
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0072f5]/10 flex items-center justify-center mx-auto">
                  <Medal className="w-8 h-8 text-[#0072f5]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold text-[#001d3d]">Enterprise-Ready</h3>
                <p className="text-sm text-[#003066]">
                  Scalable infrastructure with enterprise-grade security and compliance certifications
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-[#001d3d] via-[#003066] to-[#00438f] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Learning?</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Start your 14-day free trial today. No credit card required. Cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#003066] hover:bg-blue-50 font-semibold px-8 py-6 text-lg"
                  onClick={() => setShowSignUp(true)}
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg bg-transparent"
                >
                  Schedule a Demo
                </Button>
              </div>
              <div className="flex items-center justify-center gap-8 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#479dff]" weight="duotone" />
                  <span>Full access to all features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#479dff]" weight="duotone" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#001d3d] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <Image
                  src="/lxp360-logo.png"
                  alt="LXP 360"
                  width={160}
                  height={64}
                  className="h-12 w-auto brightness-0 invert"
                />
                <p className="text-sm text-blue-200">
                  Engineering the future of learning with personalized, intelligent solutions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Programs</h3>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Course Authoring
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Learning Management
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      LXP Platform
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Analytics
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>
                    <Link href="#about" className="hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-blue-200">© 2025 LXP360. All rights reserved.</p>
              <div className="flex items-center gap-6 text-sm text-blue-200">
                <span>Release Version – 1.0</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#001d3d]">Welcome Back</DialogTitle>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                placeholder="Between 8 and 72 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white" disabled={isLoading}>
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
                className="text-[#0072f5] hover:underline"
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
            <DialogTitle className="text-2xl text-[#001d3d]">Sign up</DialogTitle>
            <DialogDescription>Learn on your own time from top universities and businesses.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="signup-firstname"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isSignupLoading}
                />
                <Input
                  id="signup-lastname"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isSignupLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email *</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="name@email.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                disabled={isSignupLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password *</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Between 8 and 72 characters"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                disabled={isSignupLoading}
                minLength={8}
                maxLength={72}
              />
            </div>
            {signupError && <p className="text-sm text-destructive">{signupError}</p>}
            <Button
              type="submit"
              className="w-full bg-[#0072f5] hover:bg-[#0056b8] text-white"
              disabled={isSignupLoading}
            >
              {isSignupLoading ? "Creating account..." : "Join for Free"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already on LXP360?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowSignUp(false)
                  setShowSignIn(true)
                }}
                className="text-[#0072f5] hover:underline"
              >
                Log in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
