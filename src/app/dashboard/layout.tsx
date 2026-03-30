'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain, LayoutDashboard, Users, Kanban, Briefcase, Building2,
  HandshakeIcon, BarChart3, Globe, Settings, Bell, Search,
  ChevronLeft, ChevronRight, LogOut, Sparkles, Menu, X,
  Shield, Bot, MessageSquare, IndianRupee
} from 'lucide-react';
import { notifications as mockNotifications } from '@/lib/mock-data';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', group: 'main' },
  { href: '/dashboard/candidates', icon: Users, label: 'Candidates', group: 'main' },
  { href: '/dashboard/ats', icon: Kanban, label: 'ATS Pipeline', group: 'main' },
  { href: '/dashboard/jobs', icon: Briefcase, label: 'Jobs', group: 'main' },
  { href: '/dashboard/crm', icon: Building2, label: 'CRM', group: 'crm' },
  { href: '/dashboard/deals', icon: HandshakeIcon, label: 'Deals', group: 'crm' },
  { href: '/dashboard/ai', icon: Bot, label: 'AI Engine', group: 'ai' },
  { href: '/dashboard/finance', icon: IndianRupee, label: 'Finance', group: 'finance' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', group: 'analytics' },
  { href: '/dashboard/reports', icon: LayoutDashboard, label: 'Reports', group: 'analytics' },
  { href: '/dashboard/careers', icon: Globe, label: 'Career Page', group: 'analytics' },
  { href: '/dashboard/employees', icon: Users, label: 'Employees', group: 'team' },
  { href: '/dashboard/admin', icon: Shield, label: 'Admin Panel', group: 'admin' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings', group: 'admin' },
];

const groupLabels: Record<string, string> = {
  main: 'Recruitment',
  crm: 'CRM',
  team: 'Personnel',
  ai: 'AI Tools',
  finance: 'Capital',
  analytics: 'Insights',
  admin: 'System',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  let lastGroup = '';

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-overlay z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col bg-sidebar border-r border-border transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 h-16 border-b border-border shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sm font-bold text-white tracking-tight">CGT RecruitAI</h1>
              <p className="text-[10px] text-text-muted">AI Recruitment Platform</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const showGroupLabel = item.group !== lastGroup;
            lastGroup = item.group;

            return (
              <div key={item.href}>
                {showGroupLabel && !collapsed && (
                  <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-3 mt-4 mb-2 first:mt-0">
                    {groupLabels[item.group]}
                  </p>
                )}
                {showGroupLabel && collapsed && <div className="h-px bg-border mx-2 my-2 first:hidden" />}
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-200 group relative ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  } ${collapsed ? 'justify-center' : ''}`}
                >
                  {isActive(item.href) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
                  )}
                  <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive(item.href) ? 'text-primary' : 'text-text-muted group-hover:text-text-secondary'}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-surface-active text-xs font-medium text-text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* AI Assistant teaser */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-white">AI Assistant</span>
              </div>
              <p className="text-[11px] text-text-muted mb-2">Ask AI to find candidates, score resumes, or get insights.</p>
              <button className="w-full py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                Open Chat
              </button>
            </div>
          </div>
        )}

        {/* User section */}
        <div className={`border-t border-border p-3 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? '' : 'px-1'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
              SC
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Sarah Chen</p>
                <p className="text-[11px] text-text-muted truncate">Admin</p>
              </div>
            )}
            {!collapsed && (
              <Link href="/" className="text-text-muted hover:text-danger transition-colors">
                <LogOut className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface border border-border items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-6 gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates, jobs, clients..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
            />
            <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] text-text-muted bg-background border border-border">⌘K</kbd>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-surface border border-border shadow-2xl animate-scale-in overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    <button className="text-xs text-primary hover:text-primary-light">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 border-b border-border/50 hover:bg-surface-hover transition-colors cursor-pointer ${
                          !n.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                            n.type === 'success' ? 'bg-success' :
                            n.type === 'warning' ? 'bg-warning' :
                            n.type === 'action' ? 'bg-primary' : 'bg-info'
                          }`} />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary">{n.title}</p>
                            <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{n.message}</p>
                            <p className="text-[10px] text-text-muted mt-1">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI button */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all">
              <Sparkles className="w-4 h-4" />
              <span>AI</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
