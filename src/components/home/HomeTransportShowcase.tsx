import React from 'react';
import { useApp } from '../../context/AppContext';
import { TransportVehicleType } from '../../types';
import { TRANSPORT_VEHICLES } from '../../data/transportData';
import { Truck, ArrowRight, ShieldCheck, Zap, Weight, Box } from 'lucide-react';

export const HomeTransportShowcase: React.FC = () => {
  const { setActivePage } = useApp();

  const handleSelectVehicleAndBook = (vehicleId: TransportVehicleType) => {
    setActivePage('transport');
  };

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-blue-200">
            <Truck className="h-3.5 w-3.5 text-blue-600" />
            <span>Delivery & Transport · WHY NOT WE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-950 tracking-tight">
            Move Anything. Anywhere Nearby.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Book verified courier bikes, cargo autos, Tata Ace mini trucks, and pickups in minutes.
          </p>
        </div>

        <button
          onClick={() => setActivePage('transport')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto cursor-pointer group"
        >
          <span>View All Vehicles & Calculate Fare</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Horizontal Scrollable / Grid of Visual Vehicle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {TRANSPORT_VEHICLES.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => handleSelectVehicleAndBook(vehicle.id)}
            className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-blue-600 shadow-sm hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Tag Badge */}
            <div className="absolute top-3 left-3 z-20">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md">
                {vehicle.categoryLabel}
              </span>
            </div>

            {/* Realistic Vehicle Image */}
            <div className="relative h-40 w-full overflow-hidden bg-slate-100">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-end justify-between">
                <div>
                  <span className="text-xl mr-1">{vehicle.emoji}</span>
                  <span className="font-black text-sm font-display tracking-tight text-white drop-shadow-sm">
                    {vehicle.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                  From ₹{vehicle.minFare}
                </span>
              </div>
            </div>

            {/* Specs & Booking CTA */}
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs line-clamp-1 font-medium">
                  {vehicle.tagline}
                </p>

                <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-slate-500">
                  <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <Weight className="h-3 w-3 text-blue-600 shrink-0" />
                    <span className="truncate font-semibold">{vehicle.capacityWeight}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <Box className="h-3 w-3 text-teal-600 shrink-0" />
                    <span className="truncate font-semibold">{vehicle.capacityVolume}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Book Now</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
