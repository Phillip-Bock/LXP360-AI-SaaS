"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  UserCircle,
  BookOpen,
  Certificate,
  TrendUp,
  BookBookmark,
  Clock,
  Trophy,
  Target,
} from "@phosphor-icons/react/dist/ssr"

interface IndividualLearnerDashboardProps {
  userName: string
  userEmail: string
}

export function IndividualLearnerDashboard({ userName, userEmail }: IndividualLearnerDashboardProps) {
  const stats = [
    {
      label: "Enrolled Courses",
      value: "8",
      icon: <BookOpen className="w-8 h-8" weight="duotone" />,
      trend: "+2 this month",
      trendUp: true,
    },
    {
      label: "Completed Courses",
      value: "12",
      icon: <Certificate className="w-8 h-8" weight="duotone" />,
      trend: "+3 this month",
      trendUp: true,
    },
    {
      label: "Avg Progress",
      value: "65%",
      icon: <TrendUp className="w-8 h-8" weight="duotone" />,
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Learning Hours",
      value: "34h",
      icon: <Clock className="w-8 h-8" weight="duotone" />,
      trend: "+8h this week",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Continue Learning",
      icon: <BookOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Continue learning"),
      variant: "primary" as const,
    },
    {
      label: "Course Catalog",
      icon: <BookBookmark className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Browse catalog"),
      variant: "primary" as const,
    },
    {
      label: "My Progress",
      icon: <TrendUp className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View progress"),
      variant: "secondary" as const,
    },
    {
      label: "Certificates",
      icon: <Certificate className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View certificates"),
      variant: "secondary" as const,
    },
    {
      label: "Goals",
      icon: <Target className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Set goals"),
      variant: "outline" as const,
    },
    {
      label: "Achievements",
      icon: <Trophy className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View achievements"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "Course progress updated",
      description: "Leadership Development: Module 3 completed (75% done)",
      time: "30 min ago",
      icon: <BookOpen className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "New certificate earned",
      description: "Communication Skills Fundamentals completed",
      time: "2 days ago",
      icon: <Certificate className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "New course enrolled",
      description: "Data Analytics for Beginners started",
      time: "3 days ago",
      icon: <BookBookmark className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Achievement unlocked",
      description: "Week Warrior: 7 consecutive days of learning",
      time: "5 days ago",
      icon: <Trophy className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Individual Learner"
      roleIcon={<UserCircle className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
