"use server"

import { createClient } from "@/lib/supabase/server"
import { cache } from "react"

// Types for RBAC
export interface Role {
  id: string
  name: string
  display_name: string
  description: string | null
  role_type: "internal" | "external" | "partner"
  privilege_level: number
  is_platform_role: boolean
  is_active: boolean
}

export interface Permission {
  id: string
  name: string
  display_name: string
  description: string | null
  resource: string
  action: string
  scope: "platform" | "tenant" | "organization" | "self"
}

export interface UserRole {
  id: string
  user_id: string
  role_id: string
  organization_id: string | null
  expires_at: string | null
  is_active: boolean
  role: Role
}

/**
 * Get all roles assigned to a user
 */
export const getUserRoles = cache(async (userId: string): Promise<UserRole[]> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("user_roles")
    .select(`
      *,
      role:roles(*)
    `)
    .eq("user_id", userId)
    .eq("is_active", true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

  if (error) {
    console.error("[v0] Error fetching user roles:", error)
    return []
  }

  return data as UserRole[]
})

/**
 * Get all permissions for a user (aggregated from all their roles)
 */
export const getUserPermissions = cache(async (userId: string): Promise<Permission[]> => {
  const supabase = await createClient()

  // Get user's active roles
  const userRoles = await getUserRoles(userId)
  const roleIds = userRoles.map((ur) => ur.role_id)

  if (roleIds.length === 0) {
    return []
  }

  // Get all permissions for these roles
  const { data, error } = await supabase
    .from("role_permissions")
    .select(`
      permission:permissions(*)
    `)
    .in("role_id", roleIds)
    .eq("is_granted", true)

  if (error) {
    console.error("[v0] Error fetching user permissions:", error)
    return []
  }

  // Deduplicate permissions
  const permissionMap = new Map<string, Permission>()
  data.forEach((item) => {
    if (item.permission) {
      permissionMap.set(item.permission.id, item.permission as Permission)
    }
  })

  return Array.from(permissionMap.values())
})

/**
 * Check if user has a specific permission
 */
export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  return permissions.some((p) => p.name === permissionName)
}

/**
 * Check if user has any of the specified permissions
 */
export async function hasAnyPermission(userId: string, permissionNames: string[]): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  const userPermissionNames = new Set(permissions.map((p) => p.name))
  return permissionNames.some((name) => userPermissionNames.has(name))
}

/**
 * Check if user has all of the specified permissions
 */
export async function hasAllPermissions(userId: string, permissionNames: string[]): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  const userPermissionNames = new Set(permissions.map((p) => p.name))
  return permissionNames.every((name) => userPermissionNames.has(name))
}

/**
 * Check if user has a specific role
 */
export async function hasRole(userId: string, roleName: string): Promise<boolean> {
  const roles = await getUserRoles(userId)
  return roles.some((ur) => ur.role.name === roleName)
}

/**
 * Check if user has any of the specified roles
 */
export async function hasAnyRole(userId: string, roleNames: string[]): Promise<boolean> {
  const roles = await getUserRoles(userId)
  const userRoleNames = new Set(roles.map((ur) => ur.role.name))
  return roleNames.some((name) => userRoleNames.has(name))
}

/**
 * Check if user is a platform admin (platform-level role with high privilege)
 */
export async function isPlatformAdmin(userId: string): Promise<boolean> {
  const roles = await getUserRoles(userId)
  return roles.some((ur) => ur.role.is_platform_role && ur.role.privilege_level >= 900)
}

/**
 * Check if user is a tenant admin
 */
export async function isTenantAdmin(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ["tenant_owner", "tenant_administrator"])
}

/**
 * Get user's highest privilege level
 */
export async function getUserPrivilegeLevel(userId: string): Promise<number> {
  const roles = await getUserRoles(userId)
  if (roles.length === 0) return 0
  return Math.max(...roles.map((ur) => ur.role.privilege_level))
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
  const supabase = await createClient()

  // Get the current user (who is assigning the role)
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()
  if (!currentUser) {
    return { success: false, error: "Not authenticated" }
  }

  // Check if current user has permission to assign roles
  const canAssign = await hasPermission(currentUser.id, "roles.assign")
  if (!canAssign) {
    return { success: false, error: "Insufficient permissions to assign roles" }
  }

  // Get the role ID
  const { data: role, error: roleError } = await supabase.from("roles").select("id").eq("name", roleName).single()

  if (roleError || !role) {
    return { success: false, error: "Role not found" }
  }

  // Assign the role
  const { error: assignError } = await supabase.from("user_roles").insert({
    user_id: userId,
    role_id: role.id,
    organization_id: organizationId,
    granted_by: currentUser.id,
    expires_at: expiresAt?.toISOString(),
    is_active: true,
  })

  if (assignError) {
    console.error("[v0] Error assigning role:", assignError)
    return { success: false, error: "Failed to assign role" }
  }

  // Log the action
  await supabase.from("rbac_audit_log").insert({
    action: "role_assigned",
    actor_id: currentUser.id,
    target_user_id: userId,
    role_id: role.id,
    organization_id: organizationId,
    details: { role_name: roleName },
  })

  return { success: true }
}

/**
 * Revoke a role from a user
 */
export async function revokeRole(userId: string, roleName: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()
  if (!currentUser) {
    return { success: false, error: "Not authenticated" }
  }

  // Check if current user has permission to revoke roles
  const canRevoke = await hasPermission(currentUser.id, "roles.revoke")
  if (!canRevoke) {
    return { success: false, error: "Insufficient permissions to revoke roles" }
  }

  // Get the role ID
  const { data: role, error: roleError } = await supabase.from("roles").select("id").eq("name", roleName).single()

  if (roleError || !role) {
    return { success: false, error: "Role not found" }
  }

  // Revoke the role (soft delete by setting is_active to false)
  const { error: revokeError } = await supabase
    .from("user_roles")
    .update({ is_active: false })
    .eq("user_id", userId)
    .eq("role_id", role.id)

  if (revokeError) {
    console.error("[v0] Error revoking role:", revokeError)
    return { success: false, error: "Failed to revoke role" }
  }

  // Log the action
  await supabase.from("rbac_audit_log").insert({
    action: "role_revoked",
    actor_id: currentUser.id,
    target_user_id: userId,
    role_id: role.id,
    details: { role_name: roleName },
  })

  return { success: true }
}

/**
 * Get all available roles (for admin UI)
 */
export async function getAllRoles(): Promise<Role[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .eq("is_active", true)
    .order("privilege_level", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching roles:", error)
    return []
  }

  return data as Role[]
}

/**
 * Get all available permissions (for admin UI)
 */
export async function getAllPermissions(): Promise<Permission[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("permissions")
    .select("*")
    .eq("is_active", true)
    .order("resource", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching permissions:", error)
    return []
  }

  return data as Permission[]
}
