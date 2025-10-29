"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EnvelopeSimple, LockKeyOpen } from "@phosphor-icons/react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      setSuccess(true)
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

        {/* Forgot Password Card */}
        <div className="bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30 rounded-2xl p-8 shadow-2xl">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                <EnvelopeSimple className="w-8 h-8 text-white" weight="duotone" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Check Your Email</h1>
              <p className="text-white/70 mb-6 font-lato">
                We've sent you a password reset link. Please check your email and follow the instructions.
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#0056B8] hover:from-[#003066] hover:via-[#0056B8] hover:to-[#003066] text-white font-semibold py-6 text-lg min-h-[48px] rounded-lg shadow-2xl shadow-[#019EF3]/30 hover:shadow-[#019EF3]/50 hover:scale-105 transition-all duration-300 font-montserrat"
              >
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#019EF3] to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#019EF3]/30">
                  <LockKeyOpen className="w-8 h-8 text-white" weight="duotone" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 font-montserrat">Reset your password</h1>
                <p className="text-white/70 font-lato">Enter your email to receive a password reset link</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
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
                  {isLoading ? "Sending..." : "Send Password Reset Email"}
                </Button>

                <div className="text-center">
                  <p className="text-white/70 text-sm font-lato">
                    Remember password?{" "}
                    <Link href="/auth/login" className="text-[#019EF3] hover:text-cyan-300 font-medium underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
