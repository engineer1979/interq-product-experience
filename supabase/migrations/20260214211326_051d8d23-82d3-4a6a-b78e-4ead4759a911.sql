
-- Migrate user_roles
UPDATE public.user_roles SET role = 'company' WHERE role = 'enterprise';
UPDATE public.user_roles SET role = 'company' WHERE role = 'recruiter';
UPDATE public.user_roles SET role = 'job_seeker' WHERE role = 'candidate';

-- Delete old module_permissions and re-insert with new roles
DELETE FROM public.module_permissions WHERE role IN ('enterprise', 'recruiter', 'candidate');

-- Update get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
 RETURNS app_role
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role
      WHEN 'admin' THEN 1
      WHEN 'company' THEN 2
      WHEN 'job_seeker' THEN 3
    END
  LIMIT 1
$$;

-- Update handle_new_user to assign job_seeker as default
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'job_seeker');
  
  RETURN NEW;
END;
$$;

-- Insert module_permissions for new roles
INSERT INTO public.module_permissions (role, module_name, can_view, can_create, can_edit, can_delete)
VALUES
  ('company', 'assessments', true, true, true, true),
  ('company', 'interviews', true, true, true, true),
  ('company', 'analytics', true, false, false, false),
  ('company', 'users', true, false, false, false),
  ('company', 'settings', true, false, true, false),
  ('job_seeker', 'assessments', true, false, false, false),
  ('job_seeker', 'interviews', true, false, false, false),
  ('job_seeker', 'analytics', true, false, false, false),
  ('job_seeker', 'users', false, false, false, false),
  ('job_seeker', 'settings', true, false, true, false);
