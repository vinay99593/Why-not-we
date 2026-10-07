import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UploadCloud,
  CheckCircle,
  ShieldCheck,
  Briefcase,
  DollarSign,
  ChevronRight,
  FileCheck,
} from 'lucide-react';

export const ProviderRegistrationModal: React.FC = () => {
  const {
    isProviderRegisterModalOpen,
    setIsProviderRegisterModalOpen,
    categories,
    registerNewProvider,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'electrician');
  const [experienceYears, setExperienceYears] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [visitFee, setVisitFee] = useState(199);
  const [skillsInput, setSkillsInput] = useState('Wiring, Switch Replacement, Circuit Diagnostics');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('Indiranagar & Whitefield Area');
  const [idProofType, setIdProofType] = useState('Govt ID / Aadhaar + Wireman License');
  const [idProofNumber, setIdProofNumber] = useState('KA-REG-99120');
  const [isUploadedId, setIsUploadedId] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isProviderRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenCat = categories.find((c) => c.id === categoryId);
    const skillsList = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);

    registerNewProvider({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.') }@partner.whynotwe.app`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      categoryId,
      categoryName: chosenCat?.name || 'Professional Trade',
      experienceYears,
      hourlyRate,
      visitFee,
      distanceKm: 1.5,
      isVerified: false,
      verificationStatus: 'pending',
      skills: skillsList.length ? skillsList : ['General Diagnostics', 'Field Repairs'],
      bio: bio || `Licensed technician with ${experienceYears} years experience. Committed to reliable service and clean workmanship.`,
      location: location || 'Bangalore City',
      isAvailable: true,
      badges: ['Pending KYC Verification'],
      idProofType,
      idProofNumber,
      appliedDate: new Date().toISOString().split('T')[0],
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Service Partner Onboarding
            </span>
            <h3 className="text-base sm:text-lg font-bold font-display">
              Become a Verified Service Provider
            </h3>
          </div>
          <button
            onClick={() => setIsProviderRegisterModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="grid grid-cols-3 bg-slate-100 h-1">
          <div className={`h-full bg-amber-500 transition-all ${step >= 1 ? 'w-full' : 'w-0'}`} />
          <div className={`h-full bg-amber-500 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
          <div className={`h-full bg-amber-500 transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Application Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Welcome to the WHY NOT WE partner ecosystem. Your application has been logged into the Admin Verification Pipeline for KYC approval. You can switch to the Provider Dashboard to preview your portal.
            </p>
            <button
              onClick={() => {
                setIsProviderRegisterModalOpen(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Done & Return to App
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs text-slate-800">
            {/* Step 1: Personal & Contact Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-900 border-b pb-2">
                  Step 1: Personal Details & Trade
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Trade / Service Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.emoji} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!name || !phone) return;
                      setStep(2);
                    }}
                    disabled={!name || !phone}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <span>Next: Experience & Rates</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Experience & Pricing */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-900 border-b pb-2">
                  Step 2: Experience & Pricing Structure
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Years Experience</label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Visit Fee (₹)</label>
                    <input
                      type="number"
                      min={50}
                      max={1000}
                      value={visitFee}
                      onChange={(e) => setVisitFee(Number(e.target.value))}
                      className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hourly Rate (₹)</label>
                    <input
                      type="number"
                      min={100}
                      max={2000}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specialized Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="e.g. 3-Phase Wiring, Inverter Diagnostic, Smart Switches"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Operational Area / Hub</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Indiranagar, Domlur & 5km radius"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Professional Bio</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Brief description of your expertise, certifications and equipment..."
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <span>Next: KYC Verification</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: KYC & ID Document */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-900 border-b pb-2">
                  Step 3: Verification & KYC Documents
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Document Type *</label>
                  <select
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 focus:border-slate-900 focus:outline-hidden"
                  >
                    <option value="Govt ID / Aadhaar + Wireman License">Govt ID / Aadhaar + Wireman License</option>
                    <option value="Trade Diploma Certificate">Trade Diploma / ITI Certificate</option>
                    <option value="Municipal Corporation Shop License">Municipal Corporation Shop License</option>
                    <option value="Police Clearance Certificate">Police Clearance Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Document / Certificate ID Number *</label>
                  <input
                    type="text"
                    value={idProofNumber}
                    onChange={(e) => setIdProofNumber(e.target.value)}
                    placeholder="e.g. KA-LIC-99120"
                    className="w-full text-xs rounded-xl border border-slate-200 px-3.5 py-2.5 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Upload ID Card Photo / PDF *</label>
                  <div
                    onClick={() => setIsUploadedId(true)}
                    className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors ${
                      isUploadedId
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                        : 'border-slate-300 hover:border-slate-900 bg-slate-50'
                    }`}
                  >
                    {isUploadedId ? (
                      <div className="flex flex-col items-center gap-1">
                        <FileCheck className="h-8 w-8 text-emerald-600" />
                        <span className="font-bold text-xs text-emerald-900">id_document_verified.pdf attached</span>
                        <span className="text-[10px] text-emerald-600">Click to change document</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <UploadCloud className="h-8 w-8 text-slate-400" />
                        <span className="font-bold text-xs text-slate-700">Click to attach KYC Document</span>
                        <span className="text-[10px] text-slate-400">PNG, JPG, PDF up to 10MB</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-amber-700 shrink-0" />
                  <span>
                    WHY NOT WE performs strict background verification before granting the Verified Pro badge to safeguard customer households.
                  </span>
                </div>

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-md"
                  >
                    Submit for Admin Approval
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
