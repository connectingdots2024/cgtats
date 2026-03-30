'use client';

import { useState } from 'react';
import {
  FileText, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, Building2,
  Users, Briefcase, X, CheckCircle2,
  IndianRupee, MoreHorizontal, Mail, ExternalLink,
  Printer, Clock, AlertCircle
} from 'lucide-react';
import { invoices as initialInvoices, clients } from '@/lib/mock-data';
import { Invoice } from '@/lib/types';
import Link from 'next/link';
import { CreateInvoiceModal } from '@/components/FinanceModals';
import { exportToCSV } from '@/lib/export-utils';

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(initialInvoices);

  const handleExport = () => {
    // Basic mapping for export
    const exportData = invoiceList.map(({ items, ...rest }) => ({ ...rest, lineItemsCount: items.length }));
    exportToCSV(exportData, 'invoices-summary');
  };

  const handleDownloadSingle = (invoice: Invoice) => {
    const data = [
      { Title: `Invoice ${invoice.id}`, Client: invoice.clientId, Date: invoice.createdAt, DueDate: invoice.dueDate, Status: invoice.status, TotalAmount: invoice.amount },
      ...invoice.items.map(item => ({ 'Item Description': item.description, Amount: item.amount }))
    ];
    exportToCSV(data, `invoice-${invoice.id}`);
  };

  const handleShare = (invoiceId: string) => {
    alert(`⚡️ Manifesting Share Portal for ${invoiceId}. Sending secure link to client's primary contact...`);
  };

  const handleStatusChange = (id: string, status: Invoice['status']) => {
    setInvoiceList(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
  };

  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoiceList([newInvoice, ...invoiceList]);
  };

  const filteredInvoices = invoiceList.filter(inv => 
    (inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
     inv.clientId.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterStatus === 'all' || inv.status === filterStatus)
  );

  const stats = [
    { label: 'Total Invoiced', value: invoiceList.reduce((a, b) => a + b.amount, 0), icon: FileText, color: 'text-primary' },
    { label: 'Paid Invoices', value: invoiceList.filter(i => i.status === 'paid').reduce((a, b) => a + b.amount, 0), icon: CheckCircle2, color: 'text-success' },
    { label: 'Pending Dues', value: invoiceList.filter(i => i.status === 'pending').reduce((a, b) => a + b.amount, 0), icon: Clock, color: 'text-warning' },
    { label: 'Overdue Dues', value: invoiceList.filter(i => i.status === 'overdue').reduce((a, b) => a + b.amount, 0), icon: AlertCircle, color: 'text-danger' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'overdue': return 'bg-danger/10 text-danger border-danger/20';
      default: return 'bg-surface-hover text-text-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Invoices</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Invoice Management</h1>
          <p className="text-text-secondary mt-1">Manage client billing, automated invoicing, and collection status</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export All Invoices
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              {stat.label}
            </div>
            <p className="text-xl font-bold text-white">₹{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search invoice number or client..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto">
          {['all', 'paid', 'pending', 'overdue'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                filterStatus === s 
                  ? 'bg-primary/10 border-primary/30 text-primary active-ring' 
                  : 'bg-surface border-border text-text-muted hover:text-text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Items</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Total Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="group hover:bg-surface-hover/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <Link 
                      href={`/dashboard/finance/invoices/${inv.id}`}
                      className="text-sm font-bold text-white hover:text-primary transition-all underline underline-offset-4 decoration-primary/20 hover:decoration-primary decoration-2"
                    >
                      {inv.id}
                    </Link>
                    <span className="text-[10px] font-medium text-text-muted mt-1 uppercase tracking-wider leading-none">Created {inv.createdAt}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-text-primary">Client #{inv.clientId.replace('cl', '')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    {inv.items.map((item, idx) => (
                      <span key={idx} className="text-xs font-medium text-text-secondary line-clamp-1">{item.description}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-white uppercase leading-none">₹{inv.amount.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-text-secondary">{inv.dueDate}</td>
                <td className="px-6 py-4 text-[10px] font-bold">
                   <span className={`px-2.5 py-1 rounded-full border uppercase tracking-widest ${getStatusColor(inv.status)}`}>
                     {inv.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDownloadSingle(inv)}
                      className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-background transition-all tooltip" 
                      title="Download JSON/CSV"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleShare(inv.id)}
                      className="p-2 rounded-lg text-text-muted hover:text-info hover:bg-background transition-all" 
                      title="Share / Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <div className="relative group/more">
                      <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <div className="absolute right-0 bottom-full mb-2 w-48 bg-surface border border-border rounded-xl shadow-2xl opacity-0 group-hover/more:opacity-100 pointer-events-none group-hover/more:pointer-events-auto transition-all z-50 p-1">
                         <button 
                           onClick={() => handleStatusChange(inv.id, 'paid')}
                           className="w-full px-4 py-2 text-left text-xs font-bold text-success hover:bg-success/10 rounded-lg flex items-center gap-2"
                         >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Paid
                         </button>
                         <button 
                           onClick={() => handleStatusChange(inv.id, 'pending')}
                           className="w-full px-4 py-2 text-left text-xs font-bold text-warning hover:bg-warning/10 rounded-lg flex items-center gap-2"
                         >
                            <Clock className="w-3.5 h-3.5" /> Mark as Pending
                         </button>
                         <button 
                           onClick={() => handleStatusChange(inv.id, 'overdue')}
                           className="w-full px-4 py-2 text-left text-xs font-bold text-danger hover:bg-danger/10 rounded-lg flex items-center gap-2"
                         >
                            <AlertCircle className="w-3.5 h-3.5" /> Mark as Overdue
                         </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateInvoiceModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddInvoice}
      />
    </div>
  );
}
