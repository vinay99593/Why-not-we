import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';

export const WorkerLoginPage: React.FC = () => {
  const { setAuthScreen, loginAsWorker, setIsProviderRegisterModalOpen } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState('');
  const [resetSentNotice, setResetSentNotice] = useState(false);

  const handleUseDemo = () => {
    setIdentifier('worker@whynotwe.demo');
    setPassword('Worker@123');
    setIsError('');
  };

  const handleForgotPassword = () => {
    setResetSentNotice(true);
    setIdentifier('worker@whynotwe.demo');
    setPassword('Worker@123');
    setTimeout(() => setResetSentNotice(false), 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError('');

    if (!identifier.trim() || !password.trim()) {
      setIsError('Please enter valid worker credentials or tap "Fill Demo"');
      return;
    }
    loginAsWorker(identifier, password);
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
        {/* Left Visual Banner with Realistic Worker Photography */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Worker"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-white text-blue-600 flex items-center justify-center font-black font-display text-xl shadow-md">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight font-display block leading-none">
                  WHY NOT WE
                </span>
                <span className="text-[10px] text-blue-200 font-medium">Service Partner Portal</span>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight leading-tight">
                Grow your local service business with verified leads.
              </h2>
              <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                Receive instant job alerts in your pincode, direct UPI settlements, and zero commission on everyday tasks.
              </p>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="relative z-10 pt-6 space-y-2.5 text-xs text-blue-50 border-t border-blue-500/30 mt-6 md:mt-0">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/40 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>0% Commission Free Partner Tier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/40 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>Instant Bank & UPI Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-500/40 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span>Direct Customer In-App Calling & Chat</span>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-display">Worker Portal Sign In</h1>
            <p className="text-xs text-slate-500 mt-1">
              Access your incoming requests, live routes, and daily earnings
            </p>
          </div>

          {/* Demo Account Box */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                <span>Demo Partner (Ravi Kumar · Master Electrician)</span>
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
                Email: <strong className="text-slate-900 font-semibold">worker@whynotwe.demo</strong>
              </div>
              <div>
                Password: <strong className="text-slate-900 font-semibold">Worker@123</strong>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Registered Mobile or Partner Email *
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="worker@whynotwe.demo or 9845012345"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setIsError('');
                  }}
                  className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 bg-white text-slate-900 focus:border-blue-600 focus:outline-hidden font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700 font-bold">Password *</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
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

            {resetSentNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Password filled with demo: <strong>Worker@123</strong></span>
              </div>
            )}

            {isError && (
              <p className="text-rose-600 text-[11px] font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {isError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 cursor-pointer"
            >
              <span>ACCESS WORKER DASHBOARD</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Registration Modal Trigger */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            <p>
              Want to join as a new service technician?{' '}
              <button
                type="button"
                onClick={() => setIsProviderRegisterModalOpen(true)}
                className="font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Register as Verified Partner
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
