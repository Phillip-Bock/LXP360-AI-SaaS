"use client"

import { useState, useEffect } from "react"
import { SimpleRoleDashboard } from "./simple-role-dashboard"
import { type UserRoleType } from "@/lib/types/user-roles"

interface DashboardClientProps {
  serverRole: Exclude<UserRoleType, null>
  userName: string
  userEmail: string
}

export function DashboardClient({ serverRole, userName, userEmail }: DashboardClientProps) {
  const [activeRole, setActiveRole] = useState<Exclude<UserRoleType, null>>(serverRole)

  useEffect(() => {
    // Check for dev role override in localStorage (development only)
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      const devRoleOverride = localStorage.getItem("dev_role_override") as Exclude<UserRoleType, null> | null
      if (devRoleOverride) {
        console.log("[v0] Dev role override active:", devRoleOverride)
        setActiveRole(devRoleOverride)
      } else {
        setActiveRole(serverRole)
      }
    }
  }, [serverRole])

  return <SimpleRoleDashboard role={activeRole} userName={userName} userEmail={userEmail} />
}
