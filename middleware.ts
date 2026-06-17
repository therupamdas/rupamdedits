import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  // 🔒 SECURITY FIX: Back to getUser() to ensure the token is cryptographically valid
  // The optimized matcher below ensures this only runs on actual page requests.
  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  const safeRedirect = (path: string) => {
    const url = request.nextUrl.clone()
    url.pathname = path
    const redirectResponse = NextResponse.redirect(url)
    
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    
    return redirectResponse
  }

  // 1. Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!user) return safeRedirect('/login')
    if (user.email !== process.env.ADMIN_EMAIL) return safeRedirect('/dashboard')
  }

  // 2. Protect Client Dashboard
  if (pathname.startsWith('/dashboard') && !user) {
    return safeRedirect('/login')
  }

  return supabaseResponse
}

export const config = {
  // This is what keeps your site fast! It ignores static assets.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}