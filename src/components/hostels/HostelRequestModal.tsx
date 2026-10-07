import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hostel, HostelRoomOption } from '../../types';
import {
  X,
  Home,
  Calendar,
  CheckCircle,
  Phone,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

interface HostelRequestModalProps {
  hostel: Hostel | null;
  selectedOption: HostelRoomOption | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (requestId: string) => void;
}

export const HostelRequestModal: React.FC<HostelRequestModalProps> = ({
  hostel,
  selectedOption,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user, requestHostel } = useApp();

  const [chosenRoomName, setChosenRoomName] = useState(
    selectedOption?.name || hostel?.roomOptions[0]?.name || 'Double Sharing Room'
  );
  const [moveInDate, setMoveInDate] = useState('2026-11-01');
  const [durationMonths, setDurationMonths] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !hostel) return null;

  const currentRoomOpt =
    hostel.roomOptions.find((r) => r.name === chosenRoomName) || hostel.roomOptions[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const req = requestHostel(hostel.id, chosenRoomName, moveInDate, durationMonths);
      setIsSubmitting(false);
      onSuccess(req.id);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-display">Check Availability & Reserve Bed</h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">{hostel.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleConfirm} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-800">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Select Sharing Option *</label>
            <div className="space-y-2">
              {hostel.roomOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setChosenRoomName(opt.name)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    chosenRoomName === opt.name
                      ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 shadow-2xs'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-xs">{opt.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {opt.availableBeds} beds available · Deposit: ₹{opt.depositAmount}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-black">₹{opt.monthlyRent}</div>
                    <div className="text-[10px] text-slate-400 font-normal">/ month</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Expected Move-in Date *</label>
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Intended Stay Duration</label>
              <select
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden"
              >
                <option value={1}>1 Month</option>
                <option value={3}>3 Months</option>
                <option value={6}>6 Months (Standard)</option>
                <option value={12}>12 Months (Annual)</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Applicant Details</div>
            <div className="font-bold text-slate-900">{user.name} ({user.phone})</div>
            <div className="text-slate-500 text-[11px]">{user.email}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Monthly Rent ({chosenRoomName})</span>
              <span className="font-bold text-slate-900">₹{currentRoomOpt?.monthlyRent}/mo</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Security Deposit (Refundable)</span>
              <span className="font-medium text-slate-900">₹{currentRoomOpt?.depositAmount}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Food Plan (3 Meals Included)</span>
              <span className="text-emerald-700 font-bold">YES, INCLUDED</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
              <span>Total Move-in Estimate</span>
              <span className="font-mono text-base font-black">
                ₹{(currentRoomOpt?.monthlyRent || 0) + (currentRoomOpt?.depositAmount || 0)}
              </span>
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
                <span>Sending Reservation Request...</span>
              </>
            ) : (
              <>
                <span>Submit Hostel Bed Request</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
