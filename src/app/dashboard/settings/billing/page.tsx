'use client';

import { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Globe, Phone, Mail, 
  Save, Eye, ArrowLeft, Palette, Layout,
  CheckCircle2, Info, Image as ImageIcon,
  IndianRupee, Laptop, CreditCard, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function BillingSettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'CGT RecruitAI Inc.',
    address: '123 Tech Park, Financial District',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    country: 'India',
    email: 'billing@cgtrecruital.com',
    phone: '+91-22-4932-9011',
    website: 'www.cgtrecruital.com',
    taxId: 'GSTIN-27AAACG1234F1Z5',
    currency: 'INR',
    themeColor: '#6C5CE7',
    footerNote: 'Please remit payment via NEFT/Bank Transfer. Late payments attract 2.5% penalty.',
    showLogo: true,
  });

  const handleSave = () => {
    // In a real app, this would be an API call
    localStorage.setItem('cgt_billing_settings', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/settings" className="hover:text-primary">Settings</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Billing & Invoice Design</span>
          </div>
          <h1 className="text-2xl font-bold text-white uppercase tracking-tight italic underlined decoration-primary/30 decoration-2">Institutional Manifest Settings</h1>
          <p className="text-text-secondary mt-1">Configure your invoice branding, contact details and ledger defaults.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaved ? 'Changes Manifested' : 'Save Configuration'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Company Details */}
          <section className="p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-xl">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                   <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Branding & Address</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">Company Legal Name</label>
                   <input 
                     type="text" 
                     value={settings.companyName}
                     onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                     className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
                   />
                </div>
                <div>
                   <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">Tax ID / GSTIN</label>
                   <input 
                     type="text" 
                     value={settings.taxId}
                     onChange={(e) => setSettings({...settings, taxId: e.target.value})}
                     className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
                   />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">Street Address</label>
                   <input 
                     type="text" 
                     value={settings.address}
                     onChange={(e) => setSettings({...settings, address: e.target.value})}
                     className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
                   />
                </div>
                <div>
                   <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">City</label>
                   <input 
                     type="text" 
                     value={settings.city}
                     onChange={(e) => setSettings({...settings, city: e.target.value})}
                     className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">State</label>
                      <input 
                        type="text" 
                        value={settings.state}
                        onChange={(e) => setSettings({...settings, state: e.target.value})}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
                      />
                   </div>
                   <div>
                      <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">ZIP Code</label>
                      <input 
                        type="text" 
                        value={settings.zip}
                        onChange={(e) => setSettings({...settings, zip: e.target.value})}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
                      />
                   </div>
                </div>
             </div>
          </section>

          {/* Contact Information */}
          <section className="p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-xl">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                   <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Public Contact Meta</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">Billing Email</label>
                   <input 
                     type="email" 
                     value={settings.email}
                     onChange={(e) => setSettings({...settings, email: e.target.value})}
                     className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-all"
                   />
                </div>
                <div>
                   <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">Phone Number</label>
                   <input 
                     type="text" 
                     value={settings.phone}
                     onChange={(e) => setSettings({...settings, phone: e.target.value})}
                     className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-accent transition-all"
                   />
                </div>
             </div>
          </section>

          {/* Invoice Defaults */}
          <section className="p-8 rounded-3xl bg-surface border border-border space-y-6 shadow-xl">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                   <Layout className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Manifest Defaults</h3>
             </div>
             
             <div>
                <label className="block text-xs font-black text-text-muted uppercase tracking-widest mb-2 italic">Footer / Terms Summary</label>
                <textarea 
                  rows={4}
                  value={settings.footerNote}
                  onChange={(e) => setSettings({...settings, footerNote: e.target.value})}
                  className="w-full p-4 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-success transition-all resize-none"
                />
             </div>
          </section>
        </div>

        {/* Live Preview Sidebar */}
        <div className="lg:sticky lg:top-8 h-fit space-y-6">
           <div className="p-6 rounded-3xl bg-surface border border-border shadow-inner overflow-hidden flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-6">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                   <Eye className="w-4 h-4 text-primary" /> Real-time Manifest
                 </h3>
                 <span className="text-[10px] font-bold text-success animate-pulse uppercase tracking-widest">Live Sync</span>
              </div>
              
              {/* Mini Invoice Preview */}
              <div className="w-full bg-white text-slate-900 rounded-2xl p-6 shadow-2xl scale-95 border-t-8 border-primary origin-top">
                 <div className="flex justify-between items-start mb-6 shrink-0">
                    <div>
                       <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white mb-2 shadow-sm">
                          <Building2 className="w-5 h-5" />
                       </div>
                       <h4 className="text-[12px] font-black leading-none italic uppercase tracking-tighter">CGT <span className="text-primary not-italic">RECRUITAI</span></h4>
                    </div>
                    <div className="text-right">
                       <h5 className="text-[14px] font-black text-slate-200 uppercase tracking-tighter leading-none italic">INVOICE</h5>
                    </div>
                 </div>

                 <div className="space-y-1 mb-6">
                    <p className="text-[10px] font-black text-slate-900 leading-none">{settings.companyName}</p>
                    <p className="text-[8px] font-medium text-slate-500 leading-none">{settings.address}</p>
                    <p className="text-[8px] font-medium text-slate-500 leading-none">{settings.city}, {settings.state} {settings.zip}</p>
                    <p className="text-[8px] font-bold text-slate-400 mt-2 tracking-tighter uppercase">{settings.taxId}</p>
                 </div>

                 <div className="h-20 w-full border-y border-slate-100 mb-4 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic opacity-50">Line Items Manifesting...</span>
                 </div>

                 <div className="flex justify-end gap-2 items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400">Total Due</span>
                    <span className="text-xl font-black text-primary italic leading-none">₹250k</span>
                 </div>

                 <div className="mt-8 pt-4 border-t border-slate-50 text-center">
                    <p className="text-[6px] text-slate-400 font-medium leading-tight line-clamp-2">{settings.footerNote}</p>
                 </div>
              </div>

              <p className="text-[11px] text-text-muted mt-8 text-center px-4 leading-relaxed font-medium uppercase tracking-wider">This preview reflects the branding that will manifest on institutional client PDFs.</p>
           </div>

           <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                 <Laptop className="w-5 h-5 text-primary" />
                 <h4 className="text-sm font-bold text-white uppercase tracking-wider leading-none">System Integration</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed font-medium">Changes made here are applied globally within 154ms across all recruitment capital ledgers and client portals.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
