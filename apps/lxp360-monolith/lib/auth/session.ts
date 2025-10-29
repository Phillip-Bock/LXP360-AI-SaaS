"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile() {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return profile
}

export async function getUserRoles() {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) return []

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select(`
      role_id,
      roles (
        id,
        name,
        description
      )
    `)
    .eq("user_id", user.id)

  return userRoles?.map((ur: any) => ur.roles) || []
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/")
  }
  return session
}

export async function requireRole(roleName: string) {
  await requireAuth()
  const roles = await getUserRoles()
  const hasRole = roles.some((role: any) => role.name === roleName)

  if (!hasRole) {
    redirect("/dashboard")
  }
}
