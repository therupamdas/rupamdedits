import { createClient } from '@supabase/supabase-js'

// Server client — uses service role key, bypasses RLS (admin only)
// Only import this in server components or API routes, never in client components
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)