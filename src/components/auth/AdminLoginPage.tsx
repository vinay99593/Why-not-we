import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, Terminal } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { setAuthScreen, loginAsAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleUseDemo = () => {
    setEmail('admin@whynotwe.demo');
    setPassword('Admin@123');
    setIsError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setIsError(true);
      return;
    }
    loginAsAdmin(email, password);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative selection:bg-indigo-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Back button */}
      <button
        onClick={() => setAuthScreen('welcome')}
        className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Portal</span>
      </button>

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
        {/* Security badge header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight">
            WHY NOT WE ADMIN
          </h1>
          <p className="text-xs text-slate-400">
            Authorized Platform Security & Operations Access
          </p>
        </div>

        {/* Demo credentials card */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
              <span>Demo Root Admin Credentials</span>
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-[10px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg transition-colors shadow-xs"
            >
              Demo Admin Login
            </button>
          </div>
          <div className="font-mono text-[11px] text-slate-300">
            <div>Email: <strong className="text-white">admin@whynotwe.demo</strong></div>
            <div>Password: <strong className="text-white">Admin@123</strong></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Admin Email *</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="admin@whynotwe.demo"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsError(false);
                }}
                className="w-full text-xs rounded-xl bg-slate-950/80 border border-slate-800 pl-10 pr-3 py-2.5 text-white focus:border-indigo-500 focus:outline-hidden font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Security Passkey *</label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsError(false);
                }}
                className="w-full text-xs rounded-xl bg-slate-950/80 border border-slate-800 pl-10 pr-3 py-2.5 text-white focus:border-indigo-500 focus:outline-hidden font-mono"
                required
              />
            </div>
          </div>

          {isError && (
            <p className="text-rose-400 text-[11px] font-semibold">
              Invalid credentials. Tap "Demo Admin Login" to autofill.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span>ADMIN LOGIN</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-[10px] text-slate-500 border-t border-slate-800/80 flex items-center justify-center gap-1">
          <KeyRound className="h-3 w-3" />
          <span>256-Bit TLS Secured Administration Gateway</span>
        </div>
      </div>
    </div>
  );
};
