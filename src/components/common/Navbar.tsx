import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Search,
  ShoppingCart,
  Bell,
  User,
  ShieldCheck,
  AlertTriangle,
  Menu,
  X,
  ChevronDown,
  Wrench,
  Fuel,
  Sparkles,
  PhoneCall,
  LayoutDashboard,
  Store,
  Check,
  Building,
  Home,
  LogOut,
  Truck,
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    currentAddress,
    setIsLocationModalOpen,
    cartItemCount,
    cartTotal,
    setIsCartDrawerOpen,
    unreadNotifCount,
    userRole,
    setUserRole,
    user,
    searchQuery,
    setSearchQuery,
    setIsSupportModalOpen,
    setIsProviderRegisterModalOpen,
    setAuthScreen,
    logout,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActivePage('services');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Urgent Emergency & Hotline Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-semibold text-white">24/7 Emergency Dispatch Live:</span>
            <span className="hidden sm:inline text-slate-300">
              Electrician, Plumber & Locksmith arriving in ~15 mins
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setAuthScreen('welcome')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span className="hidden sm:inline">Role Hub:</span>
              <span>Customer · Worker · Admin</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={() => setActivePage('emergency')}
              className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 transition-colors"
            >
              <AlertTriangle className="h-3 w-3 text-rose-400" />
              <span>SOS Emergency</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={() => setIsProviderRegisterModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>Become a Partner</span>
            </button>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Help & Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => {
              setActivePage('home');
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-left group"
          >
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <span className="font-black font-display text-lg tracking-tighter">W</span>
            </div>
            <div>
              <div className="font-black text-slate-900 tracking-tight text-lg sm:text-xl font-display leading-none group-hover:text-blue-600 transition-colors">
                WHY NOT WE
              </div>
              <div className="text-[10px] text-slate-500 font-medium tracking-wide">
                One Platform. Every Need.
              </div>
            </div>
          </button>

          {/* Location Selector Button */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50/50 text-left transition-colors"
          >
            <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
            <div className="max-w-[150px] lg:max-w-[190px] truncate">
              <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">
                {currentAddress.label || 'Location'}
              </div>
              <div className="text-xs font-semibold text-slate-800 truncate leading-tight mt-0.5">
                {currentAddress.area || currentAddress.city}
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
          </button>
        </div>

        {/* Global Search Bar with Voice and Submit */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-md hidden sm:flex items-center relative"
        >
          <div className="relative w-full">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="What do you need today? (e.g. Electrician, Water, Hotels)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-white pl-10 pr-24 py-2.5 focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all shadow-inner/5"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => (window as any).__openVoiceSearch ? (window as any).__openVoiceSearch() : setActivePage('home')}
                className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                title="Voice search"
              >
                <Sparkles className="h-3.5 w-3.5" />
              </button>
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
              >
                Find
              </button>
            </div>
          </div>
        </form>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors"
              title="Switch user perspective"
            >
              <span className="text-[10px] uppercase text-slate-400 font-bold hidden sm:inline">Role:</span>
              <span className="capitalize text-slate-900 font-bold">{userRole}</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Switch App View
                </div>
                <button
                  onClick={() => {
                    setUserRole('customer');
                    setIsRoleDropdownOpen(false);
                    setActivePage('home');
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    userRole === 'customer' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-500" />
                    <span>Customer View</span>
                  </div>
                  {userRole === 'customer' && <Check className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => {
                    setUserRole('provider');
                    setIsRoleDropdownOpen(false);
                    setActivePage('provider_dashboard');
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    userRole === 'provider' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-slate-500" />
                    <span>Provider Dashboard</span>
                  </div>
                  {userRole === 'provider' && <Check className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => {
                    setUserRole('admin');
                    setIsRoleDropdownOpen(false);
                    setActivePage('admin_dashboard');
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    userRole === 'admin' ? 'font-bold text-amber-600 bg-amber-50/50' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-slate-500" />
                    <span>Admin Console</span>
                  </div>
                  {userRole === 'admin' && <Check className="h-4 w-4" />}
                </button>

                <div className="border-t border-slate-100 my-1"></div>

                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    setAuthScreen('welcome');
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-amber-50 text-amber-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Welcome / Role Screen</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-rose-50 text-rose-600 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4 text-rose-500" />
                    <span>Log Out</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors relative group"
              aria-label="Notifications"
              title={`${unreadNotifCount} notifications`}
            >
              <Bell className="h-4.5 w-4.5 transition-transform group-hover:rotate-12" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse">
                  {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
                </span>
              )}
            </button>
            <NotificationDropdown
              isOpen={isNotificationModalOpen}
              onClose={() => setIsNotificationModalOpen(false)}
            />
          </div>

          {/* Grocery Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20"
            aria-label="View Cart"
          >
            <div className="relative">
              <ShoppingCart className="h-4 w-4 text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="hidden lg:block text-left text-xs font-bold">
              {cartItemCount > 0 ? `₹${cartTotal}` : 'Cart'}
            </div>
          </button>

          {/* Customer Profile button */}
          <button
            onClick={() => {
              if (userRole === 'provider') setActivePage('provider_dashboard');
              else if (userRole === 'admin') setActivePage('admin_dashboard');
              else setActivePage('customer_dashboard');
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
            title="Profile"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover border border-slate-300"
            />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Secondary Navigation Bar */}
      <nav className="hidden md:block bg-white border-t border-slate-200 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-6 py-2.5">
            <button
              onClick={() => setActivePage('home')}
              className={`transition-colors py-1 ${
                activePage === 'home' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('services')}
              className={`transition-colors py-1 ${
                activePage === 'services' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Services & Trades
            </button>
            <button
              onClick={() => setActivePage('transport')}
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                activePage === 'transport' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="h-3.5 w-3.5 text-blue-600" />
              <span>Delivery & Transport</span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded">
                NEW
              </span>
            </button>
            <button
              onClick={() => setActivePage('grocery')}
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                activePage === 'grocery' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Grocery & Essentials</span>
              <span className="text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 px-1.5 py-0.5 rounded">
                15 MINS
              </span>
            </button>
            <button
              onClick={() => setActivePage('hotels')}
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                activePage === 'hotels' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="h-3.5 w-3.5 text-blue-600" />
              <span>Hotels</span>
            </button>
            <button
              onClick={() => setActivePage('hostels')}
              className={`transition-colors py-1 flex items-center gap-1.5 ${
                activePage === 'hostels' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="h-3.5 w-3.5 text-purple-600" />
              <span>Hostels / PGs</span>
            </button>
            <button
              onClick={() => setActivePage('fuel')}
              className={`transition-colors py-1 flex items-center gap-1 ${
                activePage === 'fuel' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Fuel className="h-3.5 w-3.5 text-amber-600" />
              <span>Fuel Delivery</span>
            </button>
            <button
              onClick={() => setActivePage('emergency')}
              className={`transition-colors py-1 flex items-center gap-1 ${
                activePage === 'emergency' ? 'text-rose-600 font-bold border-b-2 border-rose-600' : 'text-rose-600 hover:text-rose-800'
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Emergency 24x7</span>
            </button>
            <button
              onClick={() => setActivePage('orders')}
              className={`transition-colors py-1 ${
                activePage === 'orders' ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bookings & Orders
            </button>
          </div>

          <div className="flex items-center gap-3 py-1 text-slate-500 text-xs">
            {userRole === 'provider' ? (
              <button
                onClick={() => setActivePage('provider_dashboard')}
                className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
              >
                <Store className="h-3.5 w-3.5" />
                <span>Provider Portal</span>
              </button>
            ) : userRole === 'admin' ? (
              <button
                onClick={() => setActivePage('admin_dashboard')}
                className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Admin Console</span>
              </button>
            ) : (
              <button
                onClick={() => setIsProviderRegisterModalOpen(true)}
                className="font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-teal-500" />
                <span>Join as Service Partner</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, groceries, fuel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 focus:border-slate-900 focus:outline-hidden"
            />
          </form>

          {/* Location button */}
          <button
            onClick={() => {
              setIsLocationModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="truncate text-slate-800 font-medium">
                {currentAddress.street || currentAddress.area}
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-600 uppercase shrink-0">Change</span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
            <button
              onClick={() => {
                setActivePage('home');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                setActivePage('services');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              🔧 Services & Trades
            </button>
            <button
              onClick={() => {
                setActivePage('transport');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-left font-bold"
            >
              🚚 Delivery & Transport
            </button>
            <button
              onClick={() => {
                setActivePage('grocery');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              🛒 Grocery (15m)
            </button>
            <button
              onClick={() => {
                setActivePage('hotels');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              🏨 Hotels
            </button>
            <button
              onClick={() => {
                setActivePage('hostels');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              🏠 Hostels / PGs
            </button>
            <button
              onClick={() => {
                setActivePage('fuel');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              ⛽ Fuel Delivery
            </button>
            <button
              onClick={() => {
                setActivePage('emergency');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-left col-span-2 flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              <span>Emergency 24x7 SOS Dispatch</span>
            </button>
            <button
              onClick={() => {
                setActivePage('orders');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              📦 My Bookings & Orders
            </button>
            <button
              onClick={() => {
                setActivePage('customer_dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left"
            >
              👤 Profile & Dashboard
            </button>
            <button
              onClick={() => {
                setAuthScreen('welcome');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-left col-span-2 font-bold flex items-center justify-between"
            >
              <span>Switch Role / Welcome Portal</span>
              <Sparkles className="h-4 w-4 text-amber-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
