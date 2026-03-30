'use client';

import { useState } from 'react';
import { 
  Globe, Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Mail, Shield, Key, Lock, Unlock, Zap, MoreVertical,
  CheckCircle2, AlertCircle, XCircle, Trash2, Edit,
  Download, Upload, RefreshCw, UserPlus, Fingerprint,
  Users, Briefcase, IndianRupee, BarChart3, Activity,
  Database, FileText, ExternalLink, Star, Brain
} from 'lucide-react';

const mockCandidates = [
  { id: 'c1', name: 'Arjun Mehta', email: 'arjun@tech.in', role: 'Full Stack Engineer', status: 'Hired', score: 98, source: 'Neural Hub', color: 'primary' },
  { id: 'c2', name: 'Priya Sharma', email: 'priya@gmail.com', role: 'Product Manager', status: 'In Review', score: 92, source: 'Career Page', color: 'accent' },
  { id: 'c3', name: 'Vikram Singh', email: 'vikram@dev.in', role: 'SDE-2', status: 'Interviewing', score: 85, source: 'Integration API', color: 'success' },
  { id: 'c4', name: 'Neha Gupta', email: 'neha@top.co', role: 'UX Lead', status: 'Rejected', score: 64, source: 'Bulk Import', color: 'danger' },
  { id: 'c5', name: 'Rohan Verma', email: 'rohan@me.in', role: 'Data Scientist', status: 'Sourced', score: 89, source: 'Neural Hub', color: 'warning' },
];

export default function CandidateVault() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Personnel Pipeline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Personnel Intelligence Vault</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Candidate <span className="text-primary not-italic">Vault</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Download className="w-4 h-4" />
              Manifest Archive
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Manifest Neural Integrate
           </button>
        </div>
      </div>

      {/* FILTER & STRATEGIC TOOLS */}
      <div className="p-8 rounded-[40px] bg-surface border border-border space-y-8">
         <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full max-w-xl group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Global Multi-Module Candidate Search..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Filter className="w-4 h-4" />
                  Filter Manifest
                  <ChevronRight className="w-3 h-3 ml-2" />
               </button>
               <button className="p-3 rounded-2xl bg-background border border-border text-primary hover:bg-primary/10 transition-all shadow-inner">
                  <RefreshCw className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* CANDIDATE TABLE */}
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-border/50">
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Personnel</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Focus</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Neural Score</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Pipeline Phase</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Sourced via</th>
                     <th className="py-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {mockCandidates.map((candidate) => (
                    <tr key={candidate.id} className="group hover:bg-background/40 transition-colors">
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-white font-black italic shadow-inner group-hover:scale-110 transition-transform relative`}>
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${candidate.status === 'Hired' ? 'bg-success' : 'bg-primary'}`} />
                             </div>
                             <div>
                                <p className="text-lg font-black text-white italic tracking-tight italic uppercase leading-none mb-1">{candidate.name}</p>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{candidate.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <Briefcase className="w-4 h-4 text-primary" />
                             <span className="text-xs font-black text-white italic uppercase tracking-tighter">{candidate.role}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center">
                                <span className={`text-xs font-black italic ${candidate.score > 90 ? 'text-success' : 'text-primary'}`}>{candidate.score}</span>
                             </div>
                             <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-1 h-3 rounded-full ${i <= candidate.score / 20 ? 'bg-primary' : 'bg-border'}`} />
                                ))}
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border w-fit ${
                             candidate.status === 'Hired' ? 'bg-success/5 border-success/20 text-success' :
                             candidate.status === 'Rejected' ? 'bg-danger/5 border-danger/20 text-danger' :
                             'bg-background border-border text-text-secondary'
                          }`}>
                               <span className="text-[10px] font-black uppercase italic tracking-widest">{candidate.status}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{candidate.source}</p>
                       </td>
                       <td className="py-8 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <FileText className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <Zap className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <MoreVertical className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* PAGINATION MANIFEST */}
         <div className="flex items-center justify-between pt-8 border-t border-border/50">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic">Displaying 5 / 12,842 personnel records in vault</p>
            <div className="flex gap-2">
               <button className="px-5 py-2.5 rounded-xl bg-background border border-border text-[10px] font-black text-text-muted uppercase italic hover:text-white transition-all opacity-50 cursor-not-allowed">Previous Page</button>
               <button className="px-5 py-2.5 rounded-xl bg-background border border-border text-[10px] font-black text-text-muted uppercase italic hover:text-white transition-all">Next Page</button>
            </div>
         </div>
      </div>
    </div>
  );
}
