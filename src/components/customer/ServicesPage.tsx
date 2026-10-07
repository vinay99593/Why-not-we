import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Provider, ServiceCategory } from '../../types';
import {
  Search,
  Filter,
  Star,
  MapPin,
  ShieldCheck,
  Check,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { ProviderCard } from './ProviderCard';
import { ProviderDetailsModal } from './ProviderDetailsModal';
import { ServiceBookingModal } from './ServiceBookingModal';

export const ServicesPage: React.FC = () => {
  const {
    categories,
    providers,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    setActiveBookingId,
  } = useApp();

  // Filter states
  const [minRating, setMinRating] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'price'>('rating');

  // Modals
  const [selectedProviderForDetails, setSelectedProviderForDetails] = useState<Provider | null>(null);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<Provider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Active Category object
  const activeCategory = categories.find((c) => c.id === selectedCategoryId) || null;

  // Filter logic
  const filteredProviders = providers.filter((p) => {
    // Category match
    if (selectedCategoryId && p.categoryId !== selectedCategoryId) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q);
      const matchSkill = p.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchSkill) return false;
    }

    // Rating filter
    if (p.rating < minRating) return false;

    // Distance filter
    if (p.distanceKm > maxDistance) return false;

    // Verified filter
    if (verifiedOnly && !p.isVerified) return false;

    // Available filter
    if (availableOnly && !p.isAvailable) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
    if (sortBy === 'price') return a.visitFee - b.visitFee;
    return 0;
  });

  const handleRequestService = (provider: Provider) => {
    setSelectedProviderForBooking(provider);
    setIsBookingModalOpen(true);
  };

  const handleBookingCreated = (bookingId: string) => {
    setIsBookingModalOpen(false);
    setActiveBookingId(bookingId);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Search & Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
            {activeCategory ? activeCategory.name : 'Local Services & Verified Trades'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {activeCategory
              ? activeCategory.description
              : 'Browse 16 on-demand home categories and verified local trade partners in your area'}
          </p>
        </div>

        {/* Categories Carousel */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategoryId(null)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategoryId === null
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Trades (16)
            </button>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategoryId(c.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategoryId === c.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Rating Filter */}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="rounded-xl border border-slate-200 px-3 py-1.5 bg-slate-50 text-slate-700 focus:outline-hidden"
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>★ 4.5 & above</option>
              <option value={4.8}>★ 4.8 & above</option>
            </select>

            {/* Distance Filter */}
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="rounded-xl border border-slate-200 px-3 py-1.5 bg-slate-50 text-slate-700 focus:outline-hidden"
            >
              <option value={10}>Distance: Within 10 km</option>
              <option value={5}>Within 5 km</option>
              <option value={2}>Within 2 km (Fastest)</option>
            </select>

            {/* Verified toggle */}
            <button
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1 transition-colors ${
                verifiedOnly
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Pros Only</span>
            </button>

            {/* Available toggle */}
            <button
              onClick={() => setAvailableOnly(!availableOnly)}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1 transition-colors ${
                availableOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Available Now</span>
            </button>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-slate-200 px-3 py-1.5 bg-slate-50 text-slate-900 font-semibold focus:outline-hidden"
            >
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest Distance</option>
              <option value="price">Lowest Visit Fee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Provider Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Found {filteredProviders.length} matching verified technicians</span>
          {selectedCategoryId && (
            <button
              onClick={() => setSelectedCategoryId(null)}
              className="text-amber-600 font-bold hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {filteredProviders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs space-y-2">
            <p className="font-bold text-slate-700">No providers matched your exact filters</p>
            <p>Try expanding the distance radius or lowering rating criteria to see more professionals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onRequestService={handleRequestService}
                onViewProfile={(p) => setSelectedProviderForDetails(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Profile Details Modal */}
      <ProviderDetailsModal
        provider={selectedProviderForDetails}
        onClose={() => setSelectedProviderForDetails(null)}
        onRequestService={handleRequestService}
      />

      {/* Booking Wizard Modal */}
      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        provider={selectedProviderForBooking}
        category={activeCategory}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingCreated}
      />
    </div>
  );
};
