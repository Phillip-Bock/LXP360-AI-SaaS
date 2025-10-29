# Test User Seed Script Guide

This guide walks you through running the test user seed script to populate your database with test users for all 4 organizations.

## What This Script Does

Creates **42 test users** across 4 organizations:
- **Growth Spark Solutions** (8 users) - Small business with managed services
- **Innovate Tech Labs** (15 users) - White-label, self-administered
- **Summit Consulting Group** (10 users) - LMS only for internal training
- **Alex Chen Creative** (1 user) - Individual creator, authoring tool only

All users get:
- Email confirmed automatically
- Password: `TestUser77!`
- Proper role assignment (admin, content manager, instructor, learner)
- Organization assignment
- Department assignment

## Prerequisites

You need **THREE environment variables** from your Supabase project:
1. `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (safe to expose)
3. `SUPABASE_SERVICE_ROLE_KEY` - Admin key (keep secret!)

### Where to Find These Keys:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **Settings** (gear icon) → **API**
4. You'll see:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → This is your `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal" to see it)

## Step-by-Step Instructions

### Step 1: Create .env.local File

**IMPORTANT:** The seed script runs locally on your computer, so it needs a `.env.local` file with your Supabase credentials.

1. Open your project in VS Code (or any text editor)
2. In the root directory, create a new file called `.env.local`
3. Copy the template from `.env.local.example` or paste this:

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here

# Sanity Configuration (optional for seed script)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
\`\`\`

4. Replace the placeholder values with your actual keys from Supabase
5. Save the file

**Example of what it should look like:**
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://pimrpqfzqndyvzgieafg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbXJwcWZ6cW5keXZ6Z2llYWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NjE2MDAsImV4cCI6MjA1MDEzNzYwMH0.abc123...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbXJwcWZ6cW5keXZ6Z2llYWZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDU2MTYwMCwiZXhwIjoyMDUwMTM3NjAwfQ.xyz789...
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
# Use --legacy-peer-deps to avoid peer dependency conflicts
npm install --legacy-peer-deps
\`\`\`

### Step 3: Run the Seed Script

\`\`\`bash
# Make sure you're in the project root directory
cd E:\\GitHub\\LXP360-SaaS

# Run the seed script
npx tsx scripts/seed-test-users.ts
\`\`\`

**Expected output:**
\`\`\`
🌱 Starting test user seed...

✅ Created user: sarah.chen@growthspark.com (tenant_administrator)
✅ Created user: mike.rodriguez@growthspark.com (learner)
✅ Created user: emily.watson@growthspark.com (learner)
...
✅ Created user: alex@alexchencreative.com (content_manager)

🎉 Seed complete!
   ✅ Success: 42 users
   ❌ Errors: 0 users

📝 All users have password: TestUser77!

✨ Done!
\`\`\`

### Step 4: Verify Users Were Created

1. Go to your Supabase Dashboard
2. Click **Authentication** in the left sidebar
3. You should see 42 new users listed
4. Click on any user to see their details

### Step 5: Test Login

1. Go to your deployed app (or localhost:3000)
2. Click **Sign In**
3. Try logging in with any test user:
   - **Email:** `sarah.chen@growthspark.com`
   - **Password:** `TestUser77!`
4. You should be logged in and assigned to Growth Spark Solutions organization

## Test User List

### Growth Spark Solutions (Small Business)
- `sarah.chen@growthspark.com` - **Tenant Administrator**
- `mike.rodriguez@growthspark.com` - Learner (Sales)
- `emily.watson@growthspark.com` - Learner (Marketing)
- `james.kim@growthspark.com` - Learner (Operations)
- `lisa.patel@growthspark.com` - Learner (Customer Success)
- `david.thompson@growthspark.com` - Learner (Finance)
- `rachel.nguyen@growthspark.com` - Learner (HR)
- `tom.anderson@growthspark.com` - Learner (Product)

### Innovate Tech Labs (White-label)
- `priya.sharma@innovatetech.com` - **Tenant Administrator**
- `marcus.johnson@innovatetech.com` - **Content Manager**
- `sophia.martinez@innovatetech.com` - **Instructor**
- `alex.wong@innovatetech.com` - Learner (Engineering)
- `olivia.brown@innovatetech.com` - Learner (Product)
- `ethan.davis@innovatetech.com` - Learner (Design)
- `ava.wilson@innovatetech.com` - Learner (Marketing)
- `noah.garcia@innovatetech.com` - Learner (Sales)
- `mia.lee@innovatetech.com` - Learner (Engineering)
- `liam.taylor@innovatetech.com` - Learner (Operations)
- `emma.anderson@innovatetech.com` - Learner (HR)
- `william.thomas@innovatetech.com` - Learner (Finance)
- `isabella.jackson@innovatetech.com` - Learner (Customer Success)
- `james.white@innovatetech.com` - Learner (Engineering)
- `charlotte.harris@innovatetech.com` - Learner (Product)

### Summit Consulting Group (LMS Only)
- `robert.mitchell@summitconsulting.com` - **Tenant Administrator**
- `jennifer.clark@summitconsulting.com` - **Team Manager**
- `michael.rodriguez@summitconsulting.com` - Learner (Consulting)
- `sarah.lewis@summitconsulting.com` - Learner (Consulting)
- `daniel.walker@summitconsulting.com` - Learner (Consulting)
- `jessica.hall@summitconsulting.com` - Learner (Operations)
- `christopher.allen@summitconsulting.com` - Learner (Finance)
- `amanda.young@summitconsulting.com` - Learner (HR)
- `matthew.king@summitconsulting.com` - Learner (Marketing)
- `ashley.wright@summitconsulting.com` - Learner (Sales)

### Alex Chen Creative (Individual Creator)
- `alex@alexchencreative.com` - **Content Manager**

## Troubleshooting

### Error: "Invalid API key"
- Make sure you're using the **service_role** key, not the anon key
- Check that the environment variable is named exactly `SUPABASE_SERVICE_ROLE_KEY`

### Error: "User already exists"
- The script will skip users that already exist
- This is normal if you've run the script before

### Error: "Role not found"
- Make sure migration 1 ran successfully (creates roles table)
- Check that the roles table has the expected roles

### Error: "Organization not found"
- Make sure migration 7 ran successfully (creates test organizations)
- Check that the organizations table has the 4 test organizations

## Next Steps

After seeding users:
1. Push your code to GitHub
2. Let Vercel build and deploy
3. Log in with any test user
4. Test the admin panel, bulk import, and other features
5. Create test courses and content

## Security Note

**IMPORTANT:** The service role key has admin access to your database. 
- Never commit it to Git
- Never expose it in client-side code
- Only use it in server-side scripts and API routes
- Keep it secure like a password
