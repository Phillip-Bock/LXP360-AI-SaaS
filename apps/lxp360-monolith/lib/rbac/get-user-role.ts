"use server"

import { createClient } from "@/lib/supabase/server"
import { type UserRoleType, ROLE_HIERARCHY } from "@/lib/types/user-roles"

/**
 * Get the primary role for the current user
 * Returns the highest privilege role if user has multiple roles
 */
export async function getUserPrimaryRole(): Promise<UserRoleType> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("[v0] No authenticated user found")
      return null
    }

    console.log("[v0] Getting roles for user:", user.email)

    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        role:roles!inner(name)
      `)
      .eq("user_id", user.id)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (error) {
      console.error("[v0] Error fetching user roles:", error)
      return "individual_learner" // Default to individual learner if error
    }

    if (!data || data.length === 0) {
      console.log("[v0] No roles found, defaulting to individual_learner")
      return "individual_learner"
    }

    // Get all role names
    const roleNames = data.map((ur: any) => ur.role?.name).filter(Boolean) as UserRoleType[]
    console.log("[v0] User has roles:", roleNames)

    // Find the highest privilege role
    let highestRole: UserRoleType = "individual_learner"
    let highestPriority = 0

    for (const roleName of roleNames) {
      const priority = ROLE_HIERARCHY[roleName as Exclude<UserRoleType, null>] || 0
      if (priority > highestPriority) {
        highestPriority = priority
        highestRole = roleName
      }
    }

    console.log("[v0] Primary role determined:", highestRole)
    return highestRole
  } catch (error) {
    console.error("[v0] Error getting user role:", error)
    // In development mode without Supabase, return null to allow dev mode override
    return null
  }
}

/**
 * Get all role names for the current user
 */
export async function getUserRoleNames(): Promise<string[]> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        role:roles!inner(name)
      `)
      .eq("user_id", user.id)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)

    if (error || !data) return []

    return data.map((ur: any) => ur.role?.name).filter(Boolean)
  } catch (error) {
    console.error("[v0] Error getting user role names:", error)
    return []
  }
}

/**
 * Get the current user's information
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // Get profile data
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, department, organization_id")
      .eq("id", user.id)
      .single()

    return {
      id: user.id,
      email: user.email,
      name: profile?.full_name || user.email,
      department: profile?.department,
      organizationId: profile?.organization_id,
    }
  } catch (error) {
    console.error("[v0] Error getting current user:", error)
    // In development mode without Supabase, return null to allow dev mode override
    return null
  }
}
