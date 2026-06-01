import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
  const { nextUrl } = req
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isLoginPage = nextUrl.pathname === '/admin/login'

  // 1. If not logged in and trying to access admin, redirect to login
  if (isAdminRoute && !isLoginPage && !req.auth) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl.origin))
  }

  // 2. If logged in but email doesn't match admin email, block access
  if (isAdminRoute && req.auth?.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.redirect(new URL('/', nextUrl.origin))
  }

  return NextResponse.next()
})

// Configure the proxy to only run on admin routes
export const config = {
  matcher: ['/admin/:path*']
}