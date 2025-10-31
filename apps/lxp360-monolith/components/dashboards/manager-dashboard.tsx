"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  UsersThree,
  ChartLineUp,
  Target,
  CheckSquare,
  Path,
  ClipboardText,
  TrendUp,
  Flag,
} from "@phosphor-icons/react/dist/ssr"

interface ManagerDashboardProps {
  userName: string
  userEmail: string
}

export function ManagerDashboard({ userName, userEmail }: ManagerDashboardProps) {
  const stats = [
    {
      label: "Team Members",
      value: "24",
      icon: <UsersThree className="w-8 h-8" weight="duotone" />,
      trend: "+2",
      trendUp: true,
    },
    {
      label: "Team Completion",
      value: "78%",
      icon: <ChartLineUp className="w-8 h-8" weight="duotone" />,
      trend: "+8.3%",
      trendUp: true,
    },
    {
      label: "Active Goals",
      value: "12",
      icon: <Target className="w-8 h-8" weight="duotone" />,
      trend: "+3",
      trendUp: true,
    },
    {
      label: "Compliance Rate",
      value: "94%",
      icon: <CheckSquare className="w-8 h-8" weight="duotone" />,
      trend: "+2.1%",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Team Overview",
      icon: <UsersThree className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View team"),
      variant: "primary" as const,
    },
    {
      label: "Assign Training",
      icon: <Path className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Assign training"),
      variant: "primary" as const,
    },
    {
      label: "Team Analytics",
      icon: <ChartLineUp className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View analytics"),
      variant: "secondary" as const,
    },
    {
      label: "Progress Reports",
      icon: <ClipboardText className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View reports"),
      variant: "secondary" as const,
    },
    {
      label: "Set Goals",
      icon: <Target className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Set goals"),
      variant: "outline" as const,
    },
    {
      label: "Compliance Check",
      icon: <CheckSquare className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Check compliance"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "Training assigned",
      description: "Leadership Development assigned to 8 team members",
      time: "30 min ago",
      icon: <Path className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "Team goal achieved",
      description: "Q4 compliance training - 100% team completion",
      time: "2 hours ago",
      icon: <Target className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Progress report generated",
      description: "Weekly team learning summary available",
      time: "1 day ago",
      icon: <ClipboardText className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Team member milestone",
      description: "Sarah Johnson completed Advanced Skills certification",
      time: "2 days ago",
      icon: <Flag className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Team Manager"
      roleIcon={<UsersThree className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
