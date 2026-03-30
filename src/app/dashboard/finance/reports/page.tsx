'use client';

import { useState } from 'react';
import {
  FileText, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, ArrowUpRight, TrendingUp, Handshake,
  UserCheck, IndianRupee, PieChart, Activity, Zap, CheckCircle2,
  Clock, X, MoreHorizontal, ShieldCheck, Mail, Share2, Printer
} from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('revenue');

  const availableReports = [
    { id: 'revenue', title: 'Revenue Breakdown', desc: 'Detailed analysis of placement fees and retainers.', icon: TrendingUp },
    { id: 'expense', title: 'Operational Expenses', desc: 'Categorized spending across software and payroll.', icon: TrendingDown },
    { id: 'profit', title: 'Profitability Analysis', desc: 'Net profit margins by client and recruiter.', icon: Activity },
    { id: 'tax', title: 'Tax & Compliance', desc: 'Summary of GST/Value-added taxes for filing.', icon: Landmark },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Reports</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Financial Reports Cabinet</h1>
          <p className="text-text-secondary mt-1">Generate, schedule, and export high-fidelity financial audits</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-surface border border-border text-text-muted hover:text-primary transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Date Range: FY 2024
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-3">
          {availableReports.map((report) => (
            <button
               key={report.id}
               onClick={() => setActiveReport(report.id)}
               className={`w-full p-4 rounded-2xl border text-left transition-all ${
                 activeReport === report.id 
                   ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5' 
                   : 'bg-surface border-border hover:border-border-active'
               }`}
            >
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${activeReport === report.id ? 'bg-primary text-white shadow-md' : 'bg-background text-text-muted'}`}>
                  <report.icon className="w-4 h-4" />
               </div>
               <h3 className={`text-sm font-bold ${activeReport === report.id ? 'text-white' : 'text-text-primary'}`}>{report.title}</h3>
               <p className="text-[10px] text-text-muted mt-1 leading-relaxed capitalize">{report.desc}</p>
            </button>
          ))}
          <button className="w-full py-4 rounded-2xl border border-dashed border-border text-xs font-bold text-text-muted hover:text-primary hover:border-primary/40 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
             <Plus className="w-4 h-4" /> Custom Audit
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="p-8 rounded-3xl bg-surface border border-border min-h-[500px] flex flex-col">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6 mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-white uppercase tracking-wider">{availableReports.find(r => r.id === activeReport)?.title}</h2>
                      <p className="text-xs text-text-muted">Report generated on March 29, 2026 • 07:31 PM</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-2.5 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all shadow-sm">
                      <Printer className="w-4 h-4" />
                   </button>
                   <button className="p-2.5 rounded-xl bg-background border border-border text-text-muted hover:text-info transition-all shadow-sm">
                      <Share2 className="w-4 h-4" />
                   </button>
                   <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download PDF
                   </button>
                </div>
             </div>

             <div className="flex-1 rounded-2xl border-2 border-dashed border-border bg-background/50 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center mb-6 animate-pulse">
                   <Activity className="w-10 h-10 text-primary opacity-50" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2 underline underline-offset-8 decoration-primary/30 decoration-2 italic">Generating Ledger Visualizations</h4>
                <p className="text-sm text-text-muted max-w-sm">We are aggregating real-time data from ATS pipeline transitions and CRM billing cycles to construct this report.</p>
                
                <div className="mt-8 flex items-center gap-1">
                   {[100, 75, 50, 25].map((h, i) => (
                      <div key={i} className={`w-1 bg-primary rounded-full animate-bounce h-${h}`} style={{ animationDelay: `${i * 0.1}s` }} />
                   ))}
                </div>
             </div>

             <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border">
                {[
                  { label: 'Data Points', value: '1,248' },
                  { label: 'Recruiters', value: '12' },
                  { label: 'Integrations', value: 'ATS, CRM' },
                  { label: 'Format', value: 'PDF / CSV' },
                ].map((meta) => (
                   <div key={meta.label}>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1">{meta.label}</p>
                      <p className="text-sm font-bold text-white uppercase">{meta.value}</p>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TrendingDown = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
);

const Landmark = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg>
);
