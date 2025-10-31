"use client"

import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { useState } from "react"

export default function AuthoringPage() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showContact, setShowContact] = useState(false)

  return (
    <div className="min-h-screen bg-[#001D3D]">
      <PublicHeader
        onSignInClick={() => setShowSignIn(true)}
        onSignUpClick={() => setShowSignUp(true)}
        onContactClick={() => setShowContact(true)}
      />

      <main className="container mx-auto px-4 py-32">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold text-[#F5F5F5] mb-6 font-[family-name:var(--font-montserrat)]">
              AUTHORING TOOL
            </h1>
            <p className="text-xl text-[#F5F5F5]/70 font-[family-name:var(--font-lato)] mb-4">
              INSPIRE Content Authoring Platform
            </p>
            <p className="text-lg text-[#019EF3] font-[family-name:var(--font-lato)]">
              Coming Soon
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
