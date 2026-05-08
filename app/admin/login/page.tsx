'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-4 shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 mt-2 text-sm">Secure access for instructors and admins.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="uid">Admin UID / Secret</label>
            <input 
              id="uid"
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-shadow"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-xl py-3 font-medium transition-colors mt-4"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
