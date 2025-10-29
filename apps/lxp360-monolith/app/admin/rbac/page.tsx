import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { isPlatformAdmin, isTenantAdmin } from "@/lib/rbac/enterprise-permissions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Key, FileText, Settings } from "lucide-react"

export default async function RBACAdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check if user has admin permissions
  const isAdmin = (await isPlatformAdmin(user.id)) || (await isTenantAdmin(user.id))

  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">RBAC Administration</h1>
        <p className="text-muted-foreground">Manage roles, permissions, and user access across the platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>User Management</CardTitle>
            </div>
            <CardDescription>View and manage user accounts and their role assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/users">
              <Button className="w-full">Manage Users</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Roles</CardTitle>
            </div>
            <CardDescription>Configure roles and their permission sets</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/rbac/roles">
              <Button className="w-full">Manage Roles</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>Permissions</CardTitle>
            </div>
            <CardDescription>View and configure granular permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/rbac/permissions">
              <Button className="w-full">View Permissions</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Audit Logs</CardTitle>
            </div>
            <CardDescription>Review role and permission change history</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/rbac/audit">
              <Button className="w-full">View Audit Logs</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>Role Categories</CardTitle>
            </div>
            <CardDescription>Organize roles into categories and groups</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/rbac/categories">
              <Button className="w-full">Manage Categories</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Roles:</span>
              <span className="font-semibold">80+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Permissions:</span>
              <span className="font-semibold">70+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Role Categories:</span>
              <span className="font-semibold">15</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Enterprise RBAC Features</CardTitle>
            <CardDescription>Comprehensive role-based access control for multi-tenant e-learning</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>
                  <strong>Multi-Tenant Isolation:</strong> Strict data separation between tenants with role hierarchy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>
                  <strong>Platform & Tenant Roles:</strong> Separate roles for platform operations and tenant
                  administration
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>
                  <strong>Granular Permissions:</strong> 70+ permissions across 12 categories for fine-grained access
                  control
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>
                  <strong>Role Hierarchy:</strong> Privilege levels from learners (100) to platform super admins (1000)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>
                  <strong>Contextual Access:</strong> Time-based, organization-scoped, and conditional role assignments
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>
                  <strong>Audit Trail:</strong> Complete logging of all role and permission changes
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
