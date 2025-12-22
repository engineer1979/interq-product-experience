-- Fix search_path for update_session_activity function
CREATE OR REPLACE FUNCTION update_session_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.last_activity_at = NOW();
  RETURN NEW;
END;
$$;