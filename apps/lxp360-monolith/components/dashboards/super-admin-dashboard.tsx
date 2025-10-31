"use client"

import { BaseDashboardTemplate } from "./base-dashboard-template"
import {
  UserGear,
  Users,
  GraduationCap,
  Buildings,
  ChartLine,
  Gear,
  Database,
  Shield,
  Bell,
  FileText,
  CloudArrowUp,
  Key,
} from "@phosphor-icons/react/dist/ssr"

interface SuperAdminDashboardProps {
  userName: string
  userEmail: string
}

export function SuperAdminDashboard({ userName, userEmail }: SuperAdminDashboardProps) {
  const stats = [
    {
      label: "Total Users",
      value: "15,234",
      icon: <Users className="w-8 h-8" weight="duotone" />,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      label: "Organizations",
      value: "487",
      icon: <Buildings className="w-8 h-8" weight="duotone" />,
      trend: "+8.3%",
      trendUp: true,
    },
    {
      label: "Total Courses",
      value: "2,891",
      icon: <GraduationCap className="w-8 h-8" weight="duotone" />,
      trend: "+15.2%",
      trendUp: true,
    },
    {
      label: "System Health",
      value: "99.8%",
      icon: <ChartLine className="w-8 h-8" weight="duotone" />,
      trend: "+0.2%",
      trendUp: true,
    },
  ]

  const quickActions = [
    {
      label: "User Management",
      icon: <Users className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to user management"),
      variant: "primary" as const,
    },
    {
      label: "System Settings",
      icon: <Gear className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to system settings"),
      variant: "primary" as const,
    },
    {
      label: "Database Tools",
      icon: <Database className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to database tools"),
      variant: "secondary" as const,
    },
    {
      label: "Security & Roles",
      icon: <Shield className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to RBAC"),
      variant: "secondary" as const,
    },
    {
      label: "System Logs",
      icon: <FileText className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to logs"),
      variant: "outline" as const,
    },
    {
      label: "Backup & Restore",
      icon: <CloudArrowUp className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to backups"),
      variant: "outline" as const,
    },
    {
      label: "API Keys",
      icon: <Key className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to API keys"),
      variant: "outline" as const,
    },
    {
      label: "Notifications",
      icon: <Bell className="w-6 h-6" weight="duotone" />,
      onClick: () => console.log("Navigate to notifications"),
      variant: "outline" as const,
    },
  ]

  const recentActivities = [
    {
      id: "1",
      title: "New organization registered",
      description: "Acme Corp has completed registration with 250 users",
      time: "5 min ago",
      icon: <Buildings className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "2",
      title: "System backup completed",
      description: "Automated daily backup finished successfully (2.3 GB)",
      time: "1 hour ago",
      icon: <CloudArrowUp className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "3",
      title: "Security alert resolved",
      description: "Failed login attempts from IP 192.168.1.100 blocked",
      time: "2 hours ago",
      icon: <Shield className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "4",
      title: "Database optimization completed",
      description: "Query performance improved by 23% after indexing",
      time: "3 hours ago",
      icon: <Database className="w-5 h-5" weight="duotone" />,
    },
    {
      id: "5",
      title: "New super admin assigned",
      description: "John Smith granted super admin privileges",
      time: "5 hours ago",
      icon: <UserGear className="w-5 h-5" weight="duotone" />,
    },
  ]

  return (
    <BaseDashboardTemplate
      roleName="Super Administrator"
      roleIcon={<UserGear className="w-12 h-12" weight="duotone" />}
      userName={userName}
      userEmail={userEmail}
      stats={stats}
      quickActions={quickActions}
      recentActivities={recentActivities}
    />
  )
}
