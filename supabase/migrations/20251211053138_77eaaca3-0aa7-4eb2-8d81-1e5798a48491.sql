-- Enable RLS on sf_agent_sessions
ALTER TABLE public.sf_agent_sessions ENABLE ROW LEVEL SECURITY;

-- Allow service role (edge functions) full access
CREATE POLICY "Service role has full access to sessions"
ON public.sf_agent_sessions
FOR ALL
USING (true)
WITH CHECK (true);