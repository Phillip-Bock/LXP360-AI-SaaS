"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PublicHeader } from "@/components/public-header"
import { ArrowLeft, House } from "@phosphor-icons/react/dist/ssr"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#001D3D] flex flex-col">
      <PublicHeader
        onSignInClick={() => router.push("/auth/login")}
        onSignUpClick={() => router.push("/auth/signup")}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon with Animation */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative inline-block">
              {/* Purple Glow Effect */}
              <div className="absolute inset-0 bg-[#7103A0] blur-[100px] opacity-30 rounded-full" />

              {/* 404 Text */}
              <div className="relative">
                <h1 className="font-sans font-bold text-[180px] md:text-[240px] leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#019EF3] via-[#0056B8] to-[#7103A0] animate-in zoom-in duration-1000">
                  404
                </h1>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-[#F5F5F5] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Oops! Page not found
          </h2>

          {/* Description */}
          <p className="font-sans text-lg md:text-xl text-[#F5F5F5]/80 mb-12 max-w-xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            The page you are looking for doesn't exist or has been moved.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Link href="/">
              <Button
                size="lg"
                className="group bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] px-8 py-6 text-base font-sans font-semibold hover:bg-[#0056B8] hover:scale-105 transition-all duration-300 shadow-[0_2px_10px_0_rgba(113,3,160,0.75)]"
              >
                <House className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" weight="duotone" />
                Go to homepage
              </Button>
            </Link>

            <Link href="/#contact">
              <Button
                size="lg"
                variant="outline"
                className="group bg-transparent text-[#F5F5F5] border-[1.5px] border-[#019EF3] rounded-[10px] px-8 py-6 text-base font-sans font-semibold hover:bg-[#019EF3]/10 hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" weight="duotone" />
                Let's Connect
              </Button>
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-20 flex justify-center gap-2 animate-in fade-in duration-1000 delay-700">
            <div className="w-2 h-2 rounded-full bg-[#019EF3] animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-[#0056B8] animate-pulse delay-150" />
            <div className="w-2 h-2 rounded-full bg-[#7103A0] animate-pulse delay-300" />
          </div>
        </div>
      </main>
    </div>
  )
}
