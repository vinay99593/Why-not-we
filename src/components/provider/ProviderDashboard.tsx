import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, ServiceBooking } from '../../types';
import {
  DollarSign,
  Briefcase,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Sliders,
  Bell,
  Eye,
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStatus,
    providers,
    setIsChatDrawerOpen,
    setActiveChatPartner,
    setIsCallModalOpen,
    setCallPartnerName,
    setActiveBookingId,
  } = useApp();

  // Active provider context (simulate as Rajesh Kumar, provider #p-1)
  const currentProvider = providers[0] || {
    id: 'p-1',
    name: 'Rajesh Kumar',
    categoryName: 'Electrician',
    rating: 4.9,
    completedJobs: 412,
  };

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'completed' | 'earnings' | 'reviews'>('requests');

  // Bookings associated with this provider
  const incomingRequests = bookings.filter((b) => b.status === 'requested');
  const activeJobs = bookings.filter((b) => ['accepted', 'on_the_way', 'in_progress'].includes(b.status));
  const completedJobs = bookings.filter((b) => b.status === 'completed');

  const totalEarnings = completedJobs.reduce((acc, b) => acc + b.amount, 0) + 14200;

  const handleAccept = (bookingId: string) => {
    updateBookingStatus(bookingId, 'accepted', 'Accepted by provider Rajesh Kumar');
  };

  const handleReject = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled', 'Rejected by provider (scheduling conflict)');
  };

  const handleAdvanceStatus = (booking: ServiceBooking) => {
    const nextMap: Record<BookingStatus, BookingStatus> = {
      requested: 'accepted',
      accepted: 'on_the_way',
      on_the_way: 'in_progress',
      in_progress: 'completed',
      completed: 'completed',
      cancelled: 'cancelled',
    };
    const next = nextMap[booking.status];
    updateBookingStatus(booking.id, next);
  };

  const handleChatCustomer = (booking: ServiceBooking) => {
    setActiveBookingId(booking.id);
    setIsChatDrawerOpen(true);
  };

  const handleCallCustomer = (booking: ServiceBooking) => {
    setCallPartnerName(booking.customerName);
    setIsCallModalOpen(true);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Top Provider Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentProvider.avatar}
              alt={currentProvider.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-amber-400"
            />
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-display">{currentProvider.name}</h1>
              <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                Verified Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentProvider.categoryName} · Service Hub: Indiranagar</p>

            <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <span>{currentProvider.rating} Rating</span>
              </span>
              <span>·</span>
              <span>{completedJobs.length + currentProvider.completedJobs} Jobs Done</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Broadcast Status</div>
            <div className="text-xs font-bold text-white">
              {isOnline ? 'Online (Accepting Requests)' : 'Offline (Paused)'}
            </div>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              isOnline ? 'bg-emerald-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white block transition-transform ${
                isOnline ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold">Total Earnings</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">₹{totalEarnings}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />
            <span>₹2,450 this week</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold">Incoming Requests</span>
            <Bell className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{incomingRequests.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Pending dispatch response</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold">In-Progress Tasks</span>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{activeJobs.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Live customer orders</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] uppercase font-bold">Acceptance Rate</span>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">98.4%</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">Top tier partner</div>
        </div>
      </div>

      {/* Tab Navigation (Segmented Controls) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'requests', label: `Incoming Requests (${incomingRequests.length})` },
          { id: 'active', label: `Active Jobs (${activeJobs.length})` },
          { id: 'completed', label: `Completed Jobs (${completedJobs.length})` },
          { id: 'earnings', label: 'Payouts & Earnings' },
          { id: 'reviews', label: 'Ratings & Reviews' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Incoming Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {incomingRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No pending incoming requests right now. When customers book in your radius, they will appear here with instant audio chime.
            </div>
          ) : (
            incomingRequests.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm font-display">{b.serviceTitle}</span>
                    <span className="text-[10px] font-mono text-slate-400">#{b.id}</span>
                    {b.urgency === 'emergency' && (
                      <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <AlertTriangle className="h-3 w-3" />
                        SOS Emergency
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 mt-1">{b.description}</p>

                  <div className="flex items-center gap-4 text-slate-500 text-[11px] mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{b.address.street}, {b.address.area}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{b.preferredDate} ({b.preferredTime})</span>
                    </div>
                    <span>·</span>
                    <span className="font-bold text-slate-900">Estimated: ₹{b.amount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleReject(b.id)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 font-bold transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAccept(b.id)}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-md"
                  >
                    Accept Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Active Jobs */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No active jobs in progress.
            </div>
          ) : (
            activeJobs.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 font-display">{b.serviceTitle}</h4>
                      <span className="text-amber-700 bg-amber-50 font-bold px-2 py-0.5 rounded text-[10px] capitalize">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Customer: {b.customerName} ({b.customerPhone})</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCallCustomer(b)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                      title="Call Customer"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleChatCustomer(b)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1 font-semibold"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={() => handleAdvanceStatus(b)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1 shadow-xs"
                    >
                      <span>
                        {b.status === 'accepted' && 'Mark On The Way 🛵'}
                        {b.status === 'on_the_way' && 'Start Service 🔧'}
                        {b.status === 'in_progress' && 'Mark Completed ✅'}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-600" />
                    <span>{b.address.street}, {b.address.area} (Landmark: {b.address.landmark || 'N/A'})</span>
                  </div>
                  <span className="font-bold text-slate-900">₹{b.amount}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Completed Jobs */}
      {activeTab === 'completed' && (
        <div className="space-y-3">
          {completedJobs.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-slate-900">{b.serviceTitle}</div>
                <div className="text-slate-500 text-[11px]">
                  Customer: {b.customerName} · Paid via {b.paymentMethod?.toUpperCase() || 'UPI'}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 font-mono text-sm">₹{b.amount}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Settled to Wallet</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Earnings & Payouts */}
      {activeTab === 'earnings' && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Wallet Balance & Bank Payouts</h3>
              <p className="text-slate-500 mt-0.5">Automated daily settlement to verified bank account</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold">
              Instant Payout (₹{totalEarnings})
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Linked Account</div>
              <div className="font-bold text-slate-900 mt-0.5">HDFC Bank ··· 9102</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Platform Fee (Commission)</div>
              <div className="font-bold text-emerald-600 mt-0.5">0% (Promotional Free Tier)</div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px] uppercase font-bold">Next Settlement</div>
              <div className="font-bold text-slate-900 mt-0.5">Tomorrow, 6:00 AM</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {currentProvider.reviews.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{r.authorName}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-500" />
                  ))}
                  <span className="text-slate-400 text-[10px] ml-1">{r.date}</span>
                </div>
              </div>
              <p className="text-slate-600">{r.comment}</p>
              <div className="text-[10px] text-slate-400 italic">Job: {r.serviceName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
