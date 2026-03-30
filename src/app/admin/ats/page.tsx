'use client';

import { useState } from 'react';
import { 
  Briefcase, Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Mail, Shield, Key, Lock, Unlock, Zap, MoreVertical,
  CheckCircle2, AlertCircle, XCircle, Trash2, Edit,
  Download, Upload, RefreshCw, UserPlus, Fingerprint,
  Users, Building2, IndianRupee, BarChart3, Activity,
  Database, FileText, ExternalLink, Star, Brain,
  Layers, Kanban, ListFilter, Sliders, Clock
} from 'lucide-react';

const mockJobs = [
  { id: 'j1', title: 'Full Stack Engineer', client: 'Neural Systems', pipeline: 42, priority: 'High', status: 'Active', color: 'primary' },
  { id: 'j2', title: 'SDE-3 (Backend)', client: 'Infrastructure Corp', pipeline: 28, priority: 'Critical', status: 'Active', color: 'danger' },
  { id: 'j3', title: 'Product Designer', client: 'Acme Corp', pipeline: 12, priority: 'Medium', status: 'On Hold', color: 'warning' },
  { id: 'j4', title: 'Marketing Lead', client: 'Global Connect', pipeline: 6, priority: 'Low', status: 'Active', color: 'accent' },
];

export default function PipelineLogic() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Recruitment Mandates */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Institutional Recruitment Mandates</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Pipeline <span className="text-primary not-italic">Logic</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Kanban className="w-4 h-4" />
              Manifest Kanban
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Manifest New Mandate
           </button>
        </div>
      </div>

      {/* STRATEGIC DASHBOARD FOR JOBS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Mandates', value: '42', icon: Briefcase, color: 'text-primary' },
          { label: 'Personnel in Flux', value: '1,284', icon: Users, color: 'text-accent' },
          { label: 'Avg Cycle Time', value: '18d', icon: Clock, color: 'text-success' },
          { label: 'Neural Matching Rate', value: '94%', icon: Brain, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="p-8 rounded-[40px] bg-surface border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
             <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-background border border-border ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] italic mb-1">{stat.label}</p>
                   <p className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-[40px] bg-surface border border-border space-y-8">
         <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full max-w-xl group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Global Multi-Module Mandate Search..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Sliders className="w-4 h-4" />
                  Strategic Filters
                  <ChevronRight className="w-3 h-3 ml-2" />
               </button>
               <button className="p-3 rounded-2xl bg-background border border-border text-primary hover:bg-primary/10 transition-all shadow-inner">
                  <RefreshCw className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* JOBS TABLE */}
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-border/50">
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Mandate</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Client Node</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Personnel Flux</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Priority Manifest</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Status</th>
                     <th className="py-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {mockJobs.map((job) => (
                    <tr key={job.id} className="group hover:bg-background/40 transition-colors">
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-white font-black italic shadow-inner group-hover:scale-110 transition-transform`}>
                                {job.title.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="text-lg font-black text-white italic tracking-tight italic uppercase leading-none mb-1">{job.title}</p>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">REF-#{job.id.toUpperCase()}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <Building2 className="w-4 h-4 text-primary" />
                             <span className="text-xs font-black text-white italic uppercase tracking-tighter">{job.client}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-4">
                             <div className="w-24 h-2 bg-background border border-border rounded-full overflow-hidden">
                                <div className={`h-full bg-primary transition-all duration-1000`} style={{ width: `${(job.pipeline / 50) * 100}%` }} />
                             </div>
                             <span className="text-[10px] font-black italic text-text-muted uppercase tracking-widest">{job.pipeline} active</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`px-4 py-1 rounded-xl border flex items-center gap-2 font-black italic uppercase text-[10px] tracking-widest w-fit ${
                             job.priority === 'Critical' ? 'bg-danger/5 border-danger/20 text-danger' :
                             job.priority === 'High' ? 'bg-warning/5 border-warning/20 text-warning' :
                             'bg-background border-border text-text-muted'
                          }`}>
                               {job.priority}
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'Active' ? 'bg-success animate-pulse' : 'bg-current text-text-muted'}`} />
                             <span className="text-[10px] font-black uppercase italic tracking-widest text-text-secondary">{job.status}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <Kanban className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <Edit className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-danger hover:border-danger transition-all">
                                <Trash2 className="w-4 h-4" />
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
