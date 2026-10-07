import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, CheckCircle, ShieldCheck, Download, Sparkles } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const { invoiceBooking, setInvoiceBooking } = useApp();

  if (!invoiceBooking) return null;

  const b = invoiceBooking;
  const basePrice = Math.round(b.amount * 0.82);
  const gst = Math.round(b.amount * 0.18);
  const invoiceNumber = `WNW-INV-${b.id}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm font-display">
              W
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide font-display">WHY NOT WE</h3>
              <p className="text-[10px] text-amber-300 font-medium tracking-wider uppercase">Official Digital Receipt</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-amber-400" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => setInvoiceBooking(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* Top metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Invoice Number</div>
              <div className="font-mono font-bold text-sm text-slate-900">{invoiceNumber}</div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Date: {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <div className="sm:text-right">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md text-xs border border-emerald-200">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>PAID VIA {b.paymentMethod ? b.paymentMethod.toUpperCase() : 'UPI'}</span>
              </span>
              <div className="text-[11px] text-slate-400 mt-1">Transaction Ref: TXN-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
          </div>

          {/* Customer & Provider Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Billed To (Customer)</div>
              <div className="font-bold text-slate-900">{b.customerName}</div>
              <div className="text-slate-600 mt-0.5">{b.customerPhone}</div>
              <div className="text-slate-500 mt-0.5 leading-relaxed">
                {b.address.street}, {b.address.area}, {b.address.city} - {b.address.pincode}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Fulfilled By (Service Partner)</div>
              <div className="font-bold text-slate-900">{b.providerName}</div>
              <div className="text-slate-600 mt-0.5">{b.providerCategory}</div>
              <div className="text-slate-500 mt-0.5">Verified Partner ID: {b.providerId}</div>
              <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-medium mt-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>WHY NOT WE 30-Day Service Guarantee</span>
              </div>
            </div>
          </div>

          {/* Line items table */}
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">Service Breakdown</div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-100 p-2.5 font-bold text-slate-700 text-[11px]">
                <div className="col-span-8">Description</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-12 p-3 text-slate-800">
                  <div className="col-span-8">
                    <div className="font-bold text-slate-900">{b.serviceTitle}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{b.description || 'Standard inspection, diagnostic and repair'}</div>
                  </div>
                  <div className="col-span-2 text-right">1</div>
                  <div className="col-span-2 text-right font-medium">₹{basePrice}</div>
                </div>
                <div className="grid grid-cols-12 p-2.5 text-slate-600 text-[11px]">
                  <div className="col-span-8">Platform Convenience & Safety Insurance</div>
                  <div className="col-span-2 text-right">1</div>
                  <div className="col-span-2 text-right font-medium">₹0</div>
                </div>
                <div className="grid grid-cols-12 p-2.5 text-slate-600 text-[11px]">
                  <div className="col-span-8">Applicable Taxes (CGST 9% + SGST 9%)</div>
                  <div className="col-span-2 text-right">18%</div>
                  <div className="col-span-2 text-right font-medium">₹{gst}</div>
                </div>
              </div>
              <div className="bg-slate-50 p-3 flex items-center justify-between border-t border-slate-200">
                <div className="font-bold text-slate-900 text-sm">Total Paid</div>
                <div className="font-bold text-slate-900 text-base font-mono">₹{b.amount}</div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 mb-0.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Customer Assurance</span>
            </div>
            This invoice serves as your verified proof of service under the WHY NOT WE Consumer Protection Program. For questions or warranty assistance, quote reference #{b.id}.
          </div>
        </div>

        {/* Modal actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={() => setInvoiceBooking(null)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-amber-400" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
