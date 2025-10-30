import { redirect } from "next/navigation"
import { getUserPrimaryRole, getCurrentUser } from "@/lib/rbac/get-user-role"
import { DashboardClient } from "@/components/dashboard-client"

function getWorkdaysBetween(date1: Date, date2: Date): number {
  let count = 0
  const current = new Date(date1)
  while (current <= date2) {
    const dayOfWeek = current.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) count++
    current.setDate(current.getDate() + 1)
  }
  return count
}

function getOutlineColor(dueDate: string): string {
  const today = new Date()
  const due = new Date(dueDate)
  const workdays = getWorkdaysBetween(today, due)

  if (workdays <= 15) return "ring-2 ring-red-500"
  if (workdays <= 30) return "ring-2 ring-orange-500"
  if (workdays <= 45) return "ring-2 ring-yellow-500"
  if (workdays <= 60) return "ring-2 ring-green-500"
  return ""
}

const today = new Date()
const projects = [
  {
    id: 1,
    title: "Employee Onboarding Module",
    due: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "In Progress",
  },
  {
    id: 2,
    title: "Safety Training Course",
    due: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Review",
  },
  {
    id: 3,
    title: "Leadership Development",
    due: new Date(today.getTime() + 18 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "In Progress",
  },
  {
    id: 4,
    title: "Compliance Training Q1",
    due: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Draft",
  },
  {
    id: 5,
    title: "Product Knowledge Series",
    due: new Date(today.getTime() + 32 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "In Progress",
  },
  {
    id: 6,
    title: "Customer Service Excellence",
    due: new Date(today.getTime() + 38 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "On Hold",
  },
  {
    id: 7,
    title: "Technical Skills Workshop",
    due: new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Planning",
  },
  {
    id: 8,
    title: "Sales Methodology Training",
    due: new Date(today.getTime() + 50 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "In Progress",
  },
  {
    id: 9,
    title: "Diversity & Inclusion Module",
    due: new Date(today.getTime() + 55 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Review",
  },
  {
    id: 10,
    title: "Project Management Basics",
    due: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Draft",
  },
  {
    id: 11,
    title: "Communication Skills",
    due: new Date(today.getTime() + 65 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Not Assigned",
  },
  {
    id: 12,
    title: "Time Management Course",
    due: new Date(today.getTime() + 70 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Planning",
  },
  {
    id: 13,
    title: "Cybersecurity Awareness",
    due: new Date(today.getTime() + 75 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Not Assigned",
  },
  {
    id: 14,
    title: "Remote Work Best Practices",
    due: new Date(today.getTime() + 80 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Not Assigned",
  },
  {
    id: 15,
    title: "Performance Review Training",
    due: new Date(today.getTime() + 85 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Internal",
  },
  {
    id: 16,
    title: "Wellness & Mental Health",
    due: new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Internal",
  },
  {
    id: 17,
    title: "Innovation Workshop Series",
    due: new Date(today.getTime() + 95 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Temporary",
  },
  {
    id: 18,
    title: "Ethics & Compliance Update",
    due: new Date(today.getTime() + 100 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
    status: "Temporary",
  },
]

const messages = [
  {
    id: 1,
    subject: "Course Review Required",
    preview: "The Employee Onboarding Module needs your review before final approval...",
    from: "Sarah Johnson",
    time: "2 hours ago",
  },
  {
    id: 2,
    subject: "Deadline Extension Request",
    preview:
      "Hi Phillip, I wanted to request a 5-day extension on the Safety Training Course due to additional content requirements from the compliance team...",
    from: "Michael Chen",
    time: "5 hours ago",
  },
  {
    id: 3,
    subject: "New Project Assignment",
    preview: "You've been assigned as the lead instructional designer for the Q2 Leadership Development program...",
    from: "Jennifer Martinez",
    time: "Yesterday",
  },
]

export default async function DashboardPage() {
  const userRole = await getUserPrimaryRole()
  const currentUser = await getCurrentUser()

  console.log("[v0] Dashboard - User role:", userRole)
  console.log("[v0] Dashboard - Current user:", currentUser)

  // Redirect to login if not authenticated
  if (!userRole || !currentUser) {
    console.log("[v0] No user or role, redirecting to login")
    redirect("/auth/login")
  }

  return (
    <DashboardClient
      role={userRole}
      userName={currentUser.name || "Unknown User"}
      userEmail={currentUser.email || ""}
    />
  )
}
