import { config } from "dotenv"
config({ path: ".env.local" })

import { createClient } from "@supabase/supabase-js"

// Initialize Supabase Admin Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("\n❌ Missing required environment variables!")
  console.error("\nPlease create a .env.local file in the project root with:")
  console.error("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url")
  console.error("SUPABASE_SERVICE_ROLE_KEY=your_service_role_key")
  console.error("\nYou can find these values in your Supabase project settings.")
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Test users for all 11 roles
const testUsers = [
  {
    email: "super_admin@lxd360.com",
    name: "Super Admin User",
    role: "super_admin",
    department: "System Administration",
  },
  {
    email: "admin@lxd360.com",
    name: "Admin User",
    role: "admin",
    department: "Platform Administration",
  },
  {
    email: "designer@lxd360.com",
    name: "Designer User",
    role: "designer",
    department: "Content Design",
  },
  {
    email: "lmsadmin@lxd360.com",
    name: "LMS Admin User",
    role: "lms_admin",
    department: "LMS Operations",
  },
  {
    email: "programadmin@lxd360.com",
    name: "Program Admin User",
    role: "program_admin",
    department: "Program Management",
  },
  {
    email: "courseadmin@lxd360.com",
    name: "Course Admin User",
    role: "course_admin",
    department: "Course Management",
  },
  {
    email: "sales@lxd360.com",
    name: "Sales User",
    role: "sales",
    department: "Sales",
  },
  {
    email: "manager@lxd360.com",
    name: "Manager User",
    role: "manager",
    department: "Team Management",
  },
  {
    email: "instructor@lxd360.com",
    name: "Instructor User",
    role: "instructor",
    department: "Teaching",
  },
  {
    email: "teamlearner@lxd360.com",
    name: "Team Learner User",
    role: "team_learner",
    department: "Learning",
  },
  {
    email: "learner@lxd360.com",
    name: "Individual Learner User",
    role: "individual_learner",
    department: "Learning",
  },
]

const DEFAULT_PASSWORD = "TestUser77!"

async function seedTestUsers() {
  console.log("🌱 Starting test user seed for all 11 roles...\n")

  let successCount = 0
  let errorCount = 0

  for (const user of testUsers) {
    try {
      console.log(`\n📝 Creating user: ${user.email} (${user.role})`)

      // Create auth user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: DEFAULT_PASSWORD,
        email_confirm: true,
        user_metadata: {
          full_name: user.name,
        },
      })

      if (authError) {
        console.error(`❌ Failed to create auth user ${user.email}:`, authError.message)
        errorCount++
        continue
      }

      console.log(`   ✓ Auth user created`)

      // Update profile with metadata
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({
          full_name: user.name,
          department: user.department,
        })
        .eq("id", authData.user.id)

      if (profileError) {
        console.error(`❌ Failed to update profile for ${user.email}:`, profileError.message)
        errorCount++
        continue
      }

      console.log(`   ✓ Profile updated`)

      // Get role ID
      const { data: roleData, error: roleError } = await supabaseAdmin
        .from("roles")
        .select("id")
        .eq("name", user.role)
        .single()

      if (roleError || !roleData) {
        console.error(`❌ Failed to find role ${user.role} for ${user.email}`)
        console.error(`   Make sure you've run the 001-create-all-11-roles.sql script first!`)
        errorCount++
        continue
      }

      console.log(`   ✓ Role found: ${user.role}`)

      // Assign role
      const { error: userRoleError } = await supabaseAdmin.from("user_roles").insert({
        user_id: authData.user.id,
        role_id: roleData.id,
      })

      if (userRoleError) {
        console.error(`❌ Failed to assign role for ${user.email}:`, userRoleError.message)
        errorCount++
        continue
      }

      console.log(`   ✓ Role assigned`)
      console.log(`✅ Successfully created: ${user.email}`)
      successCount++
    } catch (error) {
      console.error(`❌ Unexpected error creating ${user.email}:`, error)
      errorCount++
    }
  }

  console.log(`\n${"=".repeat(60)}`)
  console.log(`🎉 Seed complete!`)
  console.log(`   ✅ Success: ${successCount} users`)
  console.log(`   ❌ Errors: ${errorCount} users`)
  console.log(`\n📝 All users have password: ${DEFAULT_PASSWORD}`)
  console.log(`\n🔐 Test user credentials:`)
  testUsers.forEach((user) => {
    console.log(`   ${user.email} - ${user.name}`)
  })
  console.log(`${"=".repeat(60)}\n`)
}

// Run the seed
seedTestUsers()
  .then(() => {
    console.log("✨ Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Fatal error:", error)
    process.exit(1)
  })
