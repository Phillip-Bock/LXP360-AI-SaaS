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
import { EnvelopeSimple, LockKey, SignIn } from "@phosphor-icons/react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    console.log("[v0] Login attempt for:", email)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Login response:", {
        success: !error,
        userId: data?.user?.id,
        emailConfirmed: data?.user?.email_confirmed_at,
        error: error?.message,
      })

      if (error) {
        // Check for specific error types
        if (error.message.includes("Email not confirmed")) {
          throw new Error(
            "Please confirm your email address before logging in. Check your inbox for the confirmation link.",
          )
        }
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please check your credentials and try again.")
        }
        throw error
      }

      // Check if email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        setError("Please confirm your email address before logging in. Check your inbox for the confirmation link.")
        await supabase.auth.signOut()
        return
      }

      console.log("[v0] Login successful, redirecting...")
      router.push("/")
      router.refresh()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during login"
      console.error("[v0] Login error:", errorMessage)
      setError(errorMessage)
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

        {/* Login Card */}
        <div className="bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0056B8] to-[#019EF3] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#0056B8]/30">
              <SignIn className="w-8 h-8 text-white" weight="duotone" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Welcome Back</h1>
            <p className="text-white/70 font-lato">Log in to continue to LXP360</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
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
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] pl-11 min-h-[48px] font-lato"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-400 font-lato">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:bg-[#0056B8] shadow-[0_2px_10px_0_rgba(113,3,160,0.75)] font-montserrat font-semibold py-6 text-lg min-h-[48px]"
            >
              {isLoading ? "Signing in..." : "Log In"}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/forgot-password"
                className="text-[#019EF3] hover:text-cyan-300 text-sm font-medium transition-colors underline font-lato"
              >
                Forgot password?
              </Link>
            </div>

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
                Don't have an account?{" "}
                <Link href="/auth/sign-up" className="text-[#EF06C8] hover:text-purple-400 font-medium underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
