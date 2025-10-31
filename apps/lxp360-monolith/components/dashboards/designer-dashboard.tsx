"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  PaintBrush,
  FilePlus,
  FolderOpen,
  Sparkle,
  Image,
  Video,
  FileText,
  MagicWand,
  PenNib,
  Palette,
} from "@phosphor-icons/react/dist/ssr"

interface DesignerDashboardProps {
  userName: string
  userEmail: string
}

export function DesignerDashboard({ userName, userEmail }: DesignerDashboardProps) {
  const stats = [
    {
      label: "Projects In Progress",
      value: "8",
      icon: <FolderOpen className="w-8 h-8" weight="duotone" />,
      trend: "+2",
      trendUp: true,
    },
    {
      label: "Media Assets",
      value: "342",
      icon: <Image className="w-8 h-8" weight="duotone" />,
      trend: "+23",
      trendUp: true,
    },
    {
      label: "AI Tools Used",
      value: "156",
      icon: <Sparkle className="w-8 h-8" weight="duotone" />,
      trend: "+45%",
      trendUp: true,
    },
    {
      label: "Templates Created",
      value: "24",
      icon: <Palette className="w-8 h-8" weight="duotone" />,
      trend: "+6",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "New Project",
      icon: <FilePlus className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Create project"),
      variant: "primary" as const,
    },
    {
      label: "AI Content Tools",
      icon: <Sparkle className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("AI tools"),
      variant: "primary" as const,
    },
    {
      label: "Media Library",
      icon: <Image className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Media library"),
      variant: "secondary" as const,
    },
    {
      label: "Upload Assets",
      icon: <Video className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Upload"),
      variant: "secondary" as const,
    },
    {
      label: "ICES Tools",
      icon: <MagicWand className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("ICES"),
      variant: "outline" as const,
    },
    {
      label: "ILMI Tools",
      icon: <PenNib className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("ILMI"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New course template created",
      description: "Employee Onboarding Module template saved",
      time: "15 min ago",
      icon: <Palette className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "AI-generated content",
      description: "45 quiz questions created using ICES",
      time: "1 hour ago",
      icon: <Sparkle className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Media uploaded",
      description: "12 new training videos added to library",
      time: "3 hours ago",
      icon: <Video className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Project milestone reached",
      description: "Safety Training Course - Design phase completed",
      time: "5 hours ago",
      icon: <FolderOpen className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Instructional Designer"
      roleIcon={<PaintBrush className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
