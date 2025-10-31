"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import {
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react"
import { Lightning, MagnifyingGlass, Sparkle } from "@phosphor-icons/react"
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline"

gsap.registerPlugin(ScrollTrigger)

export default function LightModeExample() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // GSAP scroll-based animation for hero
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.5,
        y: -50,
      })
    }

    // GSAP stagger animation for cards
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      )
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Label Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#7103A0] text-white text-center py-2 font-semibold">
        ☀️ LIGHT MODE EXAMPLE - All Branding Elements Labeled
      </div>

      {/* Hero Section - GSAP Scroll Animation */}
      <div
        ref={heroRef}
        className="relative pt-20 pb-32 px-8 text-center overflow-hidden bg-[#F5F5F5]"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#0056B8] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7103A0] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-2 bg-white border-[1.5px] border-[#7103A0] rounded-lg shadow-sm">
            <span className="text-xs text-[#7103A0] font-semibold uppercase tracking-wider">
              [LABEL] Purple Tech Badge - Outline Only (Never Solid Fill)
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl font-bold text-[#232323] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            LXP360 Brand System
          </motion.h1>

          <p className="text-lg text-[#525252] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            [LABEL] H1 Heading (Plus Jakarta Sans 700) + Body Text (Inter 400)
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-[#525252] max-w-2xl mx-auto mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Light Mode Alternative - Background #FFFFFF (White)
          </motion.p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#0056B8] text-white rounded-lg border-[1.5px] border-[#0072F5] font-semibold transition-all duration-150 hover:bg-[#00438F] active:bg-[#003066] active:text-white shadow-md"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Primary Button
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-transparent text-[#0056B8] rounded-lg border-2 border-[#0056B8] font-semibold transition-all duration-150 hover:bg-[#0056B8]/10 active:bg-[#0056B8]/20"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Secondary Button
            </motion.button>
          </div>

          <p className="text-sm text-[#707070] mt-4">
            [LABEL] Framer Motion Hover/Tap Animations - Normal → Hover → Active States
          </p>
        </div>
      </div>

      {/* Icon Showcase Section */}
      <div className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#232323] text-center mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Icon System Showcase
          </h2>
          <p className="text-center text-[#525252] mb-12">
            [LABEL] Three Icon Libraries: Lucide (Internal) + Phosphor + Heroicons (Public)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lucide Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#232323] mb-4">Lucide React</h3>
              <p className="text-sm text-[#525252] mb-4">[LABEL] Primary for Internal Pages</p>
              <div className="flex gap-4 items-center justify-center text-[#0056B8]">
                <User className="w-8 h-8" />
                <Settings className="w-8 h-8" />
                <Bell className="w-8 h-8" />
                <Search className="w-8 h-8" />
                <LogOut className="w-8 h-8" />
              </div>
            </motion.div>

            {/* Phosphor Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#232323] mb-4">Phosphor Icons</h3>
              <p className="text-sm text-[#525252] mb-4">[LABEL] Duotone Style for Variety</p>
              <div className="flex gap-4 items-center justify-center text-[#0184CB]">
                <Lightning size={32} weight="duotone" />
                <MagnifyingGlass size={32} weight="duotone" />
                <Sparkle size={32} weight="duotone" />
              </div>
            </motion.div>

            {/* Heroicons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#232323] mb-4">Heroicons</h3>
              <p className="text-sm text-[#525252] mb-4">[LABEL] Tailwind CSS Style</p>
              <div className="flex gap-4 items-center justify-center text-[#479DFF]">
                <ChartBarIcon className="w-8 h-8" />
                <UserGroupIcon className="w-8 h-8" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cards Section - GSAP Stagger Animation */}
      <div className="py-16 px-8 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#232323] text-center mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Component Examples
          </h2>
          <p className="text-center text-[#525252] mb-12">
            [LABEL] GSAP Stagger Animation on Scroll + Floating Effect (Border + Shadow)
          </p>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Elevation Level 1 */}
            <div
              className="p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg"
              style={{
                boxShadow: "0 2px 10px rgba(214, 214, 214, 0.1), 0 0 0 1px rgba(214, 214, 214, 1)",
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0056B8] rounded-lg mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#232323] mb-2">Level 1 Elevation</h3>
              <p className="text-[#525252] text-sm mb-4">
                [LABEL] Subtle float for cards. Border 2-3 shades lighter than container.
              </p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded">
                box-shadow: 0 2px 10px
              </code>
            </div>

            {/* Card 2 - Elevation Level 2 */}
            <div
              className="p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg"
              style={{
                boxShadow: "0 4px 20px rgba(214, 214, 214, 0.15), 0 0 0 1px rgba(214, 214, 214, 1)",
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#30AE0A] rounded-lg mb-4">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#232323] mb-2">Level 2 Elevation</h3>
              <p className="text-[#525252] text-sm mb-4">
                [LABEL] Medium float for modals/dialogs. Green from Success palette.
              </p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded">
                box-shadow: 0 4px 20px
              </code>
            </div>

            {/* Card 3 - Elevation Level 3 */}
            <div
              className="p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg"
              style={{
                boxShadow: "0 8px 30px rgba(214, 214, 214, 0.2), 0 0 0 1px rgba(214, 214, 214, 1)",
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#F56200] rounded-lg mb-4">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-[#232323] mb-2">Level 3 Elevation</h3>
              <p className="text-[#525252] text-sm mb-4">
                [LABEL] High float for dropdowns/tooltips. Orange from Warning palette.
              </p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded">
                box-shadow: 0 8px 30px
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Purple Usage Examples */}
      <div className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#232323] text-center mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Purple Usage (Technology Features)
          </h2>
          <p className="text-center text-[#525252] mb-12">
            [LABEL] Outlines, Glows, Shadows ONLY - Never Solid Fills
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Badge with Purple Outline */}
            <div className="p-8 bg-[#F5F5F5] rounded-lg text-center">
              <div
                className="inline-block px-6 py-3 border-2 border-[#63028D] rounded-lg mb-4"
                style={{
                  background: "rgba(99, 2, 141, 0.05)",
                  boxShadow: "0 0 20px rgba(99, 2, 141, 0.4)",
                }}
              >
                <Sparkle size={24} weight="duotone" className="inline-block mr-2 text-[#8D04C8]" />
                <span className="text-[#8D04C8] font-semibold">AI-Powered</span>
              </div>
              <p className="text-sm text-[#525252]">
                [LABEL] Purple border + 5% tint + glow shadow
              </p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded inline-block mt-2">
                border: 2px solid #63028D
              </code>
            </div>

            {/* Premium Badge */}
            <div className="p-8 bg-[#F5F5F5] rounded-lg text-center">
              <div
                className="inline-block px-6 py-3 border-[1.5px] border-[#7103A0] rounded-lg mb-4"
                style={{
                  background: "rgba(113, 3, 160, 0.03)",
                  boxShadow: "0 0 15px rgba(113, 3, 160, 0.3)",
                }}
              >
                <Lightning size={24} weight="duotone" className="inline-block mr-2 text-[#9B04DC]" />
                <span className="text-[#9B04DC] font-semibold">Premium Feature</span>
              </div>
              <p className="text-sm text-[#525252]">
                [LABEL] Lighter purple outline + minimal tint + glow
              </p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded inline-block mt-2">
                border: 1.5px solid #7103A0
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive States */}
      <div className="py-16 px-8 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#232323] text-center mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Interactive State Progression
          </h2>
          <p className="text-center text-[#525252] mb-12">
            [LABEL] Normal → Hover → Active → Disabled (2-3 shades per state)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="px-6 py-3 bg-[#0056B8] text-white rounded-lg border-[1.5px] border-[#0072F5] font-semibold shadow-sm">
              Normal State
            </button>
            <button className="px-6 py-3 bg-[#00438F] text-white rounded-lg border-[1.5px] border-[#0072F5] font-semibold shadow-sm">
              Hover State
            </button>
            <button className="px-6 py-3 bg-[#003066] text-white rounded-lg border-[1.5px] border-[#0072F5] font-semibold shadow-sm">
              Active State
            </button>
            <button className="px-6 py-3 bg-[#EBEBEB] text-[#666666] rounded-lg border-[1.5px] border-[#D6D6D6] font-semibold cursor-not-allowed">
              Disabled
            </button>
          </div>

          <div className="mt-8 p-6 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-[#232323] mb-4">Color Values Used:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[#525252] mb-1">Normal:</p>
                <code className="text-[#0056B8]">#0056B8</code>
                <p className="text-[#707070] text-xs">Blue Dark 700 (6.95:1)</p>
              </div>
              <div>
                <p className="text-[#525252] mb-1">Hover:</p>
                <code className="text-[#0056B8]">#00438F</code>
                <p className="text-[#707070] text-xs">Blue Dark 800 (9.55:1)</p>
              </div>
              <div>
                <p className="text-[#525252] mb-1">Active:</p>
                <code className="text-[#0056B8]">#003066</code>
                <p className="text-[#707070] text-xs">Blue Dark 900 (13.01:1)</p>
              </div>
              <div>
                <p className="text-[#525252] mb-1">Disabled:</p>
                <code className="text-[#0056B8]">#C2C2C2</code>
                <p className="text-[#707070] text-xs">Grey Light 400</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading States */}
      <div className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#232323] text-center mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Loading States
          </h2>
          <p className="text-center text-[#525252] mb-12">
            [LABEL] Spinner (&lt;3s) vs Skeleton (&gt;3s)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spinner */}
            <div className="p-8 bg-[#F5F5F5] rounded-lg text-center border-[1.5px] border-[#E0E0E0]">
              <Loader2 className="w-12 h-12 text-[#0056B8] animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#232323] mb-2">Spinner</h3>
              <p className="text-sm text-[#525252]">For short waits (under 3 seconds)</p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded inline-block mt-2">
                animation: spin 1s linear infinite
              </code>
            </div>

            {/* Skeleton */}
            <div className="p-8 bg-[#F5F5F5] rounded-lg border-[1.5px] border-[#E0E0E0]">
              <div className="space-y-3">
                <div
                  className="h-4 rounded"
                  style={{
                    background:
                      "linear-gradient(90deg, #EBEBEB 0%, #E0E0E0 50%, #EBEBEB 100%)",
                    backgroundSize: "200% 100%",
                    animation: "skeleton-loading 2s ease-in-out infinite",
                  }}
                />
                <div
                  className="h-4 rounded w-3/4"
                  style={{
                    background:
                      "linear-gradient(90deg, #EBEBEB 0%, #E0E0E0 50%, #EBEBEB 100%)",
                    backgroundSize: "200% 100%",
                    animation: "skeleton-loading 2s ease-in-out infinite",
                  }}
                />
                <div
                  className="h-4 rounded w-1/2"
                  style={{
                    background:
                      "linear-gradient(90deg, #EBEBEB 0%, #E0E0E0 50%, #EBEBEB 100%)",
                    backgroundSize: "200% 100%",
                    animation: "skeleton-loading 2s ease-in-out infinite",
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-[#232323] mt-4 mb-2">Skeleton Loader</h3>
              <p className="text-sm text-[#525252]">For longer waits (over 3 seconds)</p>
              <code className="text-xs text-[#0056B8] bg-[#EBF8FF] px-2 py-1 rounded inline-block mt-2">
                animation: skeleton-loading 2s
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div className="py-16 px-8 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-[#232323] text-center mb-12"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Typography Scale
          </h2>

          <div className="space-y-8 p-8 bg-white border-[1.5px] border-[#D6D6D6] rounded-lg shadow-sm">
            <div>
              <h1
                className="text-5xl font-bold text-[#232323]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                H1 Heading (48px / 700)
              </h1>
              <p className="text-sm text-[#707070] mt-2">[LABEL] Plus Jakarta Sans Bold</p>
            </div>

            <div>
              <h2
                className="text-4xl font-bold text-[#232323]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                H2 Heading (36px / 700)
              </h2>
              <p className="text-sm text-[#707070] mt-2">[LABEL] Plus Jakarta Sans Bold</p>
            </div>

            <div>
              <h3
                className="text-3xl font-semibold text-[#232323]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                H3 Heading (30px / 600)
              </h3>
              <p className="text-sm text-[#707070] mt-2">[LABEL] Plus Jakarta Sans Semibold</p>
            </div>

            <div>
              <p className="text-base text-[#525252]" style={{ fontFamily: "Inter, sans-serif" }}>
                Body Text (16px / 400) - This is regular body text using Inter font. It should be
                highly readable and maintain WCAG 2.2 AA contrast ratios. Line height is 1.5 for
                optimal readability.
              </p>
              <p className="text-sm text-[#707070] mt-2">[LABEL] Inter Regular</p>
            </div>

            <div>
              <p className="text-sm text-[#525252]" style={{ fontFamily: "Inter, sans-serif" }}>
                Small Text (14px / 400) - Used for secondary information and helper text.
              </p>
              <p className="text-xs text-[#707070] mt-2">[LABEL] Inter Regular</p>
            </div>

            <div>
              <code
                className="text-sm text-[#0056B8] bg-[#EBF8FF] px-3 py-2 rounded inline-block"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                const code = "JetBrains Mono (14px / 400)"
              </code>
              <p className="text-xs text-[#707070] mt-2">[LABEL] JetBrains Mono Regular</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Summary */}
      <div className="py-16 px-8 bg-white border-t-2 border-[#0056B8]">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-3xl font-bold text-[#232323] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Light Mode Branding Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-[#F5F5F5] rounded-lg border-[1.5px] border-[#D6D6D6]">
              <h3 className="text-lg font-semibold text-[#232323] mb-3">Colors</h3>
              <ul className="text-sm text-[#525252] space-y-2">
                <li>• Background: #FFFFFF</li>
                <li>• Primary Blue: #0056B8</li>
                <li>• Purple: Outlines only</li>
                <li>• 12 palettes × 10 shades</li>
              </ul>
            </div>

            <div className="p-6 bg-[#F5F5F5] rounded-lg border-[1.5px] border-[#D6D6D6]">
              <h3 className="text-lg font-semibold text-[#232323] mb-3">Typography</h3>
              <ul className="text-sm text-[#525252] space-y-2">
                <li>• Headings: Plus Jakarta Sans</li>
                <li>• Body: Inter</li>
                <li>• Code: JetBrains Mono</li>
                <li>• WCAG 2.2 AA compliant</li>
              </ul>
            </div>

            <div className="p-6 bg-[#F5F5F5] rounded-lg border-[1.5px] border-[#D6D6D6]">
              <h3 className="text-lg font-semibold text-[#232323] mb-3">Animations</h3>
              <ul className="text-sm text-[#525252] space-y-2">
                <li>• Framer Motion (Internal)</li>
                <li>• GSAP (Public/Scroll)</li>
                <li>• Respects reduced motion</li>
                <li>• 150ms-500ms durations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}
