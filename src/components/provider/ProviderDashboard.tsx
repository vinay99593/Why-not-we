import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingStatus, ServiceBooking, Provider } from '../../types';
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
  Bell,
  Eye,
  UserCheck,
  ArrowRight,
  Sparkles,
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
    logout,
  } = useApp();

  // Active worker (Ravi Kumar - Electrician)
  const currentWorker = providers[0] || {
    id: 'w-1',
    name: 'Ravi Kumar',
    categoryName: 'Electrician',
    rating: 4.9,
    experienceYears: 8,
    completedJobs: 412,
    location: 'Banjara Hills & Jubilee Hills, Hyderabad',
    hourlyRate: 350,
    visitFee: 149,
    skills: ['MCB Tripping Diagnostic', 'Three Phase Wiring', 'Inverter Setup', 'Smart Home Lighting'],
    bio: 'Licensed Master Electrician with 8+ years of field experience.',
  };

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'completed' | 'profile' | 'earnings'>('requests');
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<ServiceBooking | null>(null);

  // Incoming Requests: bookings with status 'requested'
  const incomingRequests = bookings.filter((b) => b.status === 'requested');

  // Active Jobs: 'accepted', 'on_the_way', 'arrived', 'in_progress'
  const activeJobs = bookings.filter((b) =>
    ['accepted', 'on_the_way', 'arrived', 'in_progress'].includes(b.status)
  );

  // Completed Jobs
  const completedJobs = bookings.filter((b) => b.status === 'completed');

  const todayEarnings = 1850;
  const totalEarnings = completedJobs.reduce((acc, b) => acc + b.amount, 0) + 16400;

  const handleAcceptRequest = (booking: ServiceBooking) => {
    updateBookingStatus(booking.id, 'accepted', `${currentWorker.name} accepted your request.`);
  };

  const handleDeclineRequest = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled', 'Declined by technician due to scheduling.');
  };

  // Status progression flow:
  // ACCEPTED -> ON THE WAY -> ARRIVED -> WORK STARTED -> WORK COMPLETED
  const handleNextStatus = (b: ServiceBooking) => {
    const sequence: Record<BookingStatus, { next: BookingStatus; label: string }> = {
      requested: { next: 'accepted', label: 'Accepted by Worker' },
      accepted: { next: 'on_the_way', label: 'Worker is on the way to your doorstep 🛵' },
      on_the_way: { next: 'arrived', label: 'Worker arrived at your location 📍' },
      arrived: { next: 'in_progress', label: 'Work started & diagnosing issue 🔧' },
      in_progress: { next: 'completed', label: 'Job completed & verified ✅' },
      completed: { next: 'completed', label: 'Completed' },
      cancelled: { next: 'cancelled', label: 'Cancelled' },
    };

    const nextStep = sequence[b.status];
    if (nextStep && nextStep.next !== b.status) {
      updateBookingStatus(b.id, nextStep.next, nextStep.label);
    }
  };

  const handleChat = (booking: ServiceBooking) => {
    setActiveBookingId(booking.id);
    setIsChatDrawerOpen(true);
  };

  const handleCall = (booking: ServiceBooking) => {
    setCallPartnerName(booking.customerName);
    setIsCallModalOpen(true);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Worker Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentWorker.avatar}
              alt={currentWorker.name}
              className="h-16 w-16 rounded-2xl object-cover border-2 border-blue-400"
            />
            <span
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black font-display">{currentWorker.name}</h1>
              <span className="text-[10px] font-bold bg-blue-500 text-white px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Verified Worker
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentWorker.categoryName} · Service Area: {currentWorker.location}
            </p>

            {/* Verification Badges as requested in prompt */}
            <div className="flex items-center gap-2 mt-2 text-[11px] text-emerald-400 font-medium flex-wrap">
              <span className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                ✓ ID Verified
              </span>
              <span className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                ✓ Phone Verified
              </span>
              <span className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                ✓ Profile Verified
              </span>
            </div>
          </div>
        </div>

        {/* Availability Toggle & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-800/90 p-3 rounded-2xl border border-slate-700">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Availability</div>
              <div className="text-xs font-bold text-white">
                {isOnline ? 'Online (Accepting Jobs)' : 'Offline (Paused)'}
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

          <button
            onClick={logout}
            className="px-3.5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Today's Requests</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">{incomingRequests.length}</div>
          <div className="text-[10px] text-amber-600 font-medium">Pending response</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Active Jobs</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">{activeJobs.length}</div>
          <div className="text-[10px] text-blue-600 font-medium">In progress</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Completed Jobs</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">{completedJobs.length + currentWorker.completedJobs}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Verified completed</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Today's Earnings</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">₹{todayEarnings}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Daily total</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Earnings</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1">₹{totalEarnings}</div>
          <div className="text-[10px] text-emerald-600 font-medium">0% Comm. free tier</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Average Rating</div>
          <div className="text-xl font-black text-slate-900 font-mono mt-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>{currentWorker.rating}</span>
          </div>
          <div className="text-[10px] text-slate-400">184 reviews</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'requests', label: `Today's Requests (${incomingRequests.length})` },
          { id: 'active', label: `Active Jobs (${activeJobs.length})` },
          { id: 'completed', label: `Completed Jobs (${completedJobs.length})` },
          { id: 'profile', label: 'Worker Profile & Badges' },
          { id: 'earnings', label: 'Earnings & Bank Settlements' },
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

      {/* TAB 1: Incoming Customer Requests (Syncs with customer requests) */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <h3 className="font-bold text-slate-900 text-sm font-display">NEW CUSTOMER REQUESTS</h3>
            <span className="text-slate-500">{incomingRequests.length} waiting for response</span>
          </div>

          {incomingRequests.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs space-y-2">
              <p className="font-bold text-slate-700">No pending customer requests right now.</p>
              <p>When a customer in Hyderabad requests your trade, the request appears here immediately.</p>
            </div>
          ) : (
            incomingRequests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-800 transition-all space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-900 font-display">
                        Customer: {req.customerName}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">#{req.id}</span>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        NEW REQUEST
                      </span>
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      Service: <strong className="text-slate-800">{req.serviceTitle}</strong>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Estimated Price</span>
                    <div className="font-black text-base text-slate-900 font-mono">
                      ₹{req.amount} – ₹{req.amount + 250}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">Problem Details</div>
                  <p className="leading-relaxed">“{req.description}”</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>Location: {req.address.area}, {req.address.city} (~2.5 km away)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Requested Time: {req.preferredDate}, {req.preferredTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Phone: {req.customerPhone}</span>
                  </div>
                </div>

                {/* Accept / Reject / View Buttons as requested in prompt */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    onClick={() => setSelectedRequestDetails(req)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 font-bold transition-colors"
                  >
                    VIEW DETAILS
                  </button>
                  <button
                    onClick={() => handleDeclineRequest(req.id)}
                    className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold transition-colors"
                  >
                    DECLINE
                  </button>
                  <button
                    onClick={() => handleAcceptRequest(req)}
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>ACCEPT REQUEST</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: Active Jobs & Step Progression */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <h3 className="font-bold text-slate-900 text-sm font-display">ACTIVE ACCEPTED JOBS</h3>
            <span className="text-slate-500">{activeJobs.length} live jobs</span>
          </div>

          {activeJobs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No active jobs in progress. Check "Today's Requests" to accept new incoming jobs.
            </div>
          ) : (
            activeJobs.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 font-display">{b.serviceTitle}</span>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded capitalize">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-slate-500 mt-0.5">
                      Customer: <strong className="text-slate-900">{b.customerName}</strong> · Phone: {b.customerPhone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCall(b)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                      title="Call Customer"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleChat(b)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </button>

                    {/* Step button: ACCEPTED -> ON THE WAY -> ARRIVED -> WORK STARTED -> WORK COMPLETED */}
                    <button
                      onClick={() => handleNextStatus(b)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <span>
                        {b.status === 'accepted' && 'Mark: ON THE WAY 🛵'}
                        {b.status === 'on_the_way' && 'Mark: ARRIVED 📍'}
                        {b.status === 'arrived' && 'Mark: WORK STARTED 🔧'}
                        {b.status === 'in_progress' && 'Mark: WORK COMPLETED ✅'}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{b.address.street}, {b.address.area} (Landmark: {b.address.landmark || 'None'})</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900">₹{b.amount}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: Completed Jobs */}
      {activeTab === 'completed' && (
        <div className="space-y-3 text-xs">
          {completedJobs.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-900">{b.serviceTitle}</div>
                <div className="text-slate-500 text-[11px]">
                  Customer: {b.customerName} · Settled via {b.paymentMethod?.toUpperCase() || 'UPI'}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900 text-sm">₹{b.amount}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Credited to Wallet</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Worker Profile with Verification Badges */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-slate-800">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="text-center space-y-2">
              <img
                src={currentWorker.avatar}
                alt={currentWorker.name}
                className="h-24 w-24 rounded-3xl object-cover mx-auto border-2 border-blue-500 shadow-md"
              />
              <h3 className="font-bold text-base text-slate-900 font-display">{currentWorker.name}</h3>
              <p className="text-slate-500">{currentWorker.categoryName} Specialist</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="text-[10px] font-bold uppercase text-slate-400">Verification Badges</div>
              <div className="space-y-1.5 font-medium text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>✓ ID Verified (Aadhaar / National ID)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>✓ Phone Verified (+91 98450 12345)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>✓ Profile Verified (Trade Skill Audit)</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div>Starting Visit Fee: <strong className="text-slate-900 font-mono">₹{currentWorker.visitFee}</strong></div>
              <div>Hourly Labor Rate: <strong className="text-slate-900 font-mono">₹{currentWorker.hourlyRate}/hr</strong></div>
              <div>Completed Jobs: <strong className="text-slate-900">{currentWorker.completedJobs}+ jobs</strong></div>
            </div>
          </div>

          <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 font-display">Specialized Skills & Bio</h4>
            <p className="text-slate-600 leading-relaxed">{currentWorker.bio}</p>

            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">Core Competencies</div>
              <div className="flex flex-wrap gap-1.5">
                {currentWorker.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Service Radius & Hub</div>
              <div className="font-medium text-slate-900">{currentWorker.location}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Earnings */}
      {activeTab === 'earnings' && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Wallet Balance & Bank Settlements</h3>
              <p className="text-slate-500">Fast digital payouts via UPI and Direct Bank Transfer</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold">
              Instant Payout (₹{totalEarnings})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Today's Total</span>
              <div className="font-black text-slate-900 font-mono text-base mt-0.5">₹{todayEarnings}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Commission</span>
              <div className="font-bold text-emerald-600 text-base mt-0.5">0% (Promotional Free Tier)</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Linked Account</span>
              <div className="font-bold text-slate-900 mt-0.5">State Bank of India ··· 4921</div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequestDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 font-display">Customer Request Details</h3>
              <button
                onClick={() => setSelectedRequestDetails(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div>Customer: <strong>{selectedRequestDetails.customerName}</strong></div>
              <div>Phone: <strong>{selectedRequestDetails.customerPhone}</strong></div>
              <div>Service: <strong>{selectedRequestDetails.serviceTitle}</strong></div>
              <div>Address: <strong>{selectedRequestDetails.address.street}, {selectedRequestDetails.address.area}</strong></div>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Problem: “{selectedRequestDetails.description}”
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedRequestDetails(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleAcceptRequest(selectedRequestDetails);
                  setSelectedRequestDetails(null);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
              >
                Accept This Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
