import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')

      if (isAdminRoute) {
        if (!isLoggedIn) return false  // redirect to sign in
        // Only YOUR email gets admin access
        if (auth?.user?.email !== process.env.ADMIN_EMAIL) return false
        return true
      }
      return true  // all other routes are public
    },
    session({ session, token }) {
      return session
    }
  },
  pages: {
    signIn: '/admin/login',   // your custom login page
    error: '/admin/login',
  }
})