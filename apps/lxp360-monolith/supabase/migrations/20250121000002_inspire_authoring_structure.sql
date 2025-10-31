-- =====================================================
-- Migration: INSPIRE Authoring Structure
-- Description: Projects, Programs, Courses, Modules, Lessons, Content Blocks
-- =====================================================

-- Create projects table (top-level container)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  project_code TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  status TEXT CHECK (status IN ('draft', 'active', 'archived', 'deprecated')) DEFAULT 'draft',
  start_date DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  budget DECIMAL(10,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create programs table (collection of courses)
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  program_code TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  status TEXT CHECK (status IN ('draft', 'active', 'archived', 'deprecated')) DEFAULT 'draft',
  duration_hours INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create courses table (main learning content)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  course_code TEXT UNIQUE,
  version INTEGER DEFAULT 1,
  parent_course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  workflow_state TEXT CHECK (workflow_state IN ('draft', 'development', 'review', 'accessibility_check', 'qa_approval', 'published', 'archived', 'deprecated', 'under_revision')) DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  duration_hours DECIMAL(5,2),
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  language TEXT DEFAULT 'en',
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  is_template BOOLEAN DEFAULT false,
  tags TEXT[],
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create modules table (course sections)
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  module_order INTEGER NOT NULL,
  duration_minutes INTEGER,
  is_required BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(course_id, module_order)
);

-- Create lessons table (individual learning units)
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  lesson_order INTEGER NOT NULL,
  lesson_type TEXT CHECK (lesson_type IN ('video', 'text', 'interactive', 'assessment', 'scorm', 'mixed')) DEFAULT 'mixed',
  duration_minutes INTEGER,
  is_required BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(module_id, lesson_order)
);

-- Create micro_lessons table (bite-sized content)
CREATE TABLE IF NOT EXISTS micro_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  micro_lesson_order INTEGER NOT NULL,
  duration_minutes INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lesson_id, micro_lesson_order)
);

-- Create content_blocks table (actual content)
CREATE TABLE IF NOT EXISTS content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  micro_lesson_id UUID REFERENCES micro_lessons(id) ON DELETE CASCADE,
  block_type TEXT CHECK (block_type IN ('text', 'heading', 'image', 'video', 'audio', 'embed', 'quiz', 'interactive', 'code', 'file', 'accordion', 'tabs', 'callout')) NOT NULL,
  block_order INTEGER NOT NULL,
  content JSONB NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (lesson_id IS NOT NULL AND micro_lesson_id IS NULL) OR
    (lesson_id IS NULL AND micro_lesson_id IS NOT NULL)
  )
);

-- Create indexes
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_programs_organization_id ON programs(organization_id);
CREATE INDEX idx_programs_project_id ON programs(project_id);
CREATE INDEX idx_courses_organization_id ON courses(organization_id);
CREATE INDEX idx_courses_project_id ON courses(project_id);
CREATE INDEX idx_courses_program_id ON courses(program_id);
CREATE INDEX idx_courses_workflow_state ON courses(workflow_state);
CREATE INDEX idx_courses_parent_course_id ON courses(parent_course_id);
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_micro_lessons_lesson_id ON micro_lessons(lesson_id);
CREATE INDEX idx_content_blocks_lesson_id ON content_blocks(lesson_id);
CREATE INDEX idx_content_blocks_micro_lesson_id ON content_blocks(micro_lesson_id);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE micro_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view projects in their organization"
  ON projects FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Content managers can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() 
      AND (inspire_role IN ('content_manager', 'content_developer') OR EXISTS (
        SELECT 1 FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = auth.uid() AND r.name IN ('admin', 'super_admin')
      ))
    )
  );

CREATE POLICY "Project owners and admins can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid() AND r.name IN ('admin', 'super_admin')
    )
  );

-- Similar RLS policies for programs, courses, modules, lessons
CREATE POLICY "Users can view programs in their organization"
  ON programs FOR SELECT TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can view courses in their organization"
  ON courses FOR SELECT TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()) OR is_public = true);

CREATE POLICY "Content managers can create courses"
  ON courses FOR INSERT TO authenticated
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM profiles 
      WHERE id = auth.uid() 
      AND (inspire_role IN ('content_manager', 'content_developer') OR EXISTS (
        SELECT 1 FROM user_roles ur JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = auth.uid() AND r.name IN ('admin', 'super_admin')
      ))
    )
  );

CREATE POLICY "Users can view modules in accessible courses"
  ON modules FOR SELECT TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      ) OR is_public = true
    )
  );

CREATE POLICY "Users can view lessons in accessible modules"
  ON lessons FOR SELECT TO authenticated
  USING (
    module_id IN (
      SELECT m.id FROM modules m
      JOIN courses c ON m.course_id = c.id
      WHERE c.organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      ) OR c.is_public = true
    )
  );

CREATE POLICY "Users can view micro lessons in accessible lessons"
  ON micro_lessons FOR SELECT TO authenticated
  USING (
    lesson_id IN (
      SELECT l.id FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE c.organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      ) OR c.is_public = true
    )
  );

CREATE POLICY "Users can view content blocks in accessible lessons"
  ON content_blocks FOR SELECT TO authenticated
  USING (
    (lesson_id IN (
      SELECT l.id FROM lessons l
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE c.organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      ) OR c.is_public = true
    )) OR
    (micro_lesson_id IN (
      SELECT ml.id FROM micro_lessons ml
      JOIN lessons l ON ml.lesson_id = l.id
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE c.organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      ) OR c.is_public = true
    ))
  );

-- Add triggers
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_micro_lessons_updated_at BEFORE UPDATE ON micro_lessons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
