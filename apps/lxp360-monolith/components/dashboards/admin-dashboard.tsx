"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  User,
  Users,
  GraduationCap,
  ChartBar,
  UserPlus,
  ClipboardText,
  Flag,
  FileText,
  CalendarCheck,
} from "@phosphor-icons/react/dist/ssr"

interface AdminDashboardProps {
  userName: string
  userEmail: string
}

export function AdminDashboard({ userName, userEmail }: AdminDashboardProps) {
  const stats = [
    {
      label: "Active Users",
      value: "1,234",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+8.5%",
      trendUp: true,
    },
    {
      label: "Pending Approvals",
      value: "23",
      icon: <ClipboardText className="w-8 h-8" weight="duotone" />,
      trend: "-5.2%",
      trendUp: true,
    },
    {
      label: "Active Courses",
      value: "156",
      icon: <GraduationCap className="w-8 h-8" weight="duotone" />,
      trend: "+12.1%",
      trendUp: true,
    },
    {
      label: "Completion Rate",
      value: "87%",
      icon: <ChartBar className="w-8 h-8" weight="duotone" />,
      trend: "+3.4%",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Manage Users",
      icon: <Users className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to users"),
      variant: "primary" as const,
    },
    {
      label: "Add New User",
      icon: <UserPlus className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Add user"),
      variant: "primary" as const,
    },
    {
      label: "Course Library",
      icon: <GraduationCap className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View courses"),
      variant: "secondary" as const,
    },
    {
      label: "Reports",
      icon: <FileText className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View reports"),
      variant: "secondary" as const,
    },
    {
      label: "Content Approvals",
      icon: <ClipboardText className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View approvals"),
      variant: "outline" as const,
    },
    {
      label: "Milestones",
      icon: <Flag className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View milestones"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New course approved",
      description: "Leadership Development Program is now live",
      time: "10 min ago",
      icon: <GraduationCap className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "User role updated",
      description: "Sarah Johnson promoted to Instructor role",
      time: "45 min ago",
      icon: <UserPlus className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Monthly report generated",
      description: "October learning analytics available for review",
      time: "2 hours ago",
      icon: <FileText className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Course deadline extended",
      description: "Compliance Training Q4 extended by 14 days",
      time: "4 hours ago",
      icon: <CalendarCheck className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Administrator"
      roleIcon={<User className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
