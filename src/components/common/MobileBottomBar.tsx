import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Wrench, ShoppingBag, AlertTriangle, Clock, User, Store } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { activePage, setActivePage, userRole, cartItemCount } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActivePage('home')}
        className={`flex flex-col items-center justify-center p-1 min-w-[54px] ${
          activePage === 'home' ? 'text-slate-950 font-bold' : 'text-slate-500'
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-[10px] mt-0.5">Home</span>
      </button>

      <button
        onClick={() => setActivePage('services')}
        className={`flex flex-col items-center justify-center p-1 min-w-[54px] ${
          activePage === 'services' ? 'text-slate-950 font-bold' : 'text-slate-500'
        }`}
      >
        <Wrench className="h-5 w-5" />
        <span className="text-[10px] mt-0.5">Services</span>
      </button>

      <button
        onClick={() => setActivePage('grocery')}
        className={`relative flex flex-col items-center justify-center p-1 min-w-[54px] ${
          activePage === 'grocery' ? 'text-slate-950 font-bold' : 'text-slate-500'
        }`}
      >
        <div className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] h-3.5 w-3.5 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Grocery</span>
      </button>

      <button
        onClick={() => setActivePage('emergency')}
        className={`flex flex-col items-center justify-center p-1 min-w-[54px] ${
          activePage === 'emergency' ? 'text-rose-600 font-bold' : 'text-rose-500'
        }`}
      >
        <div className="p-0.5 rounded-full bg-rose-50">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
        </div>
        <span className="text-[10px] mt-0.5 font-bold">SOS</span>
      </button>

      <button
        onClick={() => setActivePage('orders')}
        className={`flex flex-col items-center justify-center p-1 min-w-[54px] ${
          activePage === 'orders' ? 'text-slate-950 font-bold' : 'text-slate-500'
        }`}
      >
        <Clock className="h-5 w-5" />
        <span className="text-[10px] mt-0.5">Orders</span>
      </button>

      <button
        onClick={() => {
          if (userRole === 'provider') setActivePage('provider_dashboard');
          else if (userRole === 'admin') setActivePage('admin_dashboard');
          else setActivePage('customer_dashboard');
        }}
        className={`flex flex-col items-center justify-center p-1 min-w-[54px] ${
          activePage === 'customer_dashboard' || activePage === 'provider_dashboard' || activePage === 'admin_dashboard'
            ? 'text-slate-950 font-bold'
            : 'text-slate-500'
        }`}
      >
        {userRole === 'provider' ? <Store className="h-5 w-5" /> : <User className="h-5 w-5" />}
        <span className="text-[10px] mt-0.5">
          {userRole === 'provider' ? 'Portal' : userRole === 'admin' ? 'Admin' : 'Profile'}
        </span>
      </button>
    </nav>
  );
};
