-- ============================================
-- LXP360 Contact Submissions Table
-- Migration: Create contact form submissions table
-- ============================================

-- Create contact_submissions table for storing contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all submissions (for admin purposes)
CREATE POLICY "Authenticated users can view all submissions"
  ON public.contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx 
  ON public.contact_submissions (created_at DESC);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx 
  ON public.contact_submissions (email);
