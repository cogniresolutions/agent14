-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create loyalty_members table
CREATE TABLE public.loyalty_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  tier TEXT NOT NULL DEFAULT 'silver' CHECK (tier IN ('silver', 'gold', 'platinum')),
  points INTEGER NOT NULL DEFAULT 0,
  total_bookings INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on loyalty_members
ALTER TABLE public.loyalty_members ENABLE ROW LEVEL SECURITY;

-- Loyalty members policies
CREATE POLICY "Users can view own membership"
  ON public.loyalty_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own membership"
  ON public.loyalty_members FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own membership"
  ON public.loyalty_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create loyalty_offers table
CREATE TABLE public.loyalty_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  discount_percent INTEGER,
  min_tier TEXT NOT NULL DEFAULT 'silver' CHECK (min_tier IN ('silver', 'gold', 'platinum')),
  points_required INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on loyalty_offers
ALTER TABLE public.loyalty_offers ENABLE ROW LEVEL SECURITY;

-- Offers are publicly readable for authenticated users
CREATE POLICY "Authenticated users can view active offers"
  ON public.loyalty_offers FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name')
  );
  
  -- Create loyalty membership
  INSERT INTO public.loyalty_members (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

-- Trigger to auto-create profile and membership on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loyalty_members_updated_at
  BEFORE UPDATE ON public.loyalty_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();