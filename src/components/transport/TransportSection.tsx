import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransportVehicleType, TransportOrder } from '../../types';
import { TransportBookingFlow } from './TransportBookingFlow';
import { DriverMatchingModal } from './DriverMatchingModal';
import { TransportLiveTracking } from './TransportLiveTracking';
import { DriverDashboardView } from './DriverDashboardView';
import { TransportOrdersHistory } from './TransportOrdersHistory';
import {
  Truck,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  TrendingUp,
  Briefcase,
  Zap,
  RotateCcw,
  Plus,
} from 'lucide-react';

export const TransportSection: React.FC = () => {
  const {
    transportOrders,
    activeTransportOrderId,
    setActiveTransportOrderId,
    userRole,
  } = useApp();

  // Sub-tab: 'book' | 'tracking' | 'orders' | 'driver_mode'
  const [activeSubTab, setActiveSubTab] = useState<'book' | 'tracking' | 'orders' | 'driver_mode'>(
    userRole === 'provider' ? 'driver_mode' : 'book'
  );

  const [prefilledVehicle, setPrefilledVehicle] = useState<TransportVehicleType>('mini_truck');
  const [matchingModalOrderId, setMatchingModalOrderId] = useState<string | null>(null);

  // Active tracking order
  const activeOrder =
    transportOrders.find((o) => o.id === activeTransportOrderId) ||
    transportOrders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled') ||
    transportOrders[0];

  const handleBookingCreated = (orderId: string) => {
    setMatchingModalOrderId(orderId);
  };

  const handleConfirmDriverAndTrack = () => {
    if (matchingModalOrderId) {
      setActiveTransportOrderId(matchingModalOrderId);
      setMatchingModalOrderId(null);
      setActiveSubTab('tracking');
    }
  };

  const handleRebookOrder = (order: TransportOrder) => {
    setPrefilledVehicle(order.vehicleType);
    setActiveSubTab('book');
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* 1. Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-9 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider border border-blue-400/30">
              <Truck className="h-3.5 w-3.5 text-blue-400" />
              <span>WHY NOT WE · Delivery & Transport</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white leading-tight">
              Move Anything. Anywhere Nearby.
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book verified Bikes, Autos, Mini Trucks (Tata Ace) and Pickups across Hyderabad.
              For packages, furniture, construction materials, grocery loads and business freight.
            </p>

            <div className="flex items-center gap-4 pt-1 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Verified Commercial Drivers
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Secure Delivery OTP
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Zap className="h-4 w-4" />
                ~4-Minute Dispatch
              </span>
            </div>
          </div>

          {/* Quick Stats / Action Box */}
          <div className="p-4 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700/80 space-y-2.5 self-start md:self-auto shrink-0 w-full sm:w-auto">
            <div className="text-[10px] uppercase font-bold text-slate-400">Platform Logistics Fleet</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700">
                <div className="text-base font-black text-white font-mono">5 Types</div>
                <div className="text-[10px] text-blue-400">Bikes to Trucks</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700">
                <div className="text-base font-black text-emerald-400 font-mono">100%</div>
                <div className="text-[10px] text-emerald-400">Verified Fleet</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'book', label: 'Book a Vehicle 🚚' },
          { id: 'tracking', label: 'Active Live Tracking 📍' },
          { id: 'orders', label: `My Transport Orders (${transportOrders.length})` },
          { id: 'driver_mode', label: 'Driver Partner Dashboard 👨‍✈️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Tab Contents */}
      {activeSubTab === 'book' && (
        <TransportBookingFlow
          initialVehicle={prefilledVehicle}
          onBookingCreated={handleBookingCreated}
        />
      )}

      {activeSubTab === 'tracking' && (
        <>
          {activeOrder ? (
            <TransportLiveTracking
              order={activeOrder}
              onBackToOrders={() => setActiveSubTab('orders')}
              onRebook={() => {
                setPrefilledVehicle(activeOrder.vehicleType);
                setActiveSubTab('book');
              }}
            />
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs space-y-3">
              <p>No active transport trip is currently running.</p>
              <button
                onClick={() => setActiveSubTab('book')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Book a Vehicle Now
              </button>
            </div>
          )}
        </>
      )}

      {activeSubTab === 'orders' && (
        <TransportOrdersHistory
          onViewTracking={(orderId) => {
            setActiveTransportOrderId(orderId);
            setActiveSubTab('tracking');
          }}
          onRebookOrder={handleRebookOrder}
        />
      )}

      {activeSubTab === 'driver_mode' && <DriverDashboardView />}

      {/* 4. DRIVER MATCHING MODAL */}
      {matchingModalOrderId && (() => {
        const matchingOrder = transportOrders.find((o) => o.id === matchingModalOrderId);
        if (!matchingOrder) return null;
        return (
          <DriverMatchingModal
            order={matchingOrder}
            onConfirmDriver={handleConfirmDriverAndTrack}
            onCancel={() => setMatchingModalOrderId(null)}
          />
        );
      })()}
    </div>
  );
};
