-- First, ensure we're using the auth schema
SET search_path TO auth, public;

-- Insert into organizations if not exists
INSERT INTO public.organizations (name, tax_id, address, status)
SELECT 'Memorial Hospital', '12-3456789', '123 Medical Center Dr, Austin, TX 78701', 'active'
WHERE NOT EXISTS (
    SELECT 1 FROM public.organizations WHERE name = 'Memorial Hospital'
);

-- Create user with Supabase's auth.users() function
SELECT auth.create_user(
  jsonb_build_object(
    'email', 'demo@healthlens.ai',
    'password', 'demo1234',
    'email_confirmed_at', now(),
    'role', 'authenticated'
  )
);

-- Add the user profile to public.users
INSERT INTO public.users (
  id,
  email,
  full_name,
  organization_id,
  role,
  status,
  features
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'demo@healthlens.ai'),
  'demo@healthlens.ai',
  'Demo User',
  (SELECT id FROM public.organizations WHERE name = 'Memorial Hospital'),
  'admin',
  'active',
  ARRAY['analytics', 'reports', 'billing']
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;