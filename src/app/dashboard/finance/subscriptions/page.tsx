'use client';

import { useState } from 'react';
import {
  CreditCard, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, ArrowUpRight, TrendingUp, Handshake,
  UserCheck, IndianRupee, PieChart, Activity, Zap, CheckCircle2,
  Clock, X, MoreHorizontal, ShieldCheck, Gem, Crown, Rocket,
  Users, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionsPage() {
  const [activePlan, setActivePlan] = useState('enterprise');

  const history = [
    { id: 'SUB-4921', date: 'Mar 01, 2024', plan: 'Enterprise Pro', amount: 24900, status: 'paid' },
    { id: 'SUB-3812', date: 'Feb 01, 2024', plan: 'Enterprise Pro', amount: 24900, status: 'paid' },
    { id: 'SUB-2704', date: 'Jan 01, 2024', plan: 'Enterprise Pro', amount: 24900, status: 'paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Subscriptions</span>
          </div>
          <h1 className="text-2xl font-bold text-white">SaaS Billing & Plans</h1>
          <p className="text-text-secondary mt-1">Manage your CGT RecruitAI account subscription and payment methods</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2">
            <IndianRupee className="w-4 h-4" /> Change Currency
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-surface border border-border bg-gradient-to-br from-surface to-background relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Crown className="w-32 h-32 text-primary" />
             </div>
             
             <div className="flex items-start justify-between relative">
                <div>
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-4">
                      <Gem className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Plan</span>
                   </div>
                   <h2 className="text-3xl font-extrabold text-white">Enterprise Pro Tier</h2>
                   <p className="text-sm text-text-muted mt-2 max-w-md">Your organization is currently on the high-performance tier with unlimited AI screening minutes and multi-tenant recruiter seats.</p>
                </div>
                <div className="text-right">
                   <p className="text-3xl font-bold text-white">₹24,900<span className="text-sm font-medium text-text-muted">/mo</span></p>
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Next Bill: April 01, 2024</p>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: 'Seats', value: 'Unlimited', icon: Users },
                  { label: 'AI Score', value: '10k / mo', icon: Zap },
                  { label: 'Uptime', value: '99.9%', icon: Activity },
                  { label: 'SLA', value: 'Gold', icon: ShieldCheck },
                ].map((feat) => (
                   <div key={feat.label} className="p-3 rounded-2xl bg-background border border-border border-opacity-50 text-center">
                      <feat.icon className="w-4 h-4 text-primary mx-auto mb-2 opacity-70" />
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">{feat.label}</p>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">{feat.value}</p>
                   </div>
                ))}
             </div>

             <div className="mt-8 flex items-center gap-4">
                <button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                   Upgrade Features
                </button>
                <button className="px-6 py-2.5 rounded-xl bg-background border border-border text-text-primary text-sm font-bold hover:bg-surface-hover transition-all">
                   Manage Card
                </button>
             </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
             <h3 className="text-lg font-bold text-white mb-6">Payment History</h3>
             <div className="space-y-3">
                {history.map((inv) => (
                  <div key={inv.id} className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all group flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                           <FileText className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-white">{inv.plan}</p>
                           <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-0.5">{inv.date} • {inv.id}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-white uppercase font-mono">₹{inv.amount.toLocaleString()}</p>
                        <span className="text-[10px] font-bold text-success uppercase tracking-widest mt-1 inline-block">Paid ✓</span>
                     </div>
                  </div>
                ))}
                <button className="w-full py-2.5 rounded-xl border border-dashed border-border text-xs text-text-muted font-bold hover:text-primary hover:border-primary/40 transition-all uppercase tracking-widest">
                   Load Previous Years
                </button>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
             <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">Plan Comparison</h3>
             <div className="space-y-3">
                {[
                  { name: 'Starter', price: '₹4,900', icon: Rocket, active: false },
                  { name: 'Growth', price: '₹12,900', icon: Zap, active: false },
                  { name: 'Enterprise', price: '₹24,900', icon: Crown, active: true },
                ].map((plan) => (
                   <div key={plan.name} className={`p-4 rounded-xl border transition-all cursor-pointer ${plan.active ? 'bg-primary/5 border-primary/40' : 'bg-background border-border hover:border-primary/20'}`}>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <plan.icon className={`w-5 h-5 ${plan.active ? 'text-primary' : 'text-text-muted'}`} />
                            <div>
                               <p className="text-sm font-bold text-white">{plan.name}</p>
                               <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{plan.price}/mo</p>
                            </div>
                         </div>
                         {plan.active && <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border bg-gradient-to-br from-accent/5 to-transparent">
             <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Security & Compliance</h3>
             </div>
             <p className="text-xs text-text-muted leading-relaxed">Financial data is encrypted with AES-256. We follow PCI DSS standards for payment processing via Stripe gateway.</p>
             <button className="w-full mt-4 py-2 text-[10px] font-bold text-accent border border-accent/30 rounded-lg hover:bg-accent/10 transition-all uppercase tracking-widest">
                Download SOC2 Report
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
