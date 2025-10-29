"use client"

import { useState, useEffect, useRef } from "react"
import {
  Brain,
  Zap,
  Shield,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  Users,
  Headphones,
  Play,
  ArrowRight,
  Code,
  Palette,
  Target,
  Rocket,
  CheckCircle,
  ChevronDown,
  Activity,
  Cloud,
  Lock,
  Briefcase,
  Award,
  TrendingUp,
  Eye,
} from "lucide-react"

const LXD360Services = () => {
  const [activeService, setActiveService] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedTier, setSelectedTier] = useState("managed")

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: any[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 86, 184, ${particle.opacity})`
        ctx.fill()

        // Connect nearby particles
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(0, 86, 184, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      setScrollProgress((currentScroll / totalScroll) * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const services = [
    {
      id: "platform",
      title: "LXD360 Platform",
      subtitle: "Complete Learning Ecosystem",
      icon: Layers,
      color: "from-[#0056B8] to-[#019EF3]", // Brand blue to cyan
      features: [
        "AI-powered content generation",
        "Unified learning management",
        "Real-time analytics dashboard",
        "Multi-device synchronization",
        "API-first architecture",
      ],
      price: "From $8,000/month",
      details: "Self-service platform with full feature access",
    },
    {
      id: "custom",
      title: "Custom Content Development",
      subtitle: "Hollywood-Quality Production",
      icon: Palette,
      color: "from-[#EF06C8] to-[#019EF3]", // Magenta to cyan
      features: [
        "3D animation & visual effects",
        "Professional voice talent",
        "Interactive scenarios",
        "Branching narratives",
        "Multi-language support",
      ],
      price: "$25K - $150K per course",
      details: "Full production team creates bespoke content",
    },
    {
      id: "immersive",
      title: "Immersive Technologies",
      subtitle: "VR/AR/XR Experiences",
      icon: Eye,
      color: "from-[#019EF3] to-[#0056B8]", // Cyan to brand blue
      features: [
        "Virtual reality simulations",
        "Augmented reality overlays",
        "Mixed reality training",
        "Haptic feedback integration",
        "Multi-user environments",
      ],
      price: "Pilot from $50K",
      details: "Cutting-edge immersive learning experiences",
    },
    {
      id: "managed",
      title: "Managed Services",
      subtitle: "Full-Service Solution",
      icon: Briefcase,
      color: "from-[#EF06C8] to-[#0056B8]", // Magenta to brand blue
      features: [
        "Dedicated success team",
        "Content strategy & planning",
        "Implementation support",
        "Ongoing optimization",
        "24/7 technical support",
      ],
      price: "Custom pricing",
      details: "White-glove service for enterprise clients",
    },
    {
      id: "consulting",
      title: "Strategic Consulting",
      subtitle: "Transform Your L&D",
      icon: Target,
      color: "from-[#0056B8] to-[#EF06C8]", // Brand blue to magenta
      features: [
        "Learning strategy development",
        "Technology assessment",
        "ROI optimization",
        "Change management",
        "Skills gap analysis",
      ],
      price: "$10K+ retainer",
      details: "Expert guidance for learning transformation",
    },
    {
      id: "library",
      title: "Content Library",
      subtitle: "Ready-to-Deploy Courses",
      icon: BookOpen,
      color: "from-[#019EF3] to-[#EF06C8]", // Cyan to magenta
      features: [
        "1000+ premium courses",
        "Industry-specific content",
        "Compliance training",
        "Soft skills development",
        "Technical certifications",
      ],
      price: "$100-$300 per user",
      details: "Instant access to world-class content",
    },
  ]

  const tiers = {
    starter: {
      name: "Starter",
      price: "$8,000",
      period: "/month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 500 users",
        "Platform access",
        "Basic analytics",
        "Email support",
        "Standard integrations",
        "Content authoring tools",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    managed: {
      name: "Managed",
      price: "Custom",
      period: "pricing",
      description: "Full-service solution for growing organizations",
      features: [
        "Unlimited users",
        "Everything in Starter",
        "Custom content creation",
        "Dedicated success manager",
        "Advanced analytics & AI",
        "Priority support",
        "Custom integrations",
        "VR/AR capabilities",
      ],
      cta: "Get Quote",
      popular: true,
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for large enterprises",
      features: [
        "Global deployment",
        "Everything in Managed",
        "On-premise option",
        "White-label branding",
        "Custom development",
        "SLA guarantees",
        "Executive reporting",
        "Compliance management",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-30" />

      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0056B8] rounded-full filter blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EF06C8] rounded-full filter blur-[128px] opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#019EF3] rounded-full filter blur-[128px] opacity-20 animate-pulse delay-2000" />
      </div>

      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-900">
        <div
          className="h-full bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#EF06C8] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section with 3D Text */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0056B8]/20 to-[#EF06C8]/20 backdrop-blur-xl border border-[#0056B8]/30 rounded-full mb-8">
            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
            <span className="bg-gradient-to-r from-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent font-semibold font-montserrat">
              COMPREHENSIVE SERVICE SUITE
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 relative font-montserrat">
            <span className="block bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent animate-gradient bg-300">
              Our Services
            </span>
            <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#EF06C8] opacity-30 animate-pulse" />
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-lato">
            From platform to production, consulting to content —
            <span className="text-white font-semibold"> everything you need</span> to transform learning at scale
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Cpu, label: "AI-Powered", value: "10x Faster" },
              { icon: Users, label: "Learners Served", value: "2M+" },
              { icon: Award, label: "Completion Rate", value: "94%" },
              { icon: TrendingUp, label: "ROI Average", value: "312%" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <stat.icon className="w-8 h-8 mb-3 text-[#019EF3] mx-auto" />
                <div className="text-2xl font-bold bg-gradient-to-r from-[#0056B8] to-[#019EF3] bg-clip-text text-transparent font-montserrat">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-lato">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Interactive Service Cards */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-montserrat">
              Complete Service Portfolio
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-lato">
              Choose standalone services or combine them for maximum impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform:
                    hoveredCard === index
                      ? `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) / 50}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg)`
                      : "perspective(1000px) rotateX(0) rotateY(0)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0056B8]/20 to-[#EF06C8]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 h-full hover:border-[#0056B8]/50 transition-all duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2 font-montserrat">{service.title}</h3>
                  <p className="text-gray-400 mb-4 font-lato">{service.subtitle}</p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#019EF3] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-lato">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#0056B8] to-[#019EF3] bg-clip-text text-transparent mb-2 font-montserrat">
                      {service.price}
                    </div>
                    <p className="text-sm text-gray-500 mb-4 font-lato">{service.details}</p>

                    <button className="w-full py-3 bg-gradient-to-r from-[#0056B8]/20 to-[#EF06C8]/20 border border-[#0056B8]/30 rounded-xl hover:from-[#0056B8]/30 hover:to-[#EF06C8]/30 transition-all duration-300 flex items-center justify-center group font-lato">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Deep Dive with Animated Features */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-[#0056B8]/20 backdrop-blur-xl border border-[#0056B8]/30 rounded-full mb-6">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-lato">PLATFORM CAPABILITIES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-montserrat">The Most Advanced Learning Platform</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  icon: Brain,
                  title: "AI Content Engine",
                  description: "Generate complete courses in minutes with our GPT-4 powered content creation system",
                },
                {
                  icon: Activity,
                  title: "Real-Time Analytics",
                  description: "Track performance, engagement, and ROI with predictive analytics and custom dashboards",
                },
                {
                  icon: Cloud,
                  title: "Cloud Infrastructure",
                  description: "Enterprise-grade security, 99.99% uptime SLA, and infinite scalability on AWS",
                },
                {
                  icon: Lock,
                  title: "Security & Compliance",
                  description: "SOC 2 Type II, HIPAA, GDPR compliant with end-to-end encryption",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 group cursor-pointer"
                  style={{
                    animation: "slideInLeft 0.5s ease-out forwards",
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0056B8] to-[#019EF3] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#019EF3] transition-colors font-montserrat">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 font-lato">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0056B8] to-[#EF06C8] rounded-3xl blur-3xl opacity-20 animate-pulse" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="aspect-video bg-black rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0056B8]/20 to-[#EF06C8]/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 ml-2" />
                      </div>
                      <p className="text-lg font-semibold font-montserrat">Watch Platform Demo</p>
                      <p className="text-gray-400 font-lato">See the magic in 3 minutes</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: "Setup Time", value: "< 24h" },
                    { label: "Languages", value: "40+" },
                    { label: "Integrations", value: "100+" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-2xl font-bold text-[#019EF3] font-montserrat">{stat.value}</div>
                      <div className="text-sm text-gray-400 font-lato">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers with Advanced Animation */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-montserrat">Flexible Pricing Options</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-lato">
              Start small, scale infinitely. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(tiers).map(([key, tier], index) => (
              <div
                key={key}
                className={`relative group ${tier.popular ? "lg:scale-110 z-10" : ""}`}
                onClick={() => setSelectedTier(key)}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#0056B8] to-[#019EF3] text-sm rounded-full font-lato">
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`relative bg-gray-900/50 backdrop-blur-xl border ${selectedTier === key ? "border-[#0056B8]" : "border-gray-800"} rounded-3xl p-8 h-full hover:border-[#0056B8]/50 transition-all duration-300 cursor-pointer`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 font-montserrat">{tier.name}</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#0056B8] to-[#019EF3] bg-clip-text text-transparent font-montserrat">
                      {tier.price}
                      <span className="text-lg font-normal text-gray-400">{tier.period}</span>
                    </div>
                    <p className="text-gray-400 mt-2 font-lato">{tier.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-[#019EF3] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 font-lato">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 font-lato ${
                      tier.popular
                        ? "bg-gradient-to-r from-[#0056B8] to-[#019EF3] hover:shadow-xl hover:shadow-[#0056B8]/25"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-montserrat">Your Journey to Success</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-lato">
              From onboarding to optimization, we're with you every step
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description:
                  "We analyze your needs, define success metrics, and create a customized implementation plan",
                duration: "Week 1",
                icon: Target,
              },
              {
                step: "02",
                title: "Platform Setup",
                description: "Configure your instance, integrate with existing systems, and customize branding",
                duration: "Week 2",
                icon: Code,
              },
              {
                step: "03",
                title: "Content Development",
                description: "Create or migrate content, develop custom courses, and set up learning paths",
                duration: "Weeks 3-6",
                icon: Palette,
              },
              {
                step: "04",
                title: "Launch & Training",
                description: "Roll out to users, conduct admin training, and provide launch support",
                duration: "Week 7",
                icon: Rocket,
              },
              {
                step: "05",
                title: "Optimize & Scale",
                description: "Analyze performance, iterate on content, and expand to new use cases",
                duration: "Ongoing",
                icon: TrendingUp,
              },
            ].map((phase, index) => (
              <div key={index} className="relative flex items-start mb-12 last:mb-0">
                {index < 4 && (
                  <div className="absolute left-12 top-20 w-0.5 h-full bg-gradient-to-b from-[#0056B8] to-transparent" />
                )}

                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#0056B8] to-[#019EF3] rounded-2xl flex flex-col items-center justify-center mr-8">
                  <phase.icon className="w-8 h-8 mb-1" />
                  <span className="text-xs font-bold font-montserrat">{phase.step}</span>
                </div>

                <div className="flex-1 pt-2">
                  <div className="flex items-center mb-2">
                    <h3 className="text-2xl font-bold mr-4 font-montserrat">{phase.title}</h3>
                    <span className="px-3 py-1 bg-[#0056B8]/20 text-[#019EF3] rounded-full text-sm font-lato">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-lg font-lato">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#019EF3]/20 to-[#0056B8]/20 backdrop-blur-xl border border-[#019EF3]/30 rounded-full mb-8">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-semibold font-lato">LIMITED TIME OFFER</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#EF06C8] bg-clip-text text-transparent font-montserrat">
              Ready to Transform Learning?
            </h2>

            <p className="text-2xl text-gray-300 mb-12 font-lato">
              Join 500+ organizations already delivering breakthrough training experiences
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-gradient-to-r from-[#0056B8] to-[#019EF3] rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-[#0056B8]/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center font-lato">
                Start Free 30-Day Trial
                <ArrowRight className="ml-3" />
              </button>

              <button className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-xl font-bold hover:bg-white/20 transition-all duration-300 font-lato">
                Book Strategy Session
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-gray-400 font-lato">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Industry Leader</span>
              </div>
              <div className="flex items-center">
                <Headphones className="w-5 h-5 mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 300%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-300 {
          background-size: 300%;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
        
        .delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  )
}

export default LXD360Services
