# Supabase Migrations

This folder contains database migrations for the LXP360 project.

## Migration Files

Migrations are numbered and run in order:

1. `20241017000001_initial_database_setup.sql` - Creates all tables, RLS policies, and core functions
2. `20241017000002_fix_function_security.sql` - Fixes security warnings for database functions

## Running Migrations

### In Supabase Dashboard (Manual)
1. Go to your Supabase project
2. Click **SQL Editor**
3. Copy and paste each migration file in order
4. Click **Run**

### With Supabase CLI (Automatic)
\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
\`\`\`

### With GitHub Integration (Automatic)
Once you enable the GitHub integration in Supabase, migrations will run automatically when you push to your production branch.

## Adding New Migrations

Create new migration files with the naming pattern:
\`\`\`
YYYYMMDDHHMMSS_description.sql
\`\`\`

Example:
\`\`\`
20241017120000_add_courses_table.sql
