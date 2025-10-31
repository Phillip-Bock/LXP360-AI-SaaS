-- Create all 11 user roles for the LXP360 platform
-- Run this script first to set up the role structure

-- Add hierarchy_level column if it doesn't exist
ALTER TABLE roles 
ADD COLUMN IF NOT EXISTS hierarchy_level INTEGER DEFAULT 1;

-- Insert all 11 roles with hierarchy levels
INSERT INTO roles (name, description, hierarchy_level) VALUES
  ('super_admin', 'System Owner/Maintainer - Top-level control over entire platform infrastructure', 11),
  ('admin', 'General Platform Oversight - User base and role management', 10),
  ('designer', 'E-Learning Content Creator - Creates and edits learning materials', 9),
  ('lms_admin', 'Operations & Enrollment - Manages learner flow and compliance', 8),
  ('program_admin', 'Learning Path Owner - Manages structured learning programs', 7),
  ('course_admin', 'Specific Course Owner - Day-to-day course management', 6),
  ('sales', 'Product Training & Customer Reporting - Sales team training access', 5),
  ('manager', 'People Leader - Manages team learning performance', 4),
  ('instructor', 'Facilitator/Teacher - Leads sessions and grades assessments', 3),
  ('team_learner', 'Collaborative Consumer - Part of structured team/cohort', 2),
  ('individual_learner', 'Self-Directed Consumer - Personal learning journey', 1)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  hierarchy_level = EXCLUDED.hierarchy_level;
