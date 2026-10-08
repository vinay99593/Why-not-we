import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Terminal,
  Sparkles,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { setAuthScreen, loginAsAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState('');

  const handleUseDemo = () => {
    setEmail('admin@whynotwe.demo');
    setPassword('Admin@123');
    setIsError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError('');

    if (!email.trim() || !password.trim()) {
      setIsError('Please enter admin credentials or click "Fill Demo"');
      return;
    }
    loginAsAdmin(email, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 relative">
      {/* Return to role screen */}
      <button
        onClick={() => setAuthScreen('welcome')}
        className="absolute top-5 left-5 text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 font-semibold transition-colors py-1.5 px-3 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Role Screen</span>
      </button>

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 my-8">
        {/* Left Visual Banner with System Console Styling */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black font-display text-xl shadow-md">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight font-display block leading-none">
                  WHY NOT WE
                </span>
                <span className="text-[10px] text-blue-300 font-medium">Root Admin Console</span>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-tight">
                Complete platform operations & real-time governance.
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Approve worker KYC, monitor live technician dispatches, audit grocery hubs, and oversee hotel inventories.
              </p>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="relative z-10 pt-6 space-y-2.5 text-xs text-slate-300 border-t border-slate-700/60 mt-6 md:mt-0">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-600/40 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span>24/7 Live Node Heartbeat Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-600/40 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span>Worker Verification & Trade Audits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-600/40 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-blue-400" />
              </div>
              <span>Automated Escrow & Dispute Resolution</span>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-display">Administrator Sign In</h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized personnel only. Encrypted audit session will be established.
            </p>
          </div>

          {/* Demo Account Box */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-blue-600" />
                <span>Demo Admin Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleUseDemo}
                className="text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
              >
                Fill Demo
              </button>
            </div>
            <div className="font-mono text-[11px] text-blue-800">
              <div>
                Email: <strong className="text-slate-900 font-semibold">admin@whynotwe.demo</strong>
              </div>
              <div>
                Password: <strong className="text-slate-900 font-semibold">Admin@123</strong>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Admin Email Address *</label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="admin@whynotwe.demo"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsError('');
                  }}
                  className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 bg-white text-slate-900 focus:border-blue-600 focus:outline-hidden font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Security Passkey *</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setIsError('');
                  }}
                  className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-10 py-2.5 bg-white text-slate-900 focus:border-blue-600 focus:outline-hidden font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isError && (
              <p className="text-rose-600 text-[11px] font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {isError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <span>ACCESS ADMIN CONSOLE</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
            End-to-End Encrypted Session · TLS 1.3 Certified
          </div>
        </div>
      </div>
    </div>
  );
};
