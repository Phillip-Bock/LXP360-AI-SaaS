"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  BookOpen,
  FilePlus,
  Eye,
  CheckCircle,
  Users,
  ChartBar,
  Flag,
  ClipboardText,
} from "@phosphor-icons/react/dist/ssr"

interface CourseAdminDashboardProps {
  userName: string
  userEmail: string
}

export function CourseAdminDashboard({ userName, userEmail }: CourseAdminDashboardProps) {
  const stats = [
    {
      label: "Courses Managed",
      value: "45",
      icon: <BookOpen className="w-8 h-8" weight="duotone" />,
      trend: "+6",
      trendUp: true,
    },
    {
      label: "Pending Reviews",
      value: "12",
      icon: <Eye className="w-8 h-8" weight="duotone" />,
      trend: "-3",
      trendUp: true,
    },
    {
      label: "Total Learners",
      value: "2,345",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+14.5%",
      trendUp: true,
    },
    {
      label: "Avg Satisfaction",
      value: "4.7/5",
      icon: <CheckCircle className="w-8 h-8" weight="duotone" />,
      trend: "+0.3",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Create Course",
      icon: <FilePlus className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Create course"),
      variant: "primary" as const,
    },
    {
      label: "Manage Courses",
      icon: <BookOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Manage courses"),
      variant: "primary" as const,
    },
    {
      label: "Content Review",
      icon: <Eye className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Review content"),
      variant: "secondary" as const,
    },
    {
      label: "Course Analytics",
      icon: <ChartBar className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View analytics"),
      variant: "secondary" as const,
    },
    {
      label: "Approvals Queue",
      icon: <ClipboardText className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Approvals"),
      variant: "outline" as const,
    },
    {
      label: "Quality Standards",
      icon: <Flag className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Standards"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "Course approved",
      description: "Communication Skills course published successfully",
      time: "20 min ago",
      icon: <CheckCircle className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "Content review completed",
      description: "Project Management Module reviewed and approved",
      time: "1 hour ago",
      icon: <Eye className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "New course created",
      description: "Data Analytics Fundamentals added to catalog",
      time: "3 hours ago",
      icon: <FilePlus className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Course feedback received",
      description: "Leadership Training: 4.8/5 rating from 45 learners",
      time: "6 hours ago",
      icon: <ChartBar className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Course Administrator"
      roleIcon={<BookOpen className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
