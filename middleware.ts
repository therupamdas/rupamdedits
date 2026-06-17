import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

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

  const safeRedirect = (path: string) => {
    const url = request.nextUrl.clone()
    url.pathname = path
    const redirectResponse = NextResponse.redirect(url)
    
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    
    return redirectResponse
  }

  // ---------------------------------------------------------
  // ⚡ THE SPEED OPTIMIZATION: Check Route Type First
  // ---------------------------------------------------------
  const isProtectedPath = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')

  if (isProtectedPath) {
    // 🔒 SECURE PATHS: Make the slow, highly secure network request to Supabase
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return safeRedirect('/login')
    
    if (pathname.startsWith('/admin')) {
      if (user.email !== process.env.ADMIN_EMAIL) return safeRedirect('/dashboard')
    }
  } else {
    // 🌍 PUBLIC PATHS (Home, Portfolio): Do not block the render!
    // getSession() decodes the local cookie instantly just to keep it refreshed, 
    // taking 0 milliseconds.
    await supabase.auth.getSession()
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}