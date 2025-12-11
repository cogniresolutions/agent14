-- Create table to persist Salesforce sessions
CREATE TABLE public.sf_agent_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  session_id TEXT NOT NULL,
  sequence_id INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for fast lookup
CREATE INDEX idx_sf_agent_sessions_user_id ON public.sf_agent_sessions(user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_sf_agent_sessions_updated_at
BEFORE UPDATE ON public.sf_agent_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();