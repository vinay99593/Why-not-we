import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, Lock, ArrowRight, Sparkles, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

export const WorkerLoginPage: React.FC = () => {
  const { setAuthScreen, loginAsWorker, setIsProviderRegisterModalOpen } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [resetSentNotice, setResetSentNotice] = useState(false);

  const handleUseDemo = () => {
    setIdentifier('worker@whynotwe.demo');
    setPassword('Worker@123');
    setIsError(false);
  };

  const handleForgotPassword = () => {
    setResetSentNotice(true);
    setIdentifier('worker@whynotwe.demo');
    setPassword('Worker@123');
    setTimeout(() => setResetSentNotice(false), 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      setIsProviderRegisterModalOpen(true);
      return;
    }
    if (!identifier || !password) {
      setIsError(true);
      return;
    }
    loginAsWorker(identifier, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 relative">
      <button
        onClick={() => setAuthScreen('welcome')}
        className="absolute top-6 left-6 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Welcome Screen</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white font-black font-display text-xl flex items-center justify-center mx-auto shadow-md">
            <Wrench className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-950 font-display">
            Worker / Service Provider Login
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {isRegisterMode ? 'Register as a verified service partner' : 'Access your jobs, live requests & earnings'}
          </p>
        </div>

        {/* Demo Account Box */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-blue-900 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Demo Worker Account (Ravi Kumar)</span>
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
            >
              Use Demo Worker Account
            </button>
          </div>
          <div className="font-mono text-[11px] text-blue-800">
            <div>Email: <strong className="text-slate-900">worker@whynotwe.demo</strong></div>
            <div>Password: <strong className="text-slate-900">Worker@123</strong></div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Mobile Number / Email Address *
            </label>
            <div className="relative">
              <Wrench className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="worker@whynotwe.demo or 9845012345"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setIsError(false);
                }}
                className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 focus:border-blue-600 focus:outline-hidden font-medium"
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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsError(false);
                }}
                className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 focus:border-blue-600 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {resetSentNotice && (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Password recovery code simulated: <strong>Worker@123</strong> filled in!</span>
            </div>
          )}

          {isError && (
            <p className="text-rose-600 text-[11px] font-semibold">
              Please enter valid credentials or tap "Use Demo Worker Account".
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>{isRegisterMode ? 'REGISTER AS WORKER' : 'LOGIN TO WORKER DASHBOARD'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          {isRegisterMode ? (
            <button
              onClick={() => setIsRegisterMode(false)}
              className="font-bold text-slate-900 hover:underline"
            >
              Already registered? Login here
            </button>
          ) : (
            <button
              onClick={() => setIsRegisterMode(true)}
              className="font-bold text-blue-600 hover:underline"
            >
              New trade professional? REGISTER AS WORKER
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
