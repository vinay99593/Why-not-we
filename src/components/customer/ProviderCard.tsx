import React from 'react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
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
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-800 hover:shadow-xl transition-all p-4 sm:p-5 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Header: Avatar, Name, Verification, Save */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="h-14 w-14 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
              />
              {provider.isAvailable && (
                <span
                  className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white"
                  title="Available now"
                />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                  {provider.name}
                </h3>
                {provider.isVerified && (
                  <span
                    className="inline-flex items-center gap-0.5 text-blue-600 text-[11px] font-bold"
                    title="Verified Provider (Govt ID & Trade License Approved)"
                  >
                    <ShieldCheck className="h-4 w-4 fill-blue-600 text-white" />
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-500 font-medium mt-0.5">
                {provider.categoryName}
              </div>

              {/* Clean unboxed metadata discipline */}
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-1.5 flex-wrap">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>{provider.rating}</span>
                  <span className="text-slate-400 font-normal">({provider.reviewCount})</span>
                </div>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{provider.experienceYears} yrs exp</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{provider.completedJobs}+ jobs</span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProvider(provider.id);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-50 transition-colors"
            title={isSaved ? 'Remove from saved' : 'Save provider'}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-amber-500 fill-amber-500" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Location & Service Area */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{provider.location}</span>
          <span className="text-slate-400">({provider.distanceKm} km away)</span>
        </div>

        {/* Bio summary */}
        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {provider.bio}
        </p>

        {/* Skills preview list */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
            >
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
              +{provider.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Pricing & Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">Visit & Diagnostic</div>
          <div className="font-bold text-sm text-slate-900 font-mono">
            ₹{provider.visitFee}{' '}
            <span className="text-[10px] text-slate-400 font-normal">/ visit</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStartChat}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 hover:bg-slate-50 transition-colors"
            title="Chat with provider"
          >
            <MessageSquare className="h-4 w-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequestService(provider);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md"
          >
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
};
