'use client';

import { 
  LifeBuoy, Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Mail, MessageSquare, Clock, User, CheckCircle2, AlertCircle,
  XCircle, Trash2, Edit, Download, Upload, RefreshCw, 
  UserPlus, Fingerprint, Activity, Phone, Star, Send,
  Paperclip, Globe, Shield, ExternalLink
} from 'lucide-react';

const tickets = [
  { id: 't1', user: 'James Wilson', subject: 'Strategic Capital Sync Issue', priority: 'Critical', status: 'In Progress', assigned: 'Sarah Chen', time: '10 mins ago', color: 'danger' },
  { id: 't2', user: 'Anita Desai', subject: 'Neural Scorer Accuracy Manifest', priority: 'High', status: 'Pending', assigned: 'Neural Engine', time: '42 mins ago', color: 'warning' },
  { id: 't3', user: 'Mike Torres', subject: 'Candidate Vault Bulk Export', priority: 'Medium', status: 'Resolved', assigned: 'Sarah Chen', time: '2 hours ago', color: 'success' },
  { id: 't4', user: 'Lisa Park', subject: 'Integration API Timeout', priority: 'High', status: 'Pending', assigned: 'System', time: '4 hours ago', color: 'warning' },
  { id: 't5', user: 'Rahul Khanna', subject: 'Personnel Manifest Error', priority: 'Low', status: 'Resolved', assigned: 'Mike Torres', time: '1 day ago', color: 'primary' },
];

export default function SupportManifest() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Support Manifest */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Institutional Support Manifest</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Support <span className="text-primary not-italic">Manifest</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Manifest Live Chat
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Manifest Ticket
           </button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Mandates', value: '1,284', icon: LifeBuoy, color: 'text-primary' },
          { label: 'Active Support Agents', value: '12', icon: User, color: 'text-accent' },
          { label: 'Avg Resolution Time', value: '4.2h', icon: Clock, color: 'text-success' },
          { label: 'SLA Stability', value: '98.4%', icon: Shield, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="p-8 rounded-[40px] bg-surface border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
             <div className="flex items-start justify-between relative z-10">
                <div className={`p-4 rounded-2xl bg-background border border-border ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black italic">
                   Optimal
                </div>
             </div>
             <div className="mt-8 relative z-10">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] italic mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* TICKET MANIFEST */}
         <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border space-y-8">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
               <div className="relative w-full max-w-md group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Search strategic support mandates..."
                     className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
                  />
               </div>
               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                     <Filter className="w-4 h-4 ml-2 mr-2" />
                     Priority Flux
                     <ChevronRight className="w-3 h-3 ml-2 rotate-90" />
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               {tickets.map((ticket) => (
                 <div key={ticket.id} className="group p-6 rounded-3xl bg-background/50 border border-transparent hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center gap-6 cursor-pointer">
                    <div className="flex items-center gap-6 lg:w-1/3">
                       <div className={`p-4 rounded-2xl bg-surface border border-border ${ticket.color === 'danger' ? 'text-danger' : ticket.color === 'warning' ? 'text-warning' : 'text-success'} group-hover:scale-110 transition-transform shadow-inner`}>
                          <MessageSquare className="w-5 h-5" />
                       </div>
                       <div className="min-w-0">
                          <p className="text-sm font-black text-white uppercase italic truncate group-hover:text-primary transition-colors">{ticket.user}</p>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{ticket.time}</p>
                       </div>
                    </div>
                    <div className="flex-1">
                       <p className="text-xs font-bold text-text-secondary italic uppercase tracking-tighter mb-1.5">{ticket.subject}</p>
                       <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black italic uppercase tracking-widest ${
                             ticket.priority === 'Critical' ? 'text-danger' : 
                             ticket.priority === 'High' ? 'text-warning' : 'text-primary'
                          }`}>{ticket.priority} Priority</span>
                          <span className="text-[8px] text-text-muted">•</span>
                          <span className="text-[9px] font-bold text-text-muted uppercase italic tracking-widest">Assigned: {ticket.assigned}</span>
                       </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 font-black italic uppercase text-[10px] tracking-widest w-fit ${
                       ticket.status === 'Resolved' ? 'bg-success/5 border-success/20 text-success' :
                       ticket.status === 'In Progress' ? 'bg-primary/5 border-primary/20 text-primary' :
                       'bg-warning/5 border-warning/20 text-warning'
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'In Progress' ? 'bg-primary animate-pulse' : 'bg-current'}`} />
                       {ticket.status}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* LIVE CHAT MANIFOLD (Simplified Teaser) */}
         <div className="p-10 rounded-[40px] bg-surface border border-border flex flex-col h-[640px]">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Intelligence Chat</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Live Manifest Monitor</p>
               </div>
               <div className="p-3 rounded-2xl bg-background border border-border">
                  <Star className="w-5 h-5 text-warning shadow-inner" />
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
               <div className="flex flex-col gap-2 max-w-[85%]">
                  <div className="p-4 rounded-3xl bg-background/50 border border-border text-xs text-text-secondary font-bold italic">
                     Identity #u4 requires strategic capital sync for Acme Corp mandate.
                  </div>
                  <span className="text-[9px] text-text-muted font-black uppercase italic ml-2">James Wilson • 10:42 AM</span>
               </div>
               <div className="flex flex-col gap-2 max-w-[85%] ml-auto items-end text-right">
                  <div className="p-4 rounded-3xl bg-primary text-white text-xs font-bold italic shadow-lg shadow-primary/20">
                     Roger. Commencing Neural Sync... Manifesting capital flux.
                  </div>
                  <span className="text-[9px] text-text-muted font-black uppercase italic mr-2">Sarah Chen • 10:45 AM</span>
               </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border space-y-4">
               <div className="relative">
                  <input 
                     type="text" 
                     placeholder="Manifest Intelligence Response..."
                     className="w-full pl-6 pr-12 py-4 bg-background border border-border rounded-3xl text-xs focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-2xl bg-primary text-white shadow-lg">
                     <Send className="w-4 h-4" />
                  </button>
               </div>
               <div className="flex items-center gap-4">
                  <button className="p-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner">
                     <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner">
                     <Star className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
