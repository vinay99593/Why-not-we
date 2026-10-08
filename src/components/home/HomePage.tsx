import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Provider, GroceryProduct } from '../../types';
import { HeroSection } from '../customer/HeroSection';
import { ServiceCategoriesGrid } from '../customer/ServiceCategoriesGrid';
import { HomeTransportShowcase } from './HomeTransportShowcase';
import { ProviderCard } from '../customer/ProviderCard';
import { ProviderDetailsModal } from '../customer/ProviderDetailsModal';
import { ServiceBookingModal } from '../customer/ServiceBookingModal';
import {
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  AlertTriangle,
  ShoppingBag,
  Fuel,
  CheckCircle,
  Building,
  Home,
  MapPin,
  Wifi,
  Coffee,
  Plus,
  Zap,
  Wrench,
  Key,
  Droplets,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    providers,
    hotels,
    hostels,
    groceryProducts,
    addToCart,
    setActivePage,
    setSelectedCategoryId,
    setIsProviderRegisterModalOpen,
    setActiveBookingId,
  } = useApp();

  const [selectedProviderForDetails, setSelectedProviderForDetails] = useState<Provider | null>(null);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<Provider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Top-rated verified providers
  const topWorkers = providers.filter((p) => p.isVerified && p.rating >= 4.8).slice(0, 4);

  const handleRequestService = (provider: Provider) => {
    setSelectedProviderForBooking(provider);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    setIsBookingModalOpen(false);
    setActiveBookingId(bookingId);
  };

  // Quick grocery essentials
  const quickGroceries = groceryProducts.slice(0, 5);

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Visually Attractive Hero Section with 13 Category Cards */}
      <HeroSection />

      {/* 2. SIGNATURE WHY NOT WE: DELIVERY & TRANSPORT (Move Anything. Anywhere Nearby.) */}
      <div className="max-w-7xl mx-auto px-4">
        <HomeTransportShowcase />
      </div>

      {/* 3. 🚨 EMERGENCY SERVICES - Noticeable High-Impact Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md border-2 border-rose-100 relative overflow-hidden transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <span className="text-2xl">🚨</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight">
                    Emergency Help
                  </h2>
                  <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                    &lt;15 MINS
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  24x7 Immediate doorstep dispatch for urgent power cuts, leaks & lockouts
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('emergency')}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer shadow-sm shadow-rose-600/20"
            >
              <span>View All Emergency Services</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Large Emergency Visual Cards - Clean White Cards with Red Accents */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                title: 'Emergency Electrician',
                icon: '⚡',
                catId: 'electrician',
                eta: '12 Mins',
                price: '₹199',
              },
              {
                title: 'Emergency Plumber',
                icon: '🚰',
                catId: 'plumber',
                eta: '15 Mins',
                price: '₹249',
              },
              {
                title: 'Emergency Locksmith',
                icon: '🔑',
                catId: 'locksmith',
                eta: '14 Mins',
                price: '₹349',
              },
              {
                title: 'Water Delivery',
                icon: '💧',
                catId: 'water_can_delivery',
                eta: '20 Mins',
                price: '₹65',
              },
            ].map((em, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategoryId(em.catId);
                  setActivePage('services');
                }}
                className="group p-4 rounded-2xl sm:rounded-3xl bg-slate-50 hover:bg-rose-50/60 border border-slate-200/90 hover:border-rose-400 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-1 active:scale-[0.98] shadow-xs hover:shadow-lg flex flex-col justify-between h-32 sm:h-36 will-change-transform"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl filter drop-shadow group-hover:scale-120 group-hover:rotate-6 transition-transform duration-300 origin-left ease-out">{em.icon}</span>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md shadow-2xs">
                    {em.eta}
                  </span>
                </div>

                <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display leading-tight group-hover:text-rose-600 transition-colors">
                    {em.title}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">
                    Starting {em.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VISUAL SERVICE CARDS - Strong Visuals with Photos & Minimal Text */}
      <ServiceCategoriesGrid
        title="Popular Home Services"
        subtitle="Minimal hassle • Upfront prices • Doorstep technicians"
        limit={8}
      />

      {/* 4. WORKER CARDS - Large Profile Photos & Minimal Text */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-0.5 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Verified Local Pros</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Top Rated Workers Near You
            </h2>
            <p className="text-xs text-slate-500">
              Handpicked professionals with 4.8+ ratings ready for doorstep visit
            </p>
          </div>

          <button
            onClick={() => setActivePage('services')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group shrink-0 cursor-pointer"
          >
            <span>View all workers ({providers.length})</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Worker Cards Grid with Large Profile Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topWorkers.map((prov) => (
            <ProviderCard
              key={prov.id}
              provider={prov}
              onRequestService={handleRequestService}
              onViewProfile={(p) => setSelectedProviderForDetails(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. HOTELS - Large Beautiful Hotel Images with Horizontal Mobile Scroll */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-0.5 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5" />
              <span>Boutique & Luxury Stays</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Hotels Near You
            </h2>
            <p className="text-xs text-slate-500">
              Verified room bookings with AC, Wi-Fi, and instant confirmation
            </p>
          </div>

          <button
            onClick={() => setActivePage('hotels')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group shrink-0 cursor-pointer"
          >
            <span>Explore all hotels</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Swipe Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto gap-4 pb-2 sm:grid sm:grid-cols-3 no-scrollbar">
          {hotels.slice(0, 3).map((hotel) => (
            <div
              key={hotel.id}
              className="min-w-[280px] sm:min-w-0 group bg-white rounded-3xl border border-slate-200 hover:border-blue-600 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between will-change-transform cursor-pointer"
              onClick={() => setActivePage('hotels')}
            >
              <div>
                {/* Large Beautiful Hotel Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-sm group-hover:bg-slate-950 transition-colors">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-teal-600 text-white text-[10px] font-bold shadow-xs">
                    Instant Booking
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-black text-base text-slate-900 font-display group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{hotel.location}, {hotel.city}</span>
                  </div>
                </div>
              </div>

              {/* Minimal Price and Action */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Nightly Stay</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">₹{hotel.startingPrice}</span>
                    <span className="text-[10px] text-slate-400">/ night</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePage('hotels');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs group-hover:shadow-md"
                >
                  View & Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOSTELS - Large Images & Visual Facility Icons */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-0.5 flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              <span>Student & Working Living</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Hostels & PGs Near You
            </h2>
            <p className="text-xs text-slate-500">
              Verified living spaces with mess food, Wi-Fi & 24x7 security
            </p>
          </div>

          <button
            onClick={() => setActivePage('hostels')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 transition-colors group shrink-0 cursor-pointer"
          >
            <span>Explore all hostels</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex overflow-x-auto gap-4 pb-2 sm:grid sm:grid-cols-3 no-scrollbar">
          {hostels.slice(0, 3).map((hostel) => (
            <div
              key={hostel.id}
              className="min-w-[280px] sm:min-w-0 group bg-white rounded-3xl border border-slate-200 hover:border-purple-600 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between will-change-transform cursor-pointer"
              onClick={() => setActivePage('hostels')}
            >
              <div>
                {/* Large Hostel Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={hostel.images[0]}
                    alt={hostel.name}
                    className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-sm group-hover:bg-slate-950 transition-colors">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{hostel.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-purple-600 text-white text-[10px] font-bold uppercase shadow-xs">
                    {hostel.category.replace('_', ' ')}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-black text-base text-slate-900 font-display group-hover:text-purple-600 transition-colors duration-200 truncate">
                    {hostel.name}
                  </h3>

                  {/* Visual Icons for Facilities Instead of Long Text */}
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold pt-1">
                    {hostel.wifi && (
                      <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md group-hover:bg-blue-100 transition-colors">
                        <Wifi className="h-3.5 w-3.5" />
                        <span>Wi-Fi</span>
                      </span>
                    )}
                    {hostel.foodAvailable && (
                      <span className="flex items-center gap-1 text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md group-hover:bg-teal-100 transition-colors">
                        <Coffee className="h-3.5 w-3.5" />
                        <span>Food</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Security</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Monthly Rent</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-slate-900 group-hover:text-purple-600 transition-colors">₹{hostel.startingRent}</span>
                    <span className="text-[10px] text-slate-400">/ month</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePage('hostels');
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-xs group-hover:shadow-md"
                >
                  View Bed
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GROCERY - Highly Visual Product Images with Quick [Add +] */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-0.5 flex items-center gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>15-Minute Dark Stores</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Daily Essentials & Groceries
            </h2>
            <p className="text-xs text-slate-500">
              Fresh dairy, pure water cans & farm veggies at your doorstep in 15 minutes
            </p>
          </div>

          <button
            onClick={() => setActivePage('grocery')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors group shrink-0 cursor-pointer"
          >
            <span>Open Grocery Store</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Visual Product Cards with Large Product Photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {quickGroceries.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-teal-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.025] active:scale-[0.98] p-3 flex flex-col justify-between will-change-transform cursor-pointer"
            >
              <div>
                {/* Large Product Image */}
                <div className="relative h-32 sm:h-36 w-full rounded-2xl overflow-hidden bg-slate-50 mb-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-lg bg-teal-600 text-white text-[9px] font-bold shadow-xs">
                    15m
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-teal-700 transition-colors">
                  {prod.name}
                </h3>
                <span className="text-[11px] text-slate-400 block">{prod.unit}</span>
              </div>

              {/* Price and [Add +] Button */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-black text-xs sm:text-sm text-slate-900 group-hover:text-teal-700 transition-colors">₹{prod.price}</span>
                  {prod.mrp > prod.price && (
                    <span className="text-[10px] text-slate-400 line-through ml-1">₹{prod.mrp}</span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-90 text-white font-bold text-xs flex items-center gap-1 transition-all duration-200 cursor-pointer shadow-xs group-hover:shadow-md"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DOORSTEP FUEL BANNER - Visual & Punchy */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">
              PESO Statutory Approved
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Doorstep Petrol & Diesel Delivery
            </h2>
            <p className="text-xs text-slate-300">
              Safe mobile automated bowser dispensing for your car, generator or commercial equipment.
            </p>
          </div>

          <button
            onClick={() => setActivePage('fuel')}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 shrink-0 cursor-pointer"
          >
            <Fuel className="h-4 w-4" />
            <span>Order Fuel Now</span>
          </button>
        </div>
      </section>

      {/* Modals */}
      <ProviderDetailsModal
        provider={selectedProviderForDetails}
        onClose={() => setSelectedProviderForDetails(null)}
        onRequestService={handleRequestService}
      />

      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        provider={selectedProviderForBooking}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};
