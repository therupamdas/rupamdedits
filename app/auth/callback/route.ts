// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // ✅ Upsert the Google user into your profiles table
      const { data: { user } } = await supabase.auth.getUser()


      if (user) {
        const { data, error: upsertError } = await supabase.from('profiles').upsert({
          id: user.id,
          full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? '',
          email: user.email,
          phone_number: user.user_metadata?.phone ?? '',
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id',
        });

        // 🚨 THIS IS THE DIAGNOSTIC KEY 🚨
        if (upsertError) {
          console.error("\n❌ SUPABASE UPSERT ERROR:", upsertError);
        } else {
          console.log("\n✅ PROFILE SUCCESSFULLY CREATED");
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-failed`)
}