'use client';

import { useState } from 'react';
import { Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Role } from '@/lib/dashboard-types';

export function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [selectedRole, setSelectedRole] = useState<Role>('Staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email.trim() || !password)
      return setError('Enter your email and password to continue.');
    // Mock credentials until a real authentication backend is connected.
    const credentials: Record<Role, { email: string; password: string }> = {
      Admin: { email: 'admin@billuu.com', password: 'admin123' },
      Manager: { email: 'manager@billuu.com', password: 'manager123' },
      Staff: { email: 'staff@billuu.com', password: 'staff123' },
    };
    if (
      credentials[selectedRole].email !== email.trim().toLowerCase() ||
      credentials[selectedRole].password !== password
    ) {
      return setError('Those credentials do not match the selected role.');
    }
    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    onLogin(selectedRole);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f7f2e6] to-[#ede6d4] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#e3dcc8]/80 bg-[#fffdf7] p-8 shadow-lg shadow-[#e3dcc8]/50">
        <div className="mb-8 flex justify-center">
          <div className="grid size-16 place-items-center rounded-2xl bg-[#6b7f3f] text-white shadow-lg shadow-[#242b18]/20">
            <Utensils className="size-8" />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-[#3a3020]">
          Billuu
        </h1>
        <p className="mt-1 text-center text-sm text-[#8a7f6c]">
          Restaurant Billing System
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#5c5240]">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              placeholder="you@billuu.com"
              className="h-11 rounded-xl border border-[#e3dcc8] px-3 font-normal outline-none ring-[#6b7f3f] focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#5c5240]">
            Password
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter password"
                className="h-11 w-full rounded-xl border border-[#e3dcc8] px-3 pr-16 font-normal outline-none ring-[#6b7f3f] focus:ring-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#55672f]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#5c5240]">
              Select your role
            </p>
            <div className="flex flex-col gap-2">
              {(['Admin', 'Manager', 'Staff'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm font-semibold transition-all',
                    selectedRole === role
                      ? 'bg-[#6b7f3f] text-white shadow-md shadow-[#6b7f3f]/30'
                      : 'border border-[#e3dcc8] bg-[#fffdf7] text-[#5c5240] hover:border-[#a8b87a] hover:bg-[#f2f0e0]',
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
            >
              {error}
            </p>
          )}
        </div>
        <button
          disabled={loading}
          onClick={submit}
          className="mt-8 w-full rounded-xl bg-[#4f5e2e] py-3 text-sm font-bold text-white transition hover:bg-[#5f7239] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in…' : `Sign in as ${selectedRole}`}
        </button>
      </div>
    </div>
  );
}
