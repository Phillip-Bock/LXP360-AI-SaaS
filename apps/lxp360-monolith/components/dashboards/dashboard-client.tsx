"use client"

import { useState, useEffect } from "react"
import { type UserRoleType } from "@/lib/types/user-roles"
import { SuperAdminDashboard } from "./super-admin-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { DesignerDashboard } from "./designer-dashboard"
import { LmsAdminDashboard } from "./lms-admin-dashboard"
import { ProgramAdminDashboard } from "./program-admin-dashboard"
import { CourseAdminDashboard } from "./course-admin-dashboard"
import { SalesDashboard } from "./sales-dashboard"
import { ManagerDashboard } from "./manager-dashboard"
import { InstructorDashboard } from "./instructor-dashboard"
import { IndividualLearnerDashboard } from "./individual-learner-dashboard"
import { TeamLearnerDashboard } from "./team-learner-dashboard"

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

  // Route to specific dashboard based on role
  switch (activeRole) {
    case "super_admin":
      return <SuperAdminDashboard userName={userName} userEmail={userEmail} />
    case "admin":
      return <AdminDashboard userName={userName} userEmail={userEmail} />
    case "designer":
      return <DesignerDashboard userName={userName} userEmail={userEmail} />
    case "lms_admin":
      return <LmsAdminDashboard userName={userName} userEmail={userEmail} />
    case "program_admin":
      return <ProgramAdminDashboard userName={userName} userEmail={userEmail} />
    case "course_admin":
      return <CourseAdminDashboard userName={userName} userEmail={userEmail} />
    case "sales":
      return <SalesDashboard userName={userName} userEmail={userEmail} />
    case "manager":
      return <ManagerDashboard userName={userName} userEmail={userEmail} />
    case "instructor":
      return <InstructorDashboard userName={userName} userEmail={userEmail} />
    case "individual_learner":
      return <IndividualLearnerDashboard userName={userName} userEmail={userEmail} />
    case "team_learner":
      return <TeamLearnerDashboard userName={userName} userEmail={userEmail} />
    default:
      return <IndividualLearnerDashboard userName={userName} userEmail={userEmail} />
  }
}
