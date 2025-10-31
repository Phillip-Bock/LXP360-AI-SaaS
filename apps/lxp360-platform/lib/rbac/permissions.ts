"use server"

import { createClient } from "@/lib/supabase/server"

export type Permission = {
  id: string
  name: string
  description: string | null
  resource: string
  action: string
}

export type Role = {
  id: string
  name: string
  description: string | null
}

export type UserRole = {
  id: string
  user_id: string
  role_id: string
  organization_id: string | null
  assigned_at: string
  expires_at: string | null
  role: Role
}

/**
 * Check if the current user has a specific permission
 */
export async function hasPermission(permissionName: string): Promise<boolean> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    // Check if user has the permission through their roles
    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        role:roles!inner(
          role_permissions!inner(
            permission:permissions!inner(name)
          )
        )
      `)
      .eq("user_id", user.id)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (error) {
      console.error("[v0] Error checking permission:", error)
      return false
    }

    // Check if any of the user's roles have the requested permission
    const hasAccess = data?.some((userRole: any) =>
      userRole.role?.role_permissions?.some((rp: any) => rp.permission?.name === permissionName),
    )

    return hasAccess || false
  } catch (error) {
    console.error("[v0] Exception checking permission:", error)
    return false
  }
}

/**
 * Check if the current user has any of the specified permissions
 */
export async function hasAnyPermission(permissionNames: string[]): Promise<boolean> {
  const results = await Promise.all(permissionNames.map(hasPermission))
  return results.some((result) => result)
}

/**
 * Check if the current user has all of the specified permissions
 */
export async function hasAllPermissions(permissionNames: string[]): Promise<boolean> {
  const results = await Promise.all(permissionNames.map(hasPermission))
  return results.every((result) => result)
}

/**
 * Get all permissions for the current user
 */
export async function getUserPermissions(): Promise<Permission[]> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        role:roles!inner(
          role_permissions!inner(
            permission:permissions!inner(*)
          )
        )
      `)
      .eq("user_id", user.id)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (error) {
      console.error("[v0] Error getting user permissions:", error)
      return []
    }

    // Flatten and deduplicate permissions
    const permissions = new Map<string, Permission>()
    data?.forEach((userRole: any) => {
      userRole.role?.role_permissions?.forEach((rp: any) => {
        const perm = rp.permission
        if (perm && !permissions.has(perm.id)) {
          permissions.set(perm.id, perm)
        }
      })
    })

    return Array.from(permissions.values())
  } catch (error) {
    console.error("[v0] Exception getting user permissions:", error)
    return []
  }
}

/**
 * Get all roles for the current user
 */
export async function getUserRoles(): Promise<UserRole[]> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        *,
        role:roles(*)
      `)
      .eq("user_id", user.id)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (error) {
      console.error("[v0] Error getting user roles:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("[v0] Exception getting user roles:", error)
    return []
  }
}

/**
 * Check if the current user has a specific role
 */
export async function hasRole(roleName: string): Promise<boolean> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false

    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        role:roles!inner(name)
      `)
      .eq("user_id", user.id)
      .eq("roles.name", roleName)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .limit(1)

    if (error) {
      console.error("[v0] Error checking role:", error)
      return false
    }

    return (data?.length || 0) > 0
  } catch (error) {
    console.error("[v0] Exception checking role:", error)
    return false
  }
}

/**
 * Assign a role to a user
 */
export async function assignRole(
  userId: string,
  roleName: string,
  organizationId?: string,
  expiresAt?: Date,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Check if current user has permission to assign roles
    const canAssign = await hasPermission("user:assign_role")
    if (!canAssign) {
      return { success: false, error: "You don't have permission to assign roles" }
    }

    // Get the role ID
    const { data: role, error: roleError } = await supabase.from("roles").select("id").eq("name", roleName).single()

    if (roleError || !role) {
      return { success: false, error: "Role not found" }
    }

    // Get current user for assigned_by
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Assign the role
    const { error: assignError } = await supabase.from("user_roles").insert({
      user_id: userId,
      role_id: role.id,
      organization_id: organizationId || null,
      assigned_by: user?.id,
      expires_at: expiresAt?.toISOString() || null,
    })

    if (assignError) {
      console.error("[v0] Error assigning role:", assignError)
      return { success: false, error: assignError.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Exception assigning role:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Remove a role from a user
 */
export async function removeRole(
  userId: string,
  roleName: string,
  organizationId?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Check if current user has permission to assign roles
    const canAssign = await hasPermission("user:assign_role")
    if (!canAssign) {
      return { success: false, error: "You don't have permission to remove roles" }
    }

    // Get the role ID
    const { data: role, error: roleError } = await supabase.from("roles").select("id").eq("name", roleName).single()

    if (roleError || !role) {
      return { success: false, error: "Role not found" }
    }

    // Remove the role
    let query = supabase.from("user_roles").delete().eq("user_id", userId).eq("role_id", role.id)

    if (organizationId) {
      query = query.eq("organization_id", organizationId)
    }

    const { error: removeError } = await query

    if (removeError) {
      console.error("[v0] Error removing role:", removeError)
      return { success: false, error: removeError.message }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Exception removing role:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
