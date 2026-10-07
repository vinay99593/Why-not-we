import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Provider, ServiceCategory } from '../../types';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  AlertTriangle,
  ShieldCheck,
  Check,
  ChevronRight,
  UploadCloud,
  Star,
} from 'lucide-react';

interface ServiceBookingModalProps {
  provider: Provider | null;
  category?: ServiceCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (bookingId: string) => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  provider: initialProvider,
  category,
  isOpen,
  onClose,
  onBookingSuccess,
}) => {
  const {
    providers,
    currentAddress,
    setIsLocationModalOpen,
    createBooking,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(initialProvider);

  // Form states
  const [serviceTitle, setServiceTitle] = useState(
    initialProvider ? `${initialProvider.categoryName} Inspection & Repair` : 'Household Service Request'
  );
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'standard' | 'emergency'>('standard');
  const [dateSlot, setDateSlot] = useState('Today');
  const [timeSlot, setTimeSlot] = useState('Today, Within 45 Mins');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter nearby providers if no initial provider was chosen
  const matchingProviders = providers.filter((p) => {
    if (category) return p.categoryId === category.id;
    if (initialProvider) return p.categoryId === initialProvider.categoryId;
    return true;
  });

  if (!isOpen) return null;

  const currentChosenProvider = selectedProvider || matchingProviders[0] || providers[0];

  const handlePhotoUploadSim = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80',
    ];
    if (photos.length < samplePhotos.length) {
      setPhotos([...photos, samplePhotos[photos.length]]);
    }
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    const amount = currentChosenProvider.visitFee + (urgency === 'emergency' ? 100 : 0);

    setTimeout(() => {
      const newBk = createBooking(
        currentChosenProvider.id,
        serviceTitle,
        description || 'General repair and diagnostics required at residence.',
        dateSlot,
        timeSlot,
        urgency,
        photos,
        amount
      );
      setIsSubmitting(false);
      onBookingSuccess(newBk.id);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Step {step} of 3 · Booking Wizard
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display">
              {step === 1 && 'Describe Your Requirement'}
              {step === 2 && 'Select Provider & Time Slot'}
              {step === 3 && 'Review & Confirm Service Request'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator bar */}
        <div className="grid grid-cols-3 bg-slate-100 h-1">
          <div className={`h-full bg-amber-500 transition-all ${step >= 1 ? 'w-full' : 'w-0'}`} />
          <div className={`h-full bg-amber-500 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
          <div className={`h-full bg-amber-500 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
        </div>

        {/* Modal content body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-slate-800 text-xs">
          {/* STEP 1: Describe requirement */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Title / Issue Summary *
                </label>
                <input
                  type="text"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  placeholder="e.g. Kitchen tap leaking, AC foam servicing, Switchboard tripping"
                  className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe what you need in detail
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the symptom, appliances involved, or any specific tools/parts needed..."
                  className="w-full text-xs rounded-xl border border-slate-200 p-3 focus:border-slate-900 focus:outline-hidden"
                />
              </div>

              {/* Urgency selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Priority Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      urgency === 'standard'
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">Standard Appointment</div>
                    <div className={`text-[10px] mt-0.5 ${urgency === 'standard' ? 'text-slate-300' : 'text-slate-400'}`}>
                      Today or scheduled time slot
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('emergency')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      urgency === 'emergency'
                        ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                        : 'border-slate-200 hover:border-rose-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>SOS Emergency</span>
                    </div>
                    <div className={`text-[10px] mt-0.5 ${urgency === 'emergency' ? 'text-rose-100' : 'text-slate-400'}`}>
                      Priority arrival in &lt;15 mins
                    </div>
                  </button>
                </div>
              </div>

              {/* Photo Upload Simulation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Photos of the Issue (Optional)
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Helps the provider bring accurate replacement parts and tools.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {photos.map((url, idx) => (
                    <div key={idx} className="relative h-16 w-16 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                      <img src={url} alt="Attached" className="h-full w-full object-cover" />
                      <button
                        onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 p-0.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {photos.length < 2 && (
                    <button
                      type="button"
                      onClick={handlePhotoUploadSim}
                      className="h-16 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-900 hover:bg-slate-50 flex items-center gap-2 text-slate-600 transition-colors"
                    >
                      <UploadCloud className="h-4 w-4 text-slate-400" />
                      <span className="text-xs font-semibold">+ Attach Photo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Location preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Service Location: </span>
                    <span className="text-slate-600">{currentAddress.street}, {currentAddress.area}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="text-amber-600 font-bold hover:underline shrink-0 ml-2"
                >
                  Change
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Provider & Slot Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Choose Available Technician
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {matchingProviders.map((prov) => {
                    const isSelected = currentChosenProvider.id === prov.id;
                    return (
                      <div
                        key={prov.id}
                        onClick={() => setSelectedProvider(prov)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prov.avatar}
                            alt={prov.name}
                            className="h-11 w-11 rounded-xl object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                              <span>{prov.name}</span>
                              {prov.isVerified && <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                                <Star className="h-3 w-3 fill-amber-500" />
                                <span>{prov.rating}</span>
                              </span>
                              <span>·</span>
                              <span>{prov.distanceKm} km away</span>
                              <span>·</span>
                              <span>₹{prov.visitFee} fee</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-slate-900" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Date Slots */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Preferred Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'Day After'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDateSlot(d)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        dateSlot === d
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Preferred Arrival Window
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Within 45 Mins (Fastest)',
                    'Morning (9:00 AM - 12:00 PM)',
                    'Afternoon (1:00 PM - 4:00 PM)',
                    'Evening (5:00 PM - 8:00 PM)',
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeSlot(t)}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                        timeSlot === t
                          ? 'border-slate-900 bg-slate-900 text-white font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Summary & Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Selected Professional</span>
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5 mt-0.5">
                      <span>{currentChosenProvider.name}</span>
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-slate-500 text-[11px]">{currentChosenProvider.categoryName}</div>
                  </div>
                  <img
                    src={currentChosenProvider.avatar}
                    alt={currentChosenProvider.name}
                    className="h-10 w-10 rounded-xl object-cover border border-slate-200"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Date & Slot:</span>
                    <div className="font-bold text-slate-800">{dateSlot}, {timeSlot}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Urgency:</span>
                    <div className="font-bold capitalize text-slate-800">{urgency}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px]">
                  <span className="text-slate-400">Service Task:</span>
                  <div className="font-bold text-slate-800">{serviceTitle}</div>
                  {description && <p className="text-slate-600 mt-0.5">{description}</p>}
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Visit & Inspection Fee</span>
                  <span className="font-medium text-slate-900">₹{currentChosenProvider.visitFee}</span>
                </div>
                {urgency === 'emergency' && (
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Emergency Priority Dispatch Charge</span>
                    <span>₹100</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Safety Insurance & Convenience</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Due Upon Completion</span>
                  <span className="font-mono text-base">
                    ₹{currentChosenProvider.visitFee + (urgency === 'emergency' ? 100 : 0)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  *Pay digitally (UPI, Cards) or Cash after service completion and satisfaction.
                </p>
              </div>

              {/* Trust assurance */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
                <span>WHY NOT WE 30-Day Guarantee: Free revisits if the issue recurs within 30 days.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as 1 | 2)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
            >
              {isSubmitting ? (
                <>
                  <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Request...</span>
                </>
              ) : (
                <span>Confirm Service Request</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
