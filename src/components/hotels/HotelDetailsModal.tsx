import React from 'react';
import { Hotel, HotelRoom } from '../../types';
import {
  X,
  Star,
  MapPin,
  CheckCircle,
  Wifi,
  Wind,
  Car,
  Coffee,
  Waves,
  Clock,
  Building,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface HotelDetailsModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onBookRoom: (hotel: Hotel, room: HotelRoom) => void;
}

export const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({
  hotel,
  onClose,
  onBookRoom,
}) => {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header Images */}
        <div className="relative h-64 bg-slate-900 overflow-hidden">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
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
            <span>{hotel.rating}</span>
            <span className="text-slate-400">({hotel.reviewCount} verified guest reviews)</span>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Verified Stay Partner
            </span>
            <h2 className="text-xl font-black text-slate-950 font-display mt-0.5">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-1.5 text-slate-500 mt-1 text-xs">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{hotel.address}</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            {hotel.description}
          </p>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Featured Amenities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {hotel.amenities.map((am, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-slate-700 font-medium text-[11px]"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Room Options */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Available Room Types
            </h4>
            <div className="space-y-3">
              {hotel.rooms.map((rm) => (
                <div
                  key={rm.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-slate-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rm.image}
                      alt={rm.name}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">{rm.name}</h5>
                      <div className="text-[11px] text-slate-500">
                        Max: {rm.capacity} Guests · Ensuite Bathroom · AC
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-400">
                        {rm.amenities.map((a, idx) => (
                          <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                    <div>
                      <div className="font-black text-base text-slate-900 font-mono">
                        ₹{rm.pricePerNight}
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">/ night + taxes</div>
                    </div>

                    <button
                      onClick={() => onBookRoom(hotel, rm)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Book Room</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust note */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0" />
            <span>
              WHY NOT WE Verified Stay: Free cancellation up to 24 hours prior to check-in. Instant confirmation.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
