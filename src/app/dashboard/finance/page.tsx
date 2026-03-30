'use client';

import { useState } from 'react';
import {
  IndianRupee, TrendingUp, TrendingDown, Clock, AlertCircle,
  BarChart3, PieChart, LineChart as LineChartIcon, ArrowUpRight,
  ArrowDownRight, Building2, Users, FileText, Plus, Filter,
  Calendar, Download, ChevronRight, Activity
} from 'lucide-react';
import {
  financialStats, revenues, expenses, invoices, recruiterEarnings
} from '@/lib/mock-data';
import Link from 'next/link';

export default function FinanceDashboard() {
  const stats = [
    { label: 'Total Revenue', value: financialStats.totalRevenue, icon: TrendingUp, color: 'text-primary', trend: '+12.5%' },
    { label: 'Total Expenses', value: financialStats.totalExpenses, icon: TrendingDown, color: 'text-danger', trend: '+4.2%' },
    { label: 'Net Profit', value: financialStats.netProfit, icon: Activity, color: 'text-success', trend: '+24.1%' },
    { label: 'MRR', value: financialStats.mrr, icon: IndianRupee, color: 'text-accent', trend: '+8.3%' },
  ];

  const subPages = [
    { name: 'Revenue', href: '/dashboard/finance/revenue', icon: TrendingUp },
    { name: 'Expenses', href: '/dashboard/finance/expenses', icon: TrendingDown },
    { name: 'Invoices', href: '/dashboard/finance/invoices', icon: FileText },
    { name: 'Client Billing', href: '/dashboard/finance/client-billing', icon: Building2 },
    { name: 'Recruiter Earnings', href: '/dashboard/finance/recruiter-earnings', icon: Users },
    { name: 'P&L', href: '/dashboard/finance/pl', icon: BarChart3 },
    { name: 'Subscriptions', href: '/dashboard/finance/subscriptions', icon: Activity },
    { name: 'Reports', href: '/dashboard/finance/reports', icon: LineChartIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Financial Intelligence</h1>
          <p className="text-text-secondary mt-1">Real-time financial health, billing, and recruiter performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <Link 
            href="/dashboard/finance/revenue"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </Link>
        </div>
      </div>

      {/* Quick Access Sub-Pages */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {subPages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="p-3 rounded-xl bg-surface border border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
              <page.icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] font-semibold text-text-muted group-hover:text-text-primary transition-colors uppercase tracking-wider line-clamp-1">
              {page.name}
            </span>
          </Link>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-surface border border-border relative overflow-hidden group hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-background ${stat.color} bg-opacity-10`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-sm text-text-muted">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white mt-1">
              ₹{(stat.value / 1000).toFixed(1)}k
            </h3>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-white">Revenue Performance</h3>
              <div className="flex bg-background rounded-lg p-1 border border-border">
                {['Monthly', 'Quarterly', 'Yearly'].map((t) => (
                  <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${t === 'Monthly' ? 'bg-surface border border-border text-primary' : 'text-text-muted hover:text-text-secondary'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {/* Placeholder for Revenue Chart */}
            <div className="h-64 flex items-end gap-2 overflow-hidden px-4">
               {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                 <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm relative group">
                    <div style={{ height: `${h}%` }} className="w-full transition-all group-hover:brightness-125" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-active px-2 py-1 rounded text-[10px] text-white whitespace-nowrap border border-border pointer-events-none">
                      ₹{(h * 5000).toLocaleString()}
                    </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 px-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                <span key={m} className="text-[10px] text-text-muted font-medium uppercase tracking-wider">{m}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-border">
               <h3 className="text-sm font-bold text-white mb-6">Revenue by Recruiter</h3>
               <div className="space-y-4">
                  {recruiterEarnings.map((r, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-primary">Recruiter #{r.recruiterId.replace('u', '')}</span>
                        <span className="font-bold text-white">₹{(r.totalRevenue/1000).toFixed(1)}k</span>
                      </div>
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(r.totalRevenue / financialStats.totalRevenue) * 200}%` }} 
                        />
                      </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface border border-border">
               <h3 className="text-sm font-bold text-white mb-6">Expense Categories</h3>
               <div className="flex items-center gap-8">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" className="text-primary/10" strokeWidth="5" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" className="text-primary" strokeWidth="5" strokeDasharray="60 100" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" className="text-danger" strokeWidth="5" strokeDasharray="25 100" strokeDashoffset="-60" />
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" className="text-accent" strokeWidth="5" strokeDasharray="15 100" strokeDashoffset="-85" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Salaries', color: 'bg-primary' },
                      { label: 'Software', color: 'bg-danger' },
                      { label: 'Marketing', color: 'bg-accent' },
                    ].map(c => (
                      <div key={c.label} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${c.color}`} />
                        <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{c.label}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="text-sm font-bold text-white mb-6">Outstanding Payments</h3>
            <div className="space-y-4">
              {invoices.filter(inv => inv.status === 'pending').map(inv => (
                <div key={inv.id} className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2 text-xs font-semibold">
                    <span className="text-text-primary uppercase tracking-wider">{inv.id}</span>
                    <span className="text-warning">Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Client #{inv.clientId.replace('cl', '')}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">Due: {new Date(inv.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">₹{(inv.amount/1000).toFixed(1)}k</p>
                      <ChevronRight className="w-3 h-3 text-text-muted inline ml-1 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2.5 rounded-xl border border-dashed border-border text-xs text-text-muted hover:text-primary hover:border-primary/50 transition-all font-medium">
                View All Pending Bills
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <h3 className="text-sm font-bold text-white mb-6">Recent Transactions</h3>
            <div className="space-y-3">
              {[...revenues, ...expenses].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${'amount' in tx ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                       {'sourceType' in tx ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white truncate max-w-[120px]">{tx.description}</p>
                      <p className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold ${'sourceType' in tx ? 'text-success' : 'text-danger'}`}>
                    {'sourceType' in tx ? '+' : '-'}₹{(tx.amount/1000).toFixed(1)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
