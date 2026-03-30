'use client';

import { useState } from 'react';
import {
  Settings, User, Bell, Shield, Palette, Globe, Database,
  Key, Mail, Save, Eye, EyeOff, CreditCard, Building2, MapPin, 
  Phone, Layout, CheckCircle2
} from 'lucide-react';
import { getBillingSettings, saveBillingSettings, BillingSettings } from '@/lib/billing-utils';
import { useEffect } from 'react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'billing', label: 'Billing & Invoice Design', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  const [billingSettings, setBillingSettings] = useState<BillingSettings>(getBillingSettings());

  useEffect(() => {
    setBillingSettings(getBillingSettings());
  }, []);

  const handleSave = () => {
    if (activeTab === 'billing') {
      saveBillingSettings(billingSettings);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-text-secondary mt-1">Manage your account and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            saved
              ? 'bg-success text-white'
              : 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/25'
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="hidden md:block w-48 shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex gap-1 p-1 rounded-xl bg-surface border border-border w-full mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id ? 'bg-primary text-white' : 'text-text-secondary'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="rounded-xl bg-surface border border-border p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Personal Information</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                    SC
                  </div>
                  <div>
                    <button className="px-3 py-1.5 rounded-lg bg-surface-hover border border-border text-xs text-text-primary hover:bg-surface-active transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">First Name</label>
                    <input type="text" defaultValue="Sarah" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Last Name</label>
                    <input type="text" defaultValue="Chen" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-text-muted mb-1.5">Email</label>
                    <input type="email" defaultValue="sarah@cgtrecruit.ai" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-text-muted mb-1.5">Role</label>
                    <input type="text" value="Admin" disabled className="w-full px-3 py-2.5 rounded-lg bg-surface-hover border border-border text-sm text-text-muted cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-surface border border-border p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Organization</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Company Name</label>
                    <input type="text" defaultValue="CGT RecruitAI" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Industry</label>
                    <select className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50">
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="rounded-xl bg-surface border border-border p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'New Applications', desc: 'When candidates apply to your jobs', email: true, inApp: true },
                  { label: 'Pipeline Updates', desc: 'When candidates move between stages', email: true, inApp: true },
                  { label: 'Interview Reminders', desc: 'Before scheduled interviews', email: true, inApp: true },
                  { label: 'AI Insights', desc: 'New AI recommendations and alerts', email: false, inApp: true },
                  { label: 'Weekly Reports', desc: 'Weekly recruitment summary', email: true, inApp: false },
                  { label: 'Team Mentions', desc: 'When someone mentions you', email: true, inApp: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{pref.label}</p>
                      <p className="text-[11px] text-text-muted">{pref.desc}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={pref.email} className="rounded border-border bg-surface accent-primary w-3.5 h-3.5" />
                        <span className="text-[10px] text-text-muted">Email</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={pref.inApp} className="rounded border-border bg-surface accent-primary w-3.5 h-3.5" />
                        <span className="text-[10px] text-text-muted">In-App</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="rounded-xl bg-surface border border-border p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-surface border border-border p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface-hover/50">
                  <div>
                    <p className="text-sm font-medium text-text-primary">2FA is currently disabled</p>
                    <p className="text-[11px] text-text-muted">Add an extra layer of security to your account</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-surface border border-border p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {[
                    { device: 'MacBook Pro — Chrome', location: 'San Francisco, CA', current: true, time: 'Now' },
                    { device: 'iPhone 15 — Safari', location: 'San Francisco, CA', current: false, time: '2 hours ago' },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/50">
                      <div>
                        <p className="text-sm text-text-primary">{session.device}</p>
                        <p className="text-[11px] text-text-muted">{session.location} · {session.time}</p>
                      </div>
                      {session.current ? (
                        <span className="text-[10px] font-medium text-success px-2 py-0.5 rounded-full bg-success/10">Current</span>
                      ) : (
                        <button className="text-[10px] text-danger hover:text-danger/80 transition-colors">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
              <div className="space-y-6">
                <div className="rounded-xl bg-surface border border-border p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" /> Organization Branding
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-widest font-bold italic">Legal Company Name</label>
                      <input 
                        type="text" 
                        value={billingSettings.companyName}
                        onChange={(e) => setBillingSettings({...billingSettings, companyName: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-widest font-bold italic">Tax Registration ID (GST)</label>
                      <input 
                        type="text" 
                        value={billingSettings.taxId}
                        onChange={(e) => setBillingSettings({...billingSettings, taxId: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" 
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-surface border border-border p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" /> Institutional Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-widest font-bold italic">Street Address</label>
                      <input 
                        type="text" 
                        value={billingSettings.address}
                        onChange={(e) => setBillingSettings({...billingSettings, address: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-widest font-bold italic">City</label>
                        <input 
                          type="text" 
                          value={billingSettings.city}
                          onChange={(e) => setBillingSettings({...billingSettings, city: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-widest font-bold italic">State</label>
                        <input 
                          type="text" 
                          value={billingSettings.state}
                          onChange={(e) => setBillingSettings({...billingSettings, state: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-surface border border-border p-6">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-success" /> Invoice Manifest
                  </h3>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-widest font-bold italic">Footer / Disclosure Note</label>
                    <textarea 
                      rows={3}
                      value={billingSettings.footerNote}
                      onChange={(e) => setBillingSettings({...billingSettings, footerNote: e.target.value})}
                      className="w-full p-3 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50 resize-none" 
                    />
                  </div>
                </div>
              </div>

              {/* LIVE PREVIEW CO-PILOT */}
              <div className="lg:sticky lg:top-0 space-y-6">
                 <div className="p-6 rounded-2xl bg-gradient-to-br from-surface to-background border border-border shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                          <Eye className="w-4 h-4 text-primary" /> Design Preview
                       </h3>
                       <span className="text-[10px] font-bold text-success animate-pulse uppercase tracking-widest">Live Manifest</span>
                    </div>

                    <div className="bg-white text-slate-900 rounded-xl p-6 shadow-2xl border-t-8 border-primary transform hover:scale-[1.02] transition-transform duration-500">
                       <div className="flex justify-between items-start mb-6 shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
                             <Building2 className="w-5 h-5" />
                          </div>
                          <h5 className="text-[14px] font-black text-slate-200 uppercase tracking-tighter leading-none italic">INVOICE</h5>
                       </div>

                       <div className="space-y-1 mb-6">
                          <p className="text-[10px] font-black text-slate-900 leading-none">{billingSettings.companyName || 'Manifesting Name...'}</p>
                          <p className="text-[8px] font-medium text-slate-500 leading-none">{billingSettings.address || 'Manifesting Location...'}</p>
                          <p className="text-[8px] font-medium text-slate-500 leading-none">{billingSettings.city}, {billingSettings.state}</p>
                          <p className="text-[8px] font-bold text-slate-400 mt-2 tracking-tighter uppercase">{billingSettings.taxId}</p>
                       </div>

                       <div className="h-12 w-full border-y border-slate-50 mb-4 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-slate-100 uppercase tracking-widest italic tracking-tighter">Institutional Line Items...</span>
                       </div>

                       <div className="flex justify-end gap-2 items-center">
                          <span className="text-[10px] font-black uppercase text-slate-300">Total Manifest</span>
                          <span className="text-xl font-black text-primary italic leading-none">₹250k</span>
                       </div>

                       <div className="mt-8 pt-4 border-t border-slate-50 text-center">
                          <p className="text-[6px] text-slate-300 font-medium leading-tight italic line-clamp-2">{billingSettings.footerNote}</p>
                       </div>
                    </div>
                    
                    <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                       <p className="text-[10px] text-text-muted leading-relaxed font-bold uppercase tracking-wider text-center">
                          This manifest ensures compliance with institutional recruitment capital standards globally.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
