import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Wrench,
  ShoppingBag,
  AlertTriangle,
  Fuel,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setActivePage,
    setSelectedCategoryId,
    setIsLocationModalOpen,
    currentAddress,
    setIsProviderRegisterModalOpen,
  } = useApp();

  const [inputVal, setInputVal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setSearchQuery(inputVal.trim());
    setActivePage('services');
  };

  const handleQuickTag = (tag: string, catId?: string) => {
    if (catId) {
      setSelectedCategoryId(catId);
      setActivePage('services');
    } else if (tag.toLowerCase().includes('grocery')) {
      setActivePage('grocery');
    } else if (tag.toLowerCase().includes('fuel')) {
      setActivePage('fuel');
    } else {
      setSearchQuery(tag);
      setActivePage('services');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-12 md:py-20 px-4">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {/* Brand Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-amber-400 text-xs font-semibold shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>One Platform. Every Need.</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">Doorstep in 15-30 Mins</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight font-display max-w-4xl mx-auto leading-tight sm:leading-none">
          Everything Your Home Needs, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">
            Delivered & Fixed
          </span>{' '}
          Nearby.
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Connect instantly with vetted plumbers, electricians, mechanics, 15-minute grocery deliveries, and safe doorstep fuel. Transparent rates, zero hassle.
        </p>

        {/* Large Search Box */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white shadow-2xl border border-slate-100"
          >
            {/* Location indicator in search */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="w-full sm:w-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 transition-colors shrink-0"
            >
              <MapPin className="h-3.5 w-3.5 text-amber-600" />
              <span className="truncate max-w-[130px]">{currentAddress.area || currentAddress.city}</span>
            </button>

            {/* Input */}
            <div className="relative flex-1 w-full">
              <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="What do you need today? (e.g. Electrician, AC repair, Milk, Fuel)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full text-slate-900 text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl focus:outline-hidden"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <span>Search</span>
              <ArrowRight className="h-4 w-4 text-amber-400" />
            </button>
          </form>

          {/* Popular quick search queries */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 mt-3 text-xs text-slate-400">
            <span className="text-[11px] font-medium text-slate-500 mr-1">Popular:</span>
            {[
              { label: '⚡ Electrician', catId: 'electrician' },
              { label: '🚰 Plumber', catId: 'plumber' },
              { label: '❄️ AC Repair', catId: 'ac_refrigerator' },
              { label: '🛒 15m Grocery' },
              { label: '⛽ Fuel Delivery' },
              { label: '🔑 Locksmith', catId: 'locksmith' },
              { label: '🚗 Car Mechanic', catId: 'car_mechanic' },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickTag(item.label, item.catId)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Pillars Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 text-left">
          {/* Services */}
          <div
            onClick={() => setActivePage('services')}
            className="group p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/50 cursor-pointer transition-all shadow-sm hover:shadow-lg"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Wrench className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-white text-sm sm:text-base font-display">Local Services</h2>
            <p className="text-slate-400 text-xs mt-1">16+ verified trades, electricians, plumbers & carpenters</p>
            <div className="mt-3 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Book service</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Grocery */}
          <div
            onClick={() => setActivePage('grocery')}
            className="group p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-400/50 cursor-pointer transition-all shadow-sm hover:shadow-lg"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-white text-sm sm:text-base font-display">Grocery & Essentials</h2>
            </div>
            <p className="text-slate-400 text-xs mt-1">Milk, vegetables, 20L water cans & daily pantry in 15 mins</p>
            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Order groceries</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Emergency */}
          <div
            onClick={() => setActivePage('emergency')}
            className="group p-4 sm:p-5 rounded-2xl bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/40 hover:border-rose-500 cursor-pointer transition-all shadow-sm hover:shadow-lg"
          >
            <div className="h-10 w-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-white text-sm sm:text-base font-display">24x7 Emergency SOS</h2>
            </div>
            <p className="text-rose-200/80 text-xs mt-1">Power trips, burst pipes & lockouts with &lt;15 min ETA</p>
            <div className="mt-3 flex items-center text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>Instant dispatch</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Fuel Delivery */}
          <div
            onClick={() => setActivePage('fuel')}
            className="group p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-400/50 cursor-pointer transition-all shadow-sm hover:shadow-lg"
          >
            <div className="h-10 w-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Fuel className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-white text-sm sm:text-base font-display">Doorstep Fuel</h2>
            <p className="text-slate-400 text-xs mt-1">PESO-certified mobile bowser for cars, generators & fleets</p>
            <div className="mt-3 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Schedule fuel</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
