'use client';

import { useState } from 'react';
import {
  TrendingUp, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, ArrowUpRight, Building2,
  Users, Briefcase, FileText, X, CheckCircle2,
  IndianRupee, MoreHorizontal, Clock, Activity
} from 'lucide-react';
import { revenues as initialRevenues, clients, jobs, financialStats } from '@/lib/mock-data';
import { Revenue } from '@/lib/types';
import Link from 'next/link';
import { AddRevenueModal } from '@/components/FinanceModals';
import { exportToCSV } from '@/lib/export-utils';

export default function RevenuePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [revenueList, setRevenueList] = useState<Revenue[]>(initialRevenues);

  const handleExport = () => {
    exportToCSV(revenueList, 'revenue-report');
  };

  const handleAddRevenue = (newRevenue: Revenue) => {
    setRevenueList([newRevenue, ...revenueList]);
  };

  const filteredRevenues = revenueList.filter(rev => 
    (rev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     rev.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterType === 'all' || rev.sourceType === filterType)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Revenue</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Revenue tracking</h1>
          <p className="text-text-secondary mt-1">Manage all placement fees, retainers, and subscription income</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Revenue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-surface border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Total Revenue (YTD)</p>
            <p className="text-2xl font-bold text-white">₹{revenueList.reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Collected</p>
            <p className="text-2xl font-bold text-white">₹{revenueList.filter(r => r.status === 'collected').reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Pending Collection</p>
            <p className="text-2xl font-bold text-white">₹{revenueList.filter(r => r.status === 'pending').reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by description, client or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto">
          {['all', 'placement', 'retainer', 'subscription'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all whitespace-nowrap ${
                filterType === t 
                  ? 'bg-primary/10 border-primary/30 text-primary active-ring' 
                  : 'bg-surface border-border text-text-muted hover:text-text-primary hover:border-border-active'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Transaction</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredRevenues.map((rev) => (
              <tr key={rev.id} className="group hover:bg-surface-hover/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-text-secondary">{rev.date}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{rev.description}</span>
                    <span className="text-[10px] font-mono text-text-muted">{rev.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${
                        rev.sourceType === 'placement' ? 'bg-primary/10 text-primary' :
                        rev.sourceType === 'retainer' ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                      }`}>
                        {rev.sourceType === 'placement' ? <Briefcase className="w-3 h-3" /> :
                         rev.sourceType === 'retainer' ? <Building2 className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                      </div>
                      <span className="text-xs font-semibold text-text-primary capitalize">{rev.sourceType}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-text-secondary">Client #{rev.clientId.replace('cl', '')}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-white">₹{rev.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    rev.status === 'collected' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {rev.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRevenues.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-bold text-white">No transactions found</h3>
            <p className="text-sm text-text-muted mt-1">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      <AddRevenueModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddRevenue}
      />
    </div>
  );
}
