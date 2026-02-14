
-- 1. Create companies table (no policies yet)
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  industry TEXT,
  company_size TEXT,
  logo_url TEXT,
  website TEXT,
  created_by UUID NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- 2. Create company_members table
CREATE TABLE public.company_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'recruiter', 'viewer')),
  invited_by UUID,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;

-- 3. Create audit_logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 4. Now add policies (company_members exists)
CREATE POLICY "Members can view their company" ON public.companies FOR SELECT
  USING (id IN (SELECT company_id FROM public.company_members WHERE user_id = auth.uid()) OR created_by = auth.uid());

CREATE POLICY "Creator can update company" ON public.companies FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Users can create companies" ON public.companies FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- company_members policies - use security definer to avoid recursion
CREATE OR REPLACE FUNCTION public.get_user_company_ids(_user_id UUID)
RETURNS SETOF UUID
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT company_id FROM public.company_members WHERE user_id = _user_id;
$$;

CREATE POLICY "Members can view company members" ON public.company_members FOR SELECT
  USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Self insert on creation" ON public.company_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can delete members" ON public.company_members FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.company_members cm 
    WHERE cm.company_id = company_members.company_id AND cm.user_id = auth.uid() AND cm.role = 'admin'
  ));

-- audit_logs policies
CREATE POLICY "Company members can view audit logs" ON public.audit_logs FOR SELECT
  USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create audit logs" ON public.audit_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. Add company_id to existing tables
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);
ALTER TABLE public.candidates ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);

-- 6. Indexes
CREATE INDEX idx_company_members_user ON public.company_members(user_id);
CREATE INDEX idx_company_members_company ON public.company_members(company_id);
CREATE INDEX idx_audit_logs_company ON public.audit_logs(company_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);
CREATE INDEX idx_jobs_company ON public.jobs(company_id) WHERE company_id IS NOT NULL;
CREATE INDEX idx_assessments_company ON public.assessments(company_id) WHERE company_id IS NOT NULL;
CREATE INDEX idx_candidates_company ON public.candidates(company_id) WHERE company_id IS NOT NULL;

-- 7. Trigger
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
