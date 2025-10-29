import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { hasPermission } from "@/lib/rbac/permissions"

type UserRow = {
  email: string
  first_name: string
  last_name: string
  role?: string
  organization_id?: string
}

export async function POST(request: NextRequest) {
  try {
    // Check permissions
    const canCreateUsers = await hasPermission("user:create")
    if (!canCreateUsers) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read CSV file
    const text = await file.text()
    const lines = text.split("\n").filter((line) => line.trim())

    if (lines.length < 2) {
      return NextResponse.json({ error: "CSV file is empty or invalid" }, { status: 400 })
    }

    // Parse CSV header
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
    const requiredHeaders = ["email", "first_name", "last_name"]

    const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h))
    if (missingHeaders.length > 0) {
      return NextResponse.json({ error: `Missing required columns: ${missingHeaders.join(", ")}` }, { status: 400 })
    }

    // Create Supabase admin client
    const supabase = await createClient()

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ row: number; email: string; error: string }>,
    }

    // Process each row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = line.split(",").map((v) => v.trim())
      const row: Record<string, string> = {}

      headers.forEach((header, index) => {
        row[header] = values[index] || ""
      })

      const userRow: UserRow = {
        email: row.email,
        first_name: row.first_name,
        last_name: row.last_name,
        role: row.role || "learner",
        organization_id: row.organization_id || undefined,
      }

      // Validate required fields
      if (!userRow.email || !userRow.first_name || !userRow.last_name) {
        results.failed++
        results.errors.push({
          row: i + 1,
          email: userRow.email || "unknown",
          error: "Missing required fields",
        })
        continue
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userRow.email)) {
        results.failed++
        results.errors.push({
          row: i + 1,
          email: userRow.email,
          error: "Invalid email format",
        })
        continue
      }

      try {
        // Create user via Supabase Admin API
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: userRow.email,
          password: "TestUser77!",
          email_confirm: true,
          user_metadata: {
            first_name: userRow.first_name,
            last_name: userRow.last_name,
          },
        })

        if (authError) {
          results.failed++
          results.errors.push({
            row: i + 1,
            email: userRow.email,
            error: authError.message,
          })
          continue
        }

        // Update profile with organization_id if provided
        if (userRow.organization_id && authData.user) {
          await supabase
            .from("profiles")
            .update({
              organization_id: userRow.organization_id,
            })
            .eq("id", authData.user.id)
        }

        // Assign role if provided
        if (userRow.role && authData.user) {
          const { data: roleData } = await supabase.from("roles").select("id").eq("name", userRow.role).single()

          if (roleData) {
            await supabase.from("user_roles").insert({
              user_id: authData.user.id,
              role_id: roleData.id,
              organization_id: userRow.organization_id || null,
            })
          }
        }

        results.success++
      } catch (error: any) {
        results.failed++
        results.errors.push({
          row: i + 1,
          email: userRow.email,
          error: error.message || "Unknown error",
        })
      }
    }

    return NextResponse.json(results)
  } catch (error: any) {
    console.error("[v0] Error in bulk import:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
