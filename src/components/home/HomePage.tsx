import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';
import { HeroSection } from '../customer/HeroSection';
import { ServiceCategoriesGrid } from '../customer/ServiceCategoriesGrid';
import { ProviderCard } from '../customer/ProviderCard';
import { ProviderDetailsModal } from '../customer/ProviderDetailsModal';
import { ServiceBookingModal } from '../customer/ServiceBookingModal';
import {
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  AlertTriangle,
  ShoppingBag,
  Fuel,
  CheckCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    providers,
    categories,
    setActivePage,
    setSelectedCategoryId,
    setIsProviderRegisterModalOpen,
    setActiveBookingId,
  } = useApp();

  const [selectedProviderForDetails, setSelectedProviderForDetails] = useState<Provider | null>(null);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<Provider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Recommended providers (top-rated verified)
  const recommendedProviders = providers.filter((p) => p.isVerified && p.rating >= 4.8).slice(0, 3);

  // Emergency on-call providers
  const emergencyProviders = providers.filter((p) => p.isAvailable && p.isVerified).slice(0, 2);

  const handleRequestService = (provider: Provider) => {
    setSelectedProviderForBooking(provider);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    setIsBookingModalOpen(false);
    setActiveBookingId(bookingId);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Emergency Services Quick Flash Ribbon */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border border-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-rose-950 font-display">
                  Urgent Household Emergency? 24x7 Immediate Dispatch
                </h3>
                <span className="text-[10px] font-bold bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">
                  &lt;15 Mins
                </span>
              </div>
              <p className="text-xs text-rose-800/80 mt-0.5">
                Power tripping, burst pipes, door lockouts & battery jumpstart technicians on standby across your locality.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('emergency')}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-md"
          >
            <span>Open Emergency SOS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Popular Services Grid (All 16 categories showcase) */}
      <ServiceCategoriesGrid
        title="Explore Popular Home Services"
        subtitle="Vetted electricians, plumbers, carpenters, mechanics & cleaners in your area"
      />

      {/* 4. Grocery & Express Essentials Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-md">
              15-Minute Dark Store Network
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Farm-Fresh Groceries & Daily Essentials
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Order fresh vegetables, Nandini milk pouches, 20L mineral water cans, and midnight snacks. Doorstep delivery in 15 minutes with live tracking.
            </p>
          </div>

          <button
            onClick={() => setActivePage('grocery')}
            className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Shop Groceries (15m)</span>
          </button>
        </div>
      </section>

      {/* 5. Recommended & Top Rated Providers */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Elite Verified Partners</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Recommended Professionals Near You
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Handpicked technicians with 4.8+ ratings, background verification & fast turnaround
            </p>
          </div>

          <button
            onClick={() => setActivePage('services')}
            className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors group shrink-0"
          >
            <span>See all technicians</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedProviders.map((prov) => (
            <ProviderCard
              key={prov.id}
              provider={prov}
              onRequestService={handleRequestService}
              onViewProfile={(p) => setSelectedProviderForDetails(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. Doorstep Fuel Delivery Teaser */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">
              PESO Statutory Approved
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Doorstep Petrol & Diesel Delivery
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Safe mobile automated bowser dispensing for your car, generator (DG set), or commercial equipment. Zero vapor leakage nozzle and digital receipt.
            </p>
          </div>

          <button
            onClick={() => setActivePage('fuel')}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <Fuel className="h-4 w-4" />
            <span>Order Fuel Now</span>
          </button>
        </div>
      </section>

      {/* 7. Customer Reviews & Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
            Loved By Thousands Of Households
          </h2>
          <p className="text-xs text-slate-500">
            Real feedback from verified homeowners who booked on WHY NOT WE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Sunita Sharma',
              role: 'Homeowner, Indiranagar',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
              comment: '“Our main MCB tripped and blew sparks at 10 PM. Rajesh arrived in 18 minutes with a new breaker and fixed it safely. Absolute lifesaver!”',
              trade: 'Electrician Service',
            },
            {
              name: 'Karthik Raman',
              role: 'Resident, Koramangala',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
              comment: '“Having 20L water cans, fresh vegetables, and AC servicing on a single platform is brilliant. The interface is lightning fast and straightforward.”',
              trade: 'Water Can & AC Servicing',
            },
            {
              name: 'Preeti Deshmukh',
              role: 'Villa Owner, HSR Layout',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
              comment: '“Booked the mobile diesel bowser for our apartment generator during a monsoon blackout. Fully PESO compliant with grounding rig. Fantastic!”',
              trade: 'Doorstep Fuel Delivery',
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{t.comment}</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-xs text-slate-900">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. “Become a Service Provider” CTA Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 p-8 sm:p-12 text-slate-950 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-white px-3 py-1 rounded-md">
              Grow Your Trade Business
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-950">
              Become a WHY NOT WE Partner
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
              Are you an electrician, plumber, mechanic, painter, or delivery partner? Join our verified network, get steady local customer leads with instant digital payouts and 0% commission on your first 30 jobs.
            </p>
          </div>

          <button
            onClick={() => setIsProviderRegisterModalOpen(true)}
            className="px-8 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm transition-transform hover:scale-105 shadow-xl shrink-0"
          >
            Register as Service Partner
          </button>
        </div>
      </section>

      {/* Modals */}
      <ProviderDetailsModal
        provider={selectedProviderForDetails}
        onClose={() => setSelectedProviderForDetails(null)}
        onRequestService={handleRequestService}
      />

      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        provider={selectedProviderForBooking}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};
