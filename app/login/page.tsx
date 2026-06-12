"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import { Buttonx } from "@/components/layout/Buttonx";
import { TextAnimate } from "@/components/ui/text-animate";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  // Form States
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  
  // UI States
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- REGEX VALIDATORS ---
  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const validatePhone = (phoneStr: string) => {
    return /^\+?[\d\s\-()]{7,15}$/.test(phoneStr);
  };

  // --- 1. GOOGLE OAUTH LOGIN ---
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // --- 2. EMAIL / PASSWORD AUTH (SIGN IN & SIGN UP) ---
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Validate Email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      // Validate Phone (Only on Sign Up) rounded
      if (!validatePhone(phone)) {
        setError("Please enter a valid phone number.");
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phone,
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMsg("Account created! Please check your email to verify your account.");
        setPassword(""); 
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh(); 
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      
      {/* 1. BACK BUTTON blurpass(Absolute positioned to top left)rounded*/}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors focus:outline-none"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium text-sm">Back to site</span>
      </button>

      {/* 2. THE BACKGROUND ORBS */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>

      {/* 3. GLASSMORPHISM CARD */}
      <div className="relative z-10 w-full max-w-md bg-white border border-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bebas uppercase font-bold text-neutral-900">
            <TextAnimate animation="blurInUp" by="character" once>
              Client Portal
            </TextAnimate>
          </h1>
          <p className="text-neutral-500 mt-2">
            {isSignUp ? "Create an account to get started" : "Sign in to manage your projects"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-sm border border-red-200">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-3 bg-green-50 text-green-700 text-sm rounded-sm border border-green-200">
            {successMsg}
          </div>
        )}

        
            <div onClick={handleGoogleLogin} className="w-full cursor-pointer">
              <Buttonx buttonClassName="w-full h-12 bg-white/80 text-neutral-900 border-neutral-200 hover:bg-white flex items-center justify-center gap-2 transition-colors rounded-sm">
                {isLoading ? "Connecting..." : "Continue with Google"}
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
        <form onSubmit={handleEmailAuth} className="space-y-4">
          
          {isSignUp && (
            <>
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required={isSignUp}
                  className="w-full px-4 py-3 rounded-sm border border-neutral-200/60 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white/70  transition-all"
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  required={isSignUp}
                  className="w-full px-4 py-3 rounded-sm border border-neutral-200/60 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white/70  transition-all"
                />
              </div>
            </>
          )}

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full px-4 py-3 rounded-sm border border-neutral-200/60 focus:outline-none focus:ring-0 focus:ring-neutral-900 bg-white/70  transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password "
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-sm border border-neutral-200/60 focus:outline-none focus:ring-0 focus:ring-neutral-900 bg-white/70  transition-all"
            />
          </div>
          
          <Buttonx 
            type="submit" 
            disabled={isLoading} 
            buttonClassName="w-full h-12 bg-green-300 text-neutral-900 border-0 hover:bg-green-400 flex items-center justify-center"
          >
            {isLoading 
              ? "Processing..." 
              : isSignUp 
                ? "Create Account" 
                : "Sign In"}
          </Buttonx>
          
        </form>

        <div className="mt-6 text-center text-sm text-neutral-500">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccessMsg(null);
            }}
            className="text-neutral-900 font-semibold hover:underline focus:outline-none"
          >
            {isSignUp ? "Sign in here" : "Register here"}
          </button>
        </div>

      </div>
    </div>
  );
}