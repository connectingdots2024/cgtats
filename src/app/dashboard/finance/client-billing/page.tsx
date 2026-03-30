'use client';

import { useState } from 'react';
import {
  Building2, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, Users, Briefcase, FileText, X, CheckCircle2,
  IndianRupee, MoreHorizontal, Mail, ExternalLink,
  Printer, Clock, AlertCircle, TrendingUp, Handshake
} from 'lucide-react';
import { clients, revenues, invoices } from '@/lib/mock-data';
import { Client, Revenue, Invoice } from '@/lib/types';
import Link from 'next/link';
import { exportToCSV } from '@/lib/export-utils';

export default function ClientBillingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleExport = () => {
    exportToCSV(clientBillingData, 'client-billing-summary');
  };

  const clientBillingData = clients.map(client => {
    const clientRevenues = revenues.filter(r => r.clientId === client.id);
    const clientInvoices = invoices.filter(i => i.clientId === client.id);
    const totalCollected = clientRevenues.filter(r => r.status === 'collected').reduce((a, b) => a + b.amount, 0);
    const totalPending = clientInvoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((a, b) => a + b.amount, 0);

    return {
      ...client,
      totalCollected,
      totalPending,
      lastInvoice: clientInvoices[0]?.id || 'N/A',
      contractType: client.id === 'cl1' ? 'Fixed Fee (%)' : client.id === 'cl2' ? 'Retainer' : 'Placement Only'
    };
  });

  const filteredClients = clientBillingData.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Client Billing</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Client Billing Hub</h1>
          <p className="text-text-secondary mt-1">Track revenue per client, outstanding dues, and payment behavior</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Billing Summary
          </button>
          <button 
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <Handshake className="w-4 h-4" /> Manage Contracts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Top Client (Revenue)', value: filteredClients.sort((a,b) => b.totalCollected-a.totalCollected)[0]?.name || 'N/A', desc: 'Highest lifetime value', color: 'text-primary' },
          { label: 'Average Contract Value', value: '₹42,500', desc: '+5% this month', color: 'text-success' },
          { label: 'DSO (Days Sales Outstand.)', value: '28 Days', desc: 'Industry Avg: 45 Days', color: 'text-warning' },
          { label: 'Total Pending Dues', value: `₹${filteredClients.reduce((a, b) => a + b.totalPending, 0).toLocaleString()}`, desc: 'Across all active clients', color: 'text-danger' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-text-muted mt-1">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="p-6 rounded-2xl bg-surface border border-border group hover:border-primary/30 transition-all flex flex-col h-full shadow-lg">
             <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-all">
                      <Building2 className="w-5 h-5" />
                   </div>
                   <div>
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{client.name}</h3>
                      <p className="text-xs text-text-muted">{client.industry}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Contract</p>
                   <p className="text-xs font-semibold text-text-primary whitespace-nowrap">{client.contractType}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl bg-background border border-border text-center">
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Lifetime Value</p>
                   <p className="text-lg font-bold text-success">₹{(client.totalCollected/1000).toFixed(1)}k</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border text-center">
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Outstanding</p>
                   <p className="text-lg font-bold text-danger">₹{(client.totalPending/1000).toFixed(1)}k</p>
                </div>
             </div>

             <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50 text-[11px]">
                   <span className="text-text-muted flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Last Invoice</span>
                   <span className="font-bold text-white">{client.lastInvoice}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50 text-[11px]">
                   <span className="text-text-muted flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Client Since</span>
                   <span className="font-bold text-white">{new Date(client.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                </div>
             </div>

             <div className="mt-8 flex items-center gap-2">
                <Link 
                  href={`/dashboard/crm/${client.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-background border border-border text-xs font-semibold text-text-primary hover:bg-surface-active transition-all text-center"
                >
                  View Records
                </Link>
                <button className="flex-1 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-semibold hover:bg-primary/20 transition-all">
                   Manage Billing
                </button>
             </div>
          </div>
        ))}
        {filteredClients.length === 0 && (
          <div className="lg:col-span-3 p-12 text-center rounded-2xl bg-surface/50 border border-dashed border-border">
            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg font-bold text-white">No clients found</h3>
            <p className="text-sm text-text-muted mt-1">Check your search query or client database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
