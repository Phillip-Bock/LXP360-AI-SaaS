"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { SignOut, TrendUp, CheckCircle, Clock, Users } from "@phosphor-icons/react/dist/ssr"
import { motion } from "framer-motion"

interface StatCard {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

interface QuickAction {
  label: string
  icon: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "outline"
}

interface RecentActivity {
  id: string
  title: string
  description: string
  time: string
  icon: React.ReactNode
}

interface BaseDashboardProps {
  roleName: string
  roleIcon: React.ReactNode
  userName: string
  userEmail: string
  stats: StatCard[]
  quickActions: QuickAction[]
  recentActivities: RecentActivity[]
}

export function BaseDashboardTemplate({
  roleName,
  roleIcon,
  userName,
  userEmail,
  stats,
  quickActions,
  recentActivities,
}: BaseDashboardProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/signout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[#001D3D] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-[#F5F5F5] border-[1.5px] border-[#0056B8] rounded-[10px] p-6 shadow-[0_2px_10px_rgba(0,86,184,0.1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[#0056B8]">{roleIcon}</div>
                <div>
                  <h1 className="text-2xl font-bold text-[#232323] font-[family-name:var(--font-montserrat)]">
                    {roleName}
                  </h1>
                  <p className="text-sm text-[#232323]/70 font-[family-name:var(--font-lato)]">{userName}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-[#7103A0] text-[#232323] hover:bg-[#7103A0]/10 rounded-[10px]"
              >
                <SignOut className="w-5 h-5 mr-2" weight="duotone" />
                Logout
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-[#F5F5F5] border-[1.5px] border-[#D6D6D6] rounded-[10px] p-4 hover:shadow-[0_4px_20px_rgba(0,86,184,0.15)] transition-all">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-[#232323]/70 font-[family-name:var(--font-lato)]">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#232323] font-[family-name:var(--font-montserrat)]">
                      {stat.value}
                    </p>
                    {stat.trend && (
                      <div className="flex items-center gap-1">
                        <TrendUp
                          className={`w-4 h-4 ${stat.trendUp ? "text-[#30AE0A]" : "text-[#A60303]"}`}
                          weight="bold"
                        />
                        <span
                          className={`text-xs font-[family-name:var(--font-lato)] ${stat.trendUp ? "text-[#30AE0A]" : "text-[#A60303]"}`}
                        >
                          {stat.trend}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-[#0056B8]">{stat.icon}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-[#F5F5F5] border-[1.5px] border-[#D6D6D6] rounded-[10px] p-6">
            <h2 className="text-xl font-bold text-[#232323] font-[family-name:var(--font-montserrat)] mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button
                    onClick={action.onClick}
                    className={`w-full h-auto flex flex-col items-center gap-2 p-4 rounded-[10px] ${
                      action.variant === "primary"
                        ? "bg-[#0056B8] text-[#F5F5F5] hover:bg-[#00438F] border-[1.5px] border-[#7103A0]"
                        : action.variant === "secondary"
                          ? "bg-[#F5F5F5] text-[#232323] border-[1.5px] border-[#0056B8] hover:bg-[#0056B8]/10"
                          : "bg-[#F5F5F5] text-[#232323] border-[1.5px] border-[#D6D6D6] hover:bg-[#D6D6D6]/30"
                    }`}
                  >
                    <div className={action.variant === "primary" ? "text-[#F5F5F5]" : "text-[#0056B8]"}>
                      {action.icon}
                    </div>
                    <span className="text-xs font-[family-name:var(--font-lato)] text-center">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="bg-[#F5F5F5] border-[1.5px] border-[#D6D6D6] rounded-[10px] p-6">
            <h2 className="text-xl font-bold text-[#232323] font-[family-name:var(--font-montserrat)] mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-[#D6D6D6] hover:border-[#0056B8] hover:bg-[#0056B8]/5 transition-all cursor-pointer"
                >
                  <div className="text-[#0056B8] mt-1">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#232323] font-[family-name:var(--font-lato)]">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[#232323]/70 font-[family-name:var(--font-lato)] mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-[#232323]/50 font-[family-name:var(--font-lato)] whitespace-nowrap">
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
