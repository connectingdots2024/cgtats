'use client';

import { 
  Lock, Shield, Fingerprint, Key, Globe, Eye, 
  Activity, AlertTriangle, CheckCircle2, XCircle,
  Database, Server, Cpu, Search, RefreshCw, 
  ChevronRight, MoreVertical, Download, Terminal,
  Smartphone, Monitor, FileText, UserCheck, History
} from 'lucide-react';

const securityMetrics = [
  { label: 'Security Score', value: '98/100', trend: 'Optimal', icon: Shield, color: 'text-success' },
  { label: 'Active Sessions', value: '1,284', trend: 'Flux', icon: Activity, color: 'text-primary' },
  { label: 'Threats Intercepted', value: '14,291', trend: '+12%', icon: AlertTriangle, color: 'text-danger' },
  { label: 'System Uptime', value: '99.99%', trend: 'Stable', icon: Server, color: 'text-success' },
];

const accessLogs = [
  { id: 'sec1', user: 'Sarah Chen', action: 'MFA Verified Login', ip: '103.42.11.9', device: 'MacBook Pro / Chrome', status: 'Authorized', color: 'text-success' },
  { id: 'sec2', user: 'Neural Engine', action: 'Internal Integrity Sync', ip: 'internal', device: 'Kubernetes Worker #42', status: 'Authorized', color: 'text-primary' },
  { id: 'sec3', user: 'Unknown', action: 'Brute Force Attempt', ip: '185.122.1.20', device: 'Headless / Python', status: 'Blocked', color: 'text-danger' },
  { id: 'sec4', user: 'Mike Torres', action: 'Terminated Active Session', ip: '122.161.42.11', device: 'iOS / Safari', status: 'Deauthorized', color: 'text-warning' },
];

export default function SecurityControl() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Cryptographic Integrity */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Cryptographic Institutional Integrity</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Security <span className="text-primary not-italic">& Compliance</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <History className="w-4 h-4" />
              Manifest Audit Trail
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Enforce Strategic Lockdown
           </button>
        </div>
      </div>

      {/* SECURITY KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((stat) => (
          <div key={stat.label} className="p-8 rounded-[40px] bg-surface border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
             <div className="flex items-start justify-between relative z-10">
                <div className={`p-4 rounded-2xl bg-background border border-border ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[8px] font-black italic uppercase tracking-widest border ${
                   stat.trend === 'Optimal' || stat.trend === 'Stable' ? 'border-success/20 text-success' : 
                   stat.trend === 'Flux' ? 'border-primary/20 text-primary' : 'border-danger/20 text-danger'
                }`}>
                   {stat.trend}
                </div>
             </div>
             <div className="mt-8 relative z-10">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] italic mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* SECURITY CONFIG & ACCESS LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Institutional Access Flux</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Live Authentication Stream</p>
               </div>
               <div className="flex gap-4">
                  <button className="p-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner">
                     <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner">
                     <RefreshCw className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div className="space-y-4">
               {accessLogs.map((log) => (
                 <div key={log.id} className="group p-6 rounded-3xl bg-background/50 border border-transparent hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex items-center gap-4 lg:w-1/3">
                       <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary-light font-black italic shadow-inner">
                          {log.user.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <p className="text-sm font-black text-white italic uppercase tracking-tight transition-colors group-hover:text-primary">{log.user}</p>
                          <code className="text-[9px] font-mono text-text-muted">{log.ip}</code>
                       </div>
                    </div>
                    <div className="flex-1">
                       <p className="text-xs font-bold text-text-secondary italic uppercase tracking-tighter">{log.action}</p>
                       <div className="flex items-center gap-3 mt-1.5 opacity-60">
                          {log.device.includes('MacBook') ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                          <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest italic">{log.device}</span>
                       </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-xl border flex items-center gap-2 font-black italic uppercase text-[10px] tracking-widest w-fit ${
                       log.status === 'Authorized' ? 'bg-success/5 border-success/20 text-success' :
                       log.status === 'Blocked' ? 'bg-danger/5 border-danger/20 text-danger' :
                       'bg-warning/5 border-warning/20 text-warning'
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'Authorized' ? 'bg-success animate-pulse' : 'bg-current'}`} />
                       {log.status}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* SECURITY SETTINGS MANIFOLD */}
         <div className="p-10 rounded-[40px] bg-surface border border-border space-y-10">
            <div>
               <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Security Mandates</h3>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Institutional Enforcement</p>
            </div>
            
            <div className="space-y-6">
               {[
                 { label: 'Multi-Factor Enforcement', desc: 'Mandatory MFA for all strategic personnel', icon: Fingerprint, enabled: true },
                 { label: 'IP Geofencing Protocol', desc: 'Restrict command access to authorized regions', icon: Globe, enabled: false },
                 { label: 'Neural Threat Detection', icon: Brain, desc: 'AI-monitored anomalous activity manifest', enabled: true },
                 { label: 'AES-256 Strategic Vault', icon: Lock, desc: 'Enable full-scale database encryption', enabled: true },
                 { label: 'Session Auto-Terminate', icon: Clock, desc: 'Cycle sessions every 24 strategic hours', enabled: true },
               ].map((setting) => (
                 <div key={setting.label}>
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-3">
                          <setting.icon className={`w-4 h-4 ${setting.enabled ? 'text-primary' : 'text-text-muted'}`} />
                          <span className="text-[10px] font-black text-white uppercase italic">{setting.label}</span>
                       </div>
                       <div className={`w-10 h-5 rounded-full relative transition-colors ${setting.enabled ? 'bg-primary' : 'bg-surface-hover shadow-inner'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${setting.enabled ? 'left-6 shadow-[0_0_10px_white]' : 'left-1'}`} />
                       </div>
                    </div>
                    <p className="text-[9px] font-bold text-text-muted italic uppercase leading-tight ml-7 opacity-60">{setting.desc}</p>
                 </div>
               ))}

               <div className="pt-6 border-t border-border space-y-4">
                  <div className="p-4 rounded-2xl bg-danger/5 border border-danger/20">
                     <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-4 h-4 text-danger" />
                        <span className="text-[10px] font-black text-danger uppercase italic">Strategic Alert</span>
                     </div>
                     <p className="text-[9px] font-bold text-danger/80 italic leading-tight uppercase">Platform is currently in Institutional Stability Phase. Deactivating encryption may result in strategic compromise.</p>
                  </div>
                  <button className="w-full py-4 bg-background border border-border rounded-2xl text-[10px] font-black text-text-muted uppercase tracking-widest italic hover:text-white hover:border-danger transition-all">
                     Rotate Institutional API Keys
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
