import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"
import { PublicHeader } from "@/components/public-header"

export default function VerifyEmailPage() {
  return (
    <>
      <PublicHeader />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001D3D] via-[#003066] to-[#001D3D] p-4 pt-[73px]">
        <Card className="w-full max-w-md bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#019EF3]/20">
              <Mail className="h-6 w-6 text-[#019EF3]" />
            </div>
            <CardTitle className="text-2xl font-montserrat font-bold text-[#F5F5F5]">Check Your Email</CardTitle>
            <CardDescription className="font-lato text-[#F5F5F5]/70">
              We've sent you a confirmation email. Please check your inbox and click the verification link to activate
              your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-800/60 border border-[#019EF3]/30 p-4 text-sm">
              <p className="font-medium mb-2 font-lato text-[#F5F5F5]">Didn't receive the email?</p>
              <ul className="list-disc list-inside space-y-1 text-[#F5F5F5]/70 font-lato">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes and check again</li>
              </ul>
            </div>

            <Button
              asChild
              className="w-full bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:bg-[#0056B8] shadow-[0_2px_10px_0_rgba(113,3,160,0.75)] font-montserrat font-semibold min-h-[48px]"
            >
              <Link href="/auth/login">Return to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
