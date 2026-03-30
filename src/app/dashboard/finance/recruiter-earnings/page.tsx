'use client';

import { useState } from 'react';
import {
  Users, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, ArrowUpRight, TrendingUp, Handshake,
  UserCheck, IndianRupee, PieChart, Activity, Zap, CheckCircle2,
  Clock, X, MoreHorizontal
} from 'lucide-react';
import { recruiterEarnings, financialStats } from '@/lib/mock-data';
import { RecruiterEarnings } from '@/lib/types';
import Link from 'next/link';
import { RecruiterPayoutSuccess } from '@/components/FinanceModals';
import { exportToCSV } from '@/lib/export-utils';

export default function RecruiterEarningsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [payingRecruiter, setPayingRecruiter] = useState<{ name: string, amount: number } | null>(null);

  const handleExport = () => {
    exportToCSV(earningsData, 'recruiter-earnings-performance');
  };

  const earningsData = recruiterEarnings.map(r => ({
    ...r,
    name: `Recruiter #${r.recruiterId.replace('u', '')}`,
    conversionRate: ((r.placementsCount / 45) * 100).toFixed(1), // Mock conversion
    avgFee: (r.totalRevenue / r.placementsCount).toLocaleString(),
  }));

  const handlePayout = (name: string, amount: number) => {
     setPayingRecruiter({ name, amount });
     setTimeout(() => setPayingRecruiter(null), 5000);
  };

  const filteredEarnings = earningsData.filter(r => 
    r.recruiterId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Recruiter Earnings</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Performance-Based Earnings</h1>
          <p className="text-text-secondary mt-1">Track recruiter revenue contributions, commissions, and payout schedules</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Earnings Report
          </button>
          <button 
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-primary text-white text-sm font-medium hover:shadow-lg hover:shadow-accent/25 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4" /> Calculate Incentives
          </button>
        </div>
      </div>

      {payingRecruiter && (
        <RecruiterPayoutSuccess 
          recruiterName={payingRecruiter.name}
          amount={payingRecruiter.amount}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-border bg-gradient-to-br from-surface to-background flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary relative">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="relative">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Total Commission</p>
            <p className="text-2xl font-bold text-white">₹{recruiterEarnings.reduce((a, b) => a + b.commission, 0).toLocaleString()}</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border bg-gradient-to-br from-surface to-background flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent relative">
            <UserCheck className="w-6 h-6" />
          </div>
          <div className="relative">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Active Recruiters</p>
            <p className="text-2xl font-bold text-white">{recruiterEarnings.length}</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border bg-gradient-to-br from-surface to-background flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform" />
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success relative">
            <Activity className="w-6 h-6" />
          </div>
          <div className="relative">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Average Commission %</p>
            <p className="text-2xl font-bold text-white">15.4%</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Recruiter</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Revenue Generated</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Commission Earned</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Placements</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Conversion rate</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Payout status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEarnings.map((r) => (
              <tr key={r.recruiterId} className="group hover:bg-surface-hover/50 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      #{r.recruiterId.replace('u', '')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Recruiter ID: {r.recruiterId}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Joined Mar 2023</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-white leading-none">₹{r.totalRevenue.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-success">₹{r.commission.toLocaleString()}</span>
                      <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider leading-none mt-1">15% Tier</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-text-primary text-center leading-none">{r.placementsCount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[80px] h-1.5 bg-background border border-border rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: `${r.conversionRate}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{r.conversionRate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handlePayout(r.name, r.commission)}
                    className="text-[10px] font-bold px-4 py-2 rounded-xl bg-success/10 text-success hover:bg-success/20 uppercase tracking-widest border border-success/20 transition-all"
                  >
                     Disburse Payout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-border">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Payout Schedule</h3>
              <Clock className="w-5 h-5 text-text-muted" />
           </div>
           <div className="space-y-6">
              {[
                { label: 'Next Processing Date', value: 'April 05, 2024', status: 'upcoming' },
                { label: 'Monthly Cut-off', value: 'March 31, 2024', status: 'active' },
                { label: 'Disbursement Method', value: 'Bank Transfer (ACH)', status: 'verified' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all group">
                   <div>
                      <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{item.label}</p>
                      <p className="text-sm font-bold text-white mt-1">{item.value}</p>
                   </div>
                   <CheckCircle2 className="w-5 h-5 text-success group-hover:scale-110 transition-transform" />
                </div>
              ))}
           </div>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border">
           <h3 className="text-lg font-bold text-white mb-8">Commission Matrix</h3>
           <div className="space-y-4">
              {[
                { tier: 'Tier 1 - Bronze', range: '₹0 - ₹2L', percentage: '12%', color: 'bg-orange-500' },
                { tier: 'Tier 2 - Silver', range: '₹2L - ₹5L', percentage: '15%', color: 'bg-slate-400' },
                { tier: 'Tier 3 - Gold', range: '₹5L - ₹10L', percentage: '18%', color: 'bg-yellow-500' },
                { tier: 'Tier 4 - Platinum', range: '₹10L+', percentage: '22%', color: 'bg-indigo-500' },
              ].map((tier, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border/50 hover:bg-surface-hover transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                    <div>
                      <p className="text-xs font-bold text-white">{tier.tier}</p>
                      <p className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">{tier.range}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">{tier.percentage}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
