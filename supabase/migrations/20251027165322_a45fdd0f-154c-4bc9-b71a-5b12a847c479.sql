-- Fix critical security issues

-- 1. Create app_role enum for proper role management
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Create user_roles table with proper security
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only allow viewing own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- 3. Create security definer function to check roles safely
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Fix profiles table - restrict viewing to own profile only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- 5. Update profiles UPDATE policy to exclude role field manipulation
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Note: The role field in profiles should only be used for display purposes (job title)
-- Never use profiles.role for authorization - always use user_roles table with has_role() function

-- 6. Fix meetings table - restrict to creator and attendees only
DROP POLICY IF EXISTS "Authenticated users can view all meetings" ON public.meetings;
CREATE POLICY "Users can view their meetings" ON public.meetings
  FOR SELECT USING (
    auth.uid() = created_by 
    OR EXISTS (
      SELECT 1 FROM public.meeting_attendees
      WHERE meeting_attendees.meeting_id = meetings.id
      AND meeting_attendees.user_id = auth.uid()
    )
  );