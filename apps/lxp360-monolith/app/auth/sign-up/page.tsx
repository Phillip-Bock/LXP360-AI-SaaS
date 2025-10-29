"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, EnvelopeSimple, LockKey, UserPlus } from "@phosphor-icons/react"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/`,
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      router.push("/auth/confirm-email")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001D3D] via-[#003066] to-[#001D3D] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#019EF3]/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EF06C8]/10 rounded-full filter blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-up">
          <Link href="/">
            <Image src="/lxd360-logo.png" alt="LXD360" width={180} height={72} className="brightness-0 invert mb-3" />
          </Link>
          <p className="text-white/60 text-sm font-lato tracking-wide">Training the Future for the Future</p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#EF06C8] to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#EF06C8]/30">
              <UserPlus className="w-8 h-8 text-white" weight="duotone" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Create Account</h1>
            <p className="text-white/70 font-lato">Start your free trial today</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white/90 font-lato">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" weight="duotone" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] pl-11 min-h-[48px] font-lato"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 font-lato">
                Email *
              </Label>
              <div className="relative">
                <EnvelopeSimple
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                  weight="duotone"
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] pl-11 min-h-[48px] font-lato"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 font-lato">
                Password *
              </Label>
              <div className="relative">
                <LockKey className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" weight="duotone" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                  className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] pl-11 min-h-[48px] font-lato"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-white/50 font-lato">Minimum 6 characters</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-400 font-lato">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#EF06C8] via-purple-600 to-[#EF06C8] hover:from-purple-700 hover:via-[#EF06C8] hover:to-purple-700 text-white font-semibold py-6 text-lg min-h-[48px] rounded-lg shadow-2xl shadow-[#EF06C8]/30 hover:shadow-[#EF06C8]/50 hover:scale-105 transition-all duration-300 font-montserrat"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#001D3D]/80 text-white/60 font-lato">OR</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/70 text-sm font-lato">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#019EF3] hover:text-cyan-300 font-medium underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
