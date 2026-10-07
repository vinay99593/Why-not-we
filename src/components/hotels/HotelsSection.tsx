import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hotel, HotelRoom } from '../../types';
import {
  Search,
  Building,
  Star,
  MapPin,
  CheckCircle,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import { HotelDetailsModal } from './HotelDetailsModal';
import { HotelBookingModal } from './HotelBookingModal';

export const HotelsSection: React.FC = () => {
  const { hotels, setActivePage } = useApp();

  const [searchCity, setSearchCity] = useState<'All' | 'Hyderabad' | 'Bengaluru' | 'Mumbai' | 'Delhi NCR' | 'Pune'>('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minRating, setMinRating] = useState<number>(0);

  const [viewHotel, setViewHotel] = useState<Hotel | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [bookingRoom, setBookingRoom] = useState<HotelRoom | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredHotels = hotels.filter((h) => {
    if (searchCity !== 'All' && h.city !== searchCity) return false;
    if (h.startingPrice > maxPrice) return false;
    if (h.rating < minRating) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = h.name.toLowerCase().includes(q);
      const matchLoc = h.location.toLowerCase().includes(q);
      const matchCity = h.city.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchCity) return false;
    }
    return true;
  });

  const handleOpenBooking = (hotel: Hotel, room?: HotelRoom) => {
    setViewHotel(null);
    setBookingHotel(hotel);
    setBookingRoom(room || hotel.rooms[0] || null);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    setIsBookingOpen(false);
    setActivePage('orders');
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Building className="h-3.5 w-3.5 text-amber-400" />
            <span>Verified Hotel Stays & Boutique Suites</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Find & Book Verified Hotels Nearby
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Reserve premium boutique stays, tech-hub business rooms, and leisure hotels with guaranteed amenities, verified photos, and zero hidden charges.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 text-xs">
        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {['All', 'Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune'].map((city) => (
            <button
              key={city}
              onClick={() => setSearchCity(city as typeof searchCity)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                searchCity === city
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hotel name, area, or landmark..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2 bg-slate-50 focus:outline-hidden"
            />
          </div>

          <div>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden font-medium"
            >
              <option value={5000}>Max Budget: Up to ₹5,000 / night</option>
              <option value={3000}>Up to ₹3,000 / night</option>
              <option value={2000}>Under ₹2,000 / night (Budget)</option>
            </select>
          </div>

          <div>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden font-medium"
            >
              <option value={0}>All Ratings</option>
              <option value={4.7}>★ 4.7 & above (Top Rated)</option>
              <option value={4.8}>★ 4.8 & above (Luxury Stays)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500">
          Showing <strong>{filteredHotels.length} verified hotels</strong> in {searchCity}
        </div>

        {filteredHotels.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            No hotels found matching your search criteria. Try expanding your price range or clearing filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHotels.map((h) => (
              <div
                key={h.id}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-slate-800 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo */}
                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
                    <img
                      src={h.images[0]}
                      alt={h.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span>{h.rating}</span>
                      <span className="text-slate-400 font-normal">({h.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {h.availableRooms} rooms left
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-2 text-xs">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base font-display group-hover:text-amber-600 transition-colors">
                        {h.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{h.location}, {h.city}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                      {h.description}
                    </p>

                    {/* Amenities pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {h.amenities.slice(0, 4).map((am, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {am}
                        </span>
                      ))}
                      {h.amenities.length > 4 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{h.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Starting from</span>
                    <div className="font-black text-slate-900 text-base font-mono">
                      ₹{h.startingPrice}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewHotel(h)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-700 font-bold text-xs transition-colors"
                    >
                      VIEW HOTEL
                    </button>
                    <button
                      onClick={() => handleOpenBooking(h)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      BOOK ROOM
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Details Modal */}
      <HotelDetailsModal
        hotel={viewHotel}
        onClose={() => setViewHotel(null)}
        onBookRoom={handleOpenBooking}
      />

      {/* Hotel Booking Modal */}
      <HotelBookingModal
        hotel={bookingHotel}
        selectedRoom={bookingRoom}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
};
