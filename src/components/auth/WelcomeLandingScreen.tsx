import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Wrench,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Building,
  Home,
  ShoppingBag,
  Clock,
  Award,
} from 'lucide-react';

export const WelcomeLandingScreen: React.FC = () => {
  const { setAuthScreen, loginAsCustomer, loginAsWorker, loginAsAdmin } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Subtle modern brand gradient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto w-full px-4 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black font-display text-xl shadow-lg shadow-blue-500/30">
            W
          </div>
          <div>
            <div className="font-black text-slate-900 text-xl tracking-tight font-display leading-none">
              WHY NOT WE
            </div>
            <div className="text-[11px] text-blue-600 font-semibold tracking-wide mt-0.5">
              One Platform. Every Need.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-xs">
          <button
            onClick={() => loginAsCustomer()}
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white text-slate-700 hover:text-blue-600 font-semibold shadow-xs transition-colors"
          >
            Instant Customer Demo
          </button>
          <button
            onClick={() => setAuthScreen('admin_login')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-xs"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>Admin</span>
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 text-center z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>Local Services · 15m Groceries · Hotels & Hostels</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-tight sm:leading-none max-w-4xl mx-auto text-slate-900">
          One Trusted Platform. <br className="hidden sm:inline" />
          <span className="text-blue-600">
            Every Daily Need.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Find trusted local workers, order everyday essentials, and discover verified hotels and student/working hostels — all in one seamless place.
        </p>

        {/* 3 LARGE ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 text-left max-w-5xl mx-auto">
          {/* 1. CUSTOMER CARD */}
          <div className="relative group rounded-3xl bg-white border border-slate-200 hover:border-blue-600 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-2xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="h-7 w-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  For Daily Life
                </span>
                <h2 className="text-xl font-black text-slate-900 font-display mt-0.5">
                  CUSTOMER
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Find services, products & places. Book electricians, plumbers, 15m groceries, and verified rooms.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>16+ On-Demand Trades & Mechanics</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>Verified Hotels & Hostels Nearby</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <button
                onClick={() => setAuthScreen('customer_login')}
                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <span>Customer Login</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setAuthScreen('customer_register')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-600 font-bold text-[11px] transition-colors border border-blue-600/40 cursor-pointer"
              >
                Register as Customer
              </button>
              <button
                onClick={() => loginAsCustomer()}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-slate-50 font-bold text-[11px] transition-colors cursor-pointer"
              >
                Continue as Customer (Instant Demo)
              </button>
            </div>
          </div>

          {/* 2. WORKER / SERVICE PROVIDER CARD */}
          <div className="relative group rounded-3xl bg-white border border-slate-200 hover:border-teal-600 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-2xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wrench className="h-7 w-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                  For Skilled Pros
                </span>
                <h2 className="text-xl font-black text-slate-900 font-display mt-0.5">
                  WORKER
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Get customer requests & grow your work. Receive direct local orders, manage jobs, and track earnings.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span>Real-time Ringing Customer Requests</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span>0% Commission Introductory Payouts</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <button
                onClick={() => setAuthScreen('worker_login')}
                className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <span>Worker Login</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setAuthScreen('worker_register')}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-teal-50 text-teal-700 font-bold text-[11px] transition-colors border border-teal-600/40 cursor-pointer"
              >
                Register as Worker Partner
              </button>
              <button
                onClick={() => loginAsWorker()}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-slate-50 font-bold text-[11px] transition-colors cursor-pointer"
              >
                Continue as Worker (Instant Demo)
              </button>
            </div>
          </div>

          {/* 3. ADMIN CARD */}
          <div className="relative group rounded-3xl bg-white border border-slate-200 hover:border-slate-900 p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-2xl hover:-translate-y-1">
            <div className="space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Governance & Ops
                </span>
                <h2 className="text-xl font-black text-slate-900 font-display mt-0.5">
                  ADMIN
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Manage WHY NOT WE. Verify workers, monitor live service requests, and manage hotels & hostels.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-slate-700 shrink-0" />
                  <span>KYC Approvals & Worker Audits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-slate-700 shrink-0" />
                  <span>Hotel/Hostel Inventory Manager</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <button
                onClick={() => setAuthScreen('admin_login')}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Admin Login</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => loginAsAdmin()}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 bg-slate-50 font-bold text-[11px] transition-colors cursor-pointer"
              >
                Use Demo Admin Account
              </button>
            </div>
          </div>
        </div>

        {/* Quick direct links */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <button
            onClick={() => loginAsCustomer()}
            className="hover:text-blue-600 transition-colors"
          >
            Continue as Customer &rarr;
          </button>
          <span className="text-slate-300">·</span>
          <button
            onClick={() => loginAsWorker()}
            className="hover:text-teal-600 transition-colors"
          >
            Continue as Worker &rarr;
          </button>
          <span className="text-slate-300">·</span>
          <button
            onClick={() => loginAsAdmin()}
            className="hover:text-slate-900 transition-colors"
          >
            Admin Access &rarr;
          </button>
        </div>
      </div>

      {/* Footer Trust Bar */}
      <footer className="max-w-7xl mx-auto w-full px-4 py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 z-10">
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-slate-700">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
            Verified Workers
          </span>
          <span className="flex items-center gap-1 text-slate-700">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            30-Day Guarantee
          </span>
          <span className="flex items-center gap-1 text-slate-700">
            <Clock className="h-3.5 w-3.5 text-blue-600" />
            15m Express Response
          </span>
        </div>

        <div className="text-[11px]">
          © {new Date().getFullYear()} WHY NOT WE Technologies Pvt. Ltd.
        </div>
      </footer>
    </div>
  );
};
