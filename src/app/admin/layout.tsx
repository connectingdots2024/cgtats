'use client';

import { useState } from 'react';
import { 
  Shield, Users, UserPlus, Search, Filter, Bell, Settings, 
  Menu, X, ChevronRight, LayoutDashboard, Briefcase, 
  UserCheck, Building2, IndianRupee, BarChart3, Zap, 
  History, Lock, LifeBuoy, FileText, Globe, Key, 
  AlertTriangle, Mail, LogOut, CheckCircle2, ChevronDown,
  Activity, Database, Server, Smartphone, Monitor, Cpu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const adminNavItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Control Center', group: 'main' },
  { href: '/admin/users', icon: Users, label: 'User Directory', group: 'personnel' },
  { href: '/admin/employees', icon: UserCheck, label: 'Force Manifest', group: 'personnel' },
  { href: '/admin/candidates', icon: Globe, label: 'Candidate Vault', group: 'recruitment' },
  { href: '/admin/ats', icon: Briefcase, label: 'Pipeline Logic', group: 'recruitment' },
  { href: '/admin/clients', icon: Building2, label: 'Client CRM', group: 'crm' },
  { href: '/admin/finance', icon: IndianRupee, label: 'Capital Flow', group: 'finance' },
  { href: '/admin/reports', icon: BarChart3, label: 'Intelligence', group: 'finance' },
  { href: '/admin/ai', icon: Zap, label: 'Neural Hub', group: 'ai' },
  { href: '/admin/support', icon: LifeBuoy, label: 'Support Manifest', group: 'system' },
  { href: '/admin/audit', icon: History, label: 'Audit Logs', group: 'system' },
  { href: '/admin/security', icon: Lock, label: 'Encryption & RBAC', group: 'system' },
  { href: '/admin/settings', icon: Settings, label: 'Core Configuration', group: 'system' },
];

