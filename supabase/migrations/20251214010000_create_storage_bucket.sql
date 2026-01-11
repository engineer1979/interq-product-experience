-- Create a new storage bucket for Resumes
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false);

-- Enable RLS
alter table storage.objects enable row level security;

-- Policy: Allow ANYONE (including implicit candidates) to upload resumes
-- Note: In production, you might want to link this to a temporary candidate session/auth, 
-- but for open applications, public upload is often required.
create policy "Public Resume Upload"
on storage.objects for insert
with check ( bucket_id = 'resumes' );

-- Policy: Allow Recruiters (authenticated users) to View/Download resumes
create policy "Recruiters View Resumes"
on storage.objects for select
to authenticated
using ( bucket_id = 'resumes' );
