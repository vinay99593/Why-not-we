import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Provider, ServiceCategory } from '../../types';
import {
  User,
  Clock,
  ShoppingBag,
  Bookmark,
  MessageSquare,
  Bell,
  CreditCard,
  Star,
  HelpCircle,
  Settings,
  MapPin,
  ChevronRight,
  FileText,
  ShieldCheck,
  Phone,
  Trash2,
  Search,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Building,
  Home,
  CheckCircle,
  Wifi,
  Coffee,
  Fuel,
  Calendar,
} from 'lucide-react';
import { ProviderCard } from './ProviderCard';
import { ProviderDetailsModal } from './ProviderDetailsModal';
import { ServiceBookingModal } from './ServiceBookingModal';
import { BookingTrackerModal } from './BookingTrackerModal';

export const CustomerDashboard: React.FC = () => {
  const {
    user,
    updateUserProfile,
    bookings,
    groceryOrders,
    fuelOrders,
    providers,
    categories,
    hotels,
    hostels,
    savedProviders,
    toggleSaveProvider,
    activeBookingId,
    setActiveBookingId,
    setInvoiceBooking,
    setIsChatDrawerOpen,
    setActiveChatPartner,
    setIsCallModalOpen,
    setCallPartnerName,
    setIsSupportModalOpen,
    setIsLocationModalOpen,
    currentAddress,
    setActivePage,
    setSelectedCategoryId,
    setSearchQuery,
    logout,
  } = useApp();

  const [mainSection, setMainSection] = useState<'explore' | 'bookings' | 'grocery' | 'fuel' | 'saved' | 'profile'>('explore');
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Booking & Provider Modals
  const [selectedProviderForDetails, setSelectedProviderForDetails] = useState<Provider | null>(null);
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<Provider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Profile edit states
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, email });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const favoriteProviders = providers.filter((p) => savedProviders.includes(p.id));

  // Top rated workers (rating >= 4.8)
  const topRatedWorkers = providers.filter((p) => p.isVerified && p.rating >= 4.8).slice(0, 4);

  // Services near you (sorted by distance)
  const servicesNearYou = [...providers].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 4);

  // Filtered workers by category or search
  const filteredWorkers = providers.filter((p) => {
    if (selectedCategoryFilter !== 'all' && p.categoryId !== selectedCategoryFilter) return false;
    if (dashboardSearch.trim()) {
      const q = dashboardSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q);
      const matchSkills = p.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchSkills) return false;
    }
    return true;
  });

  const handleRequestService = (provider: Provider) => {
    setSelectedProviderForBooking(provider);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    setIsBookingModalOpen(false);
    setActiveBookingId(bookingId);
  };

  const handleCategoryClick = (catId: string) => {
    if (catId === 'hotels') {
      setActivePage('hotels');
    } else if (catId === 'hostels') {
      setActivePage('hostels');
    } else if (catId === 'grocery_delivery') {
      setActivePage('grocery');
    } else if (catId === 'fuel_delivery') {
      setActivePage('fuel');
    } else {
      setSelectedCategoryId(catId);
      setActivePage('services');
    }
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* 1. Top Customer Dashboard Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1 border border-amber-400/30">
              <Sparkles className="h-3 w-3" />
              <span>Customer Portal · WHY NOT WE</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white">
              Hello, {user.name} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{user.phone} · {user.email}</p>

            <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/80"
              >
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="truncate max-w-[200px]">{currentAddress.area || currentAddress.city}</span>
                <span className="text-[10px] text-slate-400 underline ml-1">Change</span>
              </button>
              <span className="text-slate-400 text-[11px]">
                {bookings.filter((b) => !['completed', 'cancelled'].includes(b.status)).length} Active Tasks
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 self-start md:self-auto relative z-10 flex-wrap">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-amber-400" />
            <span>Help & Support</span>
          </button>
          <button
            onClick={() => logout()}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'explore', label: 'Explore & Services', icon: Sparkles },
          { id: 'bookings', label: `Service Bookings (${bookings.length})`, icon: Clock },
          { id: 'grocery', label: `Grocery Orders (${groceryOrders.length})`, icon: ShoppingBag },
          { id: 'fuel', label: `Fuel Orders (${fuelOrders.length})`, icon: Fuel },
          { id: 'saved', label: `Saved Pros (${favoriteProviders.length})`, icon: Bookmark },
          { id: 'profile', label: 'Profile & Addresses', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setMainSection(tab.id as typeof mainSection)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                mainSection === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      {mainSection === 'explore' && (
        <div className="space-y-10">
          {/* A. Search Bar: "What do you need today?" */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  What do you need today?
                </h2>
                <p className="text-xs text-slate-500">
                  Search 16+ verified trades, emergency repairs, 15m groceries, fuel, hotels & hostels
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="h-5 w-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="What do you need today? (e.g. Electrician, Plumber, AC Repair, Milk, Hotels, Hostels)"
                value={dashboardSearch}
                onChange={(e) => setDashboardSearch(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white pl-12 pr-28 py-3.5 focus:bg-white focus:border-slate-900 focus:outline-hidden transition-all shadow-inner/5"
              />
              <button
                type="button"
                onClick={() => {
                  if (dashboardSearch.trim()) {
                    setSearchQuery(dashboardSearch);
                    setActivePage('services');
                  }
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Search
              </button>
            </div>
          </div>

          {/* B. All Service Categories Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  All Service Categories
                </h2>
                <p className="text-xs text-slate-500">
                  Select a service category to request verified doorstep assistance
                </p>
              </div>
              <button
                onClick={() => setActivePage('services')}
                className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Browse All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { id: 'electrician', name: 'Electrician', emoji: '🔧', desc: 'Wiring, MCB, fans' },
                { id: 'plumber', name: 'Plumber', emoji: '🚰', desc: 'Taps, leakage, pipes' },
                { id: 'builder_construction', name: 'Builder', emoji: '🧱', desc: 'Civil, masonry' },
                { id: 'painter', name: 'Painter', emoji: '🎨', desc: 'Walls & waterproof' },
                { id: 'carpenter', name: 'Carpenter', emoji: '🪚', desc: 'Doors & furniture' },
                { id: 'ac_refrigerator', name: 'AC Repair', emoji: '❄️', desc: 'Deep cleaning & gas' },
                { id: 'car_mechanic', name: 'Car Mechanic', emoji: '🚗', desc: 'Doorstep service' },
                { id: 'bike_mechanic', name: 'Bike Mechanic', emoji: '🏍️', desc: 'Puncture & tuneup' },
                { id: 'locksmith', name: 'Locksmith', emoji: '🔑', desc: 'Emergency lockout' },
                { id: 'home_cleaning', name: 'Cleaning', emoji: '🧹', desc: 'Deep disinfection' },
                { id: 'water_can_delivery', name: 'Water Delivery', emoji: '💧', desc: '20L Bisleri/RO' },
                { id: 'fuel_delivery', name: 'Fuel Delivery', emoji: '⛽', desc: 'Petrol & Diesel' },
                { id: 'grocery_delivery', name: 'Grocery', emoji: '🛒', desc: '15 Min express' },
                { id: 'hotels', name: 'Hotels', emoji: '🏨', desc: 'Boutique rooms' },
                { id: 'hostels', name: 'Hostels', emoji: '🏠', desc: 'Students & PGs' },
                { id: 'local_delivery', name: 'Delivery', emoji: '📦', desc: 'Parcels & drops' },
                { id: 'other_services', name: 'More Services', emoji: '➕', desc: 'Pest & security' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-900 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs font-display group-hover:text-amber-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{cat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* C. Section: "Emergency Services" Fast Banner */}
          <section className="p-4 sm:p-5 rounded-3xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md animate-pulse">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-950 font-display text-sm sm:text-base">
                    Emergency Services SOS Dispatch (24x7)
                  </h3>
                  <span className="text-[10px] font-bold bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">
                    &lt;15 Mins ETA
                  </span>
                </div>
                <p className="text-xs text-rose-800/80 mt-0.5">
                  Instant response for electrical sparking, pipe burst flooding, key lockout & vehicle breakdown
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('emergency')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-md cursor-pointer"
            >
              <span>Request Emergency Help</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </section>

          {/* D. Section: "Services Near You" */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Geo-Located Technicians</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  Services Near You
                </h2>
                <p className="text-xs text-slate-500">
                  Technicians active within 3.5 km of {currentAddress.area || currentAddress.city}
                </p>
              </div>

              <button
                onClick={() => setActivePage('services')}
                className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View all ({providers.length})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {servicesNearYou.map((prov) => (
                <ProviderCard
                  key={prov.id}
                  provider={prov}
                  onRequestService={handleRequestService}
                  onViewProfile={(p) => setSelectedProviderForDetails(p)}
                />
              ))}
            </div>
          </section>

          {/* E. Section: "Popular Services" */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Most Booked Packages</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  Popular Services
                </h2>
                <p className="text-xs text-slate-500">
                  Standard fixed-price diagnostic and repair services with 30-day warranty
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Switchboard & Tripping MCB Repair',
                  cat: 'Electrician',
                  catId: 'electrician',
                  price: '₹199',
                  time: '30 Mins',
                  rating: '4.9 (420+)',
                  image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
                },
                {
                  title: 'Leaking Tap & Drain Unclogging',
                  cat: 'Plumber',
                  catId: 'plumber',
                  price: '₹249',
                  time: '45 Mins',
                  rating: '4.8 (380+)',
                  image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80',
                },
                {
                  title: 'AC Deep Foam Jet Cleaning & Filter Wash',
                  cat: 'AC Repair',
                  catId: 'ac_refrigerator',
                  price: '₹449',
                  time: '60 Mins',
                  rating: '4.9 (510+)',
                  image: 'https://images.unsplash.com/photo-1631545709904-7474a9463b2f?auto=format&fit=crop&w=400&q=80',
                },
              ].map((srv, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-32 rounded-xl overflow-hidden bg-slate-100">
                      <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {srv.cat}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{srv.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <span className="flex items-center gap-0.5 text-amber-600">
                          <Star className="h-3 w-3 fill-amber-500" />
                          <span>{srv.rating}</span>
                        </span>
                        <span>·</span>
                        <span>Avg {srv.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400">Starting from</span>
                      <div className="text-base font-black text-slate-900">{srv.price}</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategoryId(srv.catId);
                        setActivePage('services');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* F. Section: "Top Rated Workers" */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5 flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <span>4.8+ Star Professionals</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  Top Rated Workers
                </h2>
                <p className="text-xs text-slate-500">
                  Government ID verified technicians with highest customer satisfaction ratings
                </p>
              </div>

              <button
                onClick={() => setActivePage('services')}
                className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View all top workers</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topRatedWorkers.map((prov) => (
                <ProviderCard
                  key={prov.id}
                  provider={prov}
                  onRequestService={handleRequestService}
                  onViewProfile={(p) => setSelectedProviderForDetails(p)}
                />
              ))}
            </div>
          </section>

          {/* G. Section: "Hotels Near You" */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5" />
                  <span>Verified Stays</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  Hotels Near You
                </h2>
                <p className="text-xs text-slate-500">
                  Instant room booking with AC, Wi-Fi, breakfast & transparent prices
                </p>
              </div>

              <button
                onClick={() => setActivePage('hotels')}
                className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Browse all hotels</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.slice(0, 3).map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                      <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-bold flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-sm">{hotel.name}</h3>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        <span>{hotel.location}, {hotel.city}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {hotel.amenities.slice(0, 2).map((am, i) => (
                          <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">From</span>
                      <span className="text-sm font-black text-slate-900">₹{hotel.startingPrice}</span>
                      <span className="text-[10px] text-slate-400">/night</span>
                    </div>
                    <button
                      onClick={() => setActivePage('hotels')}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* H. Section: "Hostels Near You" */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-0.5 flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5" />
                  <span>Student & Professional Living</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black font-display text-slate-950">
                  Hostels Near You
                </h2>
                <p className="text-xs text-slate-500">
                  Men's, Women's & Co-ed hostels with mess food, high-speed Wi-Fi & CCTV
                </p>
              </div>

              <button
                onClick={() => setActivePage('hostels')}
                className="text-xs font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Browse all hostels</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hostels.slice(0, 3).map((hostel) => (
                <div
                  key={hostel.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                      <img src={hostel.images[0]} alt={hostel.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                        {hostel.category.replace('_', ' ')}
                      </div>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-sm">{hostel.name}</h3>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        <span>{hostel.location}, {hostel.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-emerald-700 pt-1">
                        {hostel.foodAvailable && <span>✓ Food Included</span>}
                        {hostel.wifi && <span>✓ Wi-Fi</span>}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Rent from</span>
                      <span className="text-sm font-black text-slate-900">₹{hostel.startingRent}</span>
                      <span className="text-[10px] text-slate-400">/mo</span>
                    </div>
                    <button
                      onClick={() => setActivePage('hostels')}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reserve Bed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* I. Section: "Daily Essentials" (15m Groceries & Water) */}
          <section className="rounded-3xl bg-emerald-950 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-md">
                15-Minute Express Essentials
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                Daily Essentials & Mineral Water
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Farm fresh milk, vegetables, 20L chilled water cans, eggs & cleaning supplies delivered in 15 minutes.
              </p>
            </div>

            <button
              onClick={() => setActivePage('grocery')}
              className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Shop Essentials Now</span>
            </button>
          </section>
        </div>
      )}

      {/* 4. TAB: SERVICE BOOKINGS */}
      {mainSection === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display">
              My Service Bookings ({bookings.length})
            </h2>
            <button
              onClick={() => {
                setMainSection('explore');
              }}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              + New Service Request
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No service bookings yet. Request an electrician, plumber or technician anytime!
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900 font-display">{b.serviceTitle}</span>
                    <span className="text-[10px] font-mono text-slate-400">#{b.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                      b.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-slate-600 mt-1">{b.description}</p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 flex-wrap">
                    <span>Provider: <strong className="text-slate-700">{b.providerName}</strong></span>
                    <span>·</span>
                    <span>Preferred: {b.preferredDate} ({b.preferredTime})</span>
                    <span>·</span>
                    <span className="font-bold text-slate-900">₹{b.amount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveBookingId(b.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Track Task
                  </button>
                  <button
                    onClick={() => setInvoiceBooking(b)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="View Invoice"
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setCallPartnerName(b.providerName);
                      setIsCallModalOpen(true);
                    }}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="Call Provider"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. TAB: GROCERY ORDERS */}
      {mainSection === 'grocery' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Grocery & Essentials Orders ({groceryOrders.length})
            </h2>
            <button
              onClick={() => setActivePage('grocery')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              + Order Groceries
            </button>
          </div>

          {groceryOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No grocery orders yet. Order milk, vegetables & 20L water cans in 15 mins!
            </div>
          ) : (
            groceryOrders.map((o) => (
              <div
                key={o.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 font-display">Order #{o.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded capitalize bg-emerald-100 text-emerald-800">
                      {o.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">{o.items.length} items · Total ₹{o.totalAmount}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePage('orders')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Track Delivery
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 6. TAB: FUEL ORDERS */}
      {mainSection === 'fuel' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Doorstep Fuel Orders ({fuelOrders.length})
            </h2>
            <button
              onClick={() => setActivePage('fuel')}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              + Order Fuel
            </button>
          </div>

          {fuelOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No fuel orders yet. Order petrol or diesel directly to your vehicle or generator!
            </div>
          ) : (
            fuelOrders.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 font-display">
                      {f.quantityLiters}L {f.fuelType.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">#{f.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded capitalize bg-amber-100 text-amber-800">
                      {f.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">
                    Vehicle: {f.vehicleNumber || 'DG Generator'} · Amount ₹{f.totalAmount}
                  </p>
                </div>

                <button
                  onClick={() => setActivePage('fuel')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* 7. TAB: SAVED PROS */}
      {mainSection === 'saved' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 font-display">
            Saved Professionals ({favoriteProviders.length})
          </h2>

          {favoriteProviders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
              No saved professionals yet. Bookmark verified electricians, plumbers or painters to quickly re-book them.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favoriteProviders.map((prov) => (
                <ProviderCard
                  key={prov.id}
                  provider={prov}
                  onRequestService={handleRequestService}
                  onViewProfile={(p) => setSelectedProviderForDetails(p)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 8. TAB: PROFILE & ADDRESSES */}
      {mainSection === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">Personal Details & Addresses</h2>
            <p className="text-slate-500 text-xs">Manage your profile and delivery coordinates</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-slate-900 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            {isSavedNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
                Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Saved Addresses</h3>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-amber-600 font-bold hover:underline"
              >
                + Add / Manage Addresses
              </button>
            </div>

            <div className="space-y-2">
              {user.addresses.map((addr) => (
                <div key={addr.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{addr.label}: </span>
                    <span className="text-slate-600">{addr.street}, {addr.area}, {addr.city} - {addr.pincode}</span>
                  </div>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals for Provider Details, Booking Wizard, and Live Tracker */}
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

      <BookingTrackerModal
        bookingId={activeBookingId}
        onClose={() => setActiveBookingId(null)}
      />
    </div>
  );
};
