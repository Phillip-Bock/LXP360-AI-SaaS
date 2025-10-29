"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const supabase = createClient()

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/verify-email")
      }, 2000)
    } catch (err) {
      setError("An unexpected error occurred")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001D3D] via-[#003066] to-[#001D3D] p-4">
        <Card className="w-full max-w-md bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat font-bold text-[#F5F5F5]">Check Your Email</CardTitle>
            <CardDescription className="font-lato text-[#F5F5F5]/70">
              We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001D3D] via-[#003066] to-[#001D3D] p-4">
      <Card className="w-full max-w-md bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30">
        <CardHeader>
          <CardTitle className="text-2xl font-montserrat font-bold text-[#F5F5F5]">Create Account</CardTitle>
          <CardDescription className="font-lato text-[#F5F5F5]/70">Sign up for LXP360 to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="font-lato text-[#F5F5F5]/90">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-slate-800/60 border-[#019EF3]/30 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:border-[#019EF3] min-h-[48px] font-lato"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="font-lato text-[#F5F5F5]/90">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-slate-800/60 border-[#019EF3]/30 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:border-[#019EF3] min-h-[48px] font-lato"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-lato text-[#F5F5F5]/90">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800/60 border-[#019EF3]/30 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:border-[#019EF3] min-h-[48px] font-lato"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-lato text-[#F5F5F5]/90">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800/60 border-[#019EF3]/30 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:border-[#019EF3] min-h-[48px] font-lato"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-lato text-[#F5F5F5]/90">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-slate-800/60 border-[#019EF3]/30 text-[#F5F5F5] placeholder:text-[#F5F5F5]/40 focus:border-[#019EF3] min-h-[48px] font-lato"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:bg-[#0056B8] shadow-[0_2px_10px_0_rgba(113,3,160,0.75)] font-montserrat font-semibold min-h-[48px]"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center text-sm font-lato">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#EF06C8] hover:text-[#C705A7] underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
