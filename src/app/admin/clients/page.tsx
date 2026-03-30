'use client';

import { 
  Building2, Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Mail, Shield, IndianRupee, BarChart3, Activity, Briefcase,
  Users, HandshakeIcon, Globe, Star, CheckCircle2, TrendingUp,
  MapPin, ExternalLink, Zap, Clock, Database, FileText
} from 'lucide-react';

const clients = [
  { id: 'c1', name: 'Acme Corp', industry: 'FinTech', location: 'Mumbai', value: '₹4.2 Cr', rating: 4.8, status: 'Active', color: 'primary' },
  { id: 'c2', name: 'Neural Systems', industry: 'AI Labs', location: 'Bengaluru', value: '₹1.8 Cr', rating: 4.9, status: 'Prime', color: 'accent' },
  { id: 'c3', name: 'Infrastructure Corp', industry: 'Logistics', location: 'Hyderabad', value: '₹95L', rating: 4.5, status: 'Active', color: 'success' },
  { id: 'c4', name: 'Global Connect', industry: 'Real Estate', location: 'Dubai', value: '₹42L', rating: 4.2, status: 'Active', color: 'warning' },
  { id: 'c5', name: 'Tech Sphere', industry: 'SaaS', location: 'Pune', value: '₹62L', rating: 4.6, status: 'On-Boarding', color: 'primary' },
];

export default function ClientCRM() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Partner Manifest */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Institutional Partner Manifest</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Client <span className="text-primary not-italic">CRM</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <HandshakeIcon className="w-4 h-4" />
              Manifest Deals
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Integrate Partner
           </button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Partners', value: '142', trend: '+12', icon: Building2, color: 'text-primary' },
          { label: 'Total Pipeline Value', value: '₹12.4 Cr', trend: '+24%', icon: IndianRupee, color: 'text-success' },
          { label: 'Strategic Deals', value: '48', trend: 'Optimal', icon: HandshakeIcon, color: 'text-accent' },
          { label: 'CSAT Score', value: '4.8/5', trend: '+0.2', icon: Star, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="p-8 rounded-[40px] bg-surface border border-border hover:border-primary/50 transition-all group relative overflow-hidden">
             <div className="flex items-start justify-between relative z-10">
                <div className={`p-4 rounded-2xl bg-background border border-border ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black italic">
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

      <div className="p-8 rounded-[40px] bg-surface border border-border space-y-8">
         <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full max-w-xl group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Global Partner Manifest Search..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Globe className="w-4 h-4 ml-2 mr-2" />
                  All Sectors
                  <ChevronRight className="w-3 h-3 ml-2 rotate-90" />
               </button>
               <button className="p-3 rounded-2xl bg-background border border-border text-primary hover:bg-primary/10 transition-all shadow-inner">
                  <Database className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* PARTNER TABLE */}
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-border/50">
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Partner Identity</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Institutional Sector</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Location Manifest</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Capital</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Status</th>
                     <th className="py-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {clients.map((client) => (
                    <tr key={client.id} className="group hover:bg-background/40 transition-colors">
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-white font-black italic shadow-inner group-hover:scale-110 transition-transform relative`}>
                                {client.name.split(' ').map(n => n[0]).join('')}
                                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${client.status === 'Prime' ? 'bg-accent shadow-[0_0_10px_#a29bfe]' : 'bg-primary'}`} />
                             </div>
                             <div>
                                <p className="text-lg font-black text-white italic tracking-tight italic uppercase leading-none mb-1">{client.name}</p>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{client.id.toUpperCase()}-PLATFORM</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <Zap className="w-4 h-4 text-primary" />
                             <span className="text-xs font-black text-white italic uppercase tracking-tighter">{client.industry}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <MapPin className="w-4 h-4 text-text-muted" />
                             <span className="text-xs font-black text-text-secondary italic uppercase tracking-tighter">{client.location}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <p className={`text-xs font-black italic uppercase tracking-tighter text-success`}>{client.value}</p>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border w-fit ${
                             client.status === 'Prime' ? 'bg-accent/5 border-accent/20 text-accent' :
                             client.status === 'On-Boarding' ? 'bg-warning/5 border-warning/20 text-warning' :
                             'bg-success/5 border-success/20 text-success'
                          }`}>
                               <span className="text-[10px] font-black uppercase italic tracking-widest">{client.status}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all">
                                <FileText className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary transition-all">
                                <TrendingUp className="w-4 h-4" />
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
