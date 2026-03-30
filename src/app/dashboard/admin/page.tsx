'use client';

import { useState } from 'react';
import {
  Shield, Users, Brain, Settings, FileText, Activity,
  AlertTriangle, Search, MoreHorizontal, Plus, Edit, Trash2,
  Lock, Unlock, Eye, Download, RefreshCw, ChevronRight,
  Server, Database, Zap, Globe, Bell
} from 'lucide-react';

const tabs = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'ai', label: 'AI Config', icon: Brain },
  { id: 'audit', label: 'Audit Logs', icon: Activity },
  { id: 'system', label: 'System', icon: Server },
];

const mockUsers = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@cgtrecruit.ai', role: 'admin', status: 'active', lastLogin: '2024-03-22T14:00:00Z' },
  { id: 'u2', name: 'Mike Torres', email: 'mike@cgtrecruit.ai', role: 'recruiter', status: 'active', lastLogin: '2024-03-22T12:30:00Z' },
  { id: 'u3', name: 'Lisa Park', email: 'lisa@cgtrecruit.ai', role: 'recruiter', status: 'active', lastLogin: '2024-03-22T10:15:00Z' },
  { id: 'u4', name: 'John Davis', email: 'john@cgtrecruit.ai', role: 'hiring_manager', status: 'active', lastLogin: '2024-03-21T16:45:00Z' },
  { id: 'u5', name: 'Amy Wilson', email: 'amy@cgtrecruit.ai', role: 'recruiter', status: 'inactive', lastLogin: '2024-03-15T09:00:00Z' },
];

const mockAuditLogs = [
  { id: 'a1', user: 'Sarah Chen', action: 'Updated AI scoring model', resource: 'AI Config', timestamp: '2024-03-22T14:30:00Z', ip: '192.168.1.1' },
  { id: 'a2', user: 'Mike Torres', action: 'Exported candidate list', resource: 'Candidates', timestamp: '2024-03-22T13:00:00Z', ip: '10.0.0.5' },
  { id: 'a3', user: 'Sarah Chen', action: 'Created new user account', resource: 'Users', timestamp: '2024-03-22T11:15:00Z', ip: '192.168.1.1' },
  { id: 'a4', user: 'John Davis', action: 'Viewed candidate profile', resource: 'Candidates', timestamp: '2024-03-22T10:45:00Z', ip: '172.16.0.10' },
  { id: 'a5', user: 'Lisa Park', action: 'Moved candidate to Interview', resource: 'ATS', timestamp: '2024-03-22T09:30:00Z', ip: '10.0.0.8' },
  { id: 'a6', user: 'System', action: 'Automated backup completed', resource: 'System', timestamp: '2024-03-22T03:00:00Z', ip: 'internal' },
  { id: 'a7', user: 'Sarah Chen', action: 'Updated GDPR settings', resource: 'Settings', timestamp: '2024-03-21T16:00:00Z', ip: '192.168.1.1' },
  { id: 'a8', user: 'Mike Torres', action: 'Deleted candidate data (GDPR request)', resource: 'Candidates', timestamp: '2024-03-21T14:30:00Z', ip: '10.0.0.5' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <span className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-xs font-medium">Admin Only</span>
          </div>
          <p className="text-text-secondary mt-1">Manage users, AI configuration, and system settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-surface border border-border w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50"
              />
            </div>
            <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>

          <div className="rounded-xl bg-surface border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:table-cell">Last Login</th>
                  <th className="w-20"></th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        user.role === 'admin' ? 'bg-danger/10 text-danger' :
                        user.role === 'recruiter' ? 'bg-primary/10 text-primary' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        user.status === 'active' ? 'bg-success/10 text-success' : 'bg-surface-hover text-text-muted'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-text-muted">
                        {new Date(user.lastLogin).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-danger transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Config Tab */}
      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              AI Scoring Model
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">Scoring Model</label>
                <select className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50">
                  <option>RecruitAI v3.2 (Latest)</option>
                  <option>RecruitAI v3.1</option>
                  <option>RecruitAI v3.0</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">Minimum Score Threshold</label>
                <input type="range" min="0" max="100" defaultValue="60" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>0</span><span>60 (current)</span><span>100</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1.5 block">Auto-Score New Candidates</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              AI Features
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Resume Parsing', desc: 'Auto-extract data from uploaded resumes', enabled: true },
                { label: 'Candidate Matching', desc: 'AI-powered job-candidate matching', enabled: true },
                { label: 'Skill Enrichment', desc: 'Infer skills from experience data', enabled: true },
                { label: 'Outreach Assistant', desc: 'AI-drafted outreach messages', enabled: true },
                { label: 'Predictive Analytics', desc: 'Time-to-hire predictions', enabled: false },
                { label: 'Auto Scheduling', desc: 'AI-powered interview scheduling', enabled: false },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/50">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{feature.label}</p>
                    <p className="text-[11px] text-text-muted">{feature.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={feature.enabled} className="sr-only peer" />
                    <div className="w-9 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-success" />
              AI Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Predictions', value: '12,847', color: 'text-primary' },
                { label: 'Accuracy Rate', value: '94.2%', color: 'text-success' },
                { label: 'Avg. Processing Time', value: '2.3s', color: 'text-accent' },
                { label: 'API Calls Today', value: '847', color: 'text-warning' },
              ].map((metric) => (
                <div key={metric.label} className="p-4 rounded-lg bg-surface-hover/50 text-center">
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  <p className="text-[10px] text-text-muted mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" placeholder="Search audit logs..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50" />
            </div>
            <button className="px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="rounded-xl bg-surface border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Resource</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:table-cell">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors">
                    <td className="px-4 py-3 text-xs text-text-muted whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-primary">{log.user}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{log.action}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-surface-hover text-text-muted">{log.resource}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-muted hidden lg:table-cell font-mono">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" />
              System Status
            </h3>
            <div className="space-y-3">
              {[
                { label: 'API Server', status: 'Healthy', color: 'bg-success' },
                { label: 'Database', status: 'Healthy', color: 'bg-success' },
                { label: 'AI Engine', status: 'Healthy', color: 'bg-success' },
                { label: 'Email Service', status: 'Healthy', color: 'bg-success' },
                { label: 'File Storage', status: 'Warning', color: 'bg-warning' },
              ].map((service) => (
                <div key={service.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/50">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${service.color}`} />
                    <span className="text-sm text-text-primary">{service.label}</span>
                  </div>
                  <span className="text-xs text-text-muted">{service.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-accent" />
              Database Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Total Records', value: '48,291' },
                { label: 'Storage Used', value: '2.4 GB / 10 GB' },
                { label: 'Last Backup', value: 'Mar 22, 03:00 AM' },
                { label: 'Uptime', value: '99.97%' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/50">
                  <span className="text-sm text-text-secondary">{stat.label}</span>
                  <span className="text-sm font-medium text-text-primary">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-danger" />
              GDPR & Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-surface-hover/50">
                <p className="text-xs text-text-muted mb-1">Data Deletion Requests</p>
                <p className="text-xl font-bold text-white">3</p>
                <p className="text-[10px] text-warning mt-1">2 pending</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-hover/50">
                <p className="text-xs text-text-muted mb-1">Consent Records</p>
                <p className="text-xl font-bold text-white">1,247</p>
                <p className="text-[10px] text-success mt-1">All compliant</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-hover/50">
                <p className="text-xs text-text-muted mb-1">Data Retention</p>
                <p className="text-xl font-bold text-white">12 months</p>
                <p className="text-[10px] text-text-muted mt-1">Auto-purge enabled</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
