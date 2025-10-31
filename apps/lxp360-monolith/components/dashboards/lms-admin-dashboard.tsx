"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  GraduationCap,
  BookOpen,
  Users,
  ChartLineUp,
  FolderOpen,
  Certificate,
  ListChecks,
  CalendarDots,
} from "@phosphor-icons/react/dist/ssr"

interface LmsAdminDashboardProps {
  userName: string
  userEmail: string
}

export function LmsAdminDashboard({ userName, userEmail }: LmsAdminDashboardProps) {
  const stats = [
    {
      label: "Course Catalog",
      value: "342",
      icon: <BookOpen className="w-8 h-8" weight="duotone" />,
      trend: "+18",
      trendUp: true,
    },
    {
      label: "Total Enrollments",
      value: "8,456",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+12.3%",
      trendUp: true,
    },
    {
      label: "Completion Rate",
      value: "82%",
      icon: <ChartLineUp className="w-8 h-8" weight="duotone" />,
      trend: "+5.1%",
      trendUp: true,
    },
    {
      label: "Certificates Issued",
      value: "1,234",
      icon: <Certificate className="w-8 h-8" weight="duotone" />,
      trend: "+23",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Course Catalog",
      icon: <BookOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View catalog"),
      variant: "primary" as const,
    },
    {
      label: "Manage Enrollments",
      icon: <Users className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Manage enrollments"),
      variant: "primary" as const,
    },
    {
      label: "Learning Paths",
      icon: <FolderOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Learning paths"),
      variant: "secondary" as const,
    },
    {
      label: "Reports & Analytics",
      icon: <ChartLineUp className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Analytics"),
      variant: "secondary" as const,
    },
    {
      label: "Certification",
      icon: <Certificate className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Certificates"),
      variant: "outline" as const,
    },
    {
      label: "Curriculum Planning",
      icon: <CalendarDots className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Curriculum"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New learning path created",
      description: "Leadership Excellence pathway with 8 courses",
      time: "30 min ago",
      icon: <FolderOpen className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "Bulk enrollment completed",
      description: "250 users enrolled in Compliance Training",
      time: "2 hours ago",
      icon: <Users className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Course catalog updated",
      description: "12 new courses added to the catalog",
      time: "4 hours ago",
      icon: <BookOpen className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Monthly certificates issued",
      description: "145 completion certificates awarded this week",
      time: "1 day ago",
      icon: <Certificate className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="LMS Administrator"
      roleIcon={<GraduationCap className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
