"use client"

import { useState, useEffect } from "react"
import { type UserRoleType } from "@/lib/types/user-roles"
import { SuperAdminDashboard } from "@/components/dashboards/super-admin-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { DesignerDashboard } from "@/components/dashboards/designer-dashboard"
import { LMSAdminDashboard } from "@/components/dashboards/lms-admin-dashboard"
import { ProgramAdminDashboard } from "@/components/dashboards/program-admin-dashboard"
import { CourseAdminDashboard } from "@/components/dashboards/course-admin-dashboard"
import { SalesDashboard } from "@/components/dashboards/sales-dashboard"
import { ManagerDashboard } from "@/components/dashboards/manager-dashboard"
import { InstructorDashboard } from "@/components/dashboards/instructor-dashboard"
import { LearnerDashboard } from "@/components/dashboards/learner-dashboard"
import { SimpleRoleDashboard } from "@/components/dashboards/simple-role-dashboard"
import { DevRoleSelector } from "@/components/dev/role-selector"

interface DashboardClientProps {
  role: Exclude<UserRoleType, null>
  userName: string
  userEmail: string
}

export function DashboardClient({ role: serverRole, userName, userEmail }: DashboardClientProps) {
  const [activeRole, setActiveRole] = useState<Exclude<UserRoleType, null>>(serverRole)

  useEffect(() => {
    // Check for dev role override in development mode
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      const devRole = localStorage.getItem("dev_role_override") as Exclude<UserRoleType, null> | null
      if (devRole) {
        setActiveRole(devRole)
      }
    }
  }, [])

  // Render appropriate dashboard based on active role (dev override or server role)
  let DashboardComponent

  switch (activeRole) {
    case "super_admin":
      DashboardComponent = <SuperAdminDashboard userName={userName} userEmail={userEmail} />
      break
    case "admin":
      DashboardComponent = <AdminDashboard userName={userName} userEmail={userEmail} />
      break
    case "designer":
      DashboardComponent = <DesignerDashboard userName={userName} userEmail={userEmail} />
      break
    case "lms_admin":
      DashboardComponent = <LMSAdminDashboard userName={userName} userEmail={userEmail} />
      break
    case "program_admin":
      DashboardComponent = <ProgramAdminDashboard userName={userName} userEmail={userEmail} />
      break
    case "course_admin":
      DashboardComponent = <CourseAdminDashboard userName={userName} userEmail={userEmail} />
      break
    case "sales":
      DashboardComponent = <SalesDashboard userName={userName} userEmail={userEmail} />
      break
    case "manager":
      DashboardComponent = <ManagerDashboard userName={userName} userEmail={userEmail} />
      break
    case "instructor":
      DashboardComponent = <InstructorDashboard userName={userName} userEmail={userEmail} />
      break
    case "individual_learner":
    case "team_learner":
      DashboardComponent = <LearnerDashboard role={activeRole} userName={userName} userEmail={userEmail} />
      break
    default:
      DashboardComponent = <SimpleRoleDashboard role={activeRole} userName={userName} userEmail={userEmail} />
  }

  return (
    <>
      {DashboardComponent}
      <DevRoleSelector />
    </>
  )
}
