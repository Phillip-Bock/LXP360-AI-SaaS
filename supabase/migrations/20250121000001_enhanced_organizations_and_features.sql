-- =====================================================
-- Migration: Enhanced Organizations & Feature Management
-- Description: Multi-tenant foundation with feature flags
-- =====================================================

-- Add organization_id to profiles table first before creating indexes
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS inspire_role TEXT CHECK (inspire_role IN ('content_manager', 'content_developer', 'reviewer', 'viewer')) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS lxp360_role TEXT CHECK (lxp360_role IN ('instructor', 'facilitator', 'team_manager', 'learner')) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York',
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- Enhance organizations table
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS organization_type TEXT CHECK (organization_type IN ('individual', 'small_business', 'enterprise', 'internal')) DEFAULT 'small_business',
ADD COLUMN IF NOT EXISTS subdomain TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS custom_domain TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#0056B8',
ADD COLUMN IF NOT EXISTS secondary_color TEXT DEFAULT '#019EF3',
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS subscription_tier TEXT CHECK (subscription_tier IN ('free', 'starter', 'professional', 'enterprise', 'custom')) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS billing_email TEXT,
ADD COLUMN IF NOT EXISTS max_users INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS max_courses INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS storage_limit_gb INTEGER DEFAULT 10;

-- Create features table (available platform features)
CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('inspire', 'lxp360', 'media', 'analytics', 'integrations')) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create organization_features table (what each org has purchased)
CREATE TABLE IF NOT EXISTS organization_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  is_enabled BOOLEAN DEFAULT true,
  enabled_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, feature_id)
);

-- Create feature_usage table (tracking/analytics)
CREATE TABLE IF NOT EXISTS feature_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_count INTEGER DEFAULT 1,
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, feature_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_organizations_subdomain ON organizations(subdomain);
CREATE INDEX IF NOT EXISTS idx_organizations_custom_domain ON organizations(custom_domain);
CREATE INDEX IF NOT EXISTS idx_organization_features_org_id ON organization_features(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_features_feature_id ON organization_features(feature_id);
CREATE INDEX IF NOT EXISTS idx_feature_usage_org_id ON feature_usage(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Enable Row Level Security
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_usage ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before recreating them to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view active features" ON features;
DROP POLICY IF EXISTS "Users can view their organization's features" ON organization_features;
DROP POLICY IF EXISTS "Admins can manage organization features" ON organization_features;
DROP POLICY IF EXISTS "Users can view their own feature usage" ON feature_usage;
DROP POLICY IF EXISTS "System can insert feature usage" ON feature_usage;

-- RLS Policies for features (read-only for all authenticated users)
CREATE POLICY "Anyone can view active features"
  ON features FOR SELECT
  TO authenticated
  USING (is_active = true);

-- RLS Policies for organization_features
CREATE POLICY "Users can view their organization's features"
  ON organization_features FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage organization features"
  ON organization_features FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'super_admin')
    )
  );

-- RLS Policies for feature_usage
CREATE POLICY "Users can view their own feature usage"
  ON feature_usage FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert feature usage"
  ON feature_usage FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Insert default features
INSERT INTO features (name, display_name, description, category) VALUES
  ('inspire_authoring', 'INSPIRE Authoring Tool', 'Create courses using the INSPIRE Framework', 'inspire'),
  ('inspire_projects', 'Project Management', 'Organize courses into projects and programs', 'inspire'),
  ('inspire_collaboration', 'Team Collaboration', 'Multi-user course development', 'inspire'),
  ('lxp360_lms', 'LXP360 Learning Platform', 'Deliver courses to learners', 'lxp360'),
  ('lxp360_assessments', 'Assessments & Quizzes', 'Create and grade assessments', 'lxp360'),
  ('lxp360_certificates', 'Certificates', 'Issue completion certificates', 'lxp360'),
  ('lxp360_analytics', 'Learning Analytics', 'Track learner progress and performance', 'lxp360'),
  ('media_library', 'Media Library', 'Store and manage media assets', 'media'),
  ('scorm_export', 'SCORM Export', 'Export courses as SCORM packages', 'integrations'),
  ('xapi_export', 'xAPI Export', 'Export learning data via xAPI', 'integrations'),
  ('white_label', 'White Labeling', 'Custom branding and domain', 'integrations')
ON CONFLICT (name) DO NOTHING;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop triggers before recreating to avoid conflicts
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
DROP TRIGGER IF EXISTS update_features_updated_at ON features;
DROP TRIGGER IF EXISTS update_organization_features_updated_at ON organization_features;

-- Add triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_features_updated_at BEFORE UPDATE ON organization_features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
