import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = await createClient()

    // Check if tables already exist by trying to query them
    const { error: checkError } = await supabase.from("profiles").select("id").limit(1)

    if (!checkError) {
      return NextResponse.json({ success: true, message: "Database already initialized", alreadySetup: true })
    }

    // Create tables using raw SQL
    const setupSQL = `
      -- Create profiles table
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create roles table
      CREATE TABLE IF NOT EXISTS roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create permissions table
      CREATE TABLE IF NOT EXISTS permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Create user_roles table
      CREATE TABLE IF NOT EXISTS user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, role_id)
      );

      -- Create role_permissions table
      CREATE TABLE IF NOT EXISTS role_permissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
        permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(role_id, permission_id)
      );

      -- Insert default roles
      INSERT INTO roles (name, description) VALUES
        ('admin', 'Full system access'),
        ('instructor', 'Can create and manage courses'),
        ('learner', 'Can enroll in and take courses')
      ON CONFLICT (name) DO NOTHING;

      -- Insert default permissions
      INSERT INTO permissions (name, description) VALUES
        ('manage_users', 'Can manage user accounts'),
        ('manage_courses', 'Can create and edit courses'),
        ('view_analytics', 'Can view analytics and reports'),
        ('enroll_courses', 'Can enroll in courses')
      ON CONFLICT (name) DO NOTHING;

      -- Enable RLS
      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

      -- Create policies
      DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
      CREATE POLICY "Users can view own profile" ON profiles
        FOR SELECT USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
      CREATE POLICY "Users can update own profile" ON profiles
        FOR UPDATE USING (auth.uid() = id);

      DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
      CREATE POLICY "Users can insert own profile" ON profiles
        FOR INSERT WITH CHECK (auth.uid() = id);
    `

    // Execute the SQL
    const { error: setupError } = await supabase.rpc("exec_sql", { sql: setupSQL })

    if (setupError) {
      console.error("[v0] Database setup error:", setupError)
      return NextResponse.json({ success: false, error: setupError.message, needsManualSetup: true }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Database initialized successfully" })
  } catch (error: any) {
    console.error("[v0] Database setup exception:", error)
    return NextResponse.json({ success: false, error: error.message, needsManualSetup: true }, { status: 500 })
  }
}
