"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type UserRoleType, ROLE_DISPLAY_NAMES } from "@/lib/types/user-roles"

const ALL_ROLES: Exclude<UserRoleType, null>[] = [
  "super_admin",
  "admin",
  "designer",
  "lms_admin",
  "program_admin",
  "course_admin",
  "sales",
  "manager",
  "instructor",
  "individual_learner",
  "team_learner",
]

export function DevRoleSelector() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Exclude<UserRoleType, null> | null>(null)
  const [isDevMode, setIsDevMode] = useState(false)

  useEffect(() => {
    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === "development"
    setIsDevMode(isDev)

    // Load saved role from localStorage
    if (isDev && typeof window !== "undefined") {
      const savedRole = localStorage.getItem("dev_role_override") as Exclude<UserRoleType, null> | null
      if (savedRole) {
        setSelectedRole(savedRole)
      }
    }
  }, [])

  const handleRoleChange = (role: Exclude<UserRoleType, null>) => {
    setSelectedRole(role)
    if (typeof window !== "undefined") {
      localStorage.setItem("dev_role_override", role)
    }
    // Refresh the page to apply the new role
    router.refresh()
  }

  const handleClearRole = () => {
    setSelectedRole(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("dev_role_override")
    }
    router.refresh()
  }

  // Only show in development mode
  if (!isDevMode) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-[#232323] border-[#7103A0] border-[1.5px] p-4 max-w-xs">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#F5F5F5] font-[family-name:var(--font-montserrat)]">
              Dev Role Selector
            </h3>
            {selectedRole && (
              <Button
                onClick={handleClearRole}
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-xs text-[#F5F5F5] hover:bg-[#7103A0]/20"
              >
                Clear
              </Button>
            )}
          </div>

          {selectedRole && (
            <div className="text-xs text-[#3AD20C] font-[family-name:var(--font-lato)]">
              Active: {ROLE_DISPLAY_NAMES[selectedRole]}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
            {ALL_ROLES.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`
                  text-left px-3 py-2 rounded-lg text-xs font-[family-name:var(--font-lato)] transition-all
                  ${
                    selectedRole === role
                      ? "bg-[#0056B8] text-[#F5F5F5] border border-[#7103A0]"
                      : "bg-[#001D3D] text-[#F5F5F5] hover:bg-[#00438F] border border-transparent"
                  }
                `}
              >
                {ROLE_DISPLAY_NAMES[role]}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#F5F5F5]/50 font-[family-name:var(--font-lato)] pt-2 border-t border-[#7103A0]/30">
            Development mode only
          </div>
        </div>
      </Card>
    </div>
  )
}
