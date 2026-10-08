import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TransportOrder, TransportDriver } from '../../types';
import {
  Search,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Navigation,
  Clock,
  ArrowRight,
  X,
} from 'lucide-react';

interface DriverMatchingModalProps {
  order: TransportOrder;
  onConfirmDriver: () => void;
  onCancel: () => void;
}

export const DriverMatchingModal: React.FC<DriverMatchingModalProps> = ({
  order,
  onConfirmDriver,
  onCancel,
}) => {
  const { setCallPartnerName, setIsCallModalOpen, setIsChatDrawerOpen } = useApp();
  const [isSearching, setIsSearching] = useState(true);

  // Smooth driver matching simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const driver = order.assignedDriver;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Trip #{order.id} · {order.vehicleName}
            </div>
            <h3 className="text-lg font-black font-display text-white">
              {isSearching ? 'Finding Nearest Driver…' : 'Driver Partner Assigned!'}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {/* 1. Searching Animation Mode */}
          {isSearching ? (
            <div className="py-8 text-center space-y-6">
              {/* Radar Pulse Effect */}
              <div className="relative flex items-center justify-center mx-auto h-28 w-28">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40" />
                <span className="animate-pulse absolute inline-flex h-20 w-20 rounded-full bg-blue-500/20" />
                <div className="relative h-16 w-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Search className="h-8 w-8 animate-spin duration-1000" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Connecting to active drivers in {order.pickupAddress.area}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Broadcasting route details to verified {order.vehicleName} partners nearby…
                </p>
              </div>

              {/* Live search metrics */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Radius</div>
                  <div className="text-xs font-bold text-slate-900">3.5 km</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Available</div>
                  <div className="text-xs font-bold text-emerald-600">6 Vehicles</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Average ETA</div>
                  <div className="text-xs font-bold text-blue-600">~4 Mins</div>
                </div>
              </div>
            </div>
          ) : driver ? (
            /* 2. Driver Assigned Card */
            <div className="space-y-5">
              {/* Driver Success Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-900 text-xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold">Driver confirmed! </span>
                  <span>Vehicle is en route to pickup point.</span>
                </div>
              </div>

              {/* Realistic Driver Profile Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="h-16 w-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-base text-slate-900 font-display">
                          {driver.name}
                        </h4>
                        {driver.isVerified && (
                          <span
                            title="Verified Commercial Driver"
                            className="inline-flex items-center text-blue-600"
                          >
                            <ShieldCheck className="h-4 w-4 fill-blue-100" />
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                        <span className="flex items-center gap-0.5 font-bold text-amber-600">
                          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          {driver.rating}
                        </span>
                        <span>·</span>
                        <span className="text-slate-500">{driver.tripsCount} trips</span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-700 mt-1">
                        <strong>{driver.vehicleModel}</strong> ({driver.vehicleNumber})
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Distance</span>
                    <div className="text-sm font-black text-slate-900 font-mono">
                      {driver.distanceKm} km
                    </div>
                    <div className="text-[11px] font-bold text-blue-600">
                      ETA {driver.etaMins} mins
                    </div>
                  </div>
                </div>

                {/* Driver Contact Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setCallPartnerName(driver.name);
                      setIsCallModalOpen(true);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Call Driver</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsChatDrawerOpen(true);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                    <span>Chat</span>
                  </button>
                </div>
              </div>

              {/* Delivery Security OTP */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-900">Delivery Security OTP</div>
                  <p className="text-[10px] text-amber-700">
                    Share this 4-digit code with the driver after unloading
                  </p>
                </div>
                <div className="font-mono text-lg font-black tracking-widest text-amber-950 bg-white px-3 py-1 rounded-xl border border-amber-300 shadow-2xs">
                  {order.otp}
                </div>
              </div>

              {/* Confirm Driver Action */}
              <button
                type="button"
                onClick={onConfirmDriver}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Confirm Driver & Track Live</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
