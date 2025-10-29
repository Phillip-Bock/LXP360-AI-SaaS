"use client"
import Image from "next/image"
import Link from "next/link"
import { Info, Briefcase, Books, BookOpen, Envelope, CreditCard } from "@phosphor-icons/react"

interface PublicHeaderProps {
  onSignInClick?: () => void
  onSignUpClick?: () => void
  onContactClick?: () => void
}

export function PublicHeader({ onSignInClick, onSignUpClick, onContactClick }: PublicHeaderProps) {
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
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors font-lato"
            >
              <Info className="w-4 h-4" weight="duotone" />
              About
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors font-lato"
            >
              <Briefcase className="w-4 h-4" weight="duotone" />
              Services
            </Link>
            <Link
              href="/subscriptions"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors font-lato"
            >
              <CreditCard className="w-4 h-4" weight="duotone" />
              Subscriptions
            </Link>
            <Link
              href="/advertised-courses"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors font-lato"
            >
              <Books className="w-4 h-4" weight="duotone" />
              Courses
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors font-lato"
            >
              <BookOpen className="w-4 h-4" weight="duotone" />
              Blog
            </Link>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="flex items-center gap-2 text-sm font-medium text-[#F5F5F5] hover:text-[#019EF3] transition-colors font-lato"
              >
                <Envelope className="w-4 h-4" weight="duotone" />
                Let's Connect
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onSignInClick} className="btn-outline btn-sm text-sm font-lato font-bold min-h-[44px]">
              Sign In
            </button>
            <button
              onClick={onSignUpClick}
              className="btn-primary btn-sm text-sm font-montserrat font-semibold min-h-[44px]"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
