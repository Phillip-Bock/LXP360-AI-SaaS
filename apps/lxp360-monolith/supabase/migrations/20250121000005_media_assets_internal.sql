-- =====================================================
-- Migration: Media Assets (Internal LXD360 Only)
-- Description: Digital Asset Manager for internal team
-- =====================================================

-- Create media_assets table (company-wide for LXD360)
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  file_type TEXT CHECK (file_type IN ('image', 'video', 'audio', '3d_model', 'document', 'code', 'other')) NOT NULL,
  file_extension TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  duration_seconds INTEGER,
  
  -- Metadata
  alt_text TEXT,
  caption TEXT,
  tags TEXT[],
  category TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  -- Version control
  version INTEGER DEFAULT 1,
  parent_asset_id UUID REFERENCES media_assets(id) ON DELETE SET NULL,
  
  -- Check-in/check-out workflow
  is_checked_out BOOLEAN DEFAULT false,
  checked_out_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  checked_out_at TIMESTAMPTZ,
  
  -- Status
  status TEXT CHECK (status IN ('draft', 'approved', 'under_review', 'requires_revision', 'archived')) DEFAULT 'draft',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  
  -- Usage tracking
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create asset_versions table (version history)
CREATE TABLE IF NOT EXISTS asset_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  change_description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(asset_id, version_number)
);

-- Create asset_usage table (track where assets are used)
CREATE TABLE IF NOT EXISTS asset_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  content_block_id UUID REFERENCES content_blocks(id) ON DELETE CASCADE,
  usage_type TEXT CHECK (usage_type IN ('thumbnail', 'content', 'background', 'icon', 'other')) DEFAULT 'content',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create asset_checkouts table (audit trail for check-in/check-out)
CREATE TABLE IF NOT EXISTS asset_checkouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES media_assets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT CHECK (action IN ('checkout', 'checkin')) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_media_assets_file_type ON media_assets(file_type);
CREATE INDEX idx_media_assets_status ON media_assets(status);
CREATE INDEX idx_media_assets_project_id ON media_assets(project_id);
CREATE INDEX idx_media_assets_checked_out_by ON media_assets(checked_out_by);
CREATE INDEX idx_media_assets_tags ON media_assets USING GIN(tags);
CREATE INDEX idx_asset_versions_asset_id ON asset_versions(asset_id);
CREATE INDEX idx_asset_usage_asset_id ON asset_usage(asset_id);
CREATE INDEX idx_asset_usage_course_id ON asset_usage(course_id);
CREATE INDEX idx_asset_checkouts_asset_id ON asset_checkouts(asset_id);
CREATE INDEX idx_asset_checkouts_user_id ON asset_checkouts(user_id);

-- Enable RLS
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_checkouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Internal LXD360 team only)
CREATE POLICY "LXD360 team can view all media assets"
  ON media_assets FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND organization_id IN (
        SELECT id FROM organizations WHERE name = 'LXD360'
      )
    )
  );

CREATE POLICY "LXD360 team can manage media assets"
  ON media_assets FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND organization_id IN (
        SELECT id FROM organizations WHERE name = 'LXD360'
      )
    )
  );

CREATE POLICY "LXD360 team can view asset versions"
  ON asset_versions FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND organization_id IN (
        SELECT id FROM organizations WHERE name = 'LXD360'
      )
    )
  );

CREATE POLICY "LXD360 team can view asset usage"
  ON asset_usage FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND organization_id IN (
        SELECT id FROM organizations WHERE name = 'LXD360'
      )
    )
  );

CREATE POLICY "LXD360 team can view checkout history"
  ON asset_checkouts FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND organization_id IN (
        SELECT id FROM organizations WHERE name = 'LXD360'
      )
    )
  );

-- Add triggers
CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON media_assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle asset checkout
CREATE OR REPLACE FUNCTION checkout_asset(asset_uuid UUID, user_uuid UUID, checkout_notes TEXT DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if asset is already checked out
  IF EXISTS (SELECT 1 FROM media_assets WHERE id = asset_uuid AND is_checked_out = true) THEN
    RAISE EXCEPTION 'Asset is already checked out';
  END IF;
  
  -- Check out the asset
  UPDATE media_assets 
  SET is_checked_out = true,
      checked_out_by = user_uuid,
      checked_out_at = NOW()
  WHERE id = asset_uuid;
  
  -- Log the checkout
  INSERT INTO asset_checkouts (asset_id, user_id, action, notes)
  VALUES (asset_uuid, user_uuid, 'checkout', checkout_notes);
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle asset checkin
CREATE OR REPLACE FUNCTION checkin_asset(asset_uuid UUID, user_uuid UUID, checkin_notes TEXT DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if asset is checked out by this user
  IF NOT EXISTS (
    SELECT 1 FROM media_assets 
    WHERE id = asset_uuid 
    AND is_checked_out = true 
    AND checked_out_by = user_uuid
  ) THEN
    RAISE EXCEPTION 'Asset is not checked out by this user';
  END IF;
  
  -- Check in the asset
  UPDATE media_assets 
  SET is_checked_out = false,
      checked_out_by = NULL,
      checked_out_at = NULL
  WHERE id = asset_uuid;
  
  -- Log the checkin
  INSERT INTO asset_checkouts (asset_id, user_id, action, notes)
  VALUES (asset_uuid, user_uuid, 'checkin', checkin_notes);
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
