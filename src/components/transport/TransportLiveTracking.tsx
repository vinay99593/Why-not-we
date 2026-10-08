import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransportOrder, TransportOrderStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  MapPin,
  Navigation,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  Package,
  Truck,
  RotateCcw,
  Share2,
  AlertTriangle,
  ChevronRight,
  Info,
} from 'lucide-react';

interface TransportLiveTrackingProps {
  order: TransportOrder;
  onBackToOrders?: () => void;
  onRebook?: () => void;
}

export const TransportLiveTracking: React.FC<TransportLiveTrackingProps> = ({
  order,
  onBackToOrders,
  onRebook,
}) => {
  const {
    updateTransportOrderStatus,
    setCallPartnerName,
    setIsCallModalOpen,
    setIsChatDrawerOpen,
    setIsSupportModalOpen,
  } = useApp();

  const [isCopied, setIsCopied] = useState(false);

  const steps: { key: TransportOrderStatus; label: string; icon: string }[] = [
    { key: 'driver_assigned', label: 'Driver Assigned', icon: '👤' },
    { key: 'arriving_pickup', label: 'Driver Arriving', icon: '🛵' },
    { key: 'loading', label: 'Pickup / Loading', icon: '📦' },
    { key: 'on_the_way', label: 'On The Way', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', icon: '✅' },
  ];

  const getStepProgressIndex = (status: TransportOrderStatus): number => {
    switch (status) {
      case 'finding_driver':
        return 0;
      case 'driver_assigned':
        return 0;
      case 'arriving_pickup':
      case 'arrived_pickup':
        return 1;
      case 'loading':
        return 2;
      case 'trip_started':
      case 'on_the_way':
      case 'arrived_destination':
      case 'unloading':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepProgressIndex(order.status);
  const driver = order.assignedDriver;

  const handleShareTracking = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Track WHY NOT WE Transport #${order.id}: Vehicle ${order.vehicleName} en route from ${order.pickupAddress.area} to ${order.dropAddress.area}. Delivery OTP: ${order.otp}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <h2 className="text-lg sm:text-xl font-black font-display text-slate-900">
              Live Trip Tracking · #{order.id}
            </h2>
            <StatusBadge status={order.status} size="md" showDot />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {order.vehicleName} · Booked {order.createdAt}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={handleShareTracking}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{isCopied ? 'Link Copied!' : 'Share Trip'}</span>
          </button>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Map-Style Visual Interface (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl bg-slate-900 overflow-hidden border border-slate-800 shadow-xl min-h-[380px] flex flex-col justify-between p-6">
            {/* Visual Vector Grid & Roads Simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60a5fa" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated Curving Transit Route */}
                <path
                  d="M 60 280 C 140 240, 200 160, 280 170 S 420 80, 520 90"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>

            {/* Map Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-slate-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-700 text-xs text-slate-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">Live GPS Simulation · Hyderabad Region</span>
              </div>

              <div className="bg-blue-600/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-white font-mono text-xs font-bold shadow-md">
                ETA ~{driver?.etaMins || 6} Mins
              </div>
            </div>

            {/* Visual Waypoint Markers on Route */}
            <div className="relative z-10 py-12 flex items-center justify-between px-4 sm:px-12">
              {/* Pickup Point */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="text-white text-xs font-bold">{order.pickupAddress.area}</div>
                <div className="text-[10px] text-blue-300">Pickup Point</div>
              </div>

              {/* Moving Vehicle Indicator */}
              <div className="flex flex-col items-center text-center space-y-1 animate-pulse">
                <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xl shadow-amber-500/50 border-2 border-white ring-4 ring-amber-400/30">
                  <Truck className="h-6 w-6" />
                </div>
                <div className="text-amber-300 text-[11px] font-bold">
                  {order.status === 'on_the_way'
                    ? 'In Transit 🛵'
                    : order.status === 'delivered'
                    ? 'Delivered ✓'
                    : 'En Route'}
                </div>
                <div className="text-[9px] text-slate-400">Road No. 36 Transit</div>
              </div>

              {/* Drop Destination */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-white text-xs font-bold">{order.dropAddress.area}</div>
                <div className="text-[10px] text-emerald-300">Destination</div>
              </div>
            </div>

            {/* Map Bottom Information Note */}
            <div className="relative z-10 bg-slate-800/80 backdrop-blur-md rounded-2xl p-3 border border-slate-700/80 text-[11px] text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Standard route speed ~28 km/h. Direct highway corridor active.</span>
              </div>
              <span className="font-mono text-white font-bold">{order.distanceKm} km trip</span>
            </div>
          </div>

          {/* Step Progression Bar with Color Indicators */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
            <h3 className="font-black text-sm text-slate-900 font-display">Trip Milestones</h3>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {steps.map((st, i) => {
                const isDone = i <= currentStepIdx;
                const isCurrent = i === currentStepIdx;
                return (
                  <div key={st.key} className="space-y-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isDone ? 'bg-blue-600' : 'bg-slate-200'
                      } ${isCurrent ? 'ring-2 ring-blue-400/50' : ''}`}
                    />
                    <span
                      className={`text-[10px] block truncate font-medium ${
                        isCurrent
                          ? 'text-blue-600 font-bold'
                          : isDone
                          ? 'text-slate-700 font-semibold'
                          : 'text-slate-400'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Driver Card, Security OTP & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Driver Card */}
          {driver && (
            <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Assigned Driver Partner
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Active On Trip
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-200 shadow-2xs shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-base text-slate-900 font-display">{driver.name}</h4>
                    {driver.isVerified && <ShieldCheck className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-0.5 font-bold text-amber-600">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      {driver.rating}
                    </span>
                    <span>·</span>
                    <span>{driver.tripsCount} trips</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-700 mt-1">
                    <strong>{driver.vehicleModel}</strong> ({driver.vehicleNumber})
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setCallPartnerName(driver.name);
                    setIsCallModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Driver</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsChatDrawerOpen(true)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          )}

          {/* Security Handover OTP */}
          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-950">Delivery Security OTP</div>
                <div className="text-[10px] text-amber-800">
                  Share with driver only after goods are delivered
                </div>
              </div>
              <div className="font-mono text-xl font-black tracking-widest text-amber-950 bg-white px-3.5 py-1 rounded-xl border border-amber-300 shadow-2xs">
                {order.otp}
              </div>
            </div>
          </div>

          {/* Order Details Accordion / Summary */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-3 text-xs">
            <div className="font-bold text-slate-900 font-display">Route & Goods Summary</div>
            <div className="space-y-2 text-slate-600">
              <div>
                <span className="font-bold text-slate-800">Pickup: </span>
                <span>{order.pickupAddress.street}, {order.pickupAddress.area}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">Drop: </span>
                <span>{order.dropAddress.street}, {order.dropAddress.area}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">Item Category: </span>
                <span className="capitalize">{order.goodsCategory} ({order.weightRange})</span>
              </div>
              {order.goodsDescription && (
                <div className="italic text-slate-500">“{order.goodsDescription}”</div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-700">Total Fare Paid</span>
              <span className="font-mono font-black text-base text-slate-900">₹{order.totalFare}</span>
            </div>

            {/* Quick status stepper for demo / testing */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400">Simulate Next Status:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {order.status !== 'delivered' && (
                  <>
                    <button
                      onClick={() => updateTransportOrderStatus(order.id, 'arriving_pickup')}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      Arriving 📍
                    </button>
                    <button
                      onClick={() => updateTransportOrderStatus(order.id, 'loading')}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      Loading 📦
                    </button>
                    <button
                      onClick={() => updateTransportOrderStatus(order.id, 'on_the_way')}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800"
                    >
                      On The Way 🛵
                    </button>
                    <button
                      onClick={() => updateTransportOrderStatus(order.id, 'delivered')}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                    >
                      Mark Delivered ✅
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
