"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { assignRole } from "@/lib/rbac/permissions"

export async function signIn(email: string, password: string) {
  console.log("[v0] signIn called with email:", email)

  try {
    const supabase = await createClient()
    console.log("[v0] Supabase client created")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("[v0] Sign in result:", { success: !error, error: error?.message })

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        return { error: "Invalid email or password", success: false }
      }
      if (error.message.includes("Email not confirmed")) {
        return {
          error: "Please confirm your email address before signing in. Check your inbox for the confirmation link.",
          success: false,
        }
      }
      return { error: error.message, success: false }
    }

    console.log("[v0] Sign in successful, user:", data.user?.email)
    revalidatePath("/", "layout")

    return { success: true, redirectTo: "/dashboard" }
  } catch (err) {
    console.error("[v0] Sign in exception:", err)
    return { error: "An unexpected error occurred", success: false }
  }
}

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  console.log("[v0] signUp called with email:", email)

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      },
    })

    console.log("[v0] Sign up result:", { success: !error, error: error?.message })

    if (error) {
      if (error.message.includes("already registered")) {
        return { error: "This email is already registered. Please sign in instead.", success: false }
      }
      return { error: error.message, success: false }
    }

    if (data.user) {
      console.log("[v0] Assigning learner role to new user")
      await assignRole(data.user.id, "learner")
    }

    if (data.user && !data.session) {
      console.log("[v0] Email confirmation required")
      return {
        success: true,
        requiresConfirmation: true,
        message: "Please check your email to confirm your account before signing in.",
      }
    }

    console.log("[v0] Sign up successful, user:", data.user?.email)
    revalidatePath("/", "layout")
    return { success: true, redirectTo: "/dashboard" }
  } catch (err) {
    console.error("[v0] Sign up exception:", err)
    return { error: "An unexpected error occurred", success: false }
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath("/", "layout")
    return { success: true, redirectTo: "/" }
  } catch (err) {
    console.error("[v0] Sign out exception:", err)
    return { error: "An unexpected error occurred", success: false }
  }
}

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Get user profile with organization
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*, organizations(*)")
    .eq("id", user.id)
    .single()

  return {
    ...user,
    profile,
  }
}
