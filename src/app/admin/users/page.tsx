'use client';

import { useState } from 'react';
import { 
  Users, Search, Filter, Plus, ChevronRight, MoreHorizontal,
  Mail, Shield, Key, Lock, Unlock, Zap, MoreVertical,
  CheckCircle2, AlertCircle, XCircle, Trash2, Edit,
  Download, Upload, RefreshCw, UserPlus, Fingerprint
} from 'lucide-react';

const mockUsers = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@cgtrecruit.ai', role: 'Super Admin', status: 'Active', activity: '2 mins ago', permissions: 'Full Manifest', color: 'primary' },
  { id: 'u2', name: 'Mike Torres', email: 'mike@cgtrecruit.ai', role: 'Admin', status: 'Active', activity: '15 mins ago', permissions: 'Operational', color: 'accent' },
  { id: 'u3', name: 'Lisa Park', email: 'lisa@cgtrecruit.ai', role: 'Recruiter', status: 'Active', activity: '1 hour ago', permissions: 'Integration Only', color: 'success' },
  { id: 'u4', name: 'James Wilson', email: 'james@partner.com', role: 'Client Admin', status: 'Suspended', activity: '2 days ago', permissions: 'Mandate Retrieval', color: 'danger' },
  { id: 'u5', name: 'Anita Desai', email: 'anita@cgtrecruit.ai', role: 'Moderator', status: 'Inactive', activity: '1 week ago', permissions: 'Audit Only', color: 'warning' },
];

export default function UserDirectory() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-10">
      {/* HEADER: Personnel Manifest */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] italic mb-2">Institutional Identity Control</h2>
          <h1 className="text-5xl font-black tracking-tightest italic text-white uppercase leading-none">User <span className="text-primary not-italic">Directory</span></h1>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-3 rounded-2xl bg-surface border border-border text-text-muted hover:text-white transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Manifest
           </button>
           <button className="px-8 py-3 rounded-2xl bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all font-black uppercase italic text-xs tracking-widest flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Integrate Personnel
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
                  placeholder="Search personnel by manifest ID, email, or role..."
                  className="w-full pl-16 pr-8 py-4 bg-background border border-border rounded-3xl text-sm focus:outline-none focus:border-primary transition-all font-bold italic tracking-wider shadow-inner"
               />
            </div>
            <div className="flex gap-2 p-1.5 rounded-2xl bg-background border border-border shadow-inner">
               {['all', 'active', 'suspended', 'inactive'].map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-all ${
                       activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-muted hover:text-white'
                    }`}
                 >
                    {tab}
                 </button>
               ))}
            </div>
         </div>

         {/* PERSONNEL GRID / TABLE */}
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="border-b border-border/50">
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Identity</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Strategic Role</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Status Manifest</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Access Mandate</th>
                     <th className="text-left py-6 px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.25em] italic">Last Sync</th>
                     <th className="py-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/30">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-background/40 transition-colors">
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center text-white font-black italic shadow-lg group-hover:scale-110 transition-transform`}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="text-lg font-black text-white italic tracking-tight italic uppercase leading-none mb-1">{user.name}</p>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <Shield className="w-4 h-4 text-primary" />
                             <span className="text-xs font-black text-white italic uppercase tracking-tighter">{user.role}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border w-fit ${
                             user.status === 'Active' ? 'bg-success/5 border-success/20 text-success' :
                             user.status === 'Suspended' ? 'bg-danger/5 border-danger/20 text-danger' :
                             'bg-background border-border text-text-muted'
                          }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-success animate-pulse' : 'bg-current'}`} />
                             <span className="text-[10px] font-black uppercase italic tracking-widest">{user.status}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-2">
                             <Fingerprint className="w-4 h-4 text-accent" />
                             <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest italic">{user.permissions}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4">
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic">{user.activity}</p>
                       </td>
                       <td className="py-8 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary hover:border-primary transition-all">
                                <Edit className="w-4 h-4" />
                             </button>
                             <button className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-primary hover:border-primary transition-all">
                                <Key className="w-4 h-4" />
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

         {/* PAGINATION MANIFEST */}
         <div className="flex items-center justify-between pt-8 border-t border-border/50">
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic">Displaying 5 / 4,842 Strategic Personnel</p>
            <div className="flex gap-2">
               <button className="px-5 py-2.5 rounded-xl bg-background border border-border text-[10px] font-black text-text-muted uppercase italic hover:text-white transition-all pointer-events-none opacity-50">Previous Phase</button>
               <button className="px-5 py-2.5 rounded-xl bg-background border border-border text-[10px] font-black text-text-muted uppercase italic hover:text-white transition-all">Next Phase</button>
            </div>
         </div>
      </div>
    </div>
  );
}
