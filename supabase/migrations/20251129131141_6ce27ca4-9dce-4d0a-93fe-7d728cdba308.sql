-- Fix infinite recursion in user_roles RLS policies
-- Drop any existing problematic policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create simple, non-recursive policies
-- Users can view their own roles (no recursion - just checking auth.uid())
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can view all roles (for admin checks in application code)
CREATE POLICY "Allow read access to roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Only allow inserts through the handle_new_user trigger (service role)
CREATE POLICY "Service role can insert roles"
  ON public.user_roles
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow updates only by service role
CREATE POLICY "Service role can update roles"
  ON public.user_roles
  FOR UPDATE
  TO service_role
  USING (true);

-- Allow deletes only by service role
CREATE POLICY "Service role can delete roles"
  ON public.user_roles
  FOR DELETE
  TO service_role
  USING (true);