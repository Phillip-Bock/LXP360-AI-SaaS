# LXP360 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- Access to Vercel project (for environment variables)

## Step 1: Clone and Install

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/LXP360-SaaS.git
cd LXP360-SaaS

# Install dependencies (use --legacy-peer-deps to avoid conflicts)
npm install --legacy-peer-deps
\`\`\`

## Step 2: Set Up Environment Variables

### Option A: Copy from Vercel (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Copy all the values you see there

### Option B: Get from Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Create .env.local file

\`\`\`bash
# Copy the example file
cp .env.local.example .env.local

# Edit the file and add your actual values
# Use VS Code, Notepad, or any text editor
\`\`\`

Your `.env.local` should look like:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://pimrpqfzqndyvzgieafg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# ... rest of your variables
\`\`\`

## Step 3: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 4: Seed Test Users (Optional)

Once your `.env.local` is set up:

\`\`\`bash
npx tsx scripts/seed-test-users.ts
\`\`\`

This creates 42 test users across 4 organizations with password: `TestUser77!`

## Common Issues

### "supabaseUrl is required" error
- Your `.env.local` file is missing or has incorrect values
- Make sure you copied the values correctly from Vercel or Supabase
- Restart your terminal after creating `.env.local`

### npm install fails with peer dependency errors
- Use `npm install --legacy-peer-deps` instead
- This is normal due to Next.js and Sanity version compatibility

### Build fails on Vercel
- Make sure environment variables are added in Vercel project settings
- Go to **Settings** → **Environment Variables** and add all required vars

## Next Steps

1. **Sign up**: Go to `/auth/signup` and create your first user
2. **Explore**: Check out the dashboard at `/dashboard`
3. **Admin**: Access admin panel at `/admin` (requires admin role)
4. **INSPIRE Tools**: Start creating courses with the INSPIRE framework

## Need Help?

- Check `docs/SEED_TEST_USERS_GUIDE.md` for detailed user seeding instructions
- Review `FRESH_START.md` for database setup
- Contact support if you're stuck
