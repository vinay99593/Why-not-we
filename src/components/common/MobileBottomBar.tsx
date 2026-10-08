import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Calendar, Bell, User, Store, Shield } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    userRole,
    unreadNotifCount,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
  } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 flex items-center justify-around shadow-lg">
      {/* 1. Home */}
      <button
        onClick={() => setActivePage('home')}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          activePage === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      {/* 2. Search / Services */}
      <button
        onClick={() => setActivePage('services')}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          activePage === 'services' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Search className="h-5 w-5" />
        <span className="text-[10px] mt-0.5">Search</span>
      </button>

      {/* 3. Bookings / Orders */}
      <button
        onClick={() => setActivePage('orders')}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          activePage === 'orders' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Calendar className="h-5 w-5" />
        <span className="text-[10px] mt-0.5">Bookings</span>
      </button>

      {/* 4. Notifications */}
      <button
        onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
        className={`relative flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          isNotificationModalOpen ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <Bell className="h-5 w-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white font-black text-[9px] h-4 min-w-4 px-1 rounded-full flex items-center justify-center shadow-xs animate-pulse">
              {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Alerts</span>
      </button>

      {/* 5. Profile */}
      <button
        onClick={() => {
          if (userRole === 'provider') setActivePage('provider_dashboard');
          else if (userRole === 'admin') setActivePage('admin_dashboard');
          else setActivePage('customer_dashboard');
        }}
        className={`flex flex-col items-center justify-center p-1 min-w-[56px] transition-colors ${
          activePage === 'customer_dashboard' ||
          activePage === 'provider_dashboard' ||
          activePage === 'admin_dashboard'
            ? 'text-blue-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        {userRole === 'provider' ? (
          <Store className="h-5 w-5" />
        ) : userRole === 'admin' ? (
          <Shield className="h-5 w-5" />
        ) : (
          <User className="h-5 w-5" />
        )}
        <span className="text-[10px] mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
