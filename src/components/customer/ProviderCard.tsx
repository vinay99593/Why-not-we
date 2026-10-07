import React from 'react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';
import {
  Star,
  ShieldCheck,
  MapPin,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onRequestService: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onRequestService,
  onViewProfile,
}) => {
  const {
    savedProviders,
    toggleSaveProvider,
    setIsChatDrawerOpen,
    setActiveChatPartner,
  } = useApp();

  const isSaved = savedProviders.includes(provider.id);

  const handleStartChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChatPartner(provider);
    setIsChatDrawerOpen(true);
  };

  return (
    <div
      onClick={() => onViewProfile(provider)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-blue-600 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.025] active:scale-[0.98] cursor-pointer flex flex-col justify-between will-change-transform"
    >
      <div>
        {/* Large Profile Photo at Top */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />

          {/* Bookmark & Online status */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveProvider(provider.id);
              }}
              className="h-8 w-8 rounded-full bg-slate-950/70 backdrop-blur-md text-white hover:text-amber-400 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4 text-amber-400 fill-amber-400" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-xs group-hover:bg-slate-950 transition-colors">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{provider.rating}</span>
            <span className="text-slate-400 font-normal">({provider.reviewCount})</span>
          </div>

          {/* Distance Badge */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1 shadow-xs">
            <MapPin className="h-3 w-3 text-teal-400" />
            <span>{provider.distanceKm} km</span>
          </div>
        </div>

        {/* Minimal Information */}
        <div className="p-4 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-black text-base text-slate-900 font-display group-hover:text-blue-600 transition-colors duration-200 truncate">
              {provider.name}
            </h3>

            {/* Verified Badge */}
            {provider.isVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 border border-emerald-200 group-hover:bg-emerald-100 transition-colors">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified</span>
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{provider.categoryName}</span>
            <span className="font-bold text-slate-900">₹{provider.visitFee} / visit</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 flex items-center gap-2">
        <button
          onClick={handleStartChat}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          title="Chat"
        >
          <MessageSquare className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRequestService(provider);
          }}
          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer text-center shadow-xs shadow-blue-500/20"
        >
          Request Service
        </button>
      </div>
    </div>
  );
};
