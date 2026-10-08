import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  Mic,
  Clock,
  X,
  History,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    setSearchQuery,
    setActivePage,
    setSelectedCategoryId,
    setIsLocationModalOpen,
    currentAddress,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    setIsVoiceSearchOpen,
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowRecentDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const q = inputVal.trim();
    addRecentSearch(q);
    setSearchQuery(q);
    setShowRecentDropdown(false);
    setActivePage('services');
  };

  const handleSelectRecent = (q: string) => {
    setInputVal(q);
    addRecentSearch(q);
    setSearchQuery(q);
    setShowRecentDropdown(false);
    setActivePage('services');
  };

  const handleSelectCategory = (catId: string) => {
    if (catId === 'grocery') {
      setActivePage('grocery');
    } else if (catId === 'fuel') {
      setActivePage('fuel');
    } else if (catId === 'hotels') {
      setActivePage('hotels');
    } else if (catId === 'hostels') {
      setActivePage('hostels');
    } else {
      setSelectedCategoryId(catId);
      setActivePage('services');
    }
  };

  // 13 Primary Visual Category Cards with Subtle Accents matching Brand System:
  // Electrician: Blue, Plumber: Teal, Builder: Amber, Painter: Purple, Carpenter: Amber/Brown,
  // AC: Cyan/Blue, Car: Red/Orange, Cleaning: Green, Water: Blue, Fuel: Orange, Grocery: Green, Hotels: Indigo/Blue, Hostels: Purple
  const visualCategories = [
    {
      id: 'electrician',
      name: 'Electrician',
      icon: '🔧',
      price: 'From ₹199',
      accent: 'border-blue-500/20 text-blue-600 bg-blue-50/70',
      badge: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'plumber',
      name: 'Plumber',
      icon: '🚰',
      price: 'From ₹249',
      accent: 'border-teal-500/20 text-teal-600 bg-teal-50/70',
      badge: 'bg-teal-600 text-white',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'builder_construction',
      name: 'Builder',
      icon: '🧱',
      price: 'From ₹799',
      accent: 'border-amber-500/20 text-amber-600 bg-amber-50/70',
      badge: 'bg-amber-600 text-white',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'painter',
      name: 'Painter',
      icon: '🎨',
      price: 'From ₹499',
      accent: 'border-purple-500/20 text-purple-600 bg-purple-50/70',
      badge: 'bg-purple-600 text-white',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'carpenter',
      name: 'Carpenter',
      icon: '🪚',
      price: 'From ₹299',
      accent: 'border-amber-700/20 text-amber-700 bg-amber-50/70',
      badge: 'bg-amber-700 text-white',
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'ac_refrigerator',
      name: 'AC Repair',
      icon: '❄️',
      price: 'From ₹399',
      accent: 'border-cyan-500/20 text-cyan-600 bg-cyan-50/70',
      badge: 'bg-cyan-600 text-white',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'car_mechanic',
      name: 'Car Repair',
      icon: '🚗',
      price: 'From ₹499',
      accent: 'border-rose-500/20 text-rose-600 bg-rose-50/70',
      badge: 'bg-rose-600 text-white',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'home_cleaning',
      name: 'Cleaning',
      icon: '🧹',
      price: 'From ₹399',
      accent: 'border-emerald-500/20 text-emerald-600 bg-emerald-50/70',
      badge: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'water_can_delivery',
      name: 'Water',
      icon: '💧',
      price: 'From ₹65',
      accent: 'border-blue-500/20 text-blue-600 bg-blue-50/70',
      badge: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'fuel',
      name: 'Fuel',
      icon: '⛽',
      price: 'From ₹150',
      accent: 'border-orange-500/20 text-orange-600 bg-orange-50/70',
      badge: 'bg-orange-600 text-white',
      image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'grocery',
      name: 'Grocery',
      icon: '🛒',
      price: '15 Mins',
      accent: 'border-emerald-500/20 text-emerald-600 bg-emerald-50/70',
      badge: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'hotels',
      name: 'Hotels',
      icon: '🏨',
      price: 'From ₹1,299',
      accent: 'border-indigo-500/20 text-indigo-600 bg-indigo-50/70',
      badge: 'bg-indigo-600 text-white',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'hostels',
      name: 'Hostels',
      icon: '🏠',
      price: 'From ₹5,500',
      accent: 'border-purple-500/20 text-purple-600 bg-purple-50/70',
      badge: 'bg-purple-600 text-white',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-8 pb-12 px-4 selection:bg-blue-600 selection:text-white">
      {/* Subtle modern brand gradient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-gradient-to-r from-blue-500/8 via-teal-500/8 to-amber-500/8 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="tracking-wide">One Platform. Every Need.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display text-slate-900 leading-tight">
            Everything You Need.<br className="hidden sm:inline" /> One Place.
          </h1>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setActivePage('services')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              Find a Service
            </button>
            <button
              type="button"
              onClick={() => {
                const catEl = document.getElementById('category-grid-anchor');
                if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                else setActivePage('services');
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Large, Visually Prominent Search Bar with Voice and Recent Searches */}
        <div className="max-w-3xl mx-auto px-2 relative" ref={containerRef}>
          <div className="p-2 sm:p-2.5 rounded-3xl sm:rounded-4xl bg-white shadow-xl shadow-slate-200/70 border-2 border-blue-600/30 hover:border-blue-600 transition-all duration-300">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              {/* Location Picker Pill */}
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer border border-slate-200/70 shadow-2xs group"
                title="Change delivery or service address"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[140px]">{currentAddress.area || currentAddress.city || 'Select Location'}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">Change</span>
              </button>

              {/* Large Prominent Input Field */}
              <div className="relative flex-1 w-full flex items-center">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <input
                  type="text"
                  placeholder="What do you need?"
                  value={inputVal}
                  onFocus={() => setShowRecentDropdown(true)}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setShowRecentDropdown(true);
                  }}
                  className="w-full text-slate-900 font-bold text-base sm:text-lg pl-12 pr-20 py-3 sm:py-3.5 rounded-2xl focus:outline-hidden placeholder:text-slate-400 placeholder:font-normal bg-transparent"
                  autoComplete="off"
                />

                {/* Clear & Voice Search Buttons inside input */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {inputVal && (
                    <button
                      type="button"
                      onClick={() => setInputVal('')}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Clear text"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsVoiceSearchOpen(true)}
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all cursor-pointer shadow-2xs group"
                    title="Search by voice"
                    aria-label="Voice search"
                  >
                    <Mic className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* High-Impact Primary Blue Action Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 cursor-pointer shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Recent Searches Dropdown Menu */}
          {showRecentDropdown && recentSearches.length > 0 && (
            <div className="absolute left-2 right-2 top-full mt-2 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 z-30 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                <span className="font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <History className="h-3.5 w-3.5 text-blue-600" />
                  <span>Recent Searches</span>
                </span>
                <button
                  type="button"
                  onClick={clearRecentSearches}
                  className="text-[11px] font-semibold text-rose-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                {recentSearches.map((q) => (
                  <div
                    key={q}
                    className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-800 text-xs font-semibold group cursor-pointer border border-transparent hover:border-slate-200/60"
                    onClick={() => handleSelectRecent(q)}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" />
                      <span className="truncate">{q}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(q);
                      }}
                      className="p-1 rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50"
                      title="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches Chips Below Input */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3.5 text-xs">
            <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-600" />
              <span>Recent & Popular:</span>
            </span>
            {recentSearches.slice(0, 5).map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => handleSelectRecent(query)}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-[11px] transition-all cursor-pointer shadow-2xs hover:scale-102 flex items-center gap-1"
              >
                <span>{query}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Large Visual Service Cards Grid (13 Visual Category Cards with Subtle Accents) */}
        <div id="category-grid-anchor">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {visualCategories.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectCategory(item.id)}
                className="group relative h-40 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.03] active:scale-[0.98] border border-slate-200/90 hover:border-blue-600 will-change-transform bg-white"
              >
                {/* Background image with smooth scale effect */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                />

                {/* Subtle dark gradient overlay for optimal typography contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:from-slate-950/80 transition-all duration-300" />

                {/* Card Top Price Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[10px] font-bold ${item.badge} px-2.5 py-0.5 rounded-lg shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                    {item.price}
                  </span>
                </div>

                {/* Card Bottom Content with subtle accent */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <div className="text-2xl filter drop-shadow group-hover:scale-120 transition-transform duration-300 origin-left ease-out">
                    {item.icon}
                  </div>
                  <h3 className="font-black text-sm sm:text-base font-display text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors duration-200">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

