'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Atom } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, just redirect
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Atom className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-on-background">Welcome back</h1>
          <p className="text-on-surface-variant mt-2 text-sm max-w-sm">
            Log in to continue your chemistry learning journey with EduChem-GenAI.
          </p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-on-surface" htmlFor="email">Email</label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-on-surface" htmlFor="password">Password</label>
                <a href="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</a>
              </div>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-on-primary hover:bg-primary/90 rounded-xl py-3 font-medium transition-colors mt-2"
            >
              Log in
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink-0 mx-4 text-on-surface-variant text-xs font-medium uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            <button 
              type="button"
              onClick={handleLogin}
              className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low rounded-xl py-3 font-medium transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-1.02 7.28-2.76l-3.57-2.77c-.99.68-2.26 1.09-3.71 1.09-2.87 0-5.3-1.94-6.16-4.55H2.16v2.85C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.01c-.22-.68-.35-1.4-.35-2.01s.13-1.33.35-2.01V7.14H2.16C1.45 8.54 1 10.22 1 12s.45 3.46 1.16 4.86l3.68-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.14l3.68 2.85c.86-2.61 3.29-4.61 6.16-4.61z" />
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-on-surface-variant">
          Don&apos;t have an account? <Link href="/register" className="text-primary font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
