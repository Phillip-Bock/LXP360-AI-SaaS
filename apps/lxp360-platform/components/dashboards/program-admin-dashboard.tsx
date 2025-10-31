"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FolderOpen, SignOut } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"

interface ProgramAdminDashboardProps {
  userName: string
  userEmail: string
}

export function ProgramAdminDashboard({ userName, userEmail }: ProgramAdminDashboardProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/signout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#001D3D] flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] p-12">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Role Icon */}
          <div className="text-[#0056B8]">
            <FolderOpen className="w-24 h-24" weight="duotone" />
          </div>

          {/* Role Name */}
          <h1 className="text-4xl font-bold text-[#232323] font-[family-name:var(--font-montserrat)]">
            Program Administrator
          </h1>

          {/* User Info */}
          <div className="space-y-2">
            <p className="text-xl text-[#232323] font-[family-name:var(--font-lato)]">{userName}</p>
            <p className="text-base text-[#232323]/70 font-[family-name:var(--font-lato)]">{userEmail}</p>
          </div>

          {/* Success Message */}
          <div className="bg-[#3AD20C]/10 border border-[#3AD20C] rounded-lg p-4 w-full">
            <p className="text-[#232323] font-[family-name:var(--font-lato)]">
              ✓ Program Admin dashboard loaded successfully!
            </p>
            <p className="text-sm text-[#232323]/70 font-[family-name:var(--font-lato)] mt-2">
              Program management and oversight tools ready.
            </p>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_2px_10px_0_rgba(113,3,160,0.75)] transition-all"
          >
            <SignOut className="w-5 h-5 mr-2" weight="duotone" />
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}
