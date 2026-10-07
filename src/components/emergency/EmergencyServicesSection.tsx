import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';
import {
  AlertTriangle,
  Zap,
  Wrench,
  Key,
  Droplets,
  Car,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  Flame,
  CheckCircle,
} from 'lucide-react';
import { ServiceBookingModal } from '../customer/ServiceBookingModal';

export const EmergencyServicesSection: React.FC = () => {
  const {
    providers,
    setIsCallModalOpen,
    setCallPartnerName,
    currentAddress,
    setIsLocationModalOpen,
  } = useApp();

  const [selectedUrgentProvider, setSelectedUrgentProvider] = useState<Provider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeSOSBanner, setActiveSOSBanner] = useState<string | null>(null);

  const emergencyCategories = [
    {
      id: 'electrician',
      title: 'Emergency Electrician',
      desc: 'Main MCB tripping, electrical sparks, complete flat power outage',
      icon: Zap,
      eta: '12 Mins',
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    },
    {
      id: 'plumber',
      title: 'Emergency Plumber',
      desc: 'Burst overhead pipe, toilet drain overflow, high-pressure leak',
      icon: Wrench,
      eta: '14 Mins',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    {
      id: 'locksmith',
      title: 'Emergency Locksmith',
      desc: 'Locked outside apartment door, jammed lock, broken key in cylinder',
      icon: Key,
      eta: '15 Mins',
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    },
    {
      id: 'water_can_delivery',
      title: 'Emergency Water Delivery',
      desc: 'Building overhead tank empty, urgent 20L Bisleri drinking cans',
      icon: Droplets,
      eta: '18 Mins',
      color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    },
    {
      id: 'car_mechanic',
      title: 'Emergency Roadside Auto Fix',
      desc: 'Dead car battery jumpstart, tyre puncture on the road, tow rescue',
      icon: Car,
      eta: '16 Mins',
      color: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    },
  ];

  // Available urgent providers on duty
  const urgentProviders = providers.filter((p) => p.isAvailable && p.isVerified);

  const handleTriggerSOS = (catId: string, title: string) => {
    const matching = providers.find((p) => p.categoryId === catId && p.isAvailable) || providers[0];
    setSelectedUrgentProvider(matching);
    setActiveSOSBanner(`Priority dispatch triggered for ${title}`);
    setIsBookingModalOpen(true);
  };

  const handleCall = (prov: Provider) => {
    setCallPartnerName(prov.name);
    setIsCallModalOpen(true);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-8">
      {/* SOS Alert Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 text-white p-6 sm:p-10 shadow-2xl border border-rose-800/40 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/40 animate-pulse">
            <AlertTriangle className="h-4 w-4 text-rose-400" />
            <span>24/7 Rapid Response Network Active</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
            Household Emergency SOS
          </h1>

          <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
            Locked out at midnight? Burning smell from main switches? Pipe flooded the bathroom? Our verified on-duty emergency technicians are on standby across your sector.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-rose-200">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>Average Arrival: &lt;15 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Zero Night Surge Surcharge</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Emergency Service Options */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 font-display mb-1">
          Select Emergency Incident
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Tap to trigger immediate priority dispatch to{' '}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="text-amber-600 font-bold hover:underline"
          >
            {currentAddress.area || currentAddress.city}
          </button>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyCategories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-600 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl border ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      ETA {item.eta}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Priority Dispatch</span>
                  <button
                    onClick={() => handleTriggerSOS(item.id, item.title)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Request SOS</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* On-Duty Emergency Providers List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Technicians On Emergency Standby Right Now
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Available for immediate direct phone dispatch
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {urgentProviders.length} Technicians Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urgentProviders.slice(0, 6).map((prov) => (
            <div
              key={prov.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:shadow-md transition-all flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={prov.avatar}
                    alt={prov.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <span>{prov.name}</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="text-slate-500 text-[11px]">{prov.categoryName}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {prov.distanceKm} km away · &lt;15m ETA
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCall(prov)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                  title="Direct Phone Call"
                >
                  <Phone className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedUrgentProvider(prov);
                    setIsBookingModalOpen(true);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition-colors"
                >
                  Dispatch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal for Emergency */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        provider={selectedUrgentProvider}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={() => {
          setIsBookingModalOpen(false);
        }}
      />
    </div>
  );
};
