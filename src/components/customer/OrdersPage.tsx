import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  ShoppingBag,
  Fuel,
  FileText,
  ChevronRight,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { BookingTrackerModal } from './BookingTrackerModal';

export const OrdersPage: React.FC = () => {
  const {
    bookings,
    groceryOrders,
    fuelOrders,
    activeBookingId,
    setActiveBookingId,
    setInvoiceBooking,
    setIsChatDrawerOpen,
    setActiveChatPartner,
    setIsCallModalOpen,
    setCallPartnerName,
    providers,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'services' | 'grocery' | 'fuel'>('all');

  const openTracker = (id: string) => {
    setActiveBookingId(id);
  };

  const handleChat = (providerId: string, bookingId: string) => {
    const prov = providers.find((p) => p.id === providerId);
    if (prov) setActiveChatPartner(prov);
    setActiveBookingId(bookingId);
    setIsChatDrawerOpen(true);
  };

  const handleCall = (name: string) => {
    setCallPartnerName(name);
    setIsCallModalOpen(true);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
          My Bookings & Activity
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track active technician arrivals, grocery deliveries, fuel dispatch status, and digital receipts
        </p>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Orders & Tasks' },
          { id: 'services', label: `Service Bookings (${bookings.length})` },
          { id: 'grocery', label: `Grocery Orders (${groceryOrders.length})` },
          { id: 'fuel', label: `Fuel Orders (${fuelOrders.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as typeof filterType)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {(filterType === 'all' || filterType === 'services') && (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-800 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={b.providerAvatar}
                    alt={b.providerName}
                    className="h-12 w-12 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 font-display">{b.serviceTitle}</span>
                      <span className="font-mono text-[10px] text-slate-400">#{b.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        b.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : b.status === 'on_the_way'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="text-slate-600 mt-1">
                      Assigned Pro: <strong className="text-slate-900">{b.providerName}</strong> ({b.providerCategory})
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1.5 flex-wrap">
                      <span>Scheduled: {b.preferredDate} ({b.preferredTime})</span>
                      <span>·</span>
                      <span>Amount: <strong className="text-slate-900 font-mono">₹{b.amount}</strong></span>
                      <span>·</span>
                      <span>Payment: <strong className="text-slate-700 uppercase">{b.paymentStatus}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleCall(b.providerName)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                    title="Call"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleChat(b.providerId, b.id)}
                    className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                    title="Chat"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openTracker(b.id)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs flex items-center gap-1"
                  >
                    <span>Track Live</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  {b.paymentStatus === 'paid' && (
                    <button
                      onClick={() => setInvoiceBooking(b)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                      title="Digital Invoice"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {(filterType === 'all' || filterType === 'grocery') && (
          <div className="space-y-3">
            {groceryOrders.map((o) => (
              <div
                key={o.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 font-display">Grocery Order #{o.id}</span>
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded capitalize">
                          {o.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {o.itemCount} items · Delivery PIN/OTP: <strong className="font-mono text-amber-600 text-xs">{o.otpCode}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-base text-slate-900 font-mono">₹{o.totalAmount}</div>
                    <div className="text-[10px] text-slate-400">Paid via {o.paymentMethod.toUpperCase()}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <div className="truncate max-w-sm">
                    {o.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600">ETA {o.estimatedDelivery}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {(filterType === 'all' || filterType === 'fuel') && (
          <div className="space-y-3">
            {fuelOrders.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Fuel className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 capitalize">
                        {f.fuelType} Delivery ({f.quantityLiters} Liters)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">#{f.id}</span>
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded capitalize">
                        {f.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Vehicle: {f.vehicleNumber} · Scheduled: {f.timeSlot}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-base text-slate-900 font-mono">₹{f.totalAmount}</div>
                  <div className="text-[10px] text-slate-400">PESO Certified Mobile Bowser</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BookingTrackerModal
        bookingId={activeBookingId}
        onClose={() => setActiveBookingId(null)}
      />
    </div>
  );
};
