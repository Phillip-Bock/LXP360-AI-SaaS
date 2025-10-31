"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  Users,
  BookOpen,
  Certificate,
  ChartLineUp,
  UsersThree,
  Trophy,
  Target,
  ChatCircleDots,
} from "@phosphor-icons/react/dist/ssr"

interface TeamLearnerDashboardProps {
  userName: string
  userEmail: string
}

export function TeamLearnerDashboard({ userName, userEmail }: TeamLearnerDashboardProps) {
  const stats = [
    {
      label: "Team Courses",
      value: "12",
      icon: <BookOpen className="w-8 h-8" weight="duotone" />,
      trend: "+3 this month",
      trendUp: true,
    },
    {
      label: "Team Members",
      value: "8",
      icon: <UsersThree className="w-8 h-8" weight="duotone" />,
      trend: "+1",
      trendUp: true,
    },
    {
      label: "Team Progress",
      value: "72%",
      icon: <ChartLineUp className="w-8 h-8" weight="duotone" />,
      trend: "+9.5%",
      trendUp: true,
    },
    {
      label: "Certificates Earned",
      value: "24",
      icon: <Certificate className="w-8 h-8" weight="duotone" />,
      trend: "+6 this month",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Team Courses",
      icon: <BookOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View team courses"),
      variant: "primary" as const,
    },
    {
      label: "My Progress",
      icon: <ChartLineUp className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View my progress"),
      variant: "primary" as const,
    },
    {
      label: "Team Leaderboard",
      icon: <Trophy className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View leaderboard"),
      variant: "secondary" as const,
    },
    {
      label: "Team Chat",
      icon: <ChatCircleDots className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Open chat"),
      variant: "secondary" as const,
    },
    {
      label: "Team Goals",
      icon: <Target className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View goals"),
      variant: "outline" as const,
    },
    {
      label: "Certificates",
      icon: <Certificate className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View certificates"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "Team goal achieved",
      description: "Compliance Training: Team reached 100% completion",
      time: "1 hour ago",
      icon: <Target className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "New team member",
      description: "John Smith joined your learning team",
      time: "3 hours ago",
      icon: <UsersThree className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Team milestone",
      description: "Your team earned 'Knowledge Champions' badge",
      time: "1 day ago",
      icon: <Trophy className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Course completed",
      description: "Leadership Skills: You and 5 teammates finished",
      time: "2 days ago",
      icon: <Certificate className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Team Learner"
      roleIcon={<Users className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
