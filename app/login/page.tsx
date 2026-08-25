'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';
import { loginAdmin } from '@/lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await loginAdmin(username, password);
      localStorage.setItem('token', token);
      router.push('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200';

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.10) 0%, transparent 65%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1424] p-8 shadow-2xl shadow-black/40"
      >
        {/* Logo/title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <FaLock size={18} className="text-white" />
          </div>
          <h1 className="text-white font-bold text-xl">Admin Login</h1>
          <p className="text-slate-500 text-sm">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <FaUser size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <FaLock size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="shimmer-btn w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold
                       shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
