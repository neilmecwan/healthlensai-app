import { supabase } from '../lib/supabase';

const organizations = [
  {
    id: '1',
    name: 'Memorial Hospital',
    tax_id: '12-3456789',
    address: '123 Medical Center Dr, Austin, TX 78701',
    status: 'active',
  }
];

const users = [
  {
    email: 'demo@healthlens.ai',
    password: 'demo1234',  // This will be the login password
    full_name: 'Demo User',
    organization_id: '1',
    role: 'admin',
    status: 'active',
    features: ['analytics', 'reports', 'billing']
  }
];

export async function seedDatabase() {
  try {
    // Clear existing data
    await supabase.from('users').delete().neq('id', '0');
    await supabase.from('organizations').delete().neq('id', '0');

    // Create organization
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .insert(organizations)
      .select();

    if (orgError) throw orgError;

    // Create user in Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: users[0].email,
      password: users[0].password
    });

    if (authError) throw authError;

    // Create user profile
    const { error: userError } = await supabase.from('users').insert({
      id: authData.user?.id,
      email: users[0].email,
      full_name: users[0].full_name,
      organization_id: orgData[0].id,
      role: users[0].role,
      status: users[0].status,
      features: users[0].features
    });

    if (userError) throw userError;

    console.log('Database seeded successfully');
    console.log('Login credentials:');
    console.log('Email:', users[0].email);
    console.log('Password:', users[0].password);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}