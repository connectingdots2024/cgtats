'use client';

import { 
  History, Search, Filter, Download, Calendar, 
  Shield, User, Database, Globe, Zap, IndianRupee,
  Activity, Clock, ChevronDown, RefreshCw, AlertTriangle,
  FileText, ExternalLink, Info, CheckCircle2, XCircle
} from 'lucide-react';

const mockLogs = [
  { id: 'l1', actor: 'Sarah Chen', action: 'Authorized Capital Flow', resource: 'Strategic Finance', metadata: '₹4.2 Cr Disbursement', timestamp: '2024-03-30T10:15:00Z', ip: '103.42.11.9', status: 'Success', icon: IndianRupee, color: 'text-warning' },
  { id: 'l2', actor: 'Neural Engine', action: 'Manifested Candidate Score', resource: 'Candidate Vault', metadata: 'John Doe (SDE-3): 98/100', timestamp: '2024-03-30T10:12:00Z', ip: 'internal', status: 'Success', icon: Zap, color: 'text-primary' },
  { id: 'l3', actor: 'Security Protocol', action: 'Intercepted IP Anomaly', resource: 'Gateway Firewall', metadata: 'Blocked access from Moscow, RU', timestamp: '2024-03-30T09:45:00Z', ip: '185.122.1.20', status: 'Blocked', icon: Shield, color: 'text-danger' },
  { id: 'l4', actor: 'Mike Torres', action: 'Terminated Pending Mandate', resource: 'Pipeline Logic', metadata: 'Engineering Lead #402', timestamp: '2024-03-30T09:30:00Z', ip: '122.161.42.11', status: 'Success', icon: Activity, color: 'text-accent' },
  { id: 'l5', actor: 'Sarah Chen', action: 'Modified System Settings', resource: 'Core Configuration', metadata: 'Updated GDPR Retention to 12mo', timestamp: '2024-03-30T09:12:00Z', ip: '103.42.11.9', status: 'Success', icon: Database, color: 'text-primary' },
  { id: 'l6', actor: 'Anita Desai', action: 'Modified User Permissions', resource: 'User Directory', metadata: 'Elevated Lisa Park to Recruiter', timestamp: '2024-03-30T08:55:00Z', ip: '43.224.1.22', status: 'Success', icon: User, color: 'text-success' },
];

export default function AuditManifest() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Accountability */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Immutable Accountability</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Audit <span className="text-primary not-italic">Manifest</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Manifest Filter
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Strategic Logs
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
                  placeholder="Search audit trail by actor, action, or metadata..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Globe className="w-4 h-4" />
                  All IP Nodes
                  <ChevronDown className="w-3 h-3 ml-2" />
               </button>
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Activity className="w-4 h-4" />
                  All Logic
                  <ChevronDown className="w-3 h-3 ml-2" />
               </button>
               <button className="p-3 rounded-2xl bg-background border border-border text-primary hover:bg-primary/10 transition-all shadow-inner">
                  <RefreshCw className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* LOG STREAM */}
         <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="group flex flex-col lg:flex-row lg:items-center gap-6 p-6 rounded-3xl bg-background/40 hover:bg-surface-hover/50 border border-transparent hover:border-border/50 transition-all">
                 <div className="flex items-center gap-6 lg:w-1/4">
                    <div className={`p-4 rounded-2xl bg-surface border border-border ${log.color} group-hover:scale-110 transition-transform shadow-inner shrink-0`}>
                       <log.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                       <p className="text-sm font-black text-white uppercase italic truncate group-hover:text-primary transition-colors">{log.actor}</p>
                       <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                       </p>
                    </div>
                 </div>

                 <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                       <span className="text-xs font-black text-text-secondary uppercase italic tracking-tighter">{log.action}</span>
                       <span className="text-[10px] bg-surface border border-border px-3 py-1 rounded-full text-text-muted uppercase font-bold italic tracking-widest">
                          {log.resource}
                       </span>
                    </div>
                    <p className="text-sm font-bold text-white mt-2 italic leading-tight">{log.metadata}</p>
                 </div>

                 <div className="flex items-center gap-8 lg:w-1/4 justify-between lg:justify-end">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] italic mb-1">Network Node</p>
                       <code className="text-xs font-mono text-text-secondary group-hover:text-primary transition-colors">{log.ip}</code>
                    </div>
                    <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 font-black italic uppercase text-[10px] tracking-widest ${
                       log.status === 'Success' ? 'bg-success/5 border-success/20 text-success' :
                       log.status === 'Blocked' ? 'bg-danger/5 border-danger/20 text-danger' :
                       'bg-warning/5 border-warning/20 text-warning'
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'Success' ? 'bg-success animate-pulse' : 'bg-current'}`} />
                       {log.status}
                    </div>
                    <button className="p-2 text-text-muted hover:text-white transition-colors">
                       <ExternalLink className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            ))}
         </div>

         {/* PAGINATION MANIFEST */}
         <div className="flex items-center justify-between pt-8 border-t border-border/50">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic">Displaying 6 / 128,402 Immutable Strategic Logs</p>
            <div className="flex gap-2">
               <button className="px-5 py-2.5 rounded-xl bg-background border border-border text-[10px] font-black text-text-muted uppercase italic hover:text-white transition-all">Previous Block</button>
               <button className="px-5 py-2.5 rounded-xl bg-background border border-border text-[10px] font-black text-text-muted uppercase italic hover:text-white transition-all">Next Block</button>
            </div>
         </div>
      </div>
    </div>
  );
}
