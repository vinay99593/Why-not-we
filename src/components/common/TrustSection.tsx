import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  DollarSign,
  HeartHandshake,
  FileCheck,
  Headphones,
  Award,
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>WHY NOT WE TRUSTED STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Our Commitment to Safety, Fair Pricing & Real Quality
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every provider on our platform can be verified before receiving customer requests. We operate with full transparency so you know exactly who is arriving at your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Verified Workers</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ID verified, phone validated, and profile audited before any technician accepts jobs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
              <DollarSign className="h-4 w-4" />
              <span>Transparent Pricing</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clear upfront estimates and visit fees. No unexpected door surprises or surge penalties.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
              <Award className="h-4 w-4" />
              <span>30-Day Guarantee</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If a repair fails within 30 days, we arrange a free visit to rectify the issue promptly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-400 text-sm">
              <Headphones className="h-4 w-4" />
              <span>24/7 Helpline & Support</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct in-app emergency escalation team for urgent lockouts, power trips, and water bursts.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>* Demo platform transparency: Provider credentials and ratings are loaded from prototype storage.</span>
          <span className="font-semibold text-slate-300">Consumer Protection Policy Active</span>
        </div>
      </div>
    </section>
  );
};
