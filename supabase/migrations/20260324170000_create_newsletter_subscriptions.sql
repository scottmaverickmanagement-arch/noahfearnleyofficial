CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from the Edge Function or frontend if needed)
CREATE POLICY "Enable insert for all" ON public.newsletter_subscriptions
FOR INSERT WITH CHECK (true);
