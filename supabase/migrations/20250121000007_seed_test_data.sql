-- Migration: Seed Test Data
-- Description: Populate database with test data from customer profiles
-- Password for all test users: TestUser77!

-- =====================================================
-- TEST ORGANIZATIONS
-- =====================================================

-- Insert test organizations based on customer profiles from but.ts
INSERT INTO organizations (id, name, slug, organization_type, subscription_tier, is_active, subdomain, custom_domain, logo_url, primary_color, secondary_color, max_users, max_courses) VALUES
  -- Growth Spark Solutions (8 learners, needs managed services)
  ('11111111-1111-1111-1111-111111111111', 'Growth Spark Solutions', 'growth-spark-solutions', 'small_business', 'professional', true, 
   'growthspark', NULL, NULL, '#0056B8', '#019EF3', 10, 50),
  
  -- Innovate Tech Labs (15 learners, white-label, self-admin)
  ('22222222-2222-2222-2222-222222222222', 'Innovate Tech Labs', 'innovate-tech-labs', 'enterprise', 'enterprise', true,
   'innovatetech', 'learn.innovatetech.com', '/logos/innovate.png', '#019EF3', '#7103A0', 20, 100),
  
  -- Summit Consulting Group (10 internal + external clients, LMS only)
  ('33333333-3333-3333-3333-333333333333', 'Summit Consulting Group', 'summit-consulting-group', 'enterprise', 'enterprise', true,
   'summitconsulting', NULL, NULL, '#7103A0', '#C705A7', 15, 75),
  
  -- Alex Chen (individual creator, authoring tool only)
  ('44444444-4444-4444-4444-444444444444', 'Alex Chen Creative', 'alex-chen-creative', 'individual', 'starter', true,
   'alexchen', NULL, NULL, '#0056B8', '#019EF3', 1, 10)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- ORGANIZATION FEATURES (À LA CARTE)
-- =====================================================

-- Growth Spark Solutions: LXP360 LMS + Managed Services
INSERT INTO organization_features (organization_id, feature_id, is_enabled) VALUES
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM features WHERE name = 'lxp360_lms'), true),
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM features WHERE name = 'lxp360_assessments'), true),
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM features WHERE name = 'lxp360_analytics'), true)
ON CONFLICT DO NOTHING;

-- Innovate Tech Labs: Full Suite (INSPIRE + LXP360 + White Label)
INSERT INTO organization_features (organization_id, feature_id, is_enabled) VALUES
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'inspire_authoring'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'inspire_projects'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'inspire_collaboration'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'lxp360_lms'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'lxp360_assessments'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'lxp360_certificates'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'lxp360_analytics'), true),
  ('22222222-2222-2222-2222-222222222222', (SELECT id FROM features WHERE name = 'white_label'), true)
ON CONFLICT DO NOTHING;

-- Summit Consulting Group: LXP360 LMS Only
INSERT INTO organization_features (organization_id, feature_id, is_enabled) VALUES
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM features WHERE name = 'lxp360_lms'), true),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM features WHERE name = 'lxp360_assessments'), true),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM features WHERE name = 'lxp360_certificates'), true),
  ('33333333-3333-3333-3333-333333333333', (SELECT id FROM features WHERE name = 'lxp360_analytics'), true)
ON CONFLICT DO NOTHING;

-- Alex Chen: INSPIRE Authoring Tool Only
INSERT INTO organization_features (organization_id, feature_id, is_enabled) VALUES
  ('44444444-4444-4444-4444-444444444444', (SELECT id FROM features WHERE name = 'inspire_authoring'), true),
  ('44444444-4444-4444-4444-444444444444', (SELECT id FROM features WHERE name = 'inspire_projects'), true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- TEST USERS
-- =====================================================
-- Note: Actual user creation happens through Supabase Auth (sign up via app)
-- This section documents the test users that should be created manually
-- All passwords: TestUser77!

-- Growth Spark Solutions Users:
-- - sarah.johnson@growthspark.com (Tenant Admin)
-- - mike.davis@growthspark.com (Instructor)
-- - emily.rodriguez@growthspark.com (Learner)

-- Innovate Tech Labs Users:
-- - david.kim@innovatetech.com (Tenant Admin)
-- - lisa.patel@innovatetech.com (Content Manager)
-- - james.wilson@innovatetech.com (Instructor)
-- - maria.garcia@innovatetech.com (Learner)

-- Summit Consulting Group Users:
-- - robert.chen@summitconsulting.com (Tenant Admin)
-- - jennifer.lee@summitconsulting.com (Team Manager)
-- - michael.brown@summitconsulting.com (Learner)

-- Alex Chen Creative:
-- - alex@alexchen.dev (Content Manager - individual creator)

-- =====================================================
-- DEMO RETENTION POLICIES
-- =====================================================

-- Set default retention policies for test organizations
INSERT INTO retention_policies (organization_id, content_type, retention_days, auto_delete) VALUES
  ('11111111-1111-1111-1111-111111111111', 'archived', 365, false),
  ('11111111-1111-1111-1111-111111111111', 'deprecated', 180, false),
  ('11111111-1111-1111-1111-111111111111', 'audit_logs', 2555, false), -- 7 years for compliance
  
  ('22222222-2222-2222-2222-222222222222', 'archived', 730, false), -- 2 years
  ('22222222-2222-2222-2222-222222222222', 'deprecated', 365, false),
  ('22222222-2222-2222-2222-222222222222', 'audit_logs', 2555, false),
  
  ('33333333-3333-3333-3333-333333333333', 'archived', 365, false),
  ('33333333-3333-3333-3333-333333333333', 'deprecated', 180, false),
  ('33333333-3333-3333-3333-333333333333', 'audit_logs', 2555, false),
  
  ('44444444-4444-4444-4444-444444444444', 'archived', 180, false),
  ('44444444-4444-4444-4444-444444444444', 'deprecated', 90, false),
  ('44444444-4444-4444-4444-444444444444', 'audit_logs', 1825, false) -- 5 years
ON CONFLICT DO NOTHING;

-- Comments
COMMENT ON TABLE organizations IS 'Test organizations: Growth Spark Solutions, Innovate Tech Labs, Summit Consulting Group, Alex Chen Creative';
COMMENT ON TABLE organization_features IS 'À la carte feature assignments for each test organization';
