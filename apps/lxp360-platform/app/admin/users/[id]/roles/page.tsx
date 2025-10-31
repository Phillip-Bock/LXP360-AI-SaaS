import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { hasPermission } from "@/lib/rbac/permissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { AssignRoleForm } from "@/components/admin/assign-role-form"
import { RemoveRoleButton } from "@/components/admin/remove-role-button"

export default async function UserRolesPage({ params }: { params: { id: string } }) {
  const canManageRoles = await hasPermission("user:assign_role")

  if (!canManageRoles) {
    redirect("/dashboard?error=insufficient_permissions")
  }

  const supabase = await createClient()

  // Get user details
  const { data: user } = await supabase.from("user_profiles").select("*").eq("id", params.id).single()

  // Get user's current roles
  const { data: userRoles } = await supabase
    .from("user_roles")
    .select(`
      *,
      role:roles(*)
    `)
    .eq("user_id", params.id)

  // Get all available roles
  const { data: allRoles } = await supabase.from("roles").select("*").order("name")

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/admin/users">
          <Button variant="ghost">← Back to Users</Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Manage Roles for {user.first_name} {user.last_name}
        </h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Roles</h2>
          {userRoles && userRoles.length > 0 ? (
            <div className="space-y-4">
              {userRoles.map((ur: any) => (
                <Card key={ur.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg capitalize">{ur.role.name}</CardTitle>
                        <CardDescription>{ur.role.description}</CardDescription>
                      </div>
                      <RemoveRoleButton userId={params.id} roleName={ur.role.name} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      Assigned: {new Date(ur.assigned_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">No roles assigned yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Assign New Role</h2>
          <Card>
            <CardHeader>
              <CardTitle>Add Role</CardTitle>
              <CardDescription>Assign a new role to this user</CardDescription>
            </CardHeader>
            <CardContent>
              <AssignRoleForm userId={params.id} availableRoles={allRoles || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
