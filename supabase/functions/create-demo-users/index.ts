import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DemoUser {
  email: string;
  password: string;
  fullName: string;
  role: 'admin' | 'company' | 'job_seeker';
}

const demoUsers: DemoUser[] = [
  {
    email: 'admin@interq.demo',
    password: 'Admin@123',
    fullName: 'Admin User',
    role: 'admin',
  },
  {
    email: 'company@interq.demo',
    password: 'Company@123',
    fullName: 'Company User',
    role: 'company',
  },
  {
    email: 'jobseeker@interq.demo',
    password: 'JobSeeker@123',
    fullName: 'Job Seeker User',
    role: 'job_seeker',
  },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const results = [];

    for (const user of demoUsers) {
      console.log(`Creating demo user: ${user.email}`);

      const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
      const userExists = existingUser?.users.some(u => u.email === user.email);

      if (userExists) {
        console.log(`User ${user.email} already exists, skipping...`);
        results.push({ email: user.email, status: 'already_exists', role: user.role });
        continue;
      }

      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: { full_name: user.fullName },
      });

      if (createError) {
        console.error(`Error creating user ${user.email}:`, createError);
        results.push({ email: user.email, status: 'error', error: createError.message });
        continue;
      }

      if (newUser.user && user.role !== 'job_seeker') {
        const { error: roleError } = await supabaseAdmin
          .from('user_roles')
          .update({ role: user.role })
          .eq('user_id', newUser.user.id);

        if (roleError) {
          console.error(`Error updating role for ${user.email}:`, roleError);
        }
      }

      results.push({ email: user.email, status: 'created', role: user.role });
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Demo users processed', results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error in create-demo-users function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
