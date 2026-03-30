'use client';

import { useState, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, Users, Briefcase, IndianRupee, 
  Clock, Activity, Search, Filter, Download, 
  ChevronRight, Calendar, ArrowUpRight, Target,
  Zap, Brain, Layout, PieChart, Sparkles,
  Share2, Save, Plus, ChevronDown, CheckCircle2,
  AlertCircle, Trophy, Building2, Globe, Settings,
  Mail, Bell, FileText, MousePointer2, Kanban, X, RefreshCcw, Eye,
  ClipboardList, ListChecks, History
} from 'lucide-react';
import { 
  candidates, jobs, revenues, expenses, 
  financialStats, recruiterEarnings, clients, invoices 
} from '@/lib/mock-data';
import Link from 'next/link';
import { exportToCSV } from '@/lib/export-utils';

type ReportTab = 'overview' | 'recruitment' | 'finance' | 'performance' | 'client' | 'ai' | 'custom' | 'scheduled';

interface SavedReport {
  id: string;
  name: string;
  type: string;
  lastGenerated: string;
}

interface ScheduledReport {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  recipients: string[];
  status: 'Active' | 'Paused';
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('overview');
  const [reportDate, setReportDate] = useState('This Month');
  const [showDrillDown, setShowDrillDown] = useState<{title: string, data: any[]} | null>(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([
    { id: '1', name: 'Monthly Financial Audit', type: 'Financial', lastGenerated: '2h ago' },
    { id: '2', name: 'Recruiter Variance H1', type: 'Performance', lastGenerated: 'Yesterday' },
    { id: '3', name: 'AI Sourcing Efficiency', type: 'AI Insights', lastGenerated: '3d ago' }
  ]);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([
    { id: '1', name: 'Executive Revenue Summary', frequency: 'Weekly', recipients: ['ceo@cgt.ai', 'cfo@cgt.ai'], status: 'Active' },
    { id: '2', name: 'Recruiter Yield manifest', frequency: 'Monthly', recipients: ['hr-leads@cgt.ai'], status: 'Active' },
    { id: '3', name: 'Daily Sourcing Metrics', frequency: 'Daily', recipients: ['recruitment-ops@cgt.ai'], status: 'Paused' }
  ]);

  const handleExport = (data: any[], filename: string) => {
    exportToCSV(data, filename);
  };

  const regenerateAiSummary = () => {
    setAiSummaryLoading(true);
    setTimeout(() => setAiSummaryLoading(false), 2000);
  };

  const stats = useMemo(() => {
    const multiplier = reportDate === 'This Month' ? 1 : 0.85; 
    return {
      candidates: Math.floor(1240 * multiplier),
      jobs: Math.floor(42 * multiplier),
      hires: Math.floor(12 * multiplier),
      rev: financialStats.totalRevenue * multiplier
    };
  }, [reportDate]);

  const revenueByClient = clients.map(c => ({
    id: c.id,
    name: c.name,
    amount: revenues.filter(r => r.clientId === c.id).reduce((acc, current) => acc + current.amount, 0),
    activeJobs: jobs.filter(j => j.clientId === c.id).length,
    hires: candidates.filter(cand => cand.status === 'hired' && cand.clientId === c.id).length
  })).sort((a, b) => b.amount - a.amount);

  const recruitmentMetrics = [
    { label: 'LinkedIn', value: '42%', color: 'text-[#0A66C2]', count: 520 },
    { label: 'Direct Referrals', value: '64%', color: 'text-success', count: 180 },
    { label: 'Company Careers', value: '28%', color: 'text-accent', count: 340 },
    { label: 'AI Sourcing', value: '31%', color: 'text-purple-500', count: 200 },
  ];

  return (
    <div className="space-y-6">
      {/* Institutional Intelligence Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium uppercase tracking-[0.2em] text-[10px]">Intelligence Manifest</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">REPORTS <span className="text-primary not-italic">& ANALYTICS</span></h1>
          <p className="text-text-secondary mt-1">Institutional data aggregation, performance manifests, and predictive insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface border border-border rounded-2xl p-1 shadow-inner overflow-x-auto max-w-[800px] no-scrollbar">
            {[
              { id: 'overview', icon: Layout, label: 'Overview' },
              { id: 'recruitment', icon: Kanban, label: 'Recruitment' },
              { id: 'finance', icon: IndianRupee, label: 'Finance' },
              { id: 'performance', icon: Trophy, label: 'Performance' },
              { id: 'client', icon: Building2, label: 'Client' },
              { id: 'ai', icon: Brain, label: 'AI Insights' },
              { id: 'custom', icon: Settings, label: 'Custom' },
              { id: 'scheduled', icon: Clock, label: 'Scheduled' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-text-muted hover:text-text-secondary'}`}
              >
                <tab.icon className="w-3 h-3" />
                {tab.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowCustomModal(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold hover:shadow-xl hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Build Report
          </button>
        </div>
      </div>

      {/* PERIOD SELECTOR */}
      <div className="flex bg-surface border border-border rounded-xl p-1 shadow-inner w-fit">
        {['This Month', 'Last Month', 'Q1 2024', 'Annual'].map((d) => (
          <button 
            key={d}
            onClick={() => setReportDate(d)}
            className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${reportDate === d ? 'bg-background border border-border text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          {/* AI SUMMARY BANNER */}
          <div className="p-1 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-gradient-x shadow-2xl">
            <div className="bg-surface/90 backdrop-blur-3xl p-6 rounded-[22px] flex flex-col md:flex-row items-center gap-8 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
               <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(108,92,231,0.3)] animate-pulse">
                     <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                     <h4 className="text-base font-black text-white uppercase tracking-widest leading-none italic">AI Executive Insights</h4>
                     <p className="text-[10px] text-text-muted mt-1 font-bold uppercase tracking-[0.2em]">{reportDate} Manifestation</p>
                  </div>
               </div>
               <div className="flex-1 relative z-10">
                  {aiSummaryLoading ? (
                    <div className="space-y-2">
                       <div className="h-4 w-3/4 bg-white/5 rounded-lg animate-pulse" />
                       <div className="h-3 w-1/2 bg-white/5 rounded-lg animate-pulse" />
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-text-muted italic leading-relaxed border-l-2 border-primary/30 pl-6">
                       Hiring velocity improved by <span className="text-success font-black">12.4%</span> this period. The neural engine identified <span className="text-white font-black italic underline decoration-primary/40">Direct Referrals</span> as the 64% yield source. 
                       <span className="ml-2 bg-primary/10 px-2 py-0.5 rounded text-[10px] font-black text-primary uppercase tracking-tighter cursor-pointer hover:bg-primary hover:text-white transition-all">Optimize mandates →</span>
                    </p>
                  )}
               </div>
               <button 
                 onClick={regenerateAiSummary}
                 className="px-5 py-2.5 border border-primary/20 rounded-xl text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center gap-2 group relative z-10"
               >
                  <RefreshCcw className={`w-4 h-4 ${aiSummaryLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  {aiSummaryLoading ? 'Manifesting...' : 'Sync Data'}
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Candidates', value: stats.candidates.toLocaleString(), icon: Users, color: 'text-primary', drill: candidates },
              { label: 'Live Mandates', value: stats.jobs.toLocaleString(), icon: Briefcase, color: 'text-accent', drill: jobs },
              { label: 'Hires Manifested', value: stats.hires.toLocaleString(), icon: CheckCircle2, color: 'text-success', drill: candidates.slice(0, 12) },
              { label: 'Capital Surplus', value: `₹${(stats.rev/1000).toFixed(0)}k`, icon: IndianRupee, color: 'text-warning', drill: revenues },
            ].map((stat) => (
              <div 
                key={stat.label} 
                onClick={() => setShowDrillDown({ title: stat.label, data: stat.drill })}
                className="p-8 rounded-[32px] bg-surface border border-border hover:border-primary/40 transition-all shadow-xl group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <stat.icon className="w-16 h-16" />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-background ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform shadow-inner`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-black text-success flex items-center gap-1">↑ 8.2% <TrendingUp className="w-3 h-3" /></span>
                     <p className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1 italic">Growth Manifest</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-white tracking-tighter italic">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border shadow-2xl relative">
               <div className="flex items-center justify-between mb-12 relative z-10">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Hiring Funnel <span className="text-primary not-italic">Manifest</span></h3>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] mt-1 italic decoration-primary/20 underline">Institutional Conversion Metrics</p>
                  </div>
                  <button onClick={() => handleExport(candidates, 'hiring-funnel-manifest')} className="p-3 rounded-xl bg-background border border-border hover:text-primary transition-all shadow-sm"><Download className="w-5 h-5" /></button>
               </div>
               <div className="space-y-8">
                  {[
                    { stage: 'Candidates Sourced', count: stats.candidates, color: 'bg-primary' },
                    { stage: 'Institutional Interviews', count: Math.floor(stats.candidates * 0.35), color: 'bg-accent' },
                    { stage: 'Technical Manifestation', count: Math.floor(stats.candidates * 0.1), color: 'bg-purple-500' },
                    { stage: 'Hires Manifested', count: stats.hires, color: 'bg-success' },
                  ].map((s, i) => (
                    <div key={i} className="group cursor-pointer" onClick={() => setShowDrillDown({ title: s.stage, data: candidates.slice(0, 15) })}>
                       <div className="flex justify-between items-end mb-3">
                          <span className="text-xs font-black text-white uppercase tracking-[0.2em] italic">{s.stage}</span>
                          <span className="text-lg font-black text-white italic tracking-tighter">{s.count}</span>
                       </div>
                       <div className="h-4 w-full bg-background rounded-full overflow-hidden border border-border/50 p-1 shadow-inner">
                          <div className={`h-full ${s.color} rounded-full shadow-lg transition-all duration-1000 group-hover:brightness-125`} style={{ width: `${(s.count/stats.candidates)*100}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-10 rounded-[40px] bg-surface border border-border shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
               <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-4 italic-underlined decoration-primary/30">Top Performance Leaders</h3>
               <div className="space-y-8">
                  {recruiterEarnings.sort((a,b) => b.totalRevenue - a.totalRevenue).slice(0, 4).map((r, i) => (
                    <div key={i} className="flex items-center gap-5 group/item cursor-pointer" onClick={() => setShowDrillDown({ title: `Recruiter Performance: ${r.recruiterId}`, data: [r] })}>
                       <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary font-black italic shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all transform group-hover/item:scale-110">#{i+1}</div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-white leading-none uppercase truncate group-hover/item:text-primary transition-colors italic">Recruiter {r.recruiterId.replace('u', '')}</p>
                          <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-1.5 italic decoration-primary/20">Placements: 4 High-Threshold</p>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-black text-success leading-none italic tracking-tighter">₹{(r.totalRevenue/1000).toFixed(0)}k</p>
                          <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mt-1 italic">Manifested</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button onClick={() => setActiveTab('performance')} className="w-full mt-12 py-4 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest transition-all italic hover:tracking-[0.2em]">Full Performance Deep-Dive</button>
            </div>
          </div>
        </div>
      )}

      {/* RECRUITMENT TAB */}
      {activeTab === 'recruitment' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border shadow-2xl relative">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                       <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Hiring Velocity <span className="text-primary not-italic">Matrix</span></h3>
                       <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1 italic border-b border-primary/20 pb-1">Average Sourcing lifecycle period: 18.4 Days</p>
                    </div>
                    <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner" onClick={() => handleExport(candidates, 'hiring-velocity-manifest')}><Search className="w-5 h-5" /></button>
                  </div>
                  <div className="h-72 flex items-end gap-5 px-4">
                     {[12, 18, 14, 22, 16, 19, 15, 18, 20, 17].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setShowDrillDown({ title: `Velocity Report: Month ${i+1}`, data: candidates.slice(0, 10) })}>
                           <div className="w-full flex flex-col justify-end h-56 relative overflow-hidden rounded-xl">
                              <div style={{ height: `${(h/30)*100}%` }} className="w-full bg-gradient-to-t from-primary/10 via-primary/40 to-primary rounded-xl transition-all group-hover:scale-y-110 origin-bottom shadow-lg shadow-primary/10" />
                              <div className="absolute inset-x-0 top-0 h-1 bg-white/5" />
                           </div>
                           <span className="text-[8px] font-black text-text-muted uppercase italic tracking-widest transform group-hover:scale-110 group-hover:text-white transition-all">M-{i+1}</span>
                        </div>
                     ))}
                  </div>
              </div>

              <div className="p-10 rounded-[40px] bg-surface border border-border shadow-2xl space-y-8 flex flex-col justify-between overflow-hidden relative group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-8 italic-underlined decoration-primary/30">Conversion Yield Summary</h3>
                 <div className="space-y-10 flex-1 py-4">
                    {[
                      { stage: 'Screening to Tech Call', yield: 42, count: 520 },
                      { stage: 'Tech Call to Final', yield: 28, count: 218 },
                      { stage: 'Final to Offer Manifest', yield: 64, count: 61 },
                      { stage: 'Offer Acceptance Rate', yield: 92, count: 39 },
                    ].map((s, i) => (
                      <div key={i} className="group cursor-pointer" onClick={() => setShowDrillDown({ title: s.stage, data: candidates.slice(0, 10) })}>
                         <div className="flex justify-between items-end mb-2">
                            <p className="text-xs font-black text-white uppercase italic tracking-tighter leading-none">{s.stage}</p>
                            <span className="text-[10px] font-black text-text-muted italic">{s.yield}% Yield</span>
                         </div>
                         <div className="h-4 w-full bg-background rounded-full p-1 border border-border">
                            <div className="h-full bg-gradient-to-r from-primary/30 to-primary rounded-full transition-all duration-1000 group-hover:brightness-125 shadow-lg shadow-primary/20" style={{ width: `${s.yield}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FINANCE TAB */}
      {activeTab === 'finance' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-12 rounded-[50px] bg-surface border border-border shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity"><IndianRupee className="w-48 h-48" /></div>
                 <div className="flex items-center justify-between mb-12">
                    <div>
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Capital <span className="text-primary not-italic">Stewardship</span></h3>
                       <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.4em] mt-2 italic decoration-primary/20 underline">Revenue vs. Operational capital attrition</p>
                    </div>
                    <Link href="/dashboard/finance" className="p-4 rounded-2xl bg-background border border-border hover:text-primary transition-all shadow-xl group-hover:scale-110"><ArrowUpRight className="w-6 h-6" /></Link>
                 </div>
                 <div className="h-72 flex items-end gap-3 px-2 relative z-10">
                    {revenues.slice(0, 12).map((r, i) => (
                       <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 h-full group/item cursor-pointer" onClick={() => setShowDrillDown({ title: `Finance Report Q${Math.ceil((i+1)/3)}`, data: [r] })}>
                          <div style={{ height: `${(r.amount/250000)*100}%` }} className="w-full bg-gradient-to-t from-primary/10 to-primary/80 rounded-t-xl transition-all group-hover/item:scale-y-110 origin-bottom border-x border-t border-primary/20 shadow-lg shadow-primary/5" />
                          <div style={{ height: `${(expenses[i % expenses.length]?.amount/250000)*100}%` }} className="w-full bg-danger/20 rounded-t-xl transition-all group-hover/item:scale-y-110 origin-bottom border-x border-t border-danger/20 shadow-inner" />
                          <span className="text-[8px] font-black text-text-muted text-center uppercase tracking-widest mt-2 transform group-hover/item:scale-110 group-hover:text-white transition-all">Q{Math.ceil((i+1)/3)}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-12 rounded-[50px] bg-surface border border-border shadow-2xl flex flex-col justify-between overflow-hidden relative">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-6 italic-underlined decoration-success/30">Client Capital Manifest Leaderboard</h3>
                 <div className="space-y-8 flex-1 py-4">
                    {revenueByClient.slice(0, 5).map((c, i) => (
                       <div key={i} className="flex items-center gap-6 group cursor-pointer" onClick={() => setShowDrillDown({ title: `Client Capital Report: ${c.name}`, data: revenues.filter(r => r.clientId === c.id) })}>
                          <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary font-black italic shadow-inner group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">#{i+1}</div>
                          <div className="flex-1 min-w-0">
                             <p className="text-base font-black text-white uppercase italic truncate tracking-tighter italic-underlined decoration-primary/10">{c.name}</p>
                             <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1 italic">Primary Institutional Partner</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CLIENT REPORTS TAB: NEW */}
      {activeTab === 'client' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Clients', value: clients.length, icon: Building2, color: 'text-primary' },
                { label: 'Avg Revenue / Client', value: '₹142k', icon: IndianRupee, color: 'text-success' },
                { label: 'Active Jobs Manifest', value: jobs.length, icon: Briefcase, color: 'text-accent' },
              ].map(stat => (
                <div key={stat.label} className="p-8 rounded-[35px] bg-surface border border-border shadow-xl">
                    <div className={`p-4 rounded-2xl bg-background ${stat.color} bg-opacity-10 w-fit mb-4`}><stat.icon className="w-6 h-6" /></div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</p>
                </div>
              ))}
           </div>

           <div className="p-10 rounded-[45px] bg-surface border border-border shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-6 italic-underlined decoration-primary/30">Client Engagement & Success Manifest</h3>
              <table className="w-full">
                 <thead className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic border-b border-border/50">
                    <tr>
                       <th className="text-left pb-6 px-4">Institutional Client</th>
                       <th className="text-left pb-6 px-4">Open Roles</th>
                       <th className="text-left pb-6 px-4">Hires Manifested</th>
                       <th className="text-left pb-6 px-4">Capital Yield</th>
                       <th className="text-right pb-6 px-4">Success Rate</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-border/30">
                    {revenueByClient.map((c, i) => (
                       <tr key={i} className="group hover:bg-primary/5 transition-all cursor-pointer" onClick={() => setShowDrillDown({ title: `Client Detail: ${c.name}`, data: revenues.filter(r => r.clientId === c.id) })}>
                          <td className="py-6 px-4">
                             <p className="text-sm font-black text-white uppercase italic">{c.name}</p>
                          </td>
                          <td className="py-6 px-4 font-black text-white italic tracking-tighter">{c.activeJobs} Mandates</td>
                          <td className="py-6 px-4 font-black text-accent italic tracking-tighter">{c.hires} Hires</td>
                          <td className="py-6 px-4 font-black text-success italic tracking-tighter">₹{(c.amount/1000).toFixed(0)}k</td>
                          <td className="py-6 px-4 text-right pr-10">
                             <div className="flex items-center justify-end gap-3">
                                <span className="text-[10px] font-black text-white italic">{( (c.hires / (c.activeJobs || 1)) * 100 ).toFixed(0)}%</span>
                                <div className="w-24 h-2 bg-background rounded-full overflow-hidden border border-border">
                                   <div className="h-full bg-primary" style={{ width: `${(c.hires / (c.activeJobs || 1)) * 100}%` }} />
                                </div>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* SCHEDULED REPORTS TAB: NEW */}
      {activeTab === 'scheduled' && (
        <div className="space-y-8 animate-fade-in">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Automated <span className="text-primary not-italic">Manifests</span></h3>
                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1 italic decoration-primary/20 underline">Scheduled institutional data distributions</p>
              </div>
              <button className="px-6 py-3 rounded-2xl bg-primary text-white text-sm font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-primary/25 transition-all">
                 <Plus className="w-4 h-4" /> New Schedule
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scheduledReports.map((s, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-surface border border-border shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Clock className="w-12 h-12" /></div>
                    <div className="flex justify-between items-start mb-6">
                       <div className={`p-4 rounded-2xl bg-background ${s.status === 'Active' ? 'text-success' : 'text-text-muted'} bg-opacity-10`}><History className="w-6 h-6" /></div>
                       <span className={`text-[10px] font-black px-4 py-1.5 rounded-full ${s.status === 'Active' ? 'bg-success/10 text-success border-success/20' : 'bg-background text-text-muted border-border'} border uppercase tracking-widest italic`}>{s.status}</span>
                    </div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tighter italic mb-2">{s.name}</h4>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest italic mb-6">Frequency: <span className="text-primary">{s.frequency}</span></p>
                    
                    <div className="space-y-4 mb-8">
                       <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em] italic">Recipients Matrix:</p>
                       <div className="flex flex-wrap gap-2">
                          {s.recipients.map(r => (
                             <span key={r} className="px-3 py-1 bg-background border border-border rounded-lg text-[9px] font-black text-white italic">{r}</span>
                          ))}
                       </div>
                    </div>

                    <div className="flex gap-4 border-t border-border pt-6">
                       <button className="flex-1 py-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all text-[10px] font-black uppercase tracking-widest italic">Edit Logic</button>
                       <button className="flex-1 py-3 rounded-xl bg-background border border-border text-text-muted hover:text-danger hover:border-danger/30 transition-all text-[10px] font-black uppercase tracking-widest italic">{s.status === 'Active' ? 'Pause' : 'Resume'}</button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* AI INSIGHTS TAB */}
      {activeTab === 'ai' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-12 rounded-[50px] bg-gradient-to-br from-primary/10 via-surface to-background border border-primary/20 shadow-2xl relative overflow-hidden group">
                 <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="w-40 h-40 border-[10px] border-primary/20 border-t-primary rounded-full animate-spin-slow flex items-center justify-center relative shadow-2xl">
                       <div className="text-center">
                          <p className="text-3xl font-black text-white italic tracking-tighter">94.2%</p>
                          <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">Accuracy</p>
                       </div>
                    </div>
                    <div className="flex-1 space-y-6">
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic italic-underlined decoration-primary/30">Neural Match Engine Intelligence</h3>
                       <p className="text-sm font-medium text-text-muted italic leading-relaxed border-l-2 border-primary/30 pl-4 uppercase tracking-[0.05em]">Predictive analysis manifest identifies surplus skill gaps in Cloud Architecture.</p>
                       <button className="px-6 py-2.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg italic">View Match Detail manifest</button>
                    </div>
                 </div>
              </div>
              <div className="p-12 rounded-[50px] bg-surface border border-border shadow-2xl flex flex-col justify-between overflow-hidden relative">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-8 italic-underlined decoration-accent/30">Skill Matrix Distribution</h3>
                 <div className="space-y-8 flex-1 py-4">
                    {[
                      { skill: 'TypeScript / React Engineering', match: 92 },
                      { skill: 'Distributed Systems Architecture', match: 78 },
                      { skill: 'Neural Language Processing', match: 64 },
                      { skill: 'DevOps & Pipeline Automation', match: 88 },
                    ].map((s, i) => (
                      <div key={i} className="group cursor-pointer">
                         <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-black text-white uppercase italic tracking-tighter">{s.skill}</p>
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest italic">{s.match}% Neural Match</span>
                         </div>
                         <div className="h-5 w-full bg-background rounded-xl p-1 border border-border overflow-hidden group-hover:border-primary/50 transition-all">
                            <div className="h-full bg-gradient-to-r from-primary/30 to-primary rounded-lg transition-all duration-1000 group-hover:scale-x-105 origin-left shadow-lg shadow-primary/20" style={{ width: `${s.match}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PERFORMANCE TAB */}
      {activeTab === 'performance' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border shadow-2xl relative overflow-hidden">
                 <div className="flex items-center justify-between mb-10">
                    <div>
                       <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Recruiter <span className="text-primary not-italic">Yield Matrix</span></h3>
                       <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1 italic border-b border-primary/20 pb-1">Sourcing Efficiency vs. Placement Capital</p>
                    </div>
                    <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white" onClick={() => handleExport(recruiterEarnings, 'recruiter-performance-yield')}><Download className="w-5 h-5" /></button>
                 </div>
                 <div className="h-80 flex items-end gap-6 px-4">
                    {recruiterEarnings.slice(0, 10).map((r, i) => (
                       <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer" onClick={() => setShowDrillDown({ title: `Yield Report: Recruiter ${r.recruiterId}`, data: [r] })}>
                          <div className="w-full flex flex-col justify-end gap-1 h-64 relative">
                             <div style={{ height: `${(r.totalRevenue/financialStats.totalRevenue)*500}%` }} className="w-full bg-primary/20 rounded-t-xl group-hover:bg-primary/40 transition-all border-x border-t border-primary/20 shadow-inner" />
                             <div style={{ height: `${(r.totalRevenue/financialStats.totalRevenue)*500}%` }} className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-xl transition-all group-hover:brightness-125 shadow-lg shadow-primary/20" />
                          </div>
                          <span className="text-[10px] font-black text-text-muted uppercase italic mt-2 transform group-hover:scale-110 group-hover:text-white transition-all">R{r.recruiterId.replace('u','')}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-10 rounded-[40px] bg-surface border border-border shadow-2xl flex flex-col justify-between overflow-hidden relative group">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-8 italic-underlined decoration-accent/30">Efficiency KPI Matrix</h3>
                 <div className="space-y-10 flex-1 py-4">
                    {[
                      { label: 'Avg Sourcing Depth', value: '142 candidates', trend: '+12%', color: 'text-primary' },
                      { label: 'Interview Conversion', value: '31.4%', trend: '+4.2%', color: 'text-accent' },
                      { label: 'Placement Velocity', value: '18.2 days', trend: '-2.1d', color: 'text-success' },
                      { label: 'Client Satisfaction', value: '4.8/5.0', trend: '+0.2', color: 'text-warning' },
                    ].map((kpi, i) => (
                      <div key={i} className="group cursor-pointer">
                         <div className="flex justify-between items-center mb-3">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic leading-none">{kpi.label}</p>
                            <span className={`text-[10px] font-black ${kpi.trend.includes('+') ? 'text-success' : 'text-danger'} flex items-center gap-1`}>{kpi.trend} <TrendingUp className="w-3 h-3" /></span>
                         </div>
                         <p className={`text-2xl font-black ${kpi.color} italic tracking-tighter group-hover:scale-105 transition-transform origin-left`}>{kpi.value}</p>
                         <div className="h-1 w-full bg-background rounded-full mt-3 overflow-hidden">
                            <div className={`h-full bg-current ${kpi.color} opacity-20`} style={{ width: '70%' }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* CUSTOM REPORTS TAB */}
      {activeTab === 'custom' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
           <div className="p-10 rounded-[45px] bg-surface border border-border shadow-2xl lg:col-span-2 space-y-12">
              <div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Custom Report Architecture</h3>
                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.4em] mt-1 italic-underlined decoration-primary/20">Drag-and-drop institutional data logic manifests</p>
              </div>
              <div 
                className="p-20 rounded-[40px] bg-background/50 border-4 border-dashed border-border flex flex-col items-center text-center group cursor-pointer hover:border-primary/50 transition-all shadow-inner relative overflow-hidden"
                onClick={() => setShowCustomModal(true)}
              >
                 <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-20 h-20 rounded-3xl bg-surface border border-border flex items-center justify-center text-text-muted mb-8 group-hover:scale-110 transition-transform group-hover:text-primary shadow-xl group-hover:shadow-primary/10 relative z-10"><Plus className="w-10 h-10" /></div>
                 <h4 className="text-lg font-black text-white uppercase tracking-tighter italic relative z-10">Add Strategic Data Dimension</h4>
                 <p className="text-[10px] text-text-muted uppercase tracking-widest mt-3 max-w-xs font-bold italic opacity-60 leading-relaxed relative z-10">Manifest complex logic into the calculation manifold.</p>
              </div>
           </div>
           <div className="p-10 rounded-[45px] bg-surface border border-border shadow-2xl space-y-8 flex flex-col justify-between">
              <div className="space-y-8">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic italic-underlined decoration-accent/30 flex justify-between items-center">Saved Manifests</h3>
                 <div className="space-y-6">
                    {savedReports.map((t, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-background border border-border hover:border-accent/50 transition-all flex items-center justify-between group cursor-pointer animate-fade-in relative overflow-hidden">
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-all" />
                         <div className="flex-1 min-w-0 ml-2">
                            <p className="text-sm font-black text-white uppercase italic truncate group-hover:text-accent transition-colors">{t.name}</p>
                            <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1.5 italic">Category: {t.type} • Status: Manifested</p>
                         </div>
                         <div className="flex gap-3 relative z-10">
                            <button onClick={(e) => { e.stopPropagation(); setShowShareModal(t.id); }} className="p-3 rounded-xl bg-surface border border-border text-text-muted hover:text-accent hover:border-accent transition-all shadow-md"><Share2 className="w-4 h-4" /></button>
                            <button className="p-3 rounded-xl bg-surface border border-border text-text-muted hover:text-accent hover:border-accent transition-all shadow-md"><RefreshCcw className="w-4 h-4" /></button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* DRILL DOWN MODAL */}
      {showDrillDown && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-[300] flex items-center justify-center p-6">
           <div className="w-full max-w-5xl bg-surface border border-border rounded-[50px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-scale-up">
              <div className="p-10 border-b border-border flex justify-between items-center bg-background/50 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-full bg-primary/5 -skew-x-12 translate-x-32" />
                 <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">{showDrillDown.title} <span className="text-primary not-italic">Drill-Down Matrix</span></h3>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.5em] mt-2 italic decoration-primary/20">Institutional Transaction Manifest</p>
                 </div>
                 <button onClick={() => setShowDrillDown(null)} className="p-4 rounded-2xl bg-surface hover:bg-danger hover:text-white transition-all shadow-xl relative z-10"><X className="w-7 h-7" /></button>
              </div>
              <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 <table className="w-full text-left">
                    <thead className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic border-b border-border">
                       <tr>
                          <th className="py-6 px-4 bg-background/30 rounded-l-2xl">Identity Reference</th>
                          <th className="py-6 px-4 bg-background/30">Primary manifest</th>
                          <th className="py-6 px-4 bg-background/30">Capital Dimension</th>
                          <th className="text-right py-6 px-4 bg-background/30 rounded-r-2xl">Status Manifest</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                       {showDrillDown.data.map((item: any, i) => (
                         <tr key={i} className="hover:bg-primary/5 transition-all group border-b border-border/10 last:border-none">
                            <td className="py-8 px-4 text-sm font-black text-white italic tracking-tighter">{item.id || item.recruiterId || `MD-INSTITUTIONAL-${i+100}`}</td>
                            <td className="py-8 px-4 font-bold text-text-primary group-hover:text-primary transition-colors text-sm">{item.name || item.fullName || item.recruiterId || 'Institutional Entity'}</td>
                            <td className="py-8 px-4 text-base font-black text-success italic leading-none">{item.amount ? `₹${(item.amount/1000).toFixed(0)}k` : item.totalRevenue ? `₹${(item.totalRevenue/1000).toFixed(0)}k` : 'MANIFESTED'}</td>
                            <td className="py-8 px-4 text-right">
                               <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter italic">Verified Manifest</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="p-10 bg-background/50 border-t border-border flex justify-between items-center">
                 <p className="text-xs text-text-muted font-bold uppercase tracking-[0.2em] italic">Record Count: <span className="text-white">{showDrillDown.data.length} entries manifested</span></p>
                 <button onClick={() => handleExport(showDrillDown.data, `drilldown-${showDrillDown.title.toLowerCase().replace(' ', '-')}`)} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(108,92,231,0.4)] transition-all flex items-center gap-3"><Download className="w-5 h-5" /> Manifest CSV Intelligence</button>
              </div>
           </div>
        </div>
      )}

      {/* CUSTOM BUILDER MODAL */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[400] flex items-center justify-center p-6">
           <div className="w-full max-w-3xl bg-surface border border-border rounded-[60px] overflow-hidden shadow-2xl animate-scale-up">
              <div className="p-12 text-center bg-background/50 border-b border-border">
                 <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Strategic <span className="text-primary not-italic">Manifest</span></h3>
                 <p className="text-xs text-text-muted font-bold uppercase tracking-[0.5em] mt-3 italic decoration-primary/40 underline">Institutional Business Intelligence Configuration</p>
              </div>
              <div className="p-12 space-y-12 bg-surface">
                 <div className="grid grid-cols-2 gap-6">
                    {['Hiring High-Tier Matrix', 'Capital Yield Audit', 'Neural Match Accuracy', 'Client Pulse Manifest'].map(l => (
                      <button key={l} className="p-6 rounded-[28px] bg-background border border-border text-left hover:border-primary/50 transition-all group shadow-inner">
                         <p className="text-sm font-black text-white uppercase tracking-widest leading-none group-hover:text-primary transition-colors italic">{l}</p>
                         <p className="text-[9px] text-text-muted uppercase mt-3 italic font-bold">Institutional Standard Base</p>
                      </button>
                    ))}
                 </div>
                 <div className="flex gap-6">
                    <button className="flex-1 py-5 rounded-3xl bg-surface border border-border text-[11px] font-black text-white uppercase tracking-widest hover:bg-surface-active transition-all italic hover:tracking-[0.2em]" onClick={() => setShowCustomModal(false)}>Abort Configuration</button>
                    <button onClick={() => { setShowCustomModal(false); setIsGenerating(true); setTimeout(() => { setIsGenerating(false); setSavedReports([{ id: Date.now().toString(), name: 'Strategic Manifest ' + (savedReports.length + 1), type: 'Institutional', lastGenerated: 'Just now' }, ...savedReports]); setActiveTab('custom'); }, 2000); }} className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-primary to-primary-dark text-white text-[11px] font-black uppercase tracking-widest hover:shadow-[0_0_50px_rgba(108,92,231,0.5)] transition-all flex items-center justify-center gap-3 italic"><Zap className="w-5 h-5" /> Execute Manifest</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[500] flex items-center justify-center p-6">
           <div className="w-full max-w-md bg-surface border border-border rounded-[40px] p-10 text-center shadow-2xl animate-scale-up">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 shadow-xl shadow-primary/5"><Share2 className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Share Intelligence</h3>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-2 mb-10 decoration-primary/20 underline italic italic-underlined decoration-primary/10">Stakeholder Distribution manifest</p>
              <div className="space-y-4">
                 {['Copy Strategic Link', 'Email Stakeholders'].map(action => (
                   <div key={action} className="p-4 rounded-2xl bg-background border border-border flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all shadow-inner">
                      <p className="text-xs font-black text-white uppercase italic">{action}</p>
                      <Share2 className="w-4 h-4 text-text-muted group-hover:text-primary" />
                   </div>
                 ))}
              </div>
              <button onClick={() => setShowShareModal(null)} className="w-full mt-10 py-4 rounded-2xl bg-surface border border-border text-[10px] font-black text-white uppercase tracking-widest hover:bg-surface-active transition-all italic hover:shadow-xl">Abort Institutional Share</button>
           </div>
        </div>
      )}
    </div>
  );
}
