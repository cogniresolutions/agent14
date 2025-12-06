-- Remove the UPDATE policy that allows users to manipulate their own points/tier
DROP POLICY IF EXISTS "Users can update own membership" ON public.loyalty_members;