import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hostel, HostelCategory, HostelRoomOption } from '../../types';
import {
  Search,
  Home,
  Star,
  MapPin,
  CheckCircle,
  Phone,
  Coffee,
  Wifi,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { HostelDetailsModal } from './HostelDetailsModal';
import { HostelRequestModal } from './HostelRequestModal';

export const HostelsSection: React.FC = () => {
  const { hostels, setActivePage, setIsCallModalOpen, setCallPartnerName } = useApp();

  const [activeTab, setActiveTab] = useState<HostelCategory | 'all'>('all');
  const [searchCity, setSearchCity] = useState<'All' | 'Hyderabad' | 'Bengaluru' | 'Mumbai'>('All');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [viewHostel, setViewHostel] = useState<Hostel | null>(null);
  const [requestHostel, setRequestHostel] = useState<Hostel | null>(null);
  const [requestOption, setRequestOption] = useState<HostelRoomOption | null>(null);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const filteredHostels = hostels.filter((h) => {
    if (activeTab !== 'all' && h.category !== activeTab) return false;
    if (searchCity !== 'All' && h.city !== searchCity) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchName = h.name.toLowerCase().includes(q);
      const matchLoc = h.location.toLowerCase().includes(q);
      const matchCity = h.city.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchCity) return false;
    }
    return true;
  });

  const handleOpenRequest = (hostel: Hostel, option?: HostelRoomOption) => {
    setViewHostel(null);
    setRequestHostel(hostel);
    setRequestOption(option || hostel.roomOptions[0] || null);
    setIsRequestOpen(true);
  };

  const handleContactHostel = (hostel: Hostel) => {
    setCallPartnerName(`${hostel.name} (Warden)`);
    setIsCallModalOpen(true);
  };

  const handleSuccess = (reqId: string) => {
    setIsRequestOpen(false);
    setActivePage('orders');
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            <Home className="h-3.5 w-3.5 text-blue-400" />
            <span>Verified PGs, Hostels & Student Co-Living</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
            Find Trusted Hostels & PGs
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Safe, verified accommodations for boys, girls, college students and working professionals. 3 meals daily, biometric security, fast Wi-Fi and transparent monthly rent.
          </p>
        </div>
      </div>

      {/* Filter and Category Pills */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-3 text-xs">
        {/* Category selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Hostels & PGs' },
            { id: 'boys', label: '👦 Boys Hostels' },
            { id: 'girls', label: '👧 Girls Hostels' },
            { id: 'students', label: '🎓 Student Hostels' },
            { id: 'working_professionals', label: '💼 Working Professionals' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as typeof activeTab)}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input and City Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college, IT park, metro station or area..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2 bg-slate-50 focus:outline-hidden"
            />
          </div>

          <div>
            <select
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value as typeof searchCity)}
              className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 focus:outline-hidden font-medium"
            >
              <option value="All">All Cities</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hostel Cards Grid */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500">
          Showing <strong>{filteredHostels.length} verified hostels</strong> in {searchCity}
        </div>

        {filteredHostels.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            No hostels found for this filter. Try selecting 'All Hostels' or searching a different area.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHostels.map((h) => (
              <div
                key={h.id}
                className="group bg-white rounded-3xl border border-slate-200/90 hover:border-slate-800 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
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

                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs uppercase">
                      {h.category.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-xs">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base font-display group-hover:text-blue-600 transition-colors">
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

                    {/* Features checklist */}
                    <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Coffee className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{h.foodAvailable ? 'Food Included' : 'No Food'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Wifi className="h-3.5 w-3.5 text-emerald-600" />
                        <span>High-Speed Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>24/7 Security</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Daily Housekeeping</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Monthly Rent</span>
                    <div className="font-black text-slate-900 text-base font-mono">
                      ₹{h.startingRent}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ month</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleContactHostel(h)}
                      className="p-2 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 transition-colors"
                      title="Contact Hostel Warden"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewHostel(h)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-700 font-bold text-xs transition-colors"
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => handleOpenRequest(h)}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      CHECK BEDS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hostel Details Modal */}
      <HostelDetailsModal
        hostel={viewHostel}
        onClose={() => setViewHostel(null)}
        onRequestRoom={handleOpenRequest}
      />

      {/* Hostel Request Modal */}
      <HostelRequestModal
        hostel={requestHostel}
        selectedOption={requestOption}
        isOpen={isRequestOpen}
        onClose={() => setIsRequestOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
