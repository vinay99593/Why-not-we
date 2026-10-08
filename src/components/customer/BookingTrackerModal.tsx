import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceBooking, BookingStatus, PaymentMethod } from '../../types';
import {
  X,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Star,
  ChevronRight,
  FileText,
  AlertTriangle,
  QrCode,
  Send,
  Navigation,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface BookingTrackerModalProps {
  bookingId: string | null;
  onClose: () => void;
}

export const BookingTrackerModal: React.FC<BookingTrackerModalProps> = ({
  bookingId,
  onClose,
}) => {
  const {
    bookings,
    updateBookingStatus,
    payBooking,
    rateBooking,
    cancelBooking,
    setIsChatDrawerOpen,
    setActiveChatPartner,
    setIsCallModalOpen,
    setCallPartnerName,
    setInvoiceBooking,
    providers,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('vinay@okhdfcbank');
  const [starRating, setStarRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubmittedReview, setIsSubmittedReview] = useState(false);

  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return null;

  const providerObj = providers.find((p) => p.id === booking.providerId);

  const handleChat = () => {
    if (providerObj) setActiveChatPartner(providerObj);
    setIsChatDrawerOpen(true);
  };

  const handleCall = () => {
    setCallPartnerName(booking.providerName);
    setIsCallModalOpen(true);
  };

  const handleAdvanceStatus = () => {
    const sequence: BookingStatus[] = [
      'requested',
      'accepted',
      'on_the_way',
      'in_progress',
      'completed',
    ];
    const currentIndex = sequence.indexOf(booking.status);
    if (currentIndex >= 0 && currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];
      updateBookingStatus(booking.id, nextStatus);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      payBooking(booking.id, paymentMethod);
      setIsProcessingPayment(false);
    }, 1200);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    rateBooking(booking.id, starRating, reviewComment || 'Great professional service!');
    setIsSubmittedReview(true);
  };

  // Steps configuration
  const steps: { key: BookingStatus; label: string; subtext: string }[] = [
    { key: 'requested', label: 'Request Sent', subtext: 'Broadcasted to nearby technician' },
    { key: 'accepted', label: 'Accepted', subtext: `${booking.providerName} confirmed task` },
    { key: 'on_the_way', label: 'On The Way', subtext: 'En route with toolkit, ETA ~8m' },
    { key: 'in_progress', label: 'Service Started', subtext: 'Inspecting & executing work' },
    { key: 'completed', label: 'Completed', subtext: 'Job finished & verified' },
  ];

  const getStepState = (stepKey: BookingStatus) => {
    const order: Record<BookingStatus, number> = {
      requested: 1,
      accepted: 2,
      on_the_way: 3,
      arrived: 3.5,
      in_progress: 4,
      completed: 5,
      cancelled: 0,
    };
    const currentOrder = order[booking.status];
    const thisOrder = order[stepKey];

    if (booking.status === 'cancelled') return 'cancelled';
    if (currentOrder > thisOrder) return 'completed';
    if (currentOrder === thisOrder) return 'active';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
              #{booking.id.replace('BK-', '')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base font-display">{booking.serviceTitle}</h3>
                {booking.urgency === 'emergency' && (
                  <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <AlertTriangle className="h-3 w-3" />
                    SOS
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Booking ID: <span className="font-mono">{booking.id}</span> · Preferred: {booking.preferredTime}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800 text-xs">
          {/* Active Status Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current Status</div>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusBadge status={booking.status} size="lg" showDot />
              </div>
              <p className="text-slate-500 text-[11px] mt-0.5">
                {booking.timeline[booking.timeline.length - 1]?.note || 'Processing your request'}
              </p>
            </div>

            {/* Test Simulation Control */}
            {booking.status !== 'completed' && booking.status !== 'cancelled' && (
              <button
                onClick={handleAdvanceStatus}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Advance Next Stage</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* 7-Stage Progress Bar */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Service Timeline</h4>
            <div className="space-y-3">
              {steps.map((st, idx) => {
                const state = getStepState(st.key);
                return (
                  <div key={st.key} className="flex items-start gap-3 relative">
                    {/* Vertical connecting line */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 bottom-0 w-0.5 -mb-3 ${
                          state === 'completed' ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                      />
                    )}

                    {/* Step Icon */}
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                        state === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : state === 'active'
                          ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {state === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-bold text-xs ${
                            state === 'active' ? 'text-slate-950' : state === 'completed' ? 'text-slate-800' : 'text-slate-400'
                          }`}
                        >
                          {st.label}
                        </span>
                        {state === 'active' && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{st.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Simulation Graphic (when On The Way or In Progress) */}
          {(booking.status === 'on_the_way' || booking.status === 'in_progress') && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-amber-600 animate-pulse" />
                  <span className="font-bold text-xs text-slate-900">Live GPS Technician Dispatch</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ETA ~6 mins away
                </span>
              </div>

              {/* Styled mock map canvas */}
              <div className="relative h-36 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                {/* SVG Route lines */}
                <svg className="absolute inset-0 w-full h-full stroke-amber-400/80 stroke-2" strokeDasharray="6,4">
                  <path d="M 40 80 Q 150 20 280 70 T 450 50" fill="none" />
                </svg>

                {/* Provider Marker */}
                <div className="absolute left-[38%] top-[38%] flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg animate-bounce">
                    🛵
                  </div>
                  <span className="text-[9px] font-bold bg-slate-900/90 text-white px-1.5 py-0.5 rounded mt-1">
                    {booking.providerName}
                  </span>
                </div>

                {/* Customer Destination Marker */}
                <div className="absolute right-[15%] top-[25%] flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-bold bg-slate-900/90 text-white px-1.5 py-0.5 rounded mt-1">
                    Your Address
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Provider Card & Action Controls */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={booking.providerAvatar}
                alt={booking.providerName}
                className="h-12 w-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <span>{booking.providerName}</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div className="text-[11px] text-slate-500">{booking.providerCategory}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Phone: +91 98450 12345</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCall}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                title="Call Provider"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                onClick={handleChat}
                className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                title="Message Provider"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="font-bold text-xs hidden sm:inline">Chat</span>
              </button>
            </div>
          </div>

          {/* Payment Section (Available when completed or pending) */}
          {booking.status === 'completed' && booking.paymentStatus === 'pending' && (
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Make Payment to Provider</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Service successfully verified. Pay securely.</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Total Amount</div>
                  <div className="font-bold text-lg text-slate-900 font-mono">₹{booking.amount}</div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
                  { id: 'cash', label: 'Cash on Spot', icon: CheckCircle },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === m.id
                          ? 'border-slate-900 bg-white font-bold text-slate-900 shadow-xs'
                          : 'border-slate-200 bg-white/50 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 mx-auto mb-1 text-slate-700" />
                      <span className="text-[11px] block">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Pay to VPA: <strong className="font-mono text-slate-900">whynotwe.pay@icici</strong></span>
                    <span className="text-emerald-600 font-bold">Instant 0% Fee</span>
                  </div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter your UPI ID (e.g. user@okhdfcbank)"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2"
                  />
                </div>
              )}

              <button
                onClick={handleProcessPayment}
                disabled={isProcessingPayment}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Secure Gateway...</span>
                  </>
                ) : (
                  <span>Pay ₹{booking.amount} & Generate Invoice</span>
                )}
              </button>
            </div>
          )}

          {/* Paid Invoice Notice */}
          {booking.paymentStatus === 'paid' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <div>
                  <div className="font-bold text-xs text-emerald-950">Payment Settled (₹{booking.amount})</div>
                  <div className="text-[11px] text-emerald-700">Digital invoice generated and verified.</div>
                </div>
              </div>
              <button
                onClick={() => setInvoiceBooking(booking)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View Receipt</span>
              </button>
            </div>
          )}

          {/* Rating & Review submission */}
          {booking.status === 'completed' && !booking.ratingGiven && !isSubmittedReview && (
            <form onSubmit={handleSubmitReview} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div>
                <h4 className="font-bold text-xs text-slate-900">Rate Your Experience with {booking.providerName}</h4>
                <p className="text-[11px] text-slate-500">Your feedback helps maintain top service quality</p>
              </div>

              {/* Star selector */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStarRating(s)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        s <= starRating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-800 ml-2">{starRating} of 5 Stars</span>
              </div>

              <textarea
                rows={2}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share a brief comment about their punctuality, skill and cleanliness..."
                className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white focus:border-slate-900 focus:outline-hidden"
              />

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Verified Review</span>
              </button>
            </form>
          )}

          {/* Already reviewed banner */}
          {(booking.ratingGiven || isSubmittedReview) && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>
                You rated this service {booking.ratingGiven || starRating} stars. Thank you for your review!
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {booking.status === 'requested' || booking.status === 'accepted' ? (
            <button
              onClick={() => {
                cancelBooking(booking.id);
                onClose();
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition-colors"
            >
              Cancel Booking
            </button>
          ) : (
            <div className="text-[11px] text-slate-400">WHY NOT WE Protection Program Active</div>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
