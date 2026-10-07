import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, ChevronDown, Send, CheckCircle, Phone, MessageSquare } from 'lucide-react';

export const HelpSupportModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen, setIsChatDrawerOpen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  if (!isSupportModalOpen) return null;

  const faqs = [
    {
      q: 'How does WHY NOT WE verify service providers?',
      a: 'All technicians undergo multi-tier screening including Government identity checks (Aadhaar/PAN), trade skill licenses (ITI, wireman licenses, apprentice certificates), police criminal background verifications, and physical toolkit audits.',
    },
    {
      q: 'What is the WHY NOT WE 30-Day Service Guarantee?',
      a: 'If any service executed by a WHY NOT WE partner fails or develops a recurrence within 30 days of job completion, we dispatch a senior supervisor or technician to fix it free of any additional labor charge.',
    },
    {
      q: 'How does doorstep fuel delivery operate safely?',
      a: 'Fuel deliveries use PESO (Petroleum and Explosives Safety Organisation) certified automated mobile bowsers equipped with vapor suppression nozzles, anti-static grounding wires, and digital temperature-compensated flow meters.',
    },
    {
      q: 'Can I pay in cash after the job is completed?',
      a: 'Yes! Customers have complete flexibility to pay via UPI (Google Pay, PhonePe, Paytm), Debit/Credit cards, Netbanking, or direct Cash upon job satisfaction.',
    },
  ];

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketSubject('');
      setTicketMessage('');
      setIsSupportModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-sm sm:text-base font-display">Help & Support Desk</h3>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-slate-800">
          {/* Quick contact buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Phone className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">24/7 Helpline</div>
                <div className="text-slate-500 text-[11px]">+91 80 4910 8899</div>
              </div>
            </div>
            <div
              onClick={() => {
                setIsSupportModalOpen(false);
                setIsChatDrawerOpen(true);
              }}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">In-App Chat</div>
                <div className="text-slate-500 text-[11px]">Instant Resolution</div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-900 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="p-3.5 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit ticket */}
          <form onSubmit={handleSendTicket} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs">Raise a Priority Ticket</h4>
            {ticketSent ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Ticket #TK-881 logged. Our supervisor will contact you within 15 minutes.</span>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Subject / Issue summary"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 bg-white"
                  required
                />
                <textarea
                  rows={2}
                  placeholder="Describe details regarding technician or delivery..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
