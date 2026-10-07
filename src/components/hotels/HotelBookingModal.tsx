import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hotel, HotelRoom, PaymentMethod } from '../../types';
import {
  X,
  Calendar,
  Users,
  CheckCircle,
  Building,
  ShieldCheck,
  CreditCard,
  QrCode,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface HotelBookingModalProps {
  hotel: Hotel | null;
  selectedRoom: HotelRoom | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

export const HotelBookingModal: React.FC<HotelBookingModalProps> = ({
  hotel,
  selectedRoom,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user, bookHotel, currentAddress } = useApp();

  const [chosenRoomType, setChosenRoomType] = useState(
    selectedRoom?.type || hotel?.rooms[0]?.type || 'Standard Room'
  );
  const [checkIn, setCheckIn] = useState('2026-10-12');
  const [checkOut, setCheckOut] = useState('2026-10-14');
  const [guests, setGuests] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !hotel) return null;

  const activeRoom = hotel.rooms.find((r) => r.type === chosenRoomType) || hotel.rooms[0];
  const nightlyRate = activeRoom ? activeRoom.pricePerNight : hotel.startingPrice;

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const totalNights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)));
  const totalAmount = nightlyRate * totalNights;
  const taxes = Math.round(totalAmount * 0.12);
  const grandTotal = totalAmount + taxes;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const booking = bookHotel(
        hotel.id,
        chosenRoomType,
        checkIn,
        checkOut,
        guests,
        paymentMethod
      );
      setIsSubmitting(false);
      onSuccess(booking.id);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-display">Book Hotel Room</h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">{hotel.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirm} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-800">
          {/* Room Selection */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Select Room Category *</label>
            <div className="space-y-2">
              {hotel.rooms.map((rm) => (
                <div
                  key={rm.id}
                  onClick={() => setChosenRoomType(rm.type)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    chosenRoomType === rm.type
                      ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={rm.image} alt={rm.name} className="h-10 w-10 rounded-xl object-cover" />
                    <div>
                      <div className="text-xs">{rm.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Capacity: {rm.capacity} Guests</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs">₹{rm.pricePerNight}</div>
                    <div className="text-[10px] text-slate-400 font-normal">/ night</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Number of Guests</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGuests(g)}
                  className={`py-1.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                    guests === g
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {g} {g === 1 ? 'Guest' : 'Guests'}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Contact details */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Primary Guest</div>
            <div className="font-bold text-slate-900">{user.name} ({user.phone})</div>
            <div className="text-slate-500 text-[11px]">{user.email}</div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode },
                { id: 'card', label: 'Card', icon: CreditCard },
                { id: 'cash', label: 'Pay at Hotel', icon: CheckCircle },
              ].map((pm) => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === pm.id
                        ? 'border-slate-900 bg-white font-bold text-slate-900 shadow-2xs'
                        : 'border-slate-200 text-slate-600 bg-white/60'
                    }`}
                  >
                    <Icon className="h-4 w-4 mx-auto mb-1 text-slate-700" />
                    <span className="text-[10px]">{pm.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bill summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>{chosenRoomType} ({totalNights} {totalNights === 1 ? 'night' : 'nights'})</span>
              <span className="font-medium text-slate-900">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Hotel Taxes & GST (12%)</span>
              <span className="font-medium text-slate-900">₹{taxes}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
              <span>Total Payable</span>
              <span className="font-mono text-base font-black">₹{grandTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Confirming Reservation...</span>
              </>
            ) : (
              <>
                <span>Confirm Booking · ₹{grandTotal}</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
