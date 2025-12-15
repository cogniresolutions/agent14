-- Add pending_details column to sf_agent_sessions for confirmation flow
ALTER TABLE public.sf_agent_sessions 
ADD COLUMN IF NOT EXISTS pending_details JSONB DEFAULT NULL;

-- Add comment explaining the column
COMMENT ON COLUMN public.sf_agent_sessions.pending_details IS 'Stores reservation details pending user confirmation (email, reservation_id, awaiting_confirmation flag)';