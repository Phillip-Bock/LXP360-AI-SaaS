"use client"

import { useRouter } from "next/navigation"
import LXD360Services from "@/components/lxd360-services"
import { PublicHeader } from "@/components/public-header"

export default function ServicesPage() {
  const router = useRouter()

  return (
    <>
      <PublicHeader
        onSignInClick={() => router.push("/auth/login")}
        onSignUpClick={() => router.push("/auth/signup")}
      />
      <LXD360Services />
    </>
  )
}
