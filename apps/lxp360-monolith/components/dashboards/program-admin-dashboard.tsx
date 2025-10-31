"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  FolderOpen,
  Path,
  CalendarCheck,
  ChartLine,
  Plus,
  ListBullets,
  Users,
  Target,
} from "@phosphor-icons/react/dist/ssr"

interface ProgramAdminDashboardProps {
  userName: string
  userEmail: string
}

export function ProgramAdminDashboard({ userName, userEmail }: ProgramAdminDashboardProps) {
  const stats = [
    {
      label: "Active Programs",
      value: "24",
      icon: <FolderOpen className="w-8 h-8" weight="duotone" />,
      trend: "+4",
      trendUp: true,
    },
    {
      label: "Learning Paths",
      value: "67",
      icon: <Path className="w-8 h-8" weight="duotone" />,
      trend: "+8",
      trendUp: true,
    },
    {
      label: "Program Enrollments",
      value: "3,456",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+15.2%",
      trendUp: true,
    },
    {
      label: "Avg Completion",
      value: "76%",
      icon: <ChartLine className="w-8 h-8" weight="duotone" />,
      trend: "+4.3%",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Create Program",
      icon: <Plus className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Create program"),
      variant: "primary" as const,
    },
    {
      label: "Manage Programs",
      icon: <FolderOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Manage programs"),
      variant: "primary" as const,
    },
    {
      label: "Learning Pathways",
      icon: <Path className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Learning paths"),
      variant: "secondary" as const,
    },
    {
      label: "Curriculum Design",
      icon: <ListBullets className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Curriculum"),
      variant: "secondary" as const,
    },
    {
      label: "Program Analytics",
      icon: <ChartLine className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Analytics"),
      variant: "outline" as const,
    },
    {
      label: "Milestones",
      icon: <Target className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Milestones"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New program launched",
      description: "Executive Leadership Program now accepting enrollments",
      time: "1 hour ago",
      icon: <FolderOpen className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "Learning path updated",
      description: "Technical Skills pathway revised with 3 new courses",
      time: "3 hours ago",
      icon: <Path className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Program milestone reached",
      description: "Sales Excellence: 100 learners completed first module",
      time: "5 hours ago",
      icon: <Target className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Curriculum review scheduled",
      description: "Q4 program review meeting set for next week",
      time: "1 day ago",
      icon: <CalendarCheck className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Program Administrator"
      roleIcon={<FolderOpen className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
