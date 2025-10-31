import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { hasPermission } from "@/lib/rbac/permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation"
import { Upload, Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function UsersAdminPage() {
  // Check if user has permission to view users
  const canViewUsers = await hasPermission("user:read")

  if (!canViewUsers) {
    redirect("/dashboard?error=insufficient_permissions")
  }

  const supabase = await createClient()

  // Get all users with their roles
  const { data: users, error } = await supabase
    .from("user_profiles")
    .select(`
      *,
      user_roles(
        *,
        role:roles(*)
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  const canManageRoles = await hasPermission("user:assign_role")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/admin">
          <Button variant="ghost">← Back to Admin</Button>
        </Link>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage users and their roles</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/users/bulk-import">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Import
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users/create">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {users?.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>
                    {user.first_name} {user.last_name}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {user.user_roles?.map((ur: any) => (
                    <Badge key={ur.id} variant="secondary">
                      {ur.role?.name}
                    </Badge>
                  ))}
                  {(!user.user_roles || user.user_roles.length === 0) && <Badge variant="outline">No roles</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {canManageRoles && (
                  <Link href={`/admin/users/${user.id}/roles`}>
                    <Button variant="outline" size="sm">
                      Manage Roles
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/users/${user.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
