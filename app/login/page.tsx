"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- 1. GOOGLE OAUTH LOGIN ---
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // This tells Supabase where to send the user after Google approves them.
        // We will build this callback route in Step 2!
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // --- 2. EMAIL / PASSWORD LOGIN ---
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh(); // Refreshes the server components to show the logged-in state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full mb-25 max-w-md bg-white/50 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-xl p-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bebas uppercase font-bold text-neutral-900">
            <TextAnimate animation="blurInUp" by="character" once>
              Client Portal
            </TextAnimate>
          </h1>
          <p className="text-neutral-500 mt-2">Sign in to manage your projects</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* GOOGLE LOGIN BUTTON */}
        <div onClick={handleGoogleLogin} className="w-full">
          <Buttonx buttonClassName="w-full h-12 bg-white text-neutral-900 border-neutral-200 hover:bg-neutral-50 flex items-center justify-center gap-2">
            {isLoading ? "Connecting..." : "Continue with Google"}
            {/* Simple Google SVG Icon */}
            {!isLoading && (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
          </Buttonx>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">Or continue with email</span>
          </div>
        </div>

        {/* EMAIL & PASSWORD FORM */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:outline-none focus:ring-0 focus:ring-neutral-900 bg-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:outline-none focus:ring-0 focus:ring-neutral-900 bg-white"
            />
          </div>
          

            <Buttonx buttonClassName="w-full h-12 bg-green-300 text-white border-0 hover:bg-green-500">
              {isLoading ? "Signing in..." : "Sign In"}
            </Buttonx>
        </form>

      </div>
    </div>
  );
}

//type="submit" disabled={isLoading} 