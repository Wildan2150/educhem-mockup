'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Atom } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="max-w-md w-full flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Atom className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-on-background">Create an account</h1>
          <p className="text-on-surface-variant mt-2 text-sm max-w-sm">
            Join EduChem-GenAI to start your personalized chemistry learning journey.
          </p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-2xl p-6 sm:p-8 shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-on-surface" htmlFor="name">Full Name</label>
              <input 
                id="name"
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                required
              />
            </div>

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
              <label className="text-sm font-medium text-on-surface" htmlFor="password">Password</label>
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
              Sign up
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-on-surface-variant">
          Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
