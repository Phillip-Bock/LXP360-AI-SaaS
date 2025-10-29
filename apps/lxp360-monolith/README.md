# LXP360 SaaS Platform

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/lxd360llc/v0-course-creation-page)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/goyYi1BJGbo)

## Overview

LXP360 is a comprehensive Learning Experience Platform (LXP) SaaS that engineers the future of learning with a science-backed framework. The platform consists of 7 major integrated systems:

1. **Authoring Tool** (In Development) - Course creation and content development
2. **LMS** (Learning Management System) - Course delivery and student management
3. **LRS** (Learning Record Store) - xAPI data tracking and analytics
4. **LXP** (Learning Experience Platform) - Personalized learning experiences
5. **PM Management** - Project management and collaboration
6. **Ecommerce** - Payment and subscription handling
7. **Company Front Page** - Public-facing marketing site

### Current Status: Authoring Tool Foundation

The authoring tool supports the INSPIRE framework with ITLA, ILMI, and ICL methodologies for neuroscience-based learning design.

## 🚨 Having Auth Issues? Start Fresh!

**See [FRESH_START.md](./FRESH_START.md)** for a complete reset guide that will get you working in 10 minutes.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth
- **CMS**: Sanity.io
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Language**: TypeScript

## Quick Start

### 1. Environment Setup

Make sure these environment variables are set in v0's **Vars** section:

\`\`\`
SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
SUPABASE_ANON_KEY=[your-anon-key]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

NEXT_PUBLIC_SANITY_PROJECT_ID=[your-project-id]
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=[your-token]
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
\`\`\`

### 2. Database Setup

Run these SQL scripts in order (in v0 or Supabase SQL Editor):

1. `scripts/001_initial_setup.sql` - Creates tables and RLS policies
2. `scripts/002_fix_all_function_security.sql` - Fixes function security
3. `scripts/003_fix_search_path_security.sql` - Fixes search_path warnings

### 3. Sanity CMS Setup

Deploy your Sanity schemas:

\`\`\`bash
cd sanity
npx sanity deploy
\`\`\`

### 4. Create Your First User

In Supabase Dashboard → Authentication → Users:
1. Click "Add User" → "Create new user"
2. Enter email and password
3. **Check "Auto Confirm User"** ✓
4. Click "Create User"

### 5. Test Login

Go to your app preview and log in with the credentials you just created.

## Content Structure

### E-Learning Courses
- Program → Course → Modules → Lessons → Learning Step Activities (Blocks)
- Supports complex, multi-hour learning experiences
- Spaced repetition and drip learning capabilities

### Micro-Learning Courses
- Program → Course → Single Lesson → Learning Step Activities (Blocks)
- ~10 minute standalone learning experiences
- Heavily monitored for cognitive load and time

## Deployment

### Push to GitHub

\`\`\`bash
git add .
git commit -m "Your commit message"
git push origin main
\`\`\`

### Deploy to Vercel

Vercel automatically deploys from GitHub. Add environment variables in Vercel:

1. Go to https://vercel.com/dashboard
2. Click your project → Settings → Environment Variables
3. Add all the environment variables from v0's "Vars" section

Your project is live at:
**[https://vercel.com/lxd360llc/v0-course-creation-page](https://vercel.com/lxd360llc/v0-course-creation-page)**

## Build Your App

Continue building on:
**[https://v0.app/chat/projects/goyYi1BJGbo](https://v0.app/chat/projects/goyYi1BJGbo)**

## License

© 2025 LXP360. All rights reserved.
