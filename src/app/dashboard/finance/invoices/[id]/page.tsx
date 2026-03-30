'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Download, Printer, Mail, 
  Share2, IndianRupee, MapPin, Building2,
  Phone, Globe, CheckCircle2, FileText,
  Clock, AlertCircle
} from 'lucide-react';
import { invoices, clients } from '@/lib/mock-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBillingSettings, BillingSettings } from '@/lib/billing-utils';

export default function InvoicePrintPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isPrinting, setIsPrinting] = useState(false);
  const [billingSettings, setBillingSettings] = useState<BillingSettings>(getBillingSettings());

  useEffect(() => {
    setBillingSettings(getBillingSettings());
  }, []);

  const invoice = invoices.find(inv => inv.id === id);
  const client = clients.find(cl => cl.id === invoice?.clientId);

  if (!invoice || !client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-white mb-2 underline underline-offset-8 decoration-primary/30 decoration-2 italic">Invoice Not Found</h1>
        <p className="text-text-muted mb-6">Manifestation of record {id} failed. Database sync required.</p>
        <Link 
          href="/dashboard/finance/invoices"
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
        >
          Return to Ledger
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Header - Hidden on Print */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">{invoice.id}</h1>
            <p className="text-xs text-text-muted">Drafting & Manifestation System</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Save as PDF / Print
          </button>
          <button className="p-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-info transition-all shadow-sm">
            <Mail className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-text-primary transition-all shadow-sm">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Invoice Container - The PDF Format */}
      <div className="bg-white text-slate-900 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto border-t-[12px] border-primary print:border-none print:shadow-none print:m-0 print:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
             <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                   <Building2 className="w-7 h-7" />
                </div>
                <div>
                   <h2 className="text-2xl font-black uppercase tracking-tighter leading-none italic">{billingSettings.companyName.split(' ')[0]} <span className="text-primary not-italic">{billingSettings.companyName.split(' ').slice(1).join(' ')}</span></h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Recruitment Capital</p>
                </div>
             </div>
             <div className="space-y-1 text-sm font-medium text-slate-500">
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {billingSettings.address}</p>
                <p className="pl-5">{billingSettings.city}, {billingSettings.state} {billingSettings.zip}</p>
                <p className="flex items-center gap-2 mt-2"><Globe className="w-3.5 h-3.5" /> {billingSettings.email}</p>
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {billingSettings.phone}</p>
             </div>
          </div>
          <div className="text-right">
             <h1 className="text-5xl font-black text-slate-200 uppercase tracking-tighter mb-4 italic">INVOICE</h1>
             <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Invoice Number</p>
                <p className="text-xl font-black text-slate-900">{invoice.id}</p>
             </div>
             <div className="mt-6 flex flex-col items-end gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{billingSettings.taxId}</span>
                <span className={`mt-1 px-4 py-1.5 rounded-full border-2 ${
                   invoice.status === 'paid' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' :
                   invoice.status === 'pending' ? 'bg-amber-50 border-amber-500 text-amber-600' :
                   'bg-rose-50 border-rose-500 text-rose-600'
                }`}>
                   {invoice.status} ✓
                </span>
             </div>
          </div>
        </div>

        {/* Billing Info */}
        <div className="grid grid-cols-2 gap-12 mb-16 border-y border-slate-100 py-12">
           <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Bill To</h3>
              <div className="space-y-1">
                 <h4 className="text-xl font-bold text-slate-900 underline underline-offset-4 decoration-primary/30 decoration-2">{client.name}</h4>
                 <p className="text-sm font-medium text-slate-500 mt-2">{client.industry} Sector</p>
                 <p className="text-sm font-medium text-slate-500">Global Headquarters</p>
                 <p className="text-sm font-medium text-slate-400 italic mt-3 truncate">{client.id} Manifestation Record</p>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 text-right">
              <div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Issue Date</p>
                 <p className="text-sm font-bold text-slate-900">{new Date(invoice.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
              </div>
              <div>
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                 <p className="text-sm font-bold text-slate-900 underline underline-offset-4 decoration-rose-500/30 decoration-2">{new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
              </div>
           </div>
        </div>

        {/* Line Items */}
        <table className="w-full mb-16">
           <thead className="border-b-2 border-slate-900">
              <tr>
                 <th className="py-4 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Description</th>
                 <th className="py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Rate</th>
                 <th className="py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Qty</th>
                 <th className="py-4 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="group">
                   <td className="py-6 pr-8">
                      <p className="text-base font-bold text-slate-900 mb-1">{item.description}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Service Manifested: RecruitAI Sourcing Pipeline</p>
                   </td>
                   <td className="py-6 text-right font-mono text-slate-500">₹{item.amount.toLocaleString()}</td>
                   <td className="py-6 text-right font-mono text-slate-500">1.00</td>
                   <td className="py-6 text-right font-bold text-slate-900">₹{item.amount.toLocaleString()}</td>
                </tr>
              ))}
           </tbody>
        </table>

        {/* Totals & Notes */}
        <div className="flex justify-between items-start gap-12">
           <div className="flex-1">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Notes & Instructions</h4>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">{billingSettings.footerNote}</p>
              </div>
           </div>
           <div className="w-72 space-y-4 pt-4">
              <div className="flex justify-between text-sm">
                 <span className="font-bold text-slate-400 uppercase tracking-widest">Subtotal</span>
                 <span className="font-black text-slate-900">₹{invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="font-bold text-slate-400 uppercase tracking-widest">Tax (GST 0%)</span>
                 <span className="font-black text-slate-900">₹0.00</span>
              </div>
              <div className="flex justify-between items-center py-4 border-t-2 border-slate-900 mt-4">
                 <span className="text-lg font-black uppercase tracking-tighter italic">Total Amount</span>
                 <span className="text-3xl font-black text-primary italic">₹{invoice.amount.toLocaleString()}</span>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-slate-100 text-center">
           <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Electronic Manifestation ✓ Verified Record</p>
           <p className="text-[10px] text-slate-400 mt-2">© 2026 CGT RECRUITAI INC. ALL RIGHTS RESERVED. FINANCIAL CAPITAL PROTOCOL ACTIVE.</p>
        </div>
      </div>
      
      {/* Print-specific Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          header, 
          nav, 
          .sidebar, 
          button, 
          .print\\:hidden {
            display: none !important;
          }
          .bg-background, .bg-surface {
            background-color: white !important;
          }
          .text-white {
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
