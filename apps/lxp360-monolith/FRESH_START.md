# 🔥 FRESH START GUIDE - Supabase Setup

**Use this guide if you want to completely reset and start fresh with Supabase.**

---

## ⚠️ Before You Begin

This will:
- Guide you through creating a NEW Supabase project
- Set up authentication correctly from scratch
- Get you logged in and working in under 10 minutes

You will NOT lose any code - just the database data (which you said is fine since you're in development).

---

## Step 1: Delete Old Supabase Project (Optional)

1. Go to https://supabase.com/dashboard
2. Find your current `lxp360` project
3. Click **Settings** → **General**
4. Scroll to bottom → **Delete Project**
5. Type the project name to confirm
6. Click **Delete Project**

---

## Step 2: Create Brand New Project

1. Click **New Project**
2. **Name**: `lxp360-fresh` (or whatever you want)
3. **Database Password**: Create a STRONG password and SAVE IT
4. **Region**: Choose closest to you
5. Click **Create new project**
6. Wait ~2 minutes for setup to complete

---

## Step 3: Configure Authentication (CRITICAL!)

**This is where most people fail. Follow exactly:**

1. Go to **Authentication** → **Providers**
2. Click on **Email** provider
3. Find "Confirm email" toggle
4. **TURN IT OFF** ← This is critical!
5. Click **Save**

Why? Because Supabase requires email confirmation by default, but you don't have email sending configured yet. This lets users log in immediately after signup.

---

## Step 4: Get Your New Credentials

1. Go to **Settings** → **API**
2. Copy these values:

\`\`\`
Project URL: https://[your-project-ref].supabase.co
anon/public key: eyJhbG... (long string)
service_role key: eyJhbG... (different long string)
\`\`\`

---

## Step 5: Update v0 Integration

1. In v0, click **Connect** tab (left sidebar)
2. Find **Supabase** integration
3. Click **Edit** or **Remove** then **Add** again
4. Paste your NEW credentials:
   - Project URL
   - Anon Key
   - Service Role Key
5. Click **Save**

---

## Step 6: Update Environment Variables

In v0, go to **Vars** tab and update:

\`\`\`
SUPABASE_URL=https://[your-new-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://[your-new-project-ref].supabase.co
SUPABASE_ANON_KEY=[your-new-anon-key]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-new-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-new-service-role-key]
\`\`\`

---

## Step 7: Run Database Setup Scripts

**The migrations are now in `/supabase/migrations/` folder:**

### Option A: Run via Supabase SQL Editor (Recommended)

1. Go to your Supabase project → **SQL Editor**
2. Copy the contents of `supabase/migrations/20241017000001_initial_database_setup.sql`
3. Paste and click **Run**
4. Copy the contents of `supabase/migrations/20241017000002_fix_function_security.sql`
5. Paste and click **Run**

### Option B: Enable GitHub Integration (Automatic)

1. In Supabase, go to **Settings** → **Integrations**
2. Find **GitHub** and click **Connect**
3. Select your repository: `Phillip-Bock/LXP360-SaaS`
4. Set **Supabase directory** to `.` (just a dot)
5. Set **Production branch name** to `main`
6. Click **Enable integration**
7. Push your code to GitHub - migrations will run automatically!

---

## Step 8: Create Your First User

**In Supabase Dashboard:**

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter:
   - Email: your-email@example.com
   - Password: YourPassword123!
4. **IMPORTANT**: Check "Auto Confirm User" ✓
5. Click **Create User**

---

## Step 9: Test Login

1. Go to your v0 app preview
2. Click **Sign In**
3. Enter the email/password you just created
4. Click **Sign In**

**You should be logged in successfully!**

---

## ✅ Success Checklist

- [ ] New Supabase project created
- [ ] Email confirmation DISABLED in Auth settings
- [ ] New credentials added to v0
- [ ] All 3 SQL scripts ran successfully
- [ ] First user created with "Auto Confirm User" checked
- [ ] Successfully logged in to the app

---

## 🐛 If Login Still Fails

1. **Open browser console** (F12 → Console tab)
2. Look for `[v0]` error messages
3. Common issues:

**"Invalid login credentials"**
- Double-check email confirmation is OFF
- Make sure you created user with "Auto Confirm User" checked
- Verify you're using the correct email/password

**"Failed to fetch"**
- Check that environment variables are updated
- Verify Supabase project URL is correct
- Make sure project is not paused (free tier pauses after inactivity)

**"Email not confirmed"**
- Go back to Step 3 and disable email confirmation
- Delete the user and recreate with "Auto Confirm User" checked

---

## 🎉 You're Done!

Your Supabase setup is now clean and working. You can:
- Sign up new users
- Log in/out
- Access protected routes
- Use the admin dashboard (if you assign yourself admin role)

---

## Next Steps

1. **Assign yourself admin role** (if needed):
   - In Supabase, go to **Table Editor** → **user_roles**
   - Click **Insert** → **Insert row**
   - user_id: [your user id from auth.users]
   - role_id: 1 (admin)
   - Click **Save**

2. **Test the app**:
   - Try logging in/out
   - Visit protected pages
   - Create some content

3. **Deploy to production**:
   - Push to GitHub
   - Deploy on Vercel
   - Add environment variables to Vercel

---

**You've got this! 🚀**
