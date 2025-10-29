-- Migration: Workflow States, Versioning, and Audit Logging
-- Description: Content workflow management and compliance audit trails

-- =====================================================
-- WORKFLOW STATES
-- =====================================================

-- Workflow states for content (courses, lessons, etc.)
CREATE TABLE IF NOT EXISTS workflow_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'course', 'module', 'lesson', 'content_block'
  content_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Workflow state
  state TEXT NOT NULL CHECK (state IN ('draft', 'development', 'review', 'published', 'archived', 'deprecated', 'under_revision')),
  previous_state TEXT,
  
  -- Metadata
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  
  -- Approval tracking
  requires_approval BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workflow_states_content ON workflow_states(content_type, content_id);
CREATE INDEX idx_workflow_states_org ON workflow_states(organization_id);
CREATE INDEX idx_workflow_states_state ON workflow_states(state);

-- RLS Policies
ALTER TABLE workflow_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view workflow states in their org"
  ON workflow_states FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Content managers can update workflow states"
  ON workflow_states FOR ALL
  USING (
    organization_id IN (
      SELECT ur.organization_id 
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('super_administrator', 'tenant_administrator', 'content_manager')
    )
  );

-- =====================================================
-- CONTENT VERSIONS
-- =====================================================

-- Version control for courses and content
CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'course', 'module', 'lesson', 'content_block'
  content_id UUID NOT NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Version info
  version_number INTEGER NOT NULL,
  version_label TEXT, -- e.g., "v1.0", "v2.0-beta"
  is_current BOOLEAN DEFAULT false,
  
  -- Content snapshot (JSONB for flexibility)
  content_snapshot JSONB NOT NULL,
  
  -- Change tracking
  change_summary TEXT,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Publishing info
  published_at TIMESTAMPTZ,
  published_by UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(content_type, content_id, version_number)
);

-- Indexes
CREATE INDEX idx_content_versions_content ON content_versions(content_type, content_id);
CREATE INDEX idx_content_versions_org ON content_versions(organization_id);
CREATE INDEX idx_content_versions_current ON content_versions(is_current) WHERE is_current = true;

-- RLS Policies
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view versions in their org"
  ON content_versions FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Content managers can create versions"
  ON content_versions FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT ur.organization_id 
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('super_administrator', 'tenant_administrator', 'content_manager')
    )
  );

-- =====================================================
-- AUDIT LOGS (HIPAA, OSHA, FINRA Compliance)
-- =====================================================

-- Comprehensive audit trail for compliance
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Action details
  action_type TEXT NOT NULL, -- 'create', 'read', 'update', 'delete', 'publish', 'approve', 'reject'
  entity_type TEXT NOT NULL, -- 'course', 'user', 'enrollment', 'assessment', etc.
  entity_id UUID,
  
  -- User info
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  user_role TEXT,
  
  -- Request details
  ip_address INET,
  user_agent TEXT,
  
  -- Change details
  old_values JSONB,
  new_values JSONB,
  change_description TEXT,
  
  -- Metadata
  metadata JSONB, -- Additional context
  
  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_audit_logs_org ON audit_logs(organization_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action_type);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- RLS Policies
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Super admins can view all audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'super_administrator'
    )
  );

CREATE POLICY "Tenant admins can view their org audit logs"
  ON audit_logs FOR SELECT
  USING (
    organization_id IN (
      SELECT ur.organization_id 
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'tenant_administrator'
    )
  );

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true); -- Allow system to log everything

-- =====================================================
-- RETENTION POLICIES
-- =====================================================

-- Retention policy settings per organization
CREATE TABLE IF NOT EXISTS retention_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Policy settings
  content_type TEXT NOT NULL, -- 'archived', 'deprecated', 'audit_logs'
  retention_days INTEGER NOT NULL, -- How long to keep
  auto_delete BOOLEAN DEFAULT false, -- Automatically delete after retention period
  
  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, content_type)
);

-- RLS Policies
ALTER TABLE retention_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage retention policies"
  ON retention_policies FOR ALL
  USING (
    organization_id IN (
      SELECT ur.organization_id 
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('super_administrator', 'tenant_administrator')
    )
  );

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to log audit events
CREATE OR REPLACE FUNCTION log_audit_event(
  p_organization_id UUID,
  p_action_type TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL,
  p_change_description TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_audit_id UUID;
BEGIN
  INSERT INTO audit_logs (
    organization_id,
    action_type,
    entity_type,
    entity_id,
    user_id,
    user_email,
    old_values,
    new_values,
    change_description
  ) VALUES (
    p_organization_id,
    p_action_type,
    p_entity_type,
    p_entity_id,
    auth.uid(),
    (SELECT email FROM auth.users WHERE id = auth.uid()),
    p_old_values,
    p_new_values,
    p_change_description
  ) RETURNING id INTO v_audit_id;
  
  RETURN v_audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create new content version
CREATE OR REPLACE FUNCTION create_content_version(
  p_content_type TEXT,
  p_content_id UUID,
  p_organization_id UUID,
  p_content_snapshot JSONB,
  p_change_summary TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_version_id UUID;
  v_next_version INTEGER;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1 
  INTO v_next_version
  FROM content_versions
  WHERE content_type = p_content_type
  AND content_id = p_content_id;
  
  -- Mark all previous versions as not current
  UPDATE content_versions
  SET is_current = false
  WHERE content_type = p_content_type
  AND content_id = p_content_id;
  
  -- Create new version
  INSERT INTO content_versions (
    content_type,
    content_id,
    organization_id,
    version_number,
    version_label,
    is_current,
    content_snapshot,
    change_summary,
    changed_by
  ) VALUES (
    p_content_type,
    p_content_id,
    p_organization_id,
    v_next_version,
    'v' || v_next_version || '.0',
    true,
    p_content_snapshot,
    p_change_summary,
    auth.uid()
  ) RETURNING id INTO v_version_id;
  
  RETURN v_version_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_workflow_states_updated_at
  BEFORE UPDATE ON workflow_states
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_retention_policies_updated_at
  BEFORE UPDATE ON retention_policies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE workflow_states IS 'Tracks workflow state changes for content (draft, development, review, published, archived, deprecated, under_revision)';
COMMENT ON TABLE content_versions IS 'Version control for courses and content with complete snapshots';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for HIPAA, OSHA, FINRA compliance';
COMMENT ON TABLE retention_policies IS 'Data retention policies per organization for archived/deprecated content';
