import Link from "next/link"
import Image from "next/image"
import { EnvelopeOpen } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export default function ConfirmEmailPage() {
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

        {/* Confirm Email Card */}
        <div className="bg-[#001D3D]/80 backdrop-blur-xl border-2 border-[#019EF3]/30 rounded-2xl p-8 shadow-2xl text-center animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-[#EF06C8] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#EF06C8]/30 animate-pulse">
            <EnvelopeOpen className="w-10 h-10 text-white" weight="duotone" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 font-montserrat">Verify your email!</h1>

          <p className="text-white/80 mb-6 font-lato leading-relaxed">
            We sent you a verification link via email. Please click it to verify your email address. If you don't see
            it, please wait up to 5 mins or check your SPAM folder.
          </p>

          <Button
            asChild
            className="w-full bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:bg-[#0056B8] shadow-[0_2px_10px_0_rgba(113,3,160,0.75)] font-montserrat font-semibold py-6 text-lg min-h-[48px] mb-4"
          >
            <a href="mailto:" target="_blank" rel="noopener noreferrer">
              Open Email App
            </a>
          </Button>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm font-lato">
              Didn't receive the email?{" "}
              <Link href="/auth/sign-up" className="text-[#EF06C8] hover:text-purple-400 font-medium underline">
                Resend email
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
