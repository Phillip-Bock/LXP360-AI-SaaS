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

// Test user data based on customer profiles
const testUsers = [
  // Growth Spark Solutions (Small Business - 8 learners)
  {
    email: "sarah.chen@growthspark.com",
    name: "Sarah Chen",
    role: "admin", // Changed from tenant_administrator to admin (role that exists in DB)
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Leadership",
  },
  {
    email: "mike.rodriguez@growthspark.com",
    name: "Mike Rodriguez",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Sales",
  },
  {
    email: "emily.watson@growthspark.com",
    name: "Emily Watson",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Marketing",
  },
  {
    email: "james.kim@growthspark.com",
    name: "James Kim",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Operations",
  },
  {
    email: "lisa.patel@growthspark.com",
    name: "Lisa Patel",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Customer Success",
  },
  {
    email: "david.thompson@growthspark.com",
    name: "David Thompson",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Finance",
  },
  {
    email: "rachel.nguyen@growthspark.com",
    name: "Rachel Nguyen",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "HR",
  },
  {
    email: "tom.anderson@growthspark.com",
    name: "Tom Anderson",
    role: "learner",
    organizationId: "11111111-1111-1111-1111-111111111111",
    department: "Product",
  },

  // Innovate Tech Labs (White-label - 15 learners)
  {
    email: "priya.sharma@innovatetech.com",
    name: "Priya Sharma",
    role: "admin", // Changed from tenant_administrator to admin
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Engineering",
  },
  {
    email: "marcus.johnson@innovatetech.com",
    name: "Marcus Johnson",
    role: "manager", // Changed from content_manager to manager (role that exists in DB)
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "L&D",
  },
  {
    email: "sophia.martinez@innovatetech.com",
    name: "Sophia Martinez",
    role: "instructor",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Training",
  },
  {
    email: "alex.wong@innovatetech.com",
    name: "Alex Wong",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Engineering",
  },
  {
    email: "olivia.brown@innovatetech.com",
    name: "Olivia Brown",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Product",
  },
  {
    email: "ethan.davis@innovatetech.com",
    name: "Ethan Davis",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Design",
  },
  {
    email: "ava.wilson@innovatetech.com",
    name: "Ava Wilson",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Marketing",
  },
  {
    email: "noah.garcia@innovatetech.com",
    name: "Noah Garcia",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Sales",
  },
  {
    email: "mia.lee@innovatetech.com",
    name: "Mia Lee",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Engineering",
  },
  {
    email: "liam.taylor@innovatetech.com",
    name: "Liam Taylor",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Operations",
  },
  {
    email: "emma.anderson@innovatetech.com",
    name: "Emma Anderson",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "HR",
  },
  {
    email: "william.thomas@innovatetech.com",
    name: "William Thomas",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Finance",
  },
  {
    email: "isabella.jackson@innovatetech.com",
    name: "Isabella Jackson",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Customer Success",
  },
  {
    email: "james.white@innovatetech.com",
    name: "James White",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Engineering",
  },
  {
    email: "charlotte.harris@innovatetech.com",
    name: "Charlotte Harris",
    role: "learner",
    organizationId: "22222222-2222-2222-2222-222222222222",
    department: "Product",
  },

  // Summit Consulting Group (LMS only - 10 internal)
  {
    email: "robert.mitchell@summitconsulting.com",
    name: "Robert Mitchell",
    role: "admin", // Changed from tenant_administrator to admin
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Leadership",
  },
  {
    email: "jennifer.clark@summitconsulting.com",
    name: "Jennifer Clark",
    role: "manager", // Changed from team_manager to manager
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Consulting",
  },
  {
    email: "michael.rodriguez@summitconsulting.com",
    name: "Michael Rodriguez",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Consulting",
  },
  {
    email: "sarah.lewis@summitconsulting.com",
    name: "Sarah Lewis",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Consulting",
  },
  {
    email: "daniel.walker@summitconsulting.com",
    name: "Daniel Walker",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Consulting",
  },
  {
    email: "jessica.hall@summitconsulting.com",
    name: "Jessica Hall",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Operations",
  },
  {
    email: "christopher.allen@summitconsulting.com",
    name: "Christopher Allen",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Finance",
  },
  {
    email: "amanda.young@summitconsulting.com",
    name: "Amanda Young",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "HR",
  },
  {
    email: "matthew.king@summitconsulting.com",
    name: "Matthew King",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Marketing",
  },
  {
    email: "ashley.wright@summitconsulting.com",
    name: "Ashley Wright",
    role: "learner",
    organizationId: "33333333-3333-3333-3333-333333333333",
    department: "Sales",
  },

  // Alex Chen (Individual Creator - Authoring only)
  {
    email: "alex@alexchencreative.com",
    name: "Alex Chen",
    role: "manager", // Changed from content_manager to manager
    organizationId: "44444444-4444-4444-4444-444444444444",
    department: "Content Creation",
  },
]

const DEFAULT_PASSWORD = "TestUser77!"

async function seedTestUsers() {
  console.log("🌱 Starting test user seed...\n")

  let successCount = 0
  let errorCount = 0

  for (const user of testUsers) {
    try {
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

      // Update profile with organization and metadata
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({
          full_name: user.name,
          organization_id: user.organizationId,
          department: user.department,
        })
        .eq("id", authData.user.id)

      if (profileError) {
        console.error(`❌ Failed to update profile for ${user.email}:`, profileError.message)
        errorCount++
        continue
      }

      // Get role ID
      const { data: roleData, error: roleError } = await supabaseAdmin
        .from("roles")
        .select("id")
        .eq("name", user.role)
        .single()

      if (roleError || !roleData) {
        console.error(`❌ Failed to find role ${user.role} for ${user.email}`)
        errorCount++
        continue
      }

      // Assign role
      const { error: userRoleError } = await supabaseAdmin.from("user_roles").insert({
        user_id: authData.user.id,
        role_id: roleData.id,
        organization_id: user.organizationId,
      })

      if (userRoleError) {
        console.error(`❌ Failed to assign role for ${user.email}:`, userRoleError.message)
        errorCount++
        continue
      }

      console.log(`✅ Created user: ${user.email} (${user.role})`)
      successCount++
    } catch (error) {
      console.error(`❌ Unexpected error creating ${user.email}:`, error)
      errorCount++
    }
  }

  console.log(`\n🎉 Seed complete!`)
  console.log(`   ✅ Success: ${successCount} users`)
  console.log(`   ❌ Errors: ${errorCount} users`)
  console.log(`\n📝 All users have password: ${DEFAULT_PASSWORD}`)
}

// Run the seed
seedTestUsers()
  .then(() => {
    console.log("\n✨ Done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n💥 Fatal error:", error)
    process.exit(1)
  })
