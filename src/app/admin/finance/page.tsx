'use client';

import { 
  IndianRupee, ArrowUpRight, ArrowDownLeft, Search, Filter, 
  Download, Plus, ChevronRight, BarChart3, Activity, 
  Database, FileText, CheckCircle2, Clock, MoreVertical,
  Briefcase, Building2, UserCheck, Shield, Globe, TrendingUp
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const financialData = [
  { month: 'Oct', revenue: 4200000, profit: 3100000 },
  { month: 'Nov', revenue: 3800000, profit: 2800000 },
  { month: 'Dec', revenue: 5100000, profit: 4200000 },
  { month: 'Jan', revenue: 4700000, profit: 3800000 },
  { month: 'Feb', revenue: 5800000, profit: 4900000 },
  { month: 'Mar', revenue: 6400000, profit: 5500000 },
];

const transactions = [
  { id: 't1', client: 'Acme Corp', action: 'Strategic Placement Fee', amount: '₹12,40,000', status: 'Settled', date: '2024-03-30', type: 'Credit', icon: UserCheck, color: 'text-success' },
  { id: 't2', client: 'Neural Systems', action: 'Subscription Renewal', amount: '₹4,50,000', status: 'Pending', date: '2024-03-29', type: 'Credit', icon: Database, color: 'text-primary' },
  { id: 't3', client: 'Infrastructure Corp', action: 'Integration Mandate', amount: '₹8,20,000', status: 'Settled', date: '2024-03-28', type: 'Credit', icon: Zap, color: 'text-accent' },
  { id: 't4', client: 'AWS India', action: 'Neural Node Uptime Fee', amount: '-₹1,20,000', status: 'Settled', date: '2024-03-27', type: 'Debit', icon: Shield, color: 'text-danger' },
];

export default function CapitalFlow() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Strategic Capital */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Strategic Capital Stewardship</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Capital <span className="text-primary not-italic">Flow</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manifest Audited Report
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Disburse Strategic Capital
           </button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 rounded-[40px] bg-surface border border-border overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            <div className="flex flex-col relative z-10">
               <div className="p-3 rounded-xl bg-background border border-border w-fit text-primary shadow-inner mb-6">
                  <TrendingUp className="w-6 h-6" />
               </div>
               <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-2">Institutional Revenue (FY24)</p>
               <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">₹6.4 <span className="text-2xl">Cr</span></h3>
               <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-success uppercase italic">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +18% Institutional Growth
               </div>
            </div>
         </div>
         <div className="p-8 rounded-[40px] bg-surface border border-border overflow-hidden relative group">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
            <div className="flex flex-col relative z-10">
               <div className="p-3 rounded-xl bg-background border border-border w-fit text-accent shadow-inner mb-6">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
               <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-2">Strategic Profit Margin</p>
               <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">84.2 <span className="text-2xl">%</span></h3>
               <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-success uppercase italic">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Optimal Efficiency Manifested
               </div>
            </div>
         </div>
         <div className="p-8 rounded-[40px] bg-surface border border-border overflow-hidden relative group">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-warning/10 blur-3xl rounded-full" />
            <div className="flex flex-col relative z-10">
               <div className="p-3 rounded-xl bg-background border border-border w-fit text-warning shadow-inner mb-6">
                  <Clock className="w-6 h-6" />
               </div>
               <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-2">Pending Institutional AR</p>
               <h3 className="text-5xl font-black text-white italic tracking-tighter leading-none">₹1.2 <span className="text-2xl">Cr</span></h3>
               <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-warning uppercase italic">
                  <Database className="w-3.5 h-3.5" />
                  4 Strategic Mandates Awaiting Sync
               </div>
            </div>
         </div>
      </div>

      {/* FINANCE GRAPHS & TRANSACTION MANIFEST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Institutional Revenue Graph</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Capital Flux v Profit Manifest</p>
               </div>
               <div className="flex gap-4 p-1 rounded-2xl bg-background border border-border">
                  <button className="px-6 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase italic shadow-lg shadow-primary/20">Revenue</button>
                  <button className="px-6 py-2 rounded-xl text-[10px] font-black text-text-muted uppercase italic hover:text-white">Profit</button>
               </div>
            </div>
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#2d3436" vertical={false} />
                     <XAxis stroke="#636e72" fontSize={10} fontWeight="black" tickFormatter={(v) => v.toUpperCase()} axisLine={false} tickLine={false} />
                     <YAxis stroke="#636e72" fontSize={10} fontWeight="black" axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #312e81', borderRadius: '20px', fontSize: '10px', color: '#fff' }}
                        itemStyle={{ fontWeight: 'black', textTransform: 'uppercase' }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#6c5ce7" strokeWidth={4} fill="url(#colorRev)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* RECENT TRANSACTION MANIFEST */}
         <div className="p-10 rounded-[40px] bg-surface border border-border flex flex-col h-[540px]">
             <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Strategic Ledger</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Live Transaction Flux</p>
               </div>
               <div className="p-3 rounded-2xl bg-background border border-border">
                  <IndianRupee className="w-5 h-5 text-success shadow-inner" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
               {transactions.map((tx) => (
                 <div key={tx.id} className="group p-5 rounded-3xl bg-background/50 border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                   <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-xl bg-surface border border-border ${tx.color} group-hover:scale-110 transition-transform`}>
                            <tx.icon className="w-4 h-4" />
                         </div>
                         <span className="text-[10px] font-black text-white uppercase italic">{tx.client}</span>
                      </div>
                      <span className={`text-[10px] font-black italic uppercase ${tx.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                         {tx.type === 'Credit' ? '+' : ''}{tx.amount}
                      </span>
                   </div>
                   <p className="text-xs font-bold text-text-secondary italic uppercase tracking-tighter mb-2">{tx.action}</p>
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-text-muted uppercase italic tracking-widest">{tx.date}</span>
                      <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                         tx.status === 'Settled' ? 'border-success/20 text-success' : 'border-warning/20 text-warning'
                      }`}>
                         {tx.status}
                      </div>
                   </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-4 bg-background border border-border rounded-2xl text-[10px] font-black text-text-muted uppercase tracking-widest italic hover:text-white transition-all shadow-inner">
               Access Multi-Module Ledger
            </button>
         </div>
      </div>
    </div>
  );
}
