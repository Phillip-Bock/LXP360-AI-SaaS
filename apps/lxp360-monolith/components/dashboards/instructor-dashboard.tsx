"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  Chalkboard,
  Users,
  BookOpen,
  ChartBar,
  GraduationCap,
  ClipboardText,
  ChatCircleDots,
  CalendarCheck,
} from "@phosphor-icons/react/dist/ssr"

interface InstructorDashboardProps {
  userName: string
  userEmail: string
}

export function InstructorDashboard({ userName, userEmail }: InstructorDashboardProps) {
  const stats = [
    {
      label: "Active Courses",
      value: "6",
      icon: <BookOpen className="w-8 h-8" weight="duotone" />,
      trend: "+1",
      trendUp: true,
    },
    {
      label: "Total Learners",
      value: "342",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+45",
      trendUp: true,
    },
    {
      label: "Avg Progress",
      value: "67%",
      icon: <ChartBar className="w-8 h-8" weight="duotone" />,
      trend: "+8.5%",
      trendUp: true,
    },
    {
      label: "Pending Reviews",
      value: "18",
      icon: <ClipboardText className="w-8 h-8" weight="duotone" />,
      trend: "-5",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "My Courses",
      icon: <BookOpen className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View courses"),
      variant: "primary" as const,
    },
    {
      label: "Grade Assignments",
      icon: <ClipboardText className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Grade assignments"),
      variant: "primary" as const,
    },
    {
      label: "Learner Progress",
      icon: <Users className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View progress"),
      variant: "secondary" as const,
    },
    {
      label: "Course Analytics",
      icon: <ChartBar className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View analytics"),
      variant: "secondary" as const,
    },
    {
      label: "Messages",
      icon: <ChatCircleDots className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View messages"),
      variant: "outline" as const,
    },
    {
      label: "Schedule",
      icon: <CalendarCheck className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View schedule"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New assignment submissions",
      description: "12 learners submitted Module 3 assignments",
      time: "25 min ago",
      icon: <ClipboardText className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "Course feedback received",
      description: "Leadership Training: 4.9/5 rating from 28 learners",
      time: "2 hours ago",
      icon: <ChartBar className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Learner question posted",
      description: "Project Management Module - Discussion forum activity",
      time: "4 hours ago",
      icon: <ChatCircleDots className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Course milestone reached",
      description: "Communication Skills: 50 learners completed Module 2",
      time: "1 day ago",
      icon: <GraduationCap className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Instructor"
      roleIcon={<Chalkboard className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
