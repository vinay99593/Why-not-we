import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TransportOrder, TransportOrderStatus } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  Camera,
  PenTool,
  Key,
  ChevronRight,
  TrendingUp,
  FileText,
  AlertCircle,
  ArrowRight,
  Check,
} from 'lucide-react';

export const DriverDashboardView: React.FC = () => {
  const {
    transportOrders,
    updateTransportOrderStatus,
    completeTransportDelivery,
    setCallPartnerName,
    setIsCallModalOpen,
    setIsChatDrawerOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed' | 'profile'>('active');
  const [selectedOrderForProof, setSelectedOrderForProof] = useState<TransportOrder | null>(null);

  // Delivery Proof state
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [proofSuccess, setProofSuccess] = useState(false);

  // Filter orders
  const activeTrips = transportOrders.filter((o) =>
    ['driver_assigned', 'arriving_pickup', 'arrived_pickup', 'loading', 'trip_started', 'on_the_way', 'arrived_destination', 'unloading'].includes(o.status)
  );

  const availableOrders = transportOrders.filter((o) => o.status === 'finding_driver');
  const completedTrips = transportOrders.filter((o) => o.status === 'delivered');

  // Stats calculation
  const todayEarnings = completedTrips.reduce((acc, o) => acc + o.totalFare, 0) + 1280;
  const totalTrips = completedTrips.length + 14;

  const handleNextStatus = (order: TransportOrder) => {
    const sequence: Record<TransportOrderStatus, TransportOrderStatus> = {
      driver_assigned: 'arriving_pickup',
      arriving_pickup: 'arrived_pickup',
      arrived_pickup: 'loading',
      loading: 'trip_started',
      trip_started: 'on_the_way',
      on_the_way: 'arrived_destination',
      arrived_destination: 'unloading',
      unloading: 'delivered',
      finding_driver: 'driver_assigned',
      delivered: 'delivered',
      cancelled: 'cancelled',
    };

    const next = sequence[order.status];
    if (next === 'delivered') {
      setSelectedOrderForProof(order);
      setEnteredOtp('');
      setOtpError('');
      setPhotoUploaded(false);
      setSignatureDone(false);
      setProofSuccess(false);
    } else if (next) {
      updateTransportOrderStatus(order.id, next);
    }
  };

  const handleVerifyAndCompleteDelivery = () => {
    if (!selectedOrderForProof) return;

    if (enteredOtp !== selectedOrderForProof.otp) {
      setOtpError('Invalid OTP! Please ask customer for the 4-digit security code.');
      return;
    }

    setProofSuccess(true);
    setTimeout(() => {
      completeTransportDelivery(selectedOrderForProof.id, {
        photoUrl: photoUploaded ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' : undefined,
        signatureReceived: signatureDone,
        customerOtpVerified: true,
      });
      setSelectedOrderForProof(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Driver Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
            alt="Driver Ramesh Goud"
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1 border border-blue-400/30">
              <Truck className="h-3 w-3" />
              <span>Verified Transport Partner · Hyderabad Fleet</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Ramesh Goud (Tata Ace Gold)
            </h2>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
              <span>TS 09 UB 4821</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                4.89 Rating (420 Trips)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Today's Earnings</div>
            <div className="text-xl font-black text-emerald-400 font-mono">₹{todayEarnings}</div>
          </div>
        </div>
      </div>

      {/* Driver Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'active', label: `Active Trips (${activeTrips.length})` },
          { id: 'available', label: `Available Requests (${availableOrders.length})` },
          { id: 'completed', label: `Completed Trips (${completedTrips.length})` },
          { id: 'profile', label: 'Driver Documents & Vehicle' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ACTIVE TRIPS WITH LARGE STATUS BUTTONS */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeTrips.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No active transport trips right now. Check "Available Requests" to accept nearby bookings!
            </div>
          ) : (
            activeTrips.map((order) => (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-slate-900 font-display">
                        Trip #{order.id} · {order.vehicleName}
                      </h3>
                      <StatusBadge status={order.status} size="sm" showDot />
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Customer: <strong className="text-slate-800">{order.customerName}</strong> ({order.customerPhone})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Trip Earnings</span>
                    <div className="font-mono font-black text-lg text-emerald-600">₹{order.totalFare}</div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>PICKUP POINT</span>
                    </div>
                    <p className="text-slate-700">{order.pickupAddress.street}, {order.pickupAddress.area}</p>
                    <p className="text-[11px] text-slate-400">Landmark: {order.pickupAddress.landmark || 'None'}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span>DROP DESTINATION</span>
                    </div>
                    <p className="text-slate-700">{order.dropAddress.street}, {order.dropAddress.area}</p>
                    <p className="text-[11px] text-slate-400">Distance: {order.distanceKm} km</p>
                  </div>
                </div>

                {/* Items & Load Notes */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center justify-between">
                  <div>
                    <span className="font-bold">Goods: </span>
                    <span className="capitalize">{order.goodsCategory} ({order.weightRange}) · </span>
                    <span>{order.goodsDescription}</span>
                  </div>
                  {order.helperCount > 0 && (
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {order.helperCount} Helper Requested
                    </span>
                  )}
                </div>

                {/* Large Action Buttons for Drivers while Driving */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCallPartnerName(order.customerName);
                        setIsCallModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span>Call Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChatDrawerOpen(true)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Chat</span>
                    </button>
                  </div>

                  {/* Primary Next Action Button */}
                  <button
                    type="button"
                    onClick={() => handleNextStatus(order)}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                  >
                    <span>
                      {order.status === 'driver_assigned' && 'Mark: Arriving at Pickup 🛵'}
                      {order.status === 'arriving_pickup' && 'Mark: Arrived at Pickup 📍'}
                      {order.status === 'arrived_pickup' && 'Mark: Loading Started 📦'}
                      {order.status === 'loading' && 'Mark: Trip Started 🚚'}
                      {order.status === 'trip_started' && 'Mark: On The Way 🛵'}
                      {order.status === 'on_the_way' && 'Mark: Arrived at Drop 📍'}
                      {order.status === 'arrived_destination' && 'Mark: Unloading 📦'}
                      {order.status === 'unloading' && 'Complete Delivery & Verify OTP ✅'}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: AVAILABLE ORDERS */}
      {activeTab === 'available' && (
        <div className="space-y-4">
          {availableOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No new unassigned transport requests in your 5 km radius right now.
            </div>
          ) : (
            availableOrders.map((o) => (
              <div
                key={o.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 font-display text-sm">
                      Trip #{o.id} · {o.vehicleName}
                    </span>
                    <StatusBadge status={o.status} size="sm" />
                  </div>
                  <p className="text-slate-600">
                    Pickup: <strong>{o.pickupAddress.area}</strong> → Drop: <strong>{o.dropAddress.area}</strong> ({o.distanceKm} km)
                  </p>
                  <p className="text-slate-500">Goods: {o.goodsCategory} ({o.weightRange})</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="font-mono font-bold text-base text-emerald-600">₹{o.totalFare}</div>
                  <button
                    onClick={() => updateTransportOrderStatus(o.id, 'driver_assigned')}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Accept Trip
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: COMPLETED TRIPS */}
      {activeTab === 'completed' && (
        <div className="space-y-3">
          {completedTrips.map((o) => (
            <div
              key={o.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Trip #{o.id} · {o.vehicleName}</span>
                  <StatusBadge status="delivered" size="sm" />
                </div>
                <div className="text-slate-500 mt-0.5">
                  {o.pickupAddress.area} → {o.dropAddress.area} · Customer: {o.customerName}
                </div>
                {o.deliveryProof?.completedAt && (
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Verified delivered at {o.deliveryProof.completedAt}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-base text-slate-900">₹{o.totalFare}</div>
                <div className="text-[10px] text-emerald-600 font-medium">Settled to bank ✓</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: PROFILE & DOCUMENTS */}
      {activeTab === 'profile' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 text-xs max-w-2xl">
          <h3 className="font-black text-base text-slate-900 font-display">
            Driver Verification & Vehicle RC
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Commercial Driving License (TS Transport)', number: 'DL-09-2018-882190', verified: true },
              { label: 'Vehicle Registration (RC)', number: 'TS 09 UB 4821', verified: true },
              { label: 'Commercial Goods Carriage Permit', number: 'PER-TS-HYD-5512', verified: true },
              { label: 'Comprehensive Commercial Insurance', number: 'POL-ICICI-49219', verified: true },
            ].map((doc, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{doc.label}</div>
                  <div className="font-mono text-slate-500 text-[11px]">{doc.number}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[10px]">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified ✓</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DELIVERY PROOF MODAL */}
      {selectedOrderForProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900 font-display">
                  Delivery Handover Proof
                </h3>
                <p className="text-xs text-slate-500">Trip #{selectedOrderForProof.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrderForProof(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {proofSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="font-black text-lg text-slate-900">Delivery Completed!</h4>
                <p className="text-xs text-slate-500">Fare has been credited to your daily settlement account.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 1. Enter OTP */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Key className="h-4 w-4 text-blue-600" />
                    <span>Ask Customer for 4-Digit Security OTP</span>
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => {
                      setEnteredOtp(e.target.value);
                      setOtpError('');
                    }}
                    placeholder="Enter 4-digit code"
                    className="w-full text-center text-xl font-mono tracking-widest font-black rounded-xl border border-slate-200 p-2.5 focus:border-blue-600 focus:outline-hidden"
                  />
                  {otpError && (
                    <div className="text-[11px] text-rose-600 font-medium">{otpError}</div>
                  )}
                </div>

                {/* 2. Photo proof */}
                <div
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-colors ${
                    photoUploaded ? 'border-emerald-500 bg-emerald-50/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Camera className="h-5 w-5 text-slate-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Delivery Photo Upload</div>
                      <div className="text-[10px] text-slate-500">Snap packages safely unloaded at gate</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600">{photoUploaded ? 'Attached ✓' : 'Upload +'}</span>
                </div>

                {/* 3. Customer signature confirmation */}
                <div
                  onClick={() => setSignatureDone(!signatureDone)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-colors ${
                    signatureDone ? 'border-emerald-500 bg-emerald-50/60' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <PenTool className="h-5 w-5 text-slate-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Customer Signature</div>
                      <div className="text-[10px] text-slate-500">Customer confirmed received in good order</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600">{signatureDone ? 'Signed ✓' : 'Sign +'}</span>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyAndCompleteDelivery}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <span>Verify OTP & Mark Completed</span>
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
