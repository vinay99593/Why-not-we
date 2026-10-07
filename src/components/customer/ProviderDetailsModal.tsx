import React from 'react';
import { useApp } from '../../context/AppContext';
import { Provider } from '../../types';
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  MessageSquare,
  Phone,
  Bookmark,
  BookmarkCheck,
  Award,
  Sparkles,
} from 'lucide-react';

interface ProviderDetailsModalProps {
  provider: Provider | null;
  onClose: () => void;
  onRequestService: (provider: Provider) => void;
}

export const ProviderDetailsModal: React.FC<ProviderDetailsModalProps> = ({
  provider,
  onClose,
  onRequestService,
}) => {
  const {
    savedProviders,
    toggleSaveProvider,
    setIsChatDrawerOpen,
    setActiveChatPartner,
    setIsCallModalOpen,
    setCallPartnerName,
  } = useApp();

  if (!provider) return null;

  const isSaved = savedProviders.includes(provider.id);

  const handleStartChat = () => {
    setActiveChatPartner(provider);
    setIsChatDrawerOpen(true);
  };

  const handleCall = () => {
    setCallPartnerName(provider.name);
    setIsCallModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header with background banner */}
        <div className="relative bg-slate-900 text-white p-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Verified Professional Profile
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="h-20 w-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
              />
              {provider.isAvailable && (
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold font-display">{provider.name}</h3>
                {provider.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Pro</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 mt-1">{provider.categoryName}</p>

              <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 flex-wrap">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span>{provider.rating}</span>
                  <span className="text-slate-400 font-normal">({provider.reviewCount} reviews)</span>
                </div>
                <span>·</span>
                <div>{provider.experienceYears} Years Experience</div>
                <span>·</span>
                <div>{provider.completedJobs}+ Completed Jobs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Inspection & Visit</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">₹{provider.visitFee}</div>
              <div className="text-[10px] text-slate-500">Includes 30m diagnostic</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] uppercase font-bold text-slate-400">Hourly Labor Rate</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">₹{provider.hourlyRate}/hr</div>
              <div className="text-[10px] text-slate-500">Transparent billing</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Distance & Radius</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{provider.distanceKm} km away</div>
              <div className="text-[10px] text-slate-500 truncate">{provider.location}</div>
            </div>
          </div>

          {/* About & Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About Professional</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{provider.bio}</p>
          </div>

          {/* Core Skills & Expertise */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Specialized Skills & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {provider.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 flex items-center gap-1.5"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-amber-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Verification Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Trust & Credentials</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">Govt ID & Background Checked</div>
                  <div className="text-[10px] text-slate-400">{provider.idProofType || 'Aadhaar / National ID Verified'}</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">WHY NOT WE 30-Day Guarantee</div>
                  <div className="text-[10px] text-slate-400">Free rework if any issue persists</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Customer Reviews</h4>
              <span className="text-xs font-bold text-slate-900">{provider.reviewCount} Total Reviews</span>
            </div>

            {provider.reviews.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 text-center text-xs text-slate-400">
                New provider on WHY NOT WE! Be the first to book and leave a review.
              </div>
            ) : (
              <div className="space-y-3">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.authorAvatar}
                          alt={rev.authorName}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-900">{rev.authorName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-500" />
                        ))}
                        <span className="text-slate-400 text-[10px] ml-1">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                    <div className="text-[10px] text-slate-400 mt-1 font-medium italic">Service: {rev.serviceName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStartChat}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={handleCall}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-400 text-slate-700 hover:bg-white transition-colors"
              title="Voice Call"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              onClick={() => toggleSaveProvider(provider.id)}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-amber-500 transition-colors"
              title={isSaved ? 'Saved' : 'Save'}
            >
              {isSaved ? <BookmarkCheck className="h-4 w-4 text-amber-500 fill-amber-500" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onRequestService(provider);
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg"
          >
            Request Service Now
          </button>
        </div>
      </div>
    </div>
  );
};
