import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, FileText } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { legalModalType, setLegalModalType } = useApp();

  if (!legalModalType) return null;

  const isTerms = legalModalType === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base font-display">
              {isTerms ? 'Terms & Conditions of Service' : 'Privacy & Data Protection Policy'}
            </h3>
          </div>
          <button
            onClick={() => setLegalModalType(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
          {isTerms ? (
            <>
              <h4 className="font-bold text-sm text-slate-900">1. Acceptance of Terms</h4>
              <p>
                By registering, accessing, or using WHY NOT WE (“Platform”), you agree to abide by these Terms of Service. WHY NOT WE operates as an aggregator connecting verified independent trade professionals, merchants, and fuel distributors with end users.
              </p>

              <h4 className="font-bold text-sm text-slate-900">2. Service Quality & Guarantee</h4>
              <p>
                All local trade jobs executed through the Platform include a 30-Day Service Guarantee covering workmanship defects. Any rework claims must be reported via the Help Desk within 30 days of work completion.
              </p>

              <h4 className="font-bold text-sm text-slate-900">3. Doorstep Fuel Delivery Compliance</h4>
              <p>
                Fuel delivery services are subject to statutory safety regulations. Customers agree to provide unobstructed, well-ventilated access. Refueling will not take place in enclosed underground basement spaces lacking mechanical ventilation.
              </p>

              <h4 className="font-bold text-sm text-slate-900">4. Transparent Pricing & Payments</h4>
              <p>
                Inspection fees and estimated prices displayed prior to booking are binding. Any additional material costs or major scope changes must be mutually agreed upon in-app prior to execution.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-sm text-slate-900">1. Information Collection & Usage</h4>
              <p>
                WHY NOT WE collects necessary location coordinates, contact phone numbers, and delivery addresses strictly for matching nearby service partners and calculating accurate route estimates.
              </p>

              <h4 className="font-bold text-sm text-slate-900">2. Encrypted In-App Communications</h4>
              <p>
                Customer and service provider chat threads and VoIP call signaling are end-to-end masked. Actual personal phone numbers are shielded using virtual numbers to protect customer privacy.
              </p>

              <h4 className="font-bold text-sm text-slate-900">3. KYC Data Storage</h4>
              <p>
                Service provider government identification cards and trade licenses are encrypted at rest and accessed only by authorized compliance verification officers.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setLegalModalType(null)}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
