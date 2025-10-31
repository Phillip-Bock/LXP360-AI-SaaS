import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { hasRole } from "@/lib/rbac/permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation"
import { Shield, Users } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function RolesAdminPage() {
  // Check if user is admin
  const isAdmin = await hasRole("admin")

  if (!isAdmin) {
    redirect("/dashboard?error=insufficient_permissions")
  }

  const supabase = await createClient()

  // Get all roles with permission counts
  const { data: roles, error } = await supabase
    .from("roles")
    .select(`
      *,
      role_permissions(count),
      user_roles(count)
    `)
    .order("name")

  if (error) {
    console.error("Error fetching roles:", error)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/admin">
          <Button variant="ghost">← Back to Admin</Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Roles & Permissions</h1>
        <p className="text-muted-foreground">Manage system roles and their permissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles?.map((role: any) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="secondary">{role.user_roles?.[0]?.count || 0} users</Badge>
              </div>
              <CardTitle className="text-xl capitalize">{role.name}</CardTitle>
              <CardDescription className="line-clamp-2">{role.description || "No description"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Users className="h-4 w-4" />
                <span>{role.role_permissions?.[0]?.count || 0} permissions</span>
              </div>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href={`/admin/roles/${role.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
