import React from 'react';
import { TransportVehicleConfig, TransportVehicleType } from '../../types';
import { TRANSPORT_VEHICLES } from '../../data/transportData';
import { CheckCircle2, ShieldCheck, Weight, Box, ArrowRight } from 'lucide-react';

interface VehicleSelectionCardsProps {
  selectedVehicleId: TransportVehicleType;
  onSelectVehicle: (id: TransportVehicleType) => void;
  showContinueButton?: boolean;
  onContinue?: () => void;
}

export const VehicleSelectionCards: React.FC<VehicleSelectionCardsProps> = ({
  selectedVehicleId,
  onSelectVehicle,
  showContinueButton = false,
  onContinue,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {TRANSPORT_VEHICLES.map((v) => {
          const isSelected = selectedVehicleId === v.id;
          return (
            <div
              key={v.id}
              onClick={() => onSelectVehicle(v.id)}
              className={`group relative rounded-3xl bg-white border-2 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 shadow-xl shadow-blue-600/15 ring-2 ring-blue-600/20 translate-y-[-3px]'
                  : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md hover:translate-y-[-2px]'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-20 bg-blue-600 text-white p-1 rounded-full shadow-md animate-in zoom-in-75">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              )}

              {/* Tag / Category Badge */}
              <div className="absolute top-3 left-3 z-20">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-xs ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900/75 text-white'
                  }`}
                >
                  {v.categoryLabel}
                </span>
              </div>

              {/* Vehicle Realistic Image with Smooth Zoom */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-end justify-between">
                  <div>
                    <span className="text-xl mr-1.5">{v.emoji}</span>
                    <span className="font-black text-sm font-display tracking-tight text-white drop-shadow-sm">
                      {v.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                    From ₹{v.minFare}
                  </span>
                </div>
              </div>

              {/* Vehicle Specs & Capacity Details */}
              <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-600 text-xs line-clamp-1 font-medium">
                    {v.tagline}
                  </p>

                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <Weight className="h-3 w-3 text-blue-600 shrink-0" />
                      <span className="font-semibold truncate">{v.capacityWeight}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <Box className="h-3 w-3 text-teal-600 shrink-0" />
                      <span className="font-semibold truncate">{v.capacityVolume}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">
                    ₹{v.baseFare} base + ₹{v.perKmRate}/km
                  </span>
                  <span
                    className={`font-bold transition-colors ${
                      isSelected ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'
                    }`}
                  >
                    {isSelected ? 'Selected ✓' : 'Select'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showContinueButton && onContinue && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onContinue}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
          >
            <span>Continue with Selected Vehicle</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
