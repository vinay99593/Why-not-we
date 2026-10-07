import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Check, X, Building, Home, Briefcase } from 'lucide-react';
import { Address } from '../../types';

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    currentAddress,
    setCurrentAddress,
    user,
    updateUserProfile,
  } = useApp();

  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [customArea, setCustomArea] = useState('');
  const [customStreet, setCustomStreet] = useState('');

  if (!isLocationModalOpen) return null;

  const popularAreas = [
    { city: 'Bengaluru', area: 'Indiranagar 2nd Stage', pincode: '560038' },
    { city: 'Bengaluru', area: 'Koramangala 4th Block', pincode: '560034' },
    { city: 'Bengaluru', area: 'HSR Layout Sector 1', pincode: '560102' },
    { city: 'Bengaluru', area: 'Whitefield Main Road', pincode: '560066' },
    { city: 'Mumbai', area: 'Bandra West, Hill Road', pincode: '400050' },
    { city: 'Delhi NCR', area: 'Connaught Place / Barakhamba', pincode: '110001' },
  ];

  const handleSelectPopular = (item: { city: string; area: string; pincode: string }) => {
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: 'Other',
      street: `${item.area}`,
      area: item.area,
      city: item.city,
      pincode: item.pincode,
      landmark: 'Near Central Plaza',
    };
    setCurrentAddress(newAddr);
    setIsLocationModalOpen(false);
  };

  const handleSimulateGps = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      setIsDetectingGps(false);
      const detected: Address = {
        id: `addr-gps-${Date.now()}`,
        label: 'Home',
        street: '#104, Sunrise Heights, 100ft Road',
        area: 'Indiranagar',
        city: 'Bengaluru',
        pincode: '560038',
        landmark: 'Accurate to 8 meters (GPS Detected)',
      };
      setCurrentAddress(detected);
      setIsLocationModalOpen(false);
    }, 1200);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customArea.trim()) return;
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: 'Other',
      street: customStreet || customArea,
      area: customArea,
      city: 'Bengaluru',
      pincode: '560038',
      landmark: 'Added via custom address entry',
    };
    setCurrentAddress(newAddr);
    updateUserProfile({
      addresses: [...user.addresses, newAddr],
    });
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Select Delivery & Service Location</h3>
            <p className="text-xs text-slate-500 mt-0.5">Find verified providers and express deliveries near you</p>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current GPS button */}
        <div className="mt-4">
          <button
            onClick={handleSimulateGps}
            disabled={isDetectingGps}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 text-sm font-semibold transition-all shadow-xs"
          >
            <Navigation className={`h-4 w-4 text-amber-400 ${isDetectingGps ? 'animate-spin' : ''}`} />
            {isDetectingGps ? 'Locating via Device GPS...' : 'Use Current GPS Location'}
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Your Saved Addresses</h4>
          <div className="space-y-2">
            {user.addresses.map((addr) => {
              const isSelected = currentAddress.id === addr.id;
              return (
                <button
                  key={addr.id}
                  onClick={() => {
                    setCurrentAddress(addr);
                    setIsLocationModalOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/40 text-slate-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600 mt-0.5">
                      {addr.label === 'Home' ? (
                        <Home className="h-4 w-4 text-slate-800" />
                      ) : addr.label === 'Work' ? (
                        <Briefcase className="h-4 w-4 text-slate-800" />
                      ) : (
                        <Building className="h-4 w-4 text-slate-800" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-slate-900">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="text-[11px] font-medium text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">Default</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{addr.street}</p>
                      <p className="text-xs text-slate-400">{addr.area}, {addr.city} - {addr.pincode}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="h-5 w-5 text-amber-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Service Hubs */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Popular Service Hubs</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularAreas.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPopular(item)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-left transition-colors text-xs"
              >
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <div className="truncate">
                  <div className="font-medium text-slate-800 truncate">{item.area}</div>
                  <div className="text-slate-400 text-[11px]">{item.city} ({item.pincode})</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enter Custom Address */}
        <form onSubmit={handleSaveCustom} className="mt-6 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Or Enter New Area</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="e.g. Flat/House number, Building name"
              value={customStreet}
              onChange={(e) => setCustomStreet(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2.5 focus:border-slate-900 focus:outline-hidden"
            />
            <input
              type="text"
              placeholder="Area / Neighborhood / Landmark *"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2.5 focus:border-slate-900 focus:outline-hidden"
              required
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 text-xs font-semibold transition-colors"
            >
              Set as Delivery Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
