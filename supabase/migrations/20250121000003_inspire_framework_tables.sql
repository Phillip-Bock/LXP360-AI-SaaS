-- =====================================================
-- Migration: INSPIRE Framework Tables
-- Description: Encoding (ITLA), Synthesization (ICL), Assimilation (IDNS), Reviews
-- =====================================================

-- Create course_encoding table (ITLA: NPPM, ILMI, ICES)
CREATE TABLE IF NOT EXISTS course_encoding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE UNIQUE,
  
  -- ITLA (Theory of Learning Activation)
  itla_cognitive_engagement_level TEXT CHECK (itla_cognitive_engagement_level IN ('surface', 'strategic', 'deep')) DEFAULT 'strategic',
  itla_neuroscience_principles JSONB DEFAULT '[]',
  itla_learning_objectives JSONB DEFAULT '[]',
  
  -- NPPM (Neuroscience Principles and Performance Mapping)
  nppm_brain_functions JSONB DEFAULT '[]',
  nppm_performance_indicators JSONB DEFAULT '[]',
  nppm_mapping_data JSONB DEFAULT '{}',
  
  -- ILMI (Instructional Learning & Measurement Integration)
  ilmi_learning_modalities JSONB DEFAULT '[]', -- visual, auditory, kinesthetic, reading/writing
  ilmi_measurement_strategies JSONB DEFAULT '[]',
  ilmi_assessment_types JSONB DEFAULT '[]',
  
  -- ICES (Cognitive Engagement Strategies)
  ices_engagement_techniques JSONB DEFAULT '[]',
  ices_interaction_patterns JSONB DEFAULT '[]',
  ices_feedback_mechanisms JSONB DEFAULT '[]',
  
  completed_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course_synthesization table (ICL: IPMG, ICDT, ICPF)
CREATE TABLE IF NOT EXISTS course_synthesization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE UNIQUE,
  
  -- ICL (Competency Ladder) - 7 Learning Domains + 6 Complexity Levels
  icl_learning_domains JSONB DEFAULT '[]', -- remember, understand, apply, analyze, evaluate, create, transfer
  icl_complexity_levels JSONB DEFAULT '[]', -- novice, advanced_beginner, competent, proficient, expert, master
  icl_competency_matrix JSONB DEFAULT '{}',
  
  -- IPMG (Performance Mapping Grid)
  ipmg_job_tasks JSONB DEFAULT '[]',
  ipmg_competency_mapping JSONB DEFAULT '{}',
  ipmg_performance_criteria JSONB DEFAULT '[]',
  
  -- ICDT (Competency Development Timeline)
  icdt_milestones JSONB DEFAULT '[]',
  icdt_progression_path JSONB DEFAULT '{}',
  icdt_estimated_duration_hours INTEGER,
  
  -- ICPF (Competency Performance Framework)
  icpf_performance_standards JSONB DEFAULT '[]',
  icpf_evaluation_criteria JSONB DEFAULT '[]',
  icpf_success_metrics JSONB DEFAULT '{}',
  
  completed_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course_assimilation table (IDNS: IADC, ILEM, IALM)
CREATE TABLE IF NOT EXISTS course_assimilation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE UNIQUE,
  
  -- IDNS (Delivery and Navigation Strategy)
  idns_delivery_methods JSONB DEFAULT '[]', -- self-paced, instructor-led, blended, microlearning
  idns_navigation_structure JSONB DEFAULT '{}',
  idns_user_flow JSONB DEFAULT '[]',
  
  -- IADC (Assessment and Data Collection)
  iadc_assessment_strategy JSONB DEFAULT '{}',
  iadc_data_points JSONB DEFAULT '[]',
  iadc_analytics_requirements JSONB DEFAULT '[]',
  
  -- ILEM (Learning Experience Mapping)
  ilem_learner_journey JSONB DEFAULT '[]',
  ilem_touchpoints JSONB DEFAULT '[]',
  ilem_engagement_moments JSONB DEFAULT '[]',
  
  -- IALM (Adaptive Learning Mechanisms)
  ialm_personalization_rules JSONB DEFAULT '[]',
  ialm_branching_logic JSONB DEFAULT '{}',
  ialm_adaptive_content JSONB DEFAULT '[]',
  
  completed_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course_reviews table (Accessibility, QA, Beta, Publishing)
CREATE TABLE IF NOT EXISTS course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  review_type TEXT CHECK (review_type IN ('accessibility', 'quality_assurance', 'beta_testing', 'final_approval')) NOT NULL,
  reviewer_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT CHECK (status IN ('pending', 'in_progress', 'passed', 'failed', 'requires_revision')) DEFAULT 'pending',
  score INTEGER CHECK (score >= 0 AND score <= 100),
  findings JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  compliance_standards JSONB DEFAULT '[]', -- WCAG, Section 508, HIPAA, OSHA, FINRA
  reviewed_at TIMESTAMPTZ,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_course_encoding_course_id ON course_encoding(course_id);
CREATE INDEX idx_course_synthesization_course_id ON course_synthesization(course_id);
CREATE INDEX idx_course_assimilation_course_id ON course_assimilation(course_id);
CREATE INDEX idx_course_reviews_course_id ON course_reviews(course_id);
CREATE INDEX idx_course_reviews_reviewer_id ON course_reviews(reviewer_id);
CREATE INDEX idx_course_reviews_status ON course_reviews(status);

-- Enable RLS
ALTER TABLE course_encoding ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_synthesization ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_assimilation ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view encoding for accessible courses"
  ON course_encoding FOR SELECT TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Content managers can manage encoding"
  ON course_encoding FOR ALL TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM profiles 
        WHERE id = auth.uid() 
        AND inspire_role IN ('content_manager', 'content_developer')
      )
    )
  );

CREATE POLICY "Users can view synthesization for accessible courses"
  ON course_synthesization FOR SELECT TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can view assimilation for accessible courses"
  ON course_assimilation FOR SELECT TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can view reviews for accessible courses"
  ON course_reviews FOR SELECT TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organization_id IN (
        SELECT organization_id FROM profiles WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Reviewers can create reviews"
  ON course_reviews FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND inspire_role IN ('reviewer', 'content_manager')
    )
  );

-- Add triggers
CREATE TRIGGER update_course_encoding_updated_at BEFORE UPDATE ON course_encoding
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_synthesization_updated_at BEFORE UPDATE ON course_synthesization
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_assimilation_updated_at BEFORE UPDATE ON course_assimilation
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_reviews_updated_at BEFORE UPDATE ON course_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
