"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  ShoppingCart,
  TrendUp,
  Users,
  ChartLineUp,
  Handshake,
  Presentation,
  CurrencyDollar,
  Target,
} from "@phosphor-icons/react/dist/ssr"

interface SalesDashboardProps {
  userName: string
  userEmail: string
}

export function SalesDashboard({ userName, userEmail }: SalesDashboardProps) {
  const stats = [
    {
      label: "Active Leads",
      value: "87",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+12",
      trendUp: true,
    },
    {
      label: "Demos Scheduled",
      value: "23",
      icon: <Presentation className="w-8 h-8" weight="duotone" />,
      trend: "+8",
      trendUp: true,
    },
    {
      label: "Monthly Revenue",
      value: "$125k",
      icon: <CurrencyDollar className="w-8 h-8" weight="duotone" />,
      trend: "+18.5%",
      trendUp: true,
    },
    {
      label: "Conversion Rate",
      value: "32%",
      icon: <ChartLineUp className="w-8 h-8" weight="duotone" />,
      trend: "+5.2%",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "Add New Lead",
      icon: <Users className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Add lead"),
      variant: "primary" as const,
    },
    {
      label: "Schedule Demo",
      icon: <Presentation className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Schedule demo"),
      variant: "primary" as const,
    },
    {
      label: "Lead Pipeline",
      icon: <Target className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View pipeline"),
      variant: "secondary" as const,
    },
    {
      label: "Sales Analytics",
      icon: <ChartLineUp className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View analytics"),
      variant: "secondary" as const,
    },
    {
      label: "Proposals",
      icon: <Handshake className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("View proposals"),
      variant: "outline" as const,
    },
    {
      label: "Revenue Reports",
      icon: <CurrencyDollar className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Revenue reports"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New lead added",
      description: "Global Tech Corp - Enterprise plan inquiry",
      time: "15 min ago",
      icon: <Users className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "Demo completed",
      description: "Acme Industries - Positive feedback, proposal sent",
      time: "2 hours ago",
      icon: <Presentation className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Deal closed",
      description: "TechStart Inc - Annual subscription ($45k)",
      time: "4 hours ago",
      icon: <Handshake className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Follow-up scheduled",
      description: "Innovation Labs - Q1 implementation discussion",
      time: "1 day ago",
      icon: <Target className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Sales Representative"
      roleIcon={<ShoppingCart className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
