"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Info, Briefcase, Books, BookOpen, CalendarBlank, Envelope, CreditCard } from "@phosphor-icons/react"

interface ScrollHeaderProps {
  onSignInClick: () => void
  onSignUpClick: () => void
  onContactClick?: () => void
}

export function ScrollHeader({ onSignInClick, onSignUpClick, onContactClick }: ScrollHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#001D3D] border-b border-[#7103A0]/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center relative">
            <div className="absolute inset-0 bg-[#7103A0]/20 blur-xl rounded-full" />
            <Image
              src="/lxd360-logo.png"
              alt="LXD 360"
              width={160}
              height={64}
              className="h-auto w-auto max-h-12 relative z-10"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/about"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
            >
              <Info className="w-4 h-4" weight="duotone" />
              About
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
            >
              <Briefcase className="w-4 h-4" weight="duotone" />
              Services
            </Link>
            <Link
              href="/subscriptions"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
            >
              <CreditCard className="w-4 h-4" weight="duotone" />
              Subscriptions
            </Link>
            <Link
              href="#courses"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
            >
              <Books className="w-4 h-4" weight="duotone" />
              Courses
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
            >
              <BookOpen className="w-4 h-4" weight="duotone" />
              Blog
            </Link>
            <Link
              href="#demo"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
            >
              <CalendarBlank className="w-4 h-4" weight="duotone" />
              Book a Demo
            </Link>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors"
              >
                <Envelope className="w-4 h-4" weight="duotone" />
                Contact
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="text-[#F5F5F5] hover:text-[#019EF3] hover:bg-[#F5F5F5]/10">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:bg-[#0056B8] shadow-[0_2px_10px_0_rgba(113,3,160,0.75)]"
            >
              <Link href="/auth/sign-up">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
