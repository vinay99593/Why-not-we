import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Clock,
  ShoppingBag,
  Bookmark,
  MessageSquare,
  Bell,
  CreditCard,
  Star,
  HelpCircle,
  Settings,
  MapPin,
  ChevronRight,
  FileText,
  ShieldCheck,
  Phone,
  Trash2,
} from 'lucide-react';
import { ProviderCard } from './ProviderCard';

export const CustomerDashboard: React.FC = () => {
  const {
    user,
    updateUserProfile,
    bookings,
    groceryOrders,
    fuelOrders,
    providers,
    savedProviders,
    toggleSaveProvider,
    setActiveBookingId,
    setInvoiceBooking,
    setIsChatDrawerOpen,
    setActiveChatPartner,
    setIsSupportModalOpen,
    setIsLocationModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'bookings' | 'grocery' | 'fuel' | 'saved' | 'profile' | 'payments'
  >('bookings');

  // Profile edit states
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, email });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const favoriteProviders = providers.filter((p) => savedProviders.includes(p.id));

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Top Customer Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-2xl object-cover border-2 border-amber-400"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display">{user.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{user.phone} · {user.email}</p>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                WHY NOT WE Member
              </span>
              <span className="text-slate-400 text-[11px]">Indiranagar, Bengaluru</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsSupportModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <HelpCircle className="h-4 w-4 text-amber-400" />
          <span>Help & Support</span>
        </button>
      </div>

      {/* Segmented Controls / Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'bookings', label: `Service Bookings (${bookings.length})`, icon: Clock },
          { id: 'grocery', label: `Grocery Orders (${groceryOrders.length})`, icon: ShoppingBag },
          { id: 'fuel', label: `Fuel Orders (${fuelOrders.length})`, icon: CreditCard },
          { id: 'saved', label: `Saved Pros (${favoriteProviders.length})`, icon: Bookmark },
          { id: 'profile', label: 'Addresses & Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Service Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No service bookings yet. Request an electrician, plumber or technician anytime!
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 font-display">{b.serviceTitle}</span>
                    <span className="text-[10px] font-mono text-slate-400">#{b.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded capitalize bg-slate-100 text-slate-800">
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-slate-600 mt-1">{b.description}</p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 flex-wrap">
                    <span>Provider: <strong className="text-slate-700">{b.providerName}</strong></span>
                    <span>·</span>
                    <span>Preferred: {b.preferredDate} ({b.preferredTime})</span>
                    <span>·</span>
                    <span className="font-bold text-slate-900">₹{b.amount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveBookingId(b.id)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
                  >
                    Track Status
                  </button>
                  {b.paymentStatus === 'paid' && (
                    <button
                      onClick={() => setInvoiceBooking(b)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                      title="View Invoice"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: Grocery Orders */}
      {activeTab === 'grocery' && (
        <div className="space-y-4">
          {groceryOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No grocery orders yet.
            </div>
          ) : (
            groceryOrders.map((o) => (
              <div
                key={o.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-900 font-display">Grocery Order #{o.id}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {o.itemCount} items · OTP for delivery: <strong className="font-mono text-amber-600 text-xs">{o.otpCode}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold capitalize">
                      {o.status.replace(/_/g, ' ')}
                    </span>
                    <div className="font-bold text-slate-900 text-sm font-mono mt-1">₹{o.totalAmount}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                  <div className="truncate max-w-sm">
                    {o.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">ETA: {o.estimatedDelivery}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: Fuel Orders */}
      {activeTab === 'fuel' && (
        <div className="space-y-4">
          {fuelOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No fuel orders yet.
            </div>
          ) : (
            fuelOrders.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-sm text-slate-900 capitalize">
                    {f.fuelType} Delivery ({f.quantityLiters} Liters)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Vehicle: {f.vehicleNumber} · Scheduled: {f.timeSlot}
                  </div>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold capitalize mt-1 inline-block">
                    {f.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="text-right">
                  <div className="font-bold text-base text-slate-900 font-mono">₹{f.totalAmount}</div>
                  <div className="text-[10px] text-slate-400">Paid via {f.paymentMethod.toUpperCase()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: Saved Providers */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteProviders.length === 0 ? (
            <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No saved providers yet. Tap the bookmark icon on any provider card to pin them here!
            </div>
          ) : (
            favoriteProviders.map((p) => (
              <ProviderCard
                key={p.id}
                provider={p}
                onRequestService={() => {}}
                onViewProfile={() => {}}
              />
            ))
          )}
        </div>
      )}

      {/* TAB 5: Profile & Addresses */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-slate-800">
          {/* Edit Profile */}
          <form
            onSubmit={handleSaveProfile}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="font-bold text-sm text-slate-900 font-display">Personal Details</h3>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold transition-colors"
            >
              {isSavedNotice ? 'Saved Successfully!' : 'Update Profile'}
            </button>
          </form>

          {/* Addresses */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 font-display">Saved Addresses</h3>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-amber-600 font-bold hover:underline"
              >
                + Add / Manage
              </button>
            </div>

            <div className="space-y-3">
              {user.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between"
                >
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 mt-0.5">{addr.street}</p>
                      <p className="text-slate-400 text-[11px]">{addr.area}, {addr.city} - {addr.pincode}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
