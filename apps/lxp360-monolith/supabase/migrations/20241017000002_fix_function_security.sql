-- ============================================
-- FIX: Mutable search_path Security Warning
-- Migration: Fix security warnings for all functions
-- ============================================

-- Fix assign_default_role function (if it exists)
DROP FUNCTION IF EXISTS public.assign_default_role(UUID) CASCADE;

CREATE OR REPLACE FUNCTION public.assign_default_role(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp
AS $$
DECLARE
  v_learner_role_id UUID;
BEGIN
  -- Get learner role ID (must use full schema qualification)
  SELECT id INTO v_learner_role_id 
  FROM public.roles 
  WHERE name = 'learner';
  
  -- Raise exception if learner role doesn't exist
  IF v_learner_role_id IS NULL THEN
    RAISE EXCEPTION 'Learner role not found in roles table';
  END IF;
  
  -- Assign role if user doesn't already have it
  INSERT INTO public.user_roles (user_id, role_id)
  VALUES (p_user_id, v_learner_role_id)
  ON CONFLICT (user_id, role_id, organization_id) DO NOTHING;
END;
$$;

-- Security: Limit access to this function
REVOKE ALL ON FUNCTION public.assign_default_role(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.assign_default_role(UUID) TO authenticated;
