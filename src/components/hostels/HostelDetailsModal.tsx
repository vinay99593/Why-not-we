import React from 'react';
import { Hostel, HostelRoomOption } from '../../types';
import {
  X,
  Star,
  MapPin,
  CheckCircle,
  Phone,
  ShieldCheck,
  Wifi,
  Coffee,
  Car,
  ChevronRight,
  Shirt,
} from 'lucide-react';

interface HostelDetailsModalProps {
  hostel: Hostel | null;
  onClose: () => void;
  onRequestRoom: (hostel: Hostel, option: HostelRoomOption) => void;
}

export const HostelDetailsModal: React.FC<HostelDetailsModalProps> = ({
  hostel,
  onClose,
  onRequestRoom,
}) => {
  if (!hostel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="relative h-64 bg-slate-900 overflow-hidden">
          <img
            src={hostel.images[0]}
            alt={hostel.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-4 bg-slate-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>{hostel.rating}</span>
            <span className="text-slate-400">({hostel.reviewCount} student & resident reviews)</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {hostel.category.replace('_', ' ').toUpperCase()} PG / HOSTEL
            </span>
            <h2 className="text-xl font-black text-slate-950 font-display mt-1">
              {hostel.name}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{hostel.address}</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            {hostel.description}
          </p>

          {/* Key Facilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Hostel Facilities & Rules
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Coffee className="h-4 w-4 text-emerald-600" />
                <span>{hostel.foodAvailable ? '3 Meals Included' : 'No Food'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Wifi className="h-4 w-4 text-emerald-600" />
                <span>High-Speed Wi-Fi</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Shirt className="h-4 w-4 text-emerald-600" />
                <span>Laundry Machines</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>24/7 CCTV & Warden</span>
              </div>
            </div>
          </div>

          {/* Room options */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Available Sharing Plans
            </h4>
            <div className="space-y-2.5">
              {hostel.roomOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-800 transition-colors"
                >
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{opt.name}</h5>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {opt.availableBeds} beds available · Deposit: ₹{opt.depositAmount}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-black text-sm text-slate-900 font-mono">₹{opt.monthlyRent}</div>
                      <div className="text-[10px] text-slate-400">/ month</div>
                    </div>
                    <button
                      onClick={() => onRequestRoom(hostel, opt)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>Check & Reserve</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">Contact Warden / Property Manager</div>
              <div className="text-slate-600 mt-0.5">{hostel.contactPhone}</div>
            </div>
            <a
              href={`tel:${hostel.contactPhone}`}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Call Warden</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
