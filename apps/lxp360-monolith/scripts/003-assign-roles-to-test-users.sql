-- Assign roles to all test users
-- Run this in Supabase SQL Editor after creating the users

-- Super Admin
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'super_admin@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'super_admin')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'super_admin@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'super_admin')
);

-- Admin
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'admin@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'admin')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'admin@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'admin')
);

-- Designer
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'designer@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'designer')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'designer@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'designer')
);

-- LMS Admin
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'lmsadmin@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'lms_admin')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'lmsadmin@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'lms_admin')
);

-- Program Admin
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'programadmin@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'program_admin')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'programadmin@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'program_admin')
);

-- Course Admin
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'courseadmin@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'course_admin')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'courseadmin@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'course_admin')
);

-- Sales
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'sales@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'sales')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'sales@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'sales')
);

-- Manager
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'manager@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'manager')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'manager@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'manager')
);

-- Instructor
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'instructor@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'instructor')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'instructor@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'instructor')
);

-- Individual Learner
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'learner@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'individual_learner')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'learner@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'individual_learner')
);

-- Team Learner
INSERT INTO user_roles (user_id, role_id)
SELECT 
  (SELECT id FROM auth.users WHERE email = 'teamlearner@lxd360.com'),
  (SELECT id FROM roles WHERE name = 'team_learner')
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = (SELECT id FROM auth.users WHERE email = 'teamlearner@lxd360.com')
  AND role_id = (SELECT id FROM roles WHERE name = 'team_learner')
);

-- Verify the assignments
SELECT 
  u.email,
  r.name as role_name,
  r.hierarchy_level
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.email LIKE '%@lxd360.com'
ORDER BY r.hierarchy_level DESC, u.email;