const groupLabels: Record<string, string> = {
  main: 'Command',
  personnel: 'Identity',
  recruitment: 'Operational',
  crm: 'Partners',
  finance: 'Stewardship',
  ai: 'Synergy',
  system: 'Infrastructure',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex h-screen bg-background text-text-primary overflow-hidden font-sans selection:bg-primary/30">
      {/* SIDEBAR: Admin Command Manifold */}
      <aside 
        className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-surface border-r border-border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col z-[100] relative shadow-[10px_0_50px_rgba(0,0,0,0.2)]`}
      >
        <div className="p-8 flex items-center justify-between border-b border-border">
          <Link href="/admin" className="flex items-center gap-4 group">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}>
              <Shield className="w-6 h-6 animate-pulse-slow" />
            </div>
            {isSidebarOpen && (
              <div>
                <span className="text-xl font-black tracking-tighter italic uppercase text-white block leading-none">RECRUIT <span className="text-primary not-italic">AI</span></span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-text-muted uppercase mt-1 block italic opacity-60">Admin Command</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
          {Object.entries(groupLabels).map(([group, label]) => {
            const items = adminNavItems.filter(item => item.group === group);
            if (items.length === 0) return null;

            return (
              <div key={group} className="space-y-3">
                {isSidebarOpen && (
                  <h3 className="px-4 text-[10px] font-black text-text-muted uppercase tracking-[0.3em] italic opacity-50 mb-4">{label}</h3>
                )}
                <div className="space-y-1">
                  {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                            : 'text-text-muted hover:bg-surface-hover hover:text-white'
                        }`}
                      >
                         {isActive && (
                           <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-full shadow-[0_0_10px_white]" />
                         )}
                        <item.icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} />
                        {isSidebarOpen && (
                          <span className="text-sm font-black uppercase tracking-widest italic">{item.label}</span>
                        )}
                        {!isSidebarOpen && (
                          <div className="absolute left-full ml-4 px-3 py-2 bg-surface border border-border rounded-xl text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-[200] pointer-events-none shadow-2xl">
                            {item.label}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ADMIN IDENTITY FOOTER */}
        <div className="p-6 border-t border-border bg-background/30">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary font-black italic shadow-inner group cursor-pointer hover:border-primary transition-all">
                SC
             </div>
             {isSidebarOpen && (
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white uppercase italic truncate">Sarah Chen</p>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1 italic">Super Admin Manifest</p>
               </div>
             )}
             {isSidebarOpen && <button className="p-2 text-text-muted hover:text-primary transition-colors"><LogOut className="w-5 h-5" /></button>}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* HEADER: Universal Control Bar */}
        <header className="h-24 bg-surface/50 backdrop-blur-3xl border-b border-border px-10 flex items-center justify-between z-50">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 rounded-xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="relative group hidden md:block">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Universal Multi-Module Search..."
                   className="w-[400px] pl-12 pr-4 py-3 bg-background border border-border rounded-2xl text-sm focus:outline-none focus:border-primary transition-all font-medium italic shadow-inner"
                 />
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 pointer-events-none opacity-40">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[9px] font-bold">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[9px] font-bold">K</kbd>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-8 mr-8">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-1">System Health</p>
                    <div className="flex items-center gap-2">
                       <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-success rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
                       </div>
                       <span className="text-xs font-black text-white italic tracking-tighter uppercase">Operational</span>
                    </div>
                 </div>
                 <div className="text-right border-l border-border pl-8">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest italic mb-1">Active Neural Nodes</p>
                    <p className="text-lg font-black text-primary italic tracking-tighter leading-none">12 <span className="text-[10px] text-text-secondary">/ 12</span></p>
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <button className="relative p-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner group">
                    <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface animate-pulse" />
                 </button>
                 <button className="p-3 rounded-2xl bg-background border border-border text-text-muted hover:text-white transition-all shadow-inner">
                    <Monitor className="w-5 h-5" />
                 </button>
                 <div className="h-8 w-px bg-border mx-2" />
                 <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">Live Manifest</span>
                 </div>
              </div>
           </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-background/5 relative">
          {/* Subtle noise/gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(108,92,231,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="relative z-10 animate-fade-in max-w-[1600px] mx-auto">
             {children}
          </div>
        </div>
      </main>

      {/* GLOBAL SEARCH COMMAND PALETTE (Placeholder Overlay) */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[1000] flex items-start justify-center pt-[15vh] p-6">
           <div className="w-full max-w-3xl bg-surface border border-border rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(108,92,231,0.3)] animate-scale-up">
              <div className="p-8 border-b border-border">
                 <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Manifest module, personnel, or strategic capital record..."
                      className="w-full pl-16 pr-8 py-6 bg-background border-none rounded-3xl text-xl text-white outline-none font-black italic tracking-tight italic-underlined decoration-primary/20"
                    />
                 </div>
              </div>
              <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-10">
                 <div>
                    <h4 className="text-[11px] font-black text-text-muted uppercase tracking-[0.4em] mb-6 italic">Strategic Shortcuts</h4>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { icon: UserPlus, label: 'Integrate Personnel', key: 'N' },
                         { icon: Plus, label: 'Manifest Mandate', key: 'J' },
                         { icon: FileText, label: 'Audited Report', key: 'R' },
                         { icon: IndianRupee, label: 'Capital Disbursement', key: 'P' },
                       ].map(s => (
                         <div key={s.label} className="p-5 rounded-3xl bg-background border border-border hover:border-primary/50 transition-all cursor-pointer flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                               <div className="p-3 rounded-2xl bg-surface border border-border text-text-muted group-hover:text-primary transition-colors"><s.icon className="w-5 h-5" /></div>
                               <span className="text-sm font-black text-white uppercase italic">{s.label}</span>
                            </div>
                            <kbd className="px-2 py-1 rounded bg-surface border border-border text-[9px] font-bold text-text-muted group-hover:text-primary transition-colors">{s.key}</kbd>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-background/50 border-t border-border flex justify-between items-center">
                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest italic">Institutional Search Manifest v4.2.0</p>
                 <button onClick={() => setShowSearch(false)} className="text-[10px] text-text-muted hover:text-white uppercase font-black underline italic">Terminate Manifold</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
