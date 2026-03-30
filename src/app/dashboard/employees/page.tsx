'use client';

import { useState, useMemo } from 'react';
import { 
  Users, UserPlus, Search, Filter, Mail, Phone, Calendar, 
  ChevronRight, MoreVertical, Shield, Clock, BarChart3, 
  IndianRupee, FileText, Activity, CheckCircle2, XCircle, 
  TrendingUp, ArrowUpRight, Plus, Download, Layout, 
  Trophy, UserCheck, Briefcase, Settings, Lock, Eye,
  History, PieChart, Sparkles, Zap, Trash2, Edit2, 
  MoreHorizontal, Kanban, Globe, ClipboardList, ListChecks,
  AlertCircle, Building2, Bell, Heart, Star, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { 
  candidates, jobs, recruiterEarnings, financialStats, clients 
} from '@/lib/mock-data';

type EmployeeTab = 'dashboard' | 'directory' | 'roles' | 'attendance' | 'performance' | 'payroll' | 'documents';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  joiningDate: string;
  avatar?: string;
  phone: string;
  performance: number; // 0-100
  revenue: number;
}

const employees: Employee[] = [
  { id: 'EMP001', name: 'Sarah Chen', email: 'sarah.c@cgt.ai', role: 'Admin', department: 'Leadership', status: 'Active', joiningDate: '2023-01-15', phone: '+91 98765 43210', performance: 98, revenue: 1250000 },
  { id: 'EMP002', name: 'James Wilson', email: 'james.w@cgt.ai', role: 'HR Manager', department: 'HR', status: 'Active', joiningDate: '2023-03-10', phone: '+91 98765 43211', performance: 92, revenue: 0 },
  { id: 'EMP003', name: 'Priya Sharma', email: 'priya.s@cgt.ai', role: 'Senior Recruiter', department: 'Recruitment', status: 'Active', joiningDate: '2023-05-22', phone: '+91 98765 43212', performance: 95, revenue: 840000 },
  { id: 'EMP004', name: 'Michael Ross', email: 'michael.r@cgt.ai', role: 'Recruiter', department: 'Recruitment', status: 'Active', joiningDate: '2023-08-05', phone: '+91 98765 43213', performance: 88, revenue: 620000 },
  { id: 'EMP005', name: 'Anita Desai', email: 'anita.d@cgt.ai', role: 'Support Agent', department: 'Operations', status: 'On Leave', joiningDate: '2023-11-12', phone: '+91 98765 43214', performance: 84, revenue: 0 },
  { id: 'EMP006', name: 'David Miller', email: 'david.m@cgt.ai', role: 'Technical Lead', department: 'Engineering', status: 'Active', joiningDate: '2023-02-28', phone: '+91 98765 43215', performance: 96, revenue: 0 },
];

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState<EmployeeTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState('All Roles');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(e => e.status === 'Active').length,
    recruiters: employees.filter(e => e.role.includes('Recruiter')).length,
    avgPerformance: Math.floor(employees.reduce((acc, current) => acc + current.performance, 0) / employees.length),
    totalRevenue: employees.reduce((acc, current) => acc + current.revenue, 0)
  }), []);

  return (
    <div className="space-y-6">
      {/* HEADER: Institutional Personnel Manifest */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium uppercase tracking-[0.2em] text-[10px]">Personnel Manifest</span>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic">EMPLOYEE <span className="text-primary not-italic">COMMAND</span></h1>
          <p className="text-text-secondary mt-1">Internal HR, lifecycle management, and performance orchestration hub</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold hover:shadow-xl hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      {/* SUB-NAVIGATION: Dimensional Tabs */}
      <div className="flex bg-surface border border-border rounded-2xl p-1 shadow-inner overflow-x-auto no-scrollbar max-w-[1000px]">
        {[
          { id: 'dashboard', icon: Layout, label: 'Control Center' },
          { id: 'directory', icon: Users, label: 'Directory' },
          { id: 'roles', icon: Shield, label: 'Roles & Access' },
          { id: 'attendance', icon: Clock, label: 'Activity Log' },
          { id: 'performance', icon: Trophy, label: 'Yield Matrix' },
          { id: 'payroll', icon: IndianRupee, label: 'Compensation' },
          { id: 'documents', icon: FileText, label: 'Vault' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'text-text-muted hover:text-text-secondary'}`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. CONTROL CENTER (DASHBOARD) */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Personnel', value: stats.total, icon: Users, color: 'text-primary' },
              { label: 'Active Specialists', value: stats.active, icon: UserCheck, color: 'text-success' },
              { label: 'Production Yield', value: `${stats.avgPerformance}%`, icon: Zap, color: 'text-warning' },
              { label: 'Revenue/Personnel', value: `₹${(stats.totalRevenue/stats.total/1000).toFixed(0)}k`, icon: IndianRupee, color: 'text-accent' },
            ].map((stat) => (
              <div key={stat.label} className="p-8 rounded-[32px] bg-surface border border-border hover:border-primary/40 transition-all shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><stat.icon className="w-16 h-16" /></div>
                <div className={`p-4 rounded-2xl bg-background ${stat.color} bg-opacity-10 w-fit mb-6 shadow-inner`}><stat.icon className="w-6 h-6" /></div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest italic mb-1">{stat.label}</p>
                <p className="text-4xl font-black text-white tracking-tighter italic">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-10 rounded-[40px] bg-surface border border-border shadow-2xl relative">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-6 italic-underlined decoration-primary/30">Personnel Productivity Manifest</h3>
              <div className="h-64 flex items-end gap-6 px-4">
                 {[72, 85, 94, 88, 92, 78, 86, 95, 89, 93, 84, 91].map((h, i) => (
                    <div key={i} className="flex-1 group relative">
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-background border border-border px-2 py-1 rounded text-[8px] font-black text-white opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                       <div style={{ height: `${h}%` }} className="w-full bg-gradient-to-t from-primary/10 via-primary/40 to-primary rounded-t-xl transition-all group-hover:scale-y-110 origin-bottom shadow-lg shadow-primary/20" />
                       <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-text-muted uppercase tracking-widest">M-{i+1}</span>
                    </div>
                 ))}
              </div>
            </div>

            <div className="p-10 rounded-[40px] bg-surface border border-border shadow-2xl space-y-8 overflow-hidden relative group">
               <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-8 italic-underlined decoration-accent/30">Top Strategic Perfomers</h3>
               <div className="space-y-8">
                  {employees.sort((a,b) => b.performance - a.performance).slice(0, 4).map((emp, i) => (
                    <div key={emp.id} className="flex items-center gap-4 group/item cursor-pointer" onClick={() => { setSelectedEmployee(emp); setActiveTab('directory'); }}>
                       <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary font-black italic shadow-inner group-hover/item:bg-primary group-hover/item:text-white transition-all transform group-hover/item:scale-110">#{i+1}</div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-white uppercase italic truncate group-hover/item:text-primary transition-colors">{emp.name}</p>
                          <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1 italic">{emp.role}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-black text-success italic tracking-tighter">{emp.performance}%</p>
                          <span className="text-[8px] font-black text-text-muted uppercase tracking-widest italic">Rank Manifest</span>
                       </div>
                    </div>
                  ))}
               </div>
               <button onClick={() => setActiveTab('performance')} className="w-full mt-12 py-4 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest transition-all italic hover:tracking-[0.2em]">View Complete Matrix</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="animate-fade-in space-y-6">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-6 rounded-[32px] border border-border shadow-xl">
              <div className="relative flex-1 max-w-md w-full">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search personnel manifest by name or ID..."
                   className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-2xl text-sm focus:outline-none focus:border-primary/50 transition-all font-medium italic"
                 />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <select 
                   value={roleFilter}
                   onChange={(e) => setRoleFilter(e.target.value)}
                   className="px-6 py-3 bg-background border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-muted focus:outline-none focus:border-primary transition-all cursor-pointer"
                 >
                    <option>All Roles</option>
                    <option>Admin</option>
                    <option>HR Manager</option>
                    <option>Senior Recruiter</option>
                    <option>Recruiter</option>
                 </select>
                 <button className="p-3 bg-background border border-border rounded-2xl text-text-muted hover:text-white transition-all shadow-inner"><Download className="w-5 h-5" /></button>
              </div>
           </div>

           <div className="bg-surface rounded-[40px] border border-border overflow-hidden shadow-2xl relative">
              <div className="overflow-x-auto custom-scrollbar">
                 <table className="w-full text-left">
                    <thead className="bg-background/40">
                       <tr>
                          <th className="py-6 px-10 text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">Identity Manifest</th>
                          <th className="py-6 px-6 text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">Strategic Role</th>
                          <th className="py-6 px-6 text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">Department</th>
                          <th className="py-6 px-6 text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">Manifest Status</th>
                          <th className="py-6 px-6 text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">Production Index</th>
                          <th className="py-6 px-10 text-right text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                       {filteredEmployees.map((emp) => (
                         <tr key={emp.id} className="group hover:bg-primary/5 transition-all cursor-pointer">
                            <td className="py-6 px-10">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary font-black italic shadow-inner group-hover:scale-110 transition-transform">
                                    {emp.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                     <p className="text-sm font-black text-white uppercase italic group-hover:text-primary transition-colors">{emp.name}</p>
                                     <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1 opacity-60">ID: {emp.id}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="py-6 px-6 text-sm font-bold text-white italic">{emp.role}</td>
                            <td className="py-6 px-6 text-xs font-black text-text-muted uppercase tracking-widest italic">{emp.department}</td>
                            <td className="py-6 px-6">
                               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${emp.status === 'Active' ? 'bg-success/10 text-success border-success/20' : 'bg-background text-text-muted border-border'}`}>
                                 {emp.status}
                               </span>
                            </td>
                            <td className="py-6 px-6">
                               <div className="flex items-center gap-3">
                                  <div className="w-20 h-2 bg-background rounded-full overflow-hidden border border-border">
                                     <div style={{ width: `${emp.performance}%` }} className={`h-full ${emp.performance > 90 ? 'bg-success' : 'bg-primary'} shadow-lg`} />
                                  </div>
                                  <span className="text-[10px] font-black text-white italic">{emp.performance}%</span>
                               </div>
                            </td>
                            <td className="py-6 px-10 text-right">
                               <button className="p-3 bg-background border border-border rounded-xl text-text-muted hover:text-primary transition-all hover:scale-110"><MoreHorizontal className="w-5 h-5" /></button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* 3. ROLES & PERMISSIONS */}
      {activeTab === 'roles' && (
        <div className="animate-fade-in space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {[
                { role: 'Admin', access: 'Total Orchestration', users: 2, color: 'text-primary' },
                { role: 'HR Manager', access: 'Personnel Oversight', users: 1, color: 'text-success' },
                { role: 'Lead Recruiter', access: 'Pipeline Manifestation', users: 4, color: 'text-warning' },
                { role: 'Recruiter', access: 'Sourcing Execution', users: 12, color: 'text-accent' },
              ].map((r, i) => (
                <div key={i} className="p-8 rounded-[35px] bg-surface border border-border shadow-xl relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Lock className="w-12 h-12" /></div>
                    <p className={`text-xl font-black ${r.color} uppercase italic tracking-tighter mb-2`}>{r.role}</p>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-6">{r.access}</p>
                    <div className="flex justify-between items-center border-t border-border pt-6">
                       <span className="text-xs font-black text-white italic">{r.users} Personnel</span>
                       <button className="text-[9px] font-black text-primary uppercase tracking-widest italic hover:underline">Edit Rights manifest</button>
                    </div>
                </div>
              ))}
           </div>

           <div className="p-10 rounded-[50px] bg-surface border border-border shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-6 italic-underlined decoration-primary/30">Institutional Access Matrix</h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic">
                       <tr>
                          <th className="pb-8 px-6">Permission Logic</th>
                          <th className="pb-8 px-6">Admin</th>
                          <th className="pb-8 px-6">HR Manager</th>
                          <th className="pb-8 px-6 text-primary">Recruiter</th>
                          <th className="pb-8 px-6">Support</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                       {[
                         { perm: 'Access Financial Manifests', a: true, h: true, r: false, s: false },
                         { perm: 'Deactivate Personnel', a: true, h: true, r: false, s: false },
                         { perm: 'Configure Sourcing Neural Matrix', a: true, h: false, r: true, s: false },
                         { perm: 'Audit Pipeline Logic', a: true, h: true, r: true, s: false },
                         { perm: 'Modify Recruitment Thresholds', a: true, h: false, r: true, s: false },
                       ].map((p, i) => (
                         <tr key={i} className="group hover:bg-primary/5 transition-all">
                            <td className="py-6 px-6 text-sm font-black text-white uppercase italic tracking-tighter">{p.perm}</td>
                            <td className="py-6 px-6">{p.a ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-text-muted opacity-20" />}</td>
                            <td className="py-6 px-6">{p.h ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-text-muted opacity-20" />}</td>
                            <td className="py-6 px-6">{p.r ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <XCircle className="w-5 h-5 text-text-muted opacity-20" />}</td>
                            <td className="py-6 px-6">{p.s ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-text-muted opacity-20" />}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* 4. ATTENDANCE & ACTIVITY TRACKING */}
      {activeTab === 'attendance' && (
        <div className="animate-fade-in space-y-8">
           <div className="p-10 rounded-[50px] bg-surface border border-border shadow-2xl relative">
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Live Activity <span className="text-primary not-italic">Heatmap</span></h3>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1 italic italic-underlined decoration-primary/20">Real-time personnel engagement manifests</p>
                 </div>
                 <div className="flex gap-4">
                    <button className="px-5 py-2.5 bg-background border border-border rounded-xl text-[10px] font-black text-white uppercase tracking-widest italic">View Month Manifest</button>
                    <button className="p-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl"><History className="w-5 h-5" /></button>
                 </div>
              </div>
              <div className="grid grid-cols-7 gap-4">
                 {[72, 84, 91, 65, 78, 0, 0, 88, 74, 92, 81, 75, 0, 0, 95, 87, 72, 68, 83, 0, 0, 89, 76, 94, 82, 77, 0, 0].map((h, i) => (
                   <div key={i} className={`h-24 rounded-[20px] bg-background border border-border/50 relative group overflow-hidden ${h === 0 ? 'opacity-30' : ''}`}>
                      <div className="absolute inset-x-0 bottom-0 bg-primary/20 transition-all duration-700" style={{ height: `${h}%` }} />
                      <div className="absolute top-3 left-3 text-[10px] font-black text-text-muted italic">{i+1}</div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[50px] bg-surface border border-border shadow-2xl overflow-hidden relative">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-6 italic-underlined decoration-accent/30">Personnel Session Logs</h3>
              <div className="space-y-6">
                 {employees.slice(0, 5).map((e, i) => (
                   <div key={i} className="flex items-center gap-6 p-4 rounded-3xl bg-background border border-border hover:border-primary/30 transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary font-black italic shadow-inner">{e.name.split(' ').map(n => n[0]).join('')}</div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-black text-white uppercase italic truncate group-hover:text-primary transition-colors">{e.name}</p>
                         <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1 italic">Session Active: 6h 42m</p>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black text-success uppercase tracking-widest italic flex items-center gap-1 justify-end"><Activity className="w-3 h-3" /> Live Manifest</span>
                         <p className="text-[8px] text-text-muted font-bold uppercase tracking-widest mt-1.5 italic">Login: 09:12 AM</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* 5. PERFORMANCE (YIELD MATRIX) */}
      {activeTab === 'performance' && (
        <div className="animate-fade-in space-y-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-12 rounded-[50px] bg-surface border border-border shadow-2xl relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5"><TrendingUp className="w-48 h-48" /></div>
                 <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-12">Production Yield <span className="text-primary not-italic">Variance</span></h3>
                 <div className="space-y-12">
                    {employees.slice(2, 6).map((e, i) => (
                      <div key={i} className="group/item cursor-pointer">
                         <div className="flex justify-between items-end mb-3">
                            <div>
                               <p className="text-base font-black text-white uppercase italic tracking-tighter group-hover/item:text-primary transition-colors">{e.name}</p>
                               <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1">Strategic Index: {e.performance}%</p>
                            </div>
                            <span className="text-lg font-black text-success italic tracking-tighter">₹{(e.revenue/1000).toFixed(0)}k</span>
                         </div>
                         <div className="h-6 w-full bg-background rounded-2xl p-1.5 border border-border shadow-inner">
                            <div className="h-full bg-gradient-to-r from-primary/30 to-primary rounded-xl transition-all duration-1000 shadow-lg shadow-primary/20" style={{ width: `${e.performance}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-12 rounded-[50px] bg-surface border border-border shadow-2xl flex flex-col justify-between overflow-hidden relative">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-10 border-b border-border pb-6 italic-underlined decoration-success/30">Yield manifestation Leaderboard</h3>
                 <div className="space-y-8 flex-1 py-4">
                    {employees.sort((a,b) => b.revenue - a.revenue).map((emp, i) => (
                      <div key={emp.id} className="flex items-center gap-6 group cursor-pointer hover:scale-105 transition-all">
                         <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-primary font-black italic shadow-inner group-hover:bg-primary group-hover:text-white transition-all transform animate-pulse-slow">#{i+1}</div>
                         <div className="flex-1 min-w-0">
                            <p className="text-base font-black text-white uppercase italic truncate tracking-tighter italic-underlined decoration-primary/10">{emp.name}</p>
                            <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1 italic">Production Hub</p>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-black text-success italic tracking-tighter">₹{(emp.revenue/1000).toFixed(0)}k</p>
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-widest italic decoration-primary/20">Hires: {Math.floor(emp.revenue / 200000)} manifested</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 6. PAYROLL & COMPENSATION */}
      {activeTab === 'payroll' && (
        <div className="animate-fade-in space-y-8">
           <div className="p-10 rounded-[50px] bg-surface border border-border shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><IndianRupee className="w-40 h-40" /></div>
              <div className="flex justify-between items-center mb-10 relative z-10">
                 <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Compensation <span className="text-primary not-italic">Matrix</span></h3>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] mt-1 italic decoration-primary/20 underline">Salary + Commission manifestation audits</p>
                 </div>
                 <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-success to-success-dark text-white text-xs font-black uppercase tracking-widest hover:shadow-xl hover:shadow-success/20 transition-all flex items-center gap-2 italic"><Zap className="w-4 h-4" /> Finalize Manifest</button>
              </div>
              <div className="overflow-x-auto custom-scrollbar relative z-10">
                 <table className="w-full text-left">
                    <thead className="text-[11px] font-black text-text-muted uppercase tracking-[0.3em] italic border-b border-border/50">
                       <tr>
                          <th className="py-6 px-4">Entity Identity</th>
                          <th className="py-6 px-4">Basic Yield</th>
                          <th className="py-6 px-4">Commission manifest</th>
                          <th className="py-6 px-4">Surplus/Incentive</th>
                          <th className="py-6 px-4 text-right">Total Capital Disbursement</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                       {employees.slice(0, 5).map((e, i) => (
                         <tr key={i} className="group hover:bg-primary/5 transition-all">
                            <td className="py-8 px-4">
                               <p className="text-sm font-black text-white uppercase italic group-hover:text-primary transition-colors">{e.name}</p>
                            </td>
                            <td className="py-8 px-4 text-sm font-bold text-white italic">₹125,000</td>
                            <td className="py-8 px-4 text-sm font-black text-primary italic">₹{(e.revenue * 0.1 / 1000).toFixed(0)}k</td>
                            <td className="py-8 px-4 text-sm font-bold text-accent italic">₹15,000</td>
                            <td className="py-8 px-4 text-right pr-10">
                               <p className="text-lg font-black text-success italic tracking-tighter">₹{(140 + e.revenue * 0.1 / 1000).toFixed(0)}k</p>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* 7. DOCUMENTS (VAULT) */}
      {activeTab === 'documents' && (
        <div className="animate-fade-in space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { type: 'Offer Manifests', count: 12, size: '2.4 MB' },
                { type: 'Identity Verifications', count: 24, size: '14.8 MB' },
                { type: 'Personnel Contracts', count: 8, size: '1.2 MB' },
                { type: 'System Audit Logs', count: 142, size: '4.5 MB' },
              ].map((v, i) => (
                <div key={i} className="p-8 rounded-[35px] bg-surface border border-border shadow-xl hover:border-primary/40 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><FileText className="w-12 h-12" /></div>
                    <p className="text-lg font-black text-white uppercase italic tracking-tighter mb-2 italic-underlined decoration-primary/10">{v.type}</p>
                    <div className="flex justify-between items-center mt-6">
                       <span className="text-[10px] font-black text-text-muted uppercase italic tracking-widest">{v.count} Files</span>
                       <span className="text-[10px] font-black text-primary uppercase italic tracking-widest">{v.size}</span>
                    </div>
                </div>
              ))}
           </div>

           <div className="p-10 rounded-[50px] bg-surface border border-border shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Strategic Storage Manifest</h3>
                 <button className="p-3 bg-background border border-border rounded-xl text-text-muted hover:text-primary"><Search className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                 {[
                   { name: 'Sarah_Chen_Contract_2024.pdf', type: 'Contract', date: '2h ago' },
                   { name: 'Michael_Ross_Offer_Letter.pdf', type: 'Offer', date: 'Yesterday' },
                   { name: 'Institutional_Audit_H1.pdf', type: 'Audit', date: '2d ago' },
                   { name: 'Personnel_Policy_V2.pdf', type: 'System', date: '1w ago' },
                 ].map((doc, i) => (
                   <div key={i} className="p-6 rounded-3xl bg-background border border-border hover:border-accent/40 transition-all flex items-center justify-between group cursor-pointer overflow-hidden relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20 group-hover:bg-accent transition-all" />
                      <div className="flex items-center gap-5 ml-2">
                         <div className="p-3 rounded-xl bg-surface border border-border text-text-muted group-hover:text-accent transition-colors shadow-md"><FileText className="w-5 h-5" /></div>
                         <div>
                            <p className="text-sm font-black text-white uppercase italic group-hover:text-accent transition-colors">{doc.name}</p>
                            <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest mt-1 italic">Type: {doc.type} • Manifested {doc.date}</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <button className="p-3 rounded-xl bg-surface border border-border text-text-muted hover:text-white transition-all shadow-md"><Download className="w-4 h-4" /></button>
                         <button className="p-3 rounded-xl bg-surface border border-border text-text-muted hover:text-danger hover:border-danger/30 transition-all shadow-md"><Trash2 className="w-4 h-4" /></button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* ADD MEMBER MODAL (placeholder logic) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[600] flex items-center justify-center p-6">
           <div className="w-full max-w-2xl bg-surface border border-border rounded-[60px] overflow-hidden shadow-2xl animate-scale-up">
              <div className="p-12 text-center bg-background/50 border-b border-border">
                 <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Register <span className="text-primary not-italic">Personnel</span></h3>
                 <p className="text-xs text-text-muted font-bold uppercase tracking-[0.5em] mt-3 italic decoration-primary/40 underline">Institutional Resource Integration</p>
              </div>
              <div className="p-12 space-y-8 bg-surface">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic ml-2">Full Identity</p>
                       <input type="text" placeholder="Full Name" className="w-full p-4 bg-background border border-border rounded-2xl text-white italic font-bold focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic ml-2">Email manifest</p>
                       <input type="email" placeholder="Institutional Email" className="w-full p-4 bg-background border border-border rounded-2xl text-white italic font-bold focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic ml-2">Strategic Role</p>
                       <select className="w-full p-4 bg-background border border-border rounded-2xl text-white italic font-bold focus:border-primary outline-none appearance-none">
                          <option>Recruiter</option>
                          <option>Senior Recruiter</option>
                          <option>HR Manager</option>
                          <option>Support specialist</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic ml-2">Joining Manifest</p>
                       <input type="date" className="w-full p-4 bg-background border border-border rounded-2xl text-white italic font-bold focus:border-primary outline-none" />
                    </div>
                 </div>
                 <div className="flex gap-6 pt-6">
                    <button onClick={() => setShowAddModal(false)} className="flex-1 py-5 rounded-3xl bg-surface border border-border text-[11px] font-black text-white uppercase tracking-widest hover:bg-surface-active transition-all italic tracking-[0.1em]">Abort integration</button>
                    <button onClick={() => setShowAddModal(false)} className="flex-1 py-5 rounded-3xl bg-gradient-to-r from-primary to-primary-dark text-white text-[11px] font-black uppercase tracking-widest hover:shadow-[0_0_50px_rgba(108,92,231,0.5)] transition-all flex items-center justify-center gap-3 italic"><Zap className="w-5 h-5" /> Execute integration</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
