import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Clock, Award, PhoneCall, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActivePage,
    setSelectedCategoryId,
    setIsProviderRegisterModalOpen,
    setLegalModalType,
    setIsSupportModalOpen,
  } = useApp();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryId(catId);
    setActivePage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Value Proposition Banners */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-slate-900 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-amber-400 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">100% Verified Pros</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Strict KYC, police record check & skill trade audits</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-amber-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">15-Min Response</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Live hyper-local dispatch for urgent household fixes</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-amber-400 shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">30-Day Guarantee</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Free revisit protection if you are not fully satisfied</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-amber-400 shrink-0">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">24/7 SOS Helpline</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Instant escalation team for lockouts & power outages</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10 text-xs border-b border-slate-900">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black font-display text-sm">
                W
              </div>
              <span className="font-black text-white text-lg tracking-tight font-display">WHY NOT WE</span>
            </div>
            <p className="text-amber-400 font-semibold text-xs mb-2">“One Platform. Every Need.”</p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              WHY NOT WE is an all-in-one local services, emergency maintenance, and essential needs platform.
              Whenever life throws a household task, a power breakdown, or a daily grocery errand at you — find
              trusted hands nearby within minutes.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsProviderRegisterModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-xs"
              >
                Become a Service Provider
              </button>
            </div>
          </div>

          {/* Popular Trades */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 font-display">Essential Trades</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleCategoryClick('electrician')} className="hover:text-white transition-colors">
                  🔧 Electrician Services
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('plumber')} className="hover:text-white transition-colors">
                  🚰 Plumber Services
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('carpenter')} className="hover:text-white transition-colors">
                  🪚 Carpentry & Furniture
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('painter')} className="hover:text-white transition-colors">
                  🎨 Painting & Waterproofing
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('ac_refrigerator')} className="hover:text-white transition-colors">
                  ❄️ AC & Fridge Repair
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('builder_construction')} className="hover:text-white transition-colors">
                  🧱 Builder & Construction
                </button>
              </li>
            </ul>
          </div>

          {/* Mechanics & Deliveries */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 font-display">Automotive & Delivery</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleCategoryClick('car_mechanic')} className="hover:text-white transition-colors">
                  🚗 Car Mechanic & Jumpstart
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('bike_mechanic')} className="hover:text-white transition-colors">
                  🏍️ Bike Breakdown Repair
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('locksmith')} className="hover:text-white transition-colors">
                  🔑 Locksmith 24/7
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('grocery'); }} className="hover:text-white transition-colors">
                  🛒 Grocery & Dairy (15 min)
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('fuel'); }} className="hover:text-white transition-colors">
                  ⛽ Doorstep Fuel Delivery
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('water_can_delivery')} className="hover:text-white transition-colors">
                  💧 20L Water Can Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Support */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 font-display">Company & Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-white transition-colors">
                  Help & Support Center
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('emergency')} className="text-rose-400 hover:text-rose-300 font-bold transition-colors">
                  🚨 Emergency SOS
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setLegalModalType('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setIsProviderRegisterModalOpen(true)} className="hover:text-white transition-colors">
                  Partner Code of Conduct
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} WHY NOT WE Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for everyday homes</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
