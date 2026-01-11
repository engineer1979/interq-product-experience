-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- "zoom", "google_calendar", "linked_in", "greenhouse"
    provider TEXT NOT NULL,
    
    -- "video_conferencing", "calendar", "ats", "auth"
    category TEXT NOT NULL CHECK (category IN ('video_conferencing', 'calendar', 'ats', 'auth')),
    
    name TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    
    is_enabled BOOLEAN DEFAULT false,
    is_connected BOOLEAN DEFAULT false,
    
    -- Store non-sensitive configuration (e.g. "default_duration": 30)
    config JSONB DEFAULT '{}'::jsonb,
    
    -- In a real production app, use Supabase Vault. 
    -- For now, we store simplified credentials or placeholder tokens.
    credentials JSONB DEFAULT '{}'::jsonb,
    
    last_synced_at TIMESTAMP WITH TIME ZONE
);

-- Add RLS policies
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to authenticated users"
    ON integrations FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow admin to manage integrations"
    ON integrations FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Insert default supported integrations (placeholder state)
INSERT INTO integrations (provider, category, name, description, logo_url) VALUES
('zoom', 'video_conferencing', 'Zoom', 'Automatically generate meeting links for interviews.', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg'),
('google_meet', 'video_conferencing', 'Google Meet', 'Schedule interviews directly on Google Calendar.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Meet_icon_%282020%29.svg/2491px-Google_Meet_icon_%282020%29.svg.png'),
('google_calendar', 'calendar', 'Google Calendar', 'Sync interviewer availability and prevent double-booking.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png'),
('outlook', 'calendar', 'Outlook Calendar', 'Connect your Microsoft Outlook calendar for scheduling.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/1101px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png'),
('greenhouse', 'ats', 'Greenhouse', 'Sync candidates and interview results with Greenhouse ATS.', 'https://mma.prnewswire.com/media/555899/Greenhouse_Logo.jpg?p=facebook'),
('lever', 'ats', 'Lever', 'Automate candidate workflows between InterQ and Lever.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lever_Logo.svg/1200px-Lever_Logo.svg.png'),
('workday', 'ats', 'Workday', 'Enterprise-grade HR integration for candidate management.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Workday_Logo.png/1200px-Workday_Logo.png');
