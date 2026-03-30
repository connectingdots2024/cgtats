'use client';

import { 
  BarChart3, PieChart, LineChart as LineChartIcon, Activity, 
  Calendar, Download, Filter, Search, ChevronDown, 
  TrendingUp, TrendingDown, IndianRupee, Users, 
  Briefcase, Zap, Star, Shield, Clock, Plus,
  FileText, Share2, Printer, Globe, Database
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart as RePieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const reports = [
  { id: 'r1', name: 'Strategic Capital Manifest (Q1)', type: 'Financial', author: 'Sarah Chen', status: 'Finalized', color: 'text-success' },
  { id: 'r2', name: 'Neural Scorer Accuracy Audit', type: 'Intelligence', author: 'Neural Engine', status: 'Flux', color: 'text-primary' },
  { id: 'r3', name: 'Personnel Efficiency Breakdown', type: 'Operational', author: 'Mike Torres', status: 'Finalized', color: 'text-accent' },
  { id: 'r4', name: 'Candidate Pipeline Leakage', type: 'Operational', author: 'Lisa Park', status: 'Warning', color: 'text-warning' },
  { id: 'r5', name: 'GDPR Compliance Audit', type: 'Compliance', author: 'System', status: 'Finalized', color: 'text-danger' },
];

const data = [
  { name: 'Jan', val: 400 },
  { name: 'Feb', val: 300 },
  { name: 'Mar', val: 600 },
  { name: 'Apr', val: 800 },
  { name: 'May', val: 500 },
  { name: 'Jun', val: 700 },
];

const COLORS = ['#6c5ce7', '#a29bfe', '#fab1a0', '#55efc4'];

export default function InstitutionalIntelligence() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Intelligence Hub */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Institutional Intelligence Hub</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Strategic <span className="text-primary not-italic">Reports</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Manifest Share
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Manifest Intelligence
           </button>
        </div>
      </div>

      {/* INTELLIGENCE GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="p-8 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Revenue Flux</h3>
               <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div className="h-40">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <Area type="monotone" dataKey="val" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.1} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <p className="text-2xl font-black text-white mt-4 italic tracking-tighter">₹12.4 Cr <span className="text-[10px] text-success">+12%</span></p>
         </div>

         <div className="p-8 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Sourcing Mix</h3>
               <PieChart className="w-4 h-4 text-primary" />
            </div>
            <div className="h-40 flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                     <Pie data={[{v:40},{v:30},{v:20},{v:10}]} dataKey="v" innerRadius={40} outerRadius={60} paddingAngle={5}>
                        {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                     </Pie>
                  </RePieChart>
               </ResponsiveContainer>
            </div>
            <p className="text-[10px] font-bold text-text-muted text-center uppercase italic tracking-widest mt-2">Neural Hub Leads with 40%</p>
         </div>

         <div className="p-8 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-black text-white uppercase italic tracking-widest">Efficiency Manifest</h3>
               <Activity className="w-4 h-4 text-accent" />
            </div>
            <div className="h-40">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <Bar dataKey="val" fill="#a29bfe" radius={[4,4,0,0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="text-2xl font-black text-white mt-4 italic tracking-tighter">94.2% <span className="text-[10px] text-accent">Optimal</span></p>
         </div>
      </div>

      <div className="p-8 rounded-[40px] bg-surface border border-border space-y-8">
         <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full max-w-md group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Strategic Intelligence Search..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Database className="w-4 h-4" />
                  Logic Sources
                  <ChevronDown className="w-3 h-3 ml-2" />
               </button>
               <button className="p-3 rounded-2xl bg-background border border-border text-primary hover:bg-primary/10 transition-all shadow-inner">
                  <RefreshCwIcon className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-border/50">
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Report Manifest</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Type</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Institutional Author</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Manifest Status</th>
                     <th className="py-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {reports.map((report) => (
                    <tr key={report.id} className="group hover:bg-background/40 transition-colors">
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center ${report.color} font-black italic shadow-inner group-hover:scale-110 transition-transform`}>
                                <FileText className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-lg font-black text-white italic tracking-tight italic uppercase leading-none mb-1">{report.name}</p>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">REF-#{report.id.toUpperCase()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <span className="text-xs font-black text-white italic uppercase tracking-tighter">{report.type}</span>
                       </td>
                       <td className="py-8 px-4">
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{report.author}</p>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 font-black italic uppercase text-[10px] tracking-widest w-fit ${
                             report.status === 'Finalized' ? 'bg-success/5 border-success/20 text-success' :
                             report.status === 'Flux' ? 'bg-primary/5 border-primary/20 text-primary' :
                             'bg-warning/5 border-warning/20 text-warning'
                          }`}>
                               {report.status}
                          </div>
                       </td>
                       <td className="py-8 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all">
                                <Download className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all">
                                <Printer className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <ExternalLink className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function RefreshCwIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
