'use client';

import { useState } from 'react';
import {
  BarChart3, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, ArrowUpRight, TrendingUp, Handshake,
  UserCheck, IndianRupee, PieChart, Activity, Zap, CheckCircle2,
  Clock, X, MoreHorizontal, TrendingDown, RefreshCcw, Landmark,
  Brain, Layout, ChevronDown, Sparkles, FilterX, Target
} from 'lucide-react';
import { revenues, expenses, financialStats, clients, recruiterEarnings } from '@/lib/mock-data';
import Link from 'next/link';
import { exportToCSV } from '@/lib/export-utils';

export default function PLPage() {
  const [timeframe, setTimeframe] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  const [activeTab, setActiveTab] = useState<'overview' | 'statement' | 'analysis'>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleExport = () => {
    exportToCSV(monthlyPL, `p-and-l-${timeframe.toLowerCase()}`);
  };

  const revenueByClient = clients.map(c => ({
    name: c.name,
    amount: revenues.filter(r => r.clientId === c.id).reduce((acc, current) => acc + current.amount, 0)
  })).sort((a, b) => b.amount - a.amount);

  const profitByRecruiter = recruiterEarnings.map(r => ({
    id: r.recruiterId,
    name: `Recruiter #${r.recruiterId.replace('u', '')}`,
    profit: r.totalRevenue - r.commission
  })).sort((a, b) => b.profit - a.profit);

  const monthlyPL = [
    { month: 'Jan', revenue: 320000, expenses: 210000, margin: 34 },
    { month: 'Feb', revenue: 410000, expenses: 230000, margin: 43 },
    { month: 'Mar', revenue: 380000, expenses: 250000, margin: 34 },
    { month: 'Apr', revenue: 450000, expenses: 220000, margin: 51 },
    { month: 'May', revenue: 390000, expenses: 240000, margin: 38 },
    { month: 'Jun', revenue: 480000, expenses: 260000, margin: 45 },
  ].map(m => ({ ...m, netProfit: m.revenue - m.expenses }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium italic underline underline-offset-4 decoration-primary/20 decoration-2">P&L Intelligence Hub</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">FINANCIAL CAPITAL <span className="text-primary not-italic">ENGINE</span></h1>
          <p className="text-text-secondary mt-1">Real-time profitability manifest, AI forecasting, and categorical drill-downs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface border border-border rounded-xl p-1 shadow-inner">
            {['Overview', 'Statement', 'Analysis'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab.toLowerCase() ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-text-muted hover:text-text-secondary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExport}
            className="px-6 py-2.5 rounded-xl bg-surface border border-border text-white text-sm font-bold hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* AI SMART INSIGHTS Manifesting */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
         <div className="lg:col-span-3 p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
               <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
               <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none">AI Intelligence Manifest</h4>
               <p className="text-xs text-text-muted mt-1 font-medium leading-relaxed">
                  Net Profit manifested at <span className="text-success font-bold">₹{(financialStats.netProfit/1000).toFixed(0)}k</span> (↑14.2% MoM). 
                  High-yield client: <span className="text-primary font-bold">{revenueByClient[0].name}</span> represents 62% of gross placement capital.
                  <span className="ml-2 text-warning italic underline underline-offset-4 decoration-warning/30">Action Required: Operating expenses in 'Marketing' are trending 8% above seasonal forecast.</span>
               </p>
            </div>
         </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {[
              { label: 'Gross Revenue', value: financialStats.totalRevenue, icon: TrendingUp, color: 'text-primary' },
              { label: 'Operating Expenses', value: financialStats.totalExpenses, icon: TrendingDown, color: 'text-danger' },
              { label: 'Net Profit (EBITDA)', value: financialStats.netProfit, icon: Landmark, color: 'text-success' },
              { label: 'Profit Margin (%)', value: '42.4%', icon: Activity, color: 'text-accent' },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-3xl bg-surface border border-border hover:border-primary/30 transition-all shadow-xl shadow-black/20 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-background ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-success uppercase tracking-widest">+12%</span>
                    <span className="text-[8px] text-text-muted uppercase tracking-tighter">vs previous</span>
                  </div>
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1 italic">{stat.label}</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">
                  {typeof stat.value === 'number' ? `₹${(stat.value/1000).toLocaleString()}k` : stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-8 rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-12">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Capital Manifest Trend</h3>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1 italic">Monthly Revenue vs Net Margin Projection</p>
                  </div>
                  <div className="flex items-center gap-4 bg-background px-4 py-2 rounded-xl border border-border">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Revenue</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Net Margin</span>
                     </div>
                  </div>
               </div>
               
               <div className="h-72 flex items-end gap-5 px-4">
                  {monthlyPL.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1.5 h-full group relative">
                       <div className="flex flex-col gap-1 items-center relative h-full justify-end">
                          <div 
                            style={{ height: `${(m.revenue/600000)*100}%` }} 
                            className="w-full max-w-[44px] bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-xl transition-all group-hover:brightness-125 origin-bottom relative z-10"
                          >
                             <div 
                               style={{ height: `${(m.netProfit/m.revenue)*100}%` }}
                               className="absolute bottom-0 left-0 right-0 bg-accent/80 rounded-t-lg z-20 group-hover:brightness-125 transition-all"
                             />
                          </div>
                          
                          {/* Hover Insight */}
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-surface border border-primary/30 p-3 rounded-xl shadow-2xl text-center pointer-events-none z-[100] min-w-[120px] scale-95 group-hover:scale-100 italic">
                             <p className="text-[10px] font-black text-white uppercase mb-1">{m.month} 2024</p>
                             <div className="flex justify-between gap-4 text-xs">
                               <span className="text-text-muted">Rev</span>
                               <span className="font-black text-primary">₹{(m.revenue/1000).toFixed(0)}k</span>
                             </div>
                             <div className="flex justify-between gap-4 text-xs">
                               <span className="text-text-muted">Net</span>
                               <span className="font-black text-success">₹{(m.netProfit/1000).toFixed(0)}k</span>
                             </div>
                             <div className="mt-2 text-[10px] font-black text-accent bg-accent/10 py-1 rounded-lg uppercase tracking-tighter">{m.margin}% Margin Manifest</div>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-text-muted text-center uppercase tracking-widest mt-3 italic">{m.month}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               <div className="p-8 rounded-3xl bg-surface border border-border shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
                  <h3 className="text-lg font-black text-white mb-6 uppercase tracking-tighter italic">AI Forecasting</h3>
                  <div className="space-y-6 relative">
                     {[
                       { label: 'Next Month Revenue', trend: '+14%', value: '₹540k', conf: 92, color: 'primary' },
                       { label: 'Exp. Growth Factor', trend: '-2.4%', value: '0.8x', conf: 88, color: 'accent' },
                     ].map((f, i) => (
                       <div key={i} className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black text-text-muted uppercase tracking-widest italic leading-none">
                             <span>{f.label}</span>
                             <span className="text-success text-xs">{f.trend}</span>
                          </div>
                          <div className="flex justify-between items-end">
                             <p className="text-2xl font-black text-white italic tracking-tighter">{f.value}</p>
                             <div className="flex flex-col items-end">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full bg-${f.color}/10 text-${f.color} uppercase tracking-tighter`}>{f.conf}% Confidence</span>
                             </div>
                          </div>
                          <div className="h-1.5 w-full bg-background rounded-full overflow-hidden border border-border/50">
                             <div className={`h-full bg-${f.color}`} style={{ width: `${f.conf}%` }} />
                          </div>
                       </div>
                     ))}
                     <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mt-4 flex items-center gap-3">
                        <Brain className="w-5 h-5 text-primary shrink-0" />
                        <p className="text-[10px] text-text-muted leading-relaxed font-bold uppercase tracking-wider italic">Historical data manifestation suggests 92% probability of manifesting revenue surplus in Q3.</p>
                     </div>
                  </div>
               </div>

               <div className="p-6 rounded-3xl bg-gradient-to-br from-success/10 to-transparent border border-success/20 group hover:scale-[1.02] transition-all">
                  <div className="flex items-center gap-3 mb-4">
                     <Target className="w-5 h-5 text-success" />
                     <h4 className="text-xs font-black text-white uppercase tracking-widest italic leading-none">Financial Target Manifest</h4>
                  </div>
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-[10px] font-black text-text-muted uppercase italic">Annual Goal Progress</span>
                     <span className="text-sm font-black text-success italic leading-none">₹5.2M / ₹10M</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                     <div className="h-full bg-success" style={{ width: '52%' }} />
                  </div>
               </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'statement' && (
        <div className="p-12 rounded-[40px] bg-surface border border-border shadow-2xl animate-fade-in relative overflow-hidden">
           {/* Watermark Design */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none rotate-[-15deg]">
              <Landmark className="w-[500px] h-[500px]" />
           </div>

           <div className="relative z-10">
              <div className="flex justify-between items-end mb-20">
                 <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic italic-underlined decoration-primary/30">Institutional P&L <span className="text-primary not-italic">Manifest</span></h2>
                    <p className="text-sm text-text-muted font-bold tracking-widest uppercase mt-4">Reporting Period: January 2024 — June 2024</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-2 leading-none">Electronic Ledger Record</p>
                    <p className="text-xl font-bold text-white uppercase italic tracking-tighter">REF: CGT/PL-2024-H1</p>
                 </div>
              </div>

              <div className="space-y-0.5">
                 {/* 1. REVENUE SECTION */}
                 <div className="border-b-2 border-slate-800 pb-2 mb-2">
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'rev' ? null : 'rev')}
                      className="w-full flex justify-between items-center py-4 hover:bg-surface-active px-4 rounded-xl transition-all"
                    >
                       <span className="text-lg font-black text-white uppercase tracking-wider italic">I. Operating Revenue</span>
                       <div className="flex items-center gap-6">
                          <span className="text-xl font-black text-primary italic leading-none">₹{(financialStats.totalRevenue/1000).toFixed(0)}k</span>
                          <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${expandedSection === 'rev' ? 'rotate-180' : ''}`} />
                       </div>
                    </button>
                    {expandedSection === 'rev' && (
                      <div className="bg-background/50 rounded-2xl mx-4 mb-4 overflow-hidden animate-slide-down">
                         {revenueByClient.slice(0, 5).map((r, i) => (
                           <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-border/30 last:border-0 hover:bg-primary/5 transition-all">
                              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{r.name} Capital Inflow</span>
                              <span className="text-sm font-black text-white italic">₹{(r.amount/1000).toFixed(0)}k</span>
                           </div>
                         ))}
                      </div>
                    )}
                 </div>

                 {/* 2. OPERATING EXPENSES SECTION */}
                 <div className="border-b-2 border-slate-800 pb-2 mb-2">
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'exp' ? null : 'exp')}
                      className="w-full flex justify-between items-center py-4 hover:bg-surface-active px-4 rounded-xl transition-all"
                    >
                       <span className="text-lg font-black text-white uppercase tracking-wider italic italic-underlined decoration-danger/30">II. Operating Expenses (OpEx)</span>
                       <div className="flex items-center gap-6">
                          <span className="text-xl font-black text-danger italic leading-none">(₹{(financialStats.totalExpenses/1000).toFixed(0)}k)</span>
                          <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${expandedSection === 'exp' ? 'rotate-180' : ''}`} />
                       </div>
                    </button>
                    {expandedSection === 'exp' && (
                      <div className="bg-background/50 rounded-2xl mx-4 mb-4 overflow-hidden animate-slide-down">
                         {[
                           { name: 'Personnel & Recruiting Payroll', amount: 1200000 },
                           { name: 'Marketing & Digital Acquisition', amount: 450000 },
                           { name: 'Software, SaaS & Infrastructure', amount: 320000 },
                           { name: 'Institutional Operations & Office', amount: 284000 },
                         ].map((e, i) => (
                           <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-border/30 last:border-0">
                              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{e.name}</span>
                              <span className="text-sm font-black text-white italic italic-underlined decoration-danger/20">₹{(e.amount/1000).toLocaleString()}k</span>
                           </div>
                         ))}
                      </div>
                    )}
                 </div>

                 {/* 3. NET INCOME SECTION */}
                 <div className="pt-12">
                    <div className="p-8 rounded-[30px] bg-gradient-to-r from-success/5 directly to-transparent border-2 border-success/30 flex justify-between items-center">
                       <div>
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic italic-underlined decoration-success/30">III. Net Operating Income (Profit)</h3>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] mt-2">Adjusted for institutional depreciation & taxes manifesting</p>
                       </div>
                       <div className="text-right">
                          <p className="text-5xl font-black text-success italic tracking-tighter shadow-success/20 drop-shadow-2xl">₹{(financialStats.netProfit/1000).toLocaleString()}k</p>
                          <div className="flex items-center justify-end gap-2 mt-2">
                             <CheckCircle2 className="w-4 h-4 text-success" />
                             <span className="text-xs font-black text-success uppercase tracking-widest">Manifestation Validated</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-24 pt-12 border-t border-border/50 text-center">
                 <p className="text-[11px] text-text-muted font-bold uppercase tracking-[0.5em] italic">CGT RECRUITAI — CORPORATE FINANCIAL MANIFESTATION ENGINE v1.2</p>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
           {/* Profit per Recruiter Breakdown */}
           <div className="p-8 rounded-3xl bg-surface border border-border shadow-2xl">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter italic mb-8 italic-underlined decoration-primary/30">Top Recruiter Profit Contribution</h3>
              <div className="space-y-8">
                 {profitByRecruiter.slice(0, 5).map((r, i) => (
                   <div key={i} className="space-y-3 group">
                      <div className="flex justify-between items-end">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all text-sm font-black italic">#{i+1}</div>
                            <div>
                               <p className="text-sm font-bold text-white leading-none">{r.name}</p>
                               <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Net Performance Capital</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-lg font-black text-success italic tracking-tighter leading-none">₹{(r.profit/1000).toLocaleString()}k</p>
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-tighter">Contribution manifested</span>
                         </div>
                      </div>
                      <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                         <div className="h-full bg-success opacity-80 group-hover:opacity-100 transition-all" style={{ width: `${(r.profit/profitByRecruiter[0].profit)*100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Client LTV manifested as Profit */}
           <div className="p-8 rounded-3xl bg-surface border border-border shadow-2xl">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter italic mb-8 italic-underlined decoration-accent/30">Client High-Yield Analysis</h3>
              <div className="space-y-8">
                 {revenueByClient.slice(0, 5).map((c, i) => (
                   <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-background/50 border border-border/30 hover:border-accent/40 transition-all cursor-pointer group">
                      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-xl font-black italic shadow-inner">{(c.amount/revenueByClient[0].amount * 10).toFixed(0)}</div>
                      <div className="flex-1 min-w-0">
                         <h4 className="text-base font-black text-white uppercase tracking-tighter truncate">{c.name}</h4>
                         <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5">
                               <RefreshCcw className="w-3 h-3 text-text-muted animate-spin-slow" />
                               <span className="text-[10px] font-black text-text-muted uppercase tracking-widest italic leading-none">Retention: High</span>
                            </div>
                            <span className="text-sm font-black text-white italic tracking-tighter leading-none">₹{(c.amount/1000).toLocaleString()}k manifesting</span>
                         </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                   </div>
                 ))}
                 <div className="p-6 rounded-3xl bg-accent/5 border border-dashed border-accent/20 flex flex-col items-center text-center">
                    <Handshake className="w-8 h-8 text-accent mb-3" />
                    <p className="text-xs text-text-muted font-bold uppercase tracking-widest leading-relaxed">
                       Expanding <span className="text-white italic underlined">Institutional Contracts</span> for the top 3 clients is predicted to manifest an additional ₹1.4M in gross surplus by Q4.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
