import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Lock, ArrowRight, Sparkles, ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const { setAuthScreen, loginAsCustomer } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [resetSentNotice, setResetSentNotice] = useState(false);

  const handleUseDemo = () => {
    setIdentifier('customer@whynotwe.demo');
    setPassword('Customer@123');
    setIsError(false);
  };

  const handleForgotPassword = () => {
    setResetSentNotice(true);
    setIdentifier('customer@whynotwe.demo');
    setPassword('Customer@123');
    setTimeout(() => setResetSentNotice(false), 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setIsError(true);
      return;
    }
    loginAsCustomer(identifier, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4 relative">
      {/* Return to welcome */}
      <button
        onClick={() => setAuthScreen('welcome')}
        className="absolute top-6 left-6 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Welcome Screen</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-amber-400 text-slate-950 font-black font-display text-xl flex items-center justify-center mx-auto shadow-md">
            W
          </div>
          <h1 className="text-2xl font-black text-slate-950 font-display">
            Welcome to WHY NOT WE
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {isRegisterMode ? 'Create your new customer account' : 'Customer Account Login'}
          </p>
        </div>

        {/* Demo Account Box */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Demo Customer Account</span>
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="text-[11px] font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
            >
              Use Demo Account
            </button>
          </div>
          <div className="font-mono text-[11px] text-amber-800">
            <div>Email: <strong className="text-slate-900">customer@whynotwe.demo</strong></div>
            <div>Password: <strong className="text-slate-900">Customer@123</strong></div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Mobile Number / Email Address *
            </label>
            <div className="relative">
              <User className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="customer@whynotwe.demo or 9959312048"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setIsError(false);
                }}
                className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 focus:border-slate-900 focus:outline-hidden font-medium"
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
                className="text-[11px] text-amber-600 hover:underline font-semibold cursor-pointer"
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
                className="w-full text-xs rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 focus:border-slate-900 focus:outline-hidden font-medium"
                required
              />
            </div>
          </div>

          {resetSentNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Password recovery code simulated: <strong>Customer@123</strong> filled in!</span>
            </div>
          )}

          {isError && (
            <p className="text-rose-600 text-[11px] font-semibold">
              Please enter valid credentials or tap "Use Demo Account".
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>{isRegisterMode ? 'CREATE CUSTOMER ACCOUNT' : 'LOGIN TO CUSTOMER DASHBOARD'}</span>
            <ArrowRight className="h-4 w-4 text-amber-400" />
          </button>
        </form>

        {/* Toggle Register */}
        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
          {isRegisterMode ? (
            <button
              onClick={() => setIsRegisterMode(false)}
              className="font-bold text-slate-900 hover:underline"
            >
              Already have an account? Login here
            </button>
          ) : (
            <button
              onClick={() => setIsRegisterMode(true)}
              className="font-bold text-amber-600 hover:underline"
            >
              New here? CREATE CUSTOMER ACCOUNT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
