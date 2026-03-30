'use client';

import { 
  Users, UserCheck, Briefcase, Building2, IndianRupee, 
  BarChart3, Zap, History, Lock, LifeBuoy, Shield,
  ArrowUpRight, ArrowDownLeft, Activity, Globe,
  Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Bell, CheckCircle2, AlertTriangle, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line
} from 'recharts';

const stats = [
  { label: 'Strategic Personnel', value: '4,842', trend: '+12%', icon: Users, color: 'text-primary' },
  { label: 'Operational Mandates', value: '148', trend: '+5%', icon: Briefcase, color: 'text-accent' },
  { label: 'Manifested Placements', value: '92', trend: '+24%', icon: UserCheck, color: 'text-success' },
  { label: 'Strategic Capital', value: '₹4.2 Cr', trend: '+18%', icon: IndianRupee, color: 'text-warning' },
];

const mockActivity = [
  { id: 1, user: 'Sarah Chen', action: 'Authorized Capital Flow', target: 'Mumbai Branch', time: '2 mins ago', icon: IndianRupee, color: 'text-warning' },
  { id: 2, user: 'Neural Engine', action: 'Manifested Candidate Score', target: 'John Doe (SDE-3)', time: '15 mins ago', icon: Zap, color: 'text-primary' },
  { id: 3, user: 'Security Protocol', action: 'Intercepted IP Anomaly', target: '103.42.11.9', time: '1 hour ago', icon: Shield, color: 'text-danger' },
  { id: 4, user: 'Mike Torres', action: 'Terminated Pending Mandate', target: 'Marketing Lead', time: '3 hours ago', icon: Briefcase, color: 'text-accent' },
];

const chartData = [
  { name: 'Mon', revenue: 4000, users: 2400 },
  { name: 'Tue', revenue: 3000, users: 1398 },
  { name: 'Wed', revenue: 2000, users: 9800 },
  { name: 'Thu', revenue: 2780, users: 3908 },
  { name: 'Fri', revenue: 1890, users: 4800 },
  { name: 'Sat', revenue: 2390, users: 3800 },
  { name: 'Sun', revenue: 3490, users: 4300 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Centralized Command</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Control <span className="text-primary not-italic">Center</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <History className="w-4 h-4" />
              Manifest History
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Integrate Entity
           </button>
        </div>
      </div>

      {/* STATS MANIFOLD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-8 rounded-[40px] bg-surface border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-start justify-between relative z-10">
              <div className={`p-4 rounded-2xl bg-background border border-border ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black italic">
                <ArrowUpRight className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
            <div className="mt-8 relative z-10">
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] italic mb-1">{stat.label}</p>
               <p className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* INTELLIGENCE GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Institutional Growth</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Capital vs Integration Flux</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-primary" />
                     <span className="text-[10px] font-bold text-text-muted uppercase italic">Capital</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-accent" />
                     <span className="text-[10px] font-bold text-text-muted uppercase italic">Personnel</span>
                  </div>
               </div>
            </div>
            <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                     <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#a29bfe" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#a29bfe" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#2d3436" vertical={false} />
                     <XAxis 
                       dataKey="name" 
                       stroke="#636e72" 
                       fontSize={10} 
                       fontWeight="black" 
                       tickFormatter={(value) => value.toUpperCase()}
                       axisLine={false}
                       tickLine={false}
                     />
                     <YAxis stroke="#636e72" fontSize={10} fontWeight="black" axisLine={false} tickLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid #312e81', borderRadius: '20px', fontSize: '10px', color: '#fff' }}
                        itemStyle={{ fontWeight: 'black', textTransform: 'uppercase' }}
                     />
                     <Area type="monotone" dataKey="revenue" stroke="#6c5ce7" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                     <Area type="monotone" dataKey="users" stroke="#a29bfe" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* LIVE COMMAND LOGS */}
         <div className="p-10 rounded-[40px] bg-surface border border-border flex flex-col h-[540px]">
             <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Institutional Logs</h3>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mt-1">Live Action Stream</p>
               </div>
               <div className="p-3 rounded-2xl bg-background border border-border">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
               </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
               {mockActivity.map((log) => (
                 <div key={log.id} className="flex gap-6 group">
                   <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center ${log.color} group-hover:scale-110 transition-transform shadow-inner`}>
                         <log.icon className="w-5 h-5" />
                      </div>
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-full bg-border group-last:hidden" />
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-[10px] font-black text-white uppercase italic">{log.user}</span>
                         <span className="text-[9px] font-bold text-text-muted uppercase italic tracking-widest flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {log.time}
                         </span>
                      </div>
                      <p className="text-xs font-bold text-text-secondary italic uppercase tracking-tighter leading-tight">{log.action}</p>
                      <p className="text-[10px] font-bold text-primary italic uppercase tracking-widest mt-1 opacity-70">Target: {log.target}</p>
                   </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-8 py-4 bg-background border border-border rounded-2xl text-[10px] font-black text-text-muted uppercase tracking-widest italic hover:text-white hover:border-primary transition-all">
               Inspect Full Audit Trail
            </button>
         </div>
      </div>

      {/* SYSTEM HEALTH MONITOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <div className="p-8 rounded-[40px] bg-surface border border-border overflow-hidden relative group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-success/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-4 mb-6">
               <div className="p-3 rounded-xl bg-success/10 text-success"><CheckCircle2 className="w-5 h-5" /></div>
               <div>
                  <h4 className="text-sm font-black text-white uppercase italic tracking-wider">Neural Engine</h4>
                  <p className="text-[10px] text-text-muted uppercase font-bold italic tracking-widest">Active Nodes: 12/12</p>
               </div>
            </div>
            <div className="flex gap-1 h-2">
               {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => <div key={i} className="flex-1 bg-success rounded-full animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />)}
            </div>
            <p className="text-[10px] font-bold text-success uppercase tracking-widest italic mt-4">Operational Stability: 99.99%</p>
         </div>

         <div className="p-8 rounded-[40px] bg-surface border border-border overflow-hidden relative group">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-4 mb-6">
               <div className="p-3 rounded-xl bg-primary/10 text-primary"><Database className="w-5 h-5" /></div>
               <div>
                  <h4 className="text-sm font-black text-white uppercase italic tracking-wider">Strategic Vault</h4>
                  <p className="text-[10px] text-text-muted uppercase font-bold italic tracking-widest">Data Flux: 4.2 TB</p>
               </div>
            </div>
            <div className="flex gap-1 h-2">
               {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="flex-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i*0.15}s` }} />)}
               {[1,2,3].map(i => <div key={i} className="flex-1 bg-border rounded-full" />)}
            </div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest italic mt-4">Vault Capacity: 42% Manifested</p>
         </div>

         <div className="p-8 rounded-[40px] bg-surface border border-border overflow-hidden relative group">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-warning/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-4 mb-6">
               <div className="p-3 rounded-xl bg-warning/10 text-warning"><AlertTriangle className="w-5 h-5" /></div>
               <div>
                  <h4 className="text-sm font-black text-white uppercase italic tracking-wider">Compliance Manifest</h4>
                  <p className="text-[10px] text-text-muted uppercase font-bold italic tracking-widest">GDPR Pulse: Active</p>
               </div>
            </div>
            <div className="flex gap-1 h-2">
               {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => <div key={i} className="flex-1 bg-warning rounded-full animate-pulse" style={{ animationDelay: `${i*0.05}s` }} />)}
            </div>
            <p className="text-[10px] font-bold text-warning uppercase tracking-widest italic mt-4">2 Pending Data Erasure Mandates</p>
         </div>
      </div>
    </div>
  );
}
