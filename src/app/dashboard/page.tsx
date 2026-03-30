'use client';

import { useState, useEffect } from 'react';
import {
  Users, Briefcase, TrendingUp, Clock, Brain, Sparkles,
  ArrowUpRight, ArrowDownRight, UserPlus, Mail, Calendar,
  MessageSquare, Zap, Target, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { analyticsData, candidates, activities, aiInsights, jobs } from '@/lib/mock-data';
import AddCandidateModal from '@/components/AddCandidateModal';

const stats = [
  {
    label: 'Total Candidates',
    value: '156',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'from-[#6C5CE7] to-[#A29BFE]',
  },
  {
    label: 'Open Positions',
    value: '5',
    change: '+2',
    trend: 'up',
    icon: Briefcase,
    color: 'from-[#00D2FF] to-[#74E4FF]',
  },
  {
    label: 'Placement Rate',
    value: '68%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-[#00E676] to-[#69F0AE]',
  },
  {
    label: 'Avg. Time to Hire',
    value: '28d',
    change: '-3d',
    trend: 'down',
    icon: Clock,
    color: 'from-[#FFB74D] to-[#FFD54F]',
  },
];

const activityIcons: Record<string, typeof Users> = {
  candidate_added: UserPlus,
  status_change: Zap,
  note_added: MessageSquare,
  interview_scheduled: Calendar,
  email_sent: Mail,
  ai_scoring: Brain,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-active border border-border rounded-lg p-3 shadow-xl">
        <p className="text-xs text-text-muted mb-1">{label}</p>
        <p className="text-sm font-semibold text-white">{payload[0].value} applications</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [candidatesList, setCandidatesList] = useState(candidates);

  const handleAddCandidate = (candidate: any) => {
    setCandidatesList([candidate, ...candidatesList]);
  };

  return (
    <div className="space-y-6 stagger-children">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Good afternoon, Sarah 👋</h1>
          <p className="text-text-secondary mt-1">Here&apos;s your recruitment overview for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            March 2024
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl bg-surface border border-border p-5 hover:border-border-light transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'text-success bg-success/10' : 'text-info bg-info/10'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-text-muted mt-1">{stat.label}</p>
            {/* Hover gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application trend chart */}
        <div className="lg:col-span-2 rounded-xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Application Trend</h2>
              <p className="text-sm text-text-muted mt-0.5">Weekly applications over 8 weeks</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Applications
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={analyticsData.weeklyApplications}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2432" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#5C6478', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5C6478', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#6C5CE7" strokeWidth={2.5} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-white">AI Insights</h2>
            </div>
            <span className="text-xs text-text-muted">4 new</span>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                  insight.priority === 'high'
                    ? 'bg-primary/5 border-primary/20 hover:border-primary/40'
                    : 'bg-surface-hover border-border hover:border-border-light'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    insight.type === 'recommendation' ? 'bg-primary' :
                    insight.type === 'alert' ? 'bg-warning' : 'bg-info'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">{insight.title}</p>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{insight.description}</p>
                    {insight.actionLabel && (
                      <button className="text-xs text-primary font-medium mt-2 hover:text-primary-light transition-colors flex items-center gap-1">
                        {insight.actionLabel}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Performance */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Source Performance</h2>
          <p className="text-sm text-text-muted mb-6">Candidate quality by source</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData.sourcePerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2432" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#5C6478', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="source" tick={{ fill: '#9BA3B5', fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip
                contentStyle={{ background: '#222836', border: '1px solid #2A3040', borderRadius: '8px' }}
                labelStyle={{ color: '#E8ECF4' }}
                itemStyle={{ color: '#9BA3B5' }}
              />
              <Bar dataKey="count" fill="#6C5CE7" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <button className="text-xs text-primary hover:text-primary-light transition-colors">View all</button>
          </div>
          <div className="space-y-4">
            {activities.slice(0, 6).map((activity) => {
              const Icon = activityIcons[activity.type] || Zap;
              return (
                <div key={activity.id} className="flex items-start gap-3 group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activity.type === 'ai_scoring' ? 'bg-primary/10 text-primary' :
                    activity.type === 'status_change' ? 'bg-success/10 text-success' :
                    activity.type === 'interview_scheduled' ? 'bg-warning/10 text-warning' :
                    'bg-surface-hover text-text-muted'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-text-primary group-hover:text-white transition-colors">{activity.description}</p>
                    <TimestampDisplay timestamp={activity.timestamp} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Candidates */}
      <div className="rounded-xl bg-surface border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Top AI-Scored Candidates</h2>
            <p className="text-sm text-text-muted mt-0.5">Highest-matching candidates across all positions</p>
          </div>
          <button className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {candidatesList
            .sort((a, b) => b.aiScore - a.aiScore)
            .slice(0, 4)
            .map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">{candidate.name}</p>
                    <p className="text-xs text-text-muted truncate">{candidate.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-bold text-primary">{candidate.aiScore}</span>
                    <span className="text-xs text-text-muted">/100</span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    candidate.status === 'interview' ? 'bg-warning/10 text-warning' :
                    candidate.status === 'screening' ? 'bg-info/10 text-info' :
                    candidate.status === 'offer' ? 'bg-success/10 text-success' :
                    candidate.status === 'hired' ? 'bg-primary/10 text-primary' :
                    'bg-surface-hover text-text-muted'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {candidate.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-secondary">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-muted">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <AddCandidateModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddCandidate} 
      />
    </div>
  );
}

function TimestampDisplay({ timestamp }: { timestamp: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-4 w-24 bg-surface-hover/50 rounded animate-pulse mt-1" />;

  return (
    <p className="text-xs text-text-muted mt-0.5">
      {new Date(timestamp).toLocaleString([], {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      })}
    </p>
  );
}
