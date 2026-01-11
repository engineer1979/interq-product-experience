-- Create module_permissions table
CREATE TABLE public.module_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role public.app_role NOT NULL,
  module_name TEXT NOT NULL,
  can_view BOOLEAN DEFAULT false,
  can_create BOOLEAN DEFAULT false,
  can_edit BOOLEAN DEFAULT false,
  can_delete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(role, module_name)
);

-- Enable RLS
ALTER TABLE public.module_permissions ENABLE ROW LEVEL SECURITY;

-- Policies for module_permissions
CREATE POLICY "Anyone can view module permissions"
  ON public.module_permissions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage module permissions"
  ON public.module_permissions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert default permissions
INSERT INTO public.module_permissions (role, module_name, can_view, can_create, can_edit, can_delete) VALUES
-- Admin permissions (full access)
('admin', 'assessments', true, true, true, true),
('admin', 'interviews', true, true, true, true),
('admin', 'analytics', true, true, true, true),
('admin', 'users', true, true, true, true),
('admin', 'settings', true, true, true, true),

-- Recruiter permissions
('recruiter', 'assessments', true, true, true, true),
('recruiter', 'interviews', true, true, true, false),
('recruiter', 'analytics', true, false, false, false),
('recruiter', 'users', false, false, false, false),
('recruiter', 'settings', false, false, false, false),

-- Enterprise permissions
('enterprise', 'assessments', true, true, true, true),
('enterprise', 'interviews', true, true, true, true),
('enterprise', 'analytics', true, false, false, false),
('enterprise', 'users', true, true, false, false),
('enterprise', 'settings', false, false, false, false),

-- Candidate permissions
('candidate', 'assessments', true, false, false, false),
('candidate', 'interviews', true, false, false, false),
('candidate', 'analytics', true, false, false, false),
('candidate', 'users', false, false, false, false),
('candidate', 'settings', false, false, false, false);

-- Add trigger for updated_at
CREATE TRIGGER set_module_permissions_updated_at
  BEFORE UPDATE ON public.module_permissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Update profiles table policies for admin
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Update user_roles policies for admin management
CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));