'use client';

import { 
  UserCheck, Users, Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Mail, Shield, IndianRupee, BarChart3, Activity, Briefcase,
  Clock, TrendingUp, CheckCircle2, UserPlus, Star, Calendar,
  PieChart, Zap, MapPin, Building2, ExternalLink
} from 'lucide-react';

const employees = [
  { id: 'e1', name: 'Sarah Chen', role: 'Super Admin', dept: 'Executive', performance: 98, status: 'On-Site', revenue: '₹4.2 Cr', color: 'primary' },
  { id: 'e2', name: 'Mike Torres', role: 'Senior Recruiter', dept: 'Talent Acquisition', performance: 94, status: 'On-Site', revenue: '₹82L', color: 'accent' },
  { id: 'e3', name: 'Lisa Park', role: 'Recruiter', dept: 'Talent Acquisition', performance: 88, status: 'Remote', revenue: '₹45L', color: 'success' },
  { id: 'e4', name: 'Amit Patel', role: 'HR Manager', dept: 'People Ops', performance: 92, status: 'On-Site', revenue: 'N/A', color: 'warning' },
  { id: 'e5', name: 'John Davis', role: 'Tech Lead', dept: 'Neural Engineering', performance: 96, status: 'Remote', revenue: 'N/A', color: 'primary' },
];

export default function ForceManifest() {
  return (
    <div className="space-y-10">
      {/* HEADER: Institutional Force Manifest */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Institutional Force Manifest</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">Personnel <span className="text-primary not-italic">Manifest</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Efficiency Report
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Enlist Personnel
           </button>
        </div>
      </div>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Personnel', value: '42', trend: '+2', icon: Users, color: 'text-primary' },
          { label: 'Avg Performance', value: '94.2%', trend: '+1.2%', icon: Star, color: 'text-warning' },
          { label: 'Strategic Revenue / Head', value: '₹12.4L', trend: '+8%', icon: IndianRupee, color: 'text-success' },
          { label: 'At-Will Retention', value: '98.8%', trend: 'Stable', icon: Shield, color: 'text-accent' },
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

      {/* FILTER & STRATEGIC TOOLS */}
      <div className="p-8 rounded-[40px] bg-surface border border-border space-y-8">
         <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full max-w-xl group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
               <input 
                  type="text" 
                  placeholder="Global Personnel Search..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-[10px] tracking-widest shadow-inner">
                  <Building2 className="w-4 h-4" />
                  All Departments
                  <ChevronRight className="w-3 h-3 ml-2 rotate-90" />
               </button>
               <button className="p-3 rounded-2xl bg-background border border-border text-primary hover:bg-primary/10 transition-all shadow-inner">
                  <PieChart className="w-5 h-5" />
               </button>
            </div>
         </div>

         {/* PERSONNEL TABLE */}
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-border/50">
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Identity</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Institutional Dept</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Neural Score</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Revenue</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Status Manifest</th>
                     <th className="py-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-background/40 transition-colors">
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center text-white font-black italic shadow-inner group-hover:scale-110 transition-transform`}>
                                {emp.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="text-lg font-black text-white italic tracking-tight italic uppercase leading-none mb-1">{emp.name}</p>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{emp.role}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <Building2 className="w-4 h-4 text-primary" />
                             <span className="text-xs font-black text-white italic uppercase tracking-tighter">{emp.dept}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center">
                                <span className={`text-xs font-black italic ${emp.performance > 90 ? 'text-success' : 'text-primary'}`}>{emp.performance}%</span>
                             </div>
                             <div className="flex gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-1 h-3 rounded-full ${i <= emp.performance / 20 ? 'bg-primary' : 'bg-border'}`} />
                                ))}
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <p className={`text-xs font-black italic uppercase tracking-tighter ${emp.revenue === 'N/A' ? 'text-text-muted' : 'text-success'}`}>{emp.revenue}</p>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border w-fit ${
                             emp.status === 'On-Site' ? 'bg-success/5 border-success/20 text-success' :
                             emp.status === 'Remote' ? 'bg-primary/5 border-primary/20 text-primary' :
                             'bg-background border-border text-text-muted'
                          }`}>
                               <MapPin className="w-3 h-3" />
                               <span className="text-[10px] font-black uppercase italic tracking-widest">{emp.status}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all">
                                <TrendingUp className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all">
                                <Edit className="w-4 h-4" />
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

function Edit(props: any) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
