'use client';

import {
  BarChart3, TrendingUp, Clock, Users, Target, Download,
  Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
  LineChart, Line, Legend
} from 'recharts';
import { analyticsData } from '@/lib/mock-data';

const COLORS = ['#6C5CE7', '#00D2FF', '#00E676', '#FFB74D', '#FF5252'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-active border border-border rounded-lg p-3 shadow-xl">
        <p className="text-xs text-text-muted mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const funnelData = analyticsData.conversionRates;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-text-secondary mt-1">Hiring performance and recruitment metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 days
          </button>
          <button className="px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Time to Hire', value: '28 days', change: '-3d', trend: 'down', icon: Clock },
          { label: 'Candidates', value: '156', change: '+12%', trend: 'up', icon: Users },
          { label: 'Open Roles', value: '5', change: '+2', trend: 'up', icon: Target },
          { label: 'Placement Rate', value: '68%', change: '+5%', trend: 'up', icon: TrendingUp },
          { label: 'Recruiters', value: '4', change: '0', trend: 'up', icon: Users },
        ].map((kpi) => (
          <div key={kpi.label} className="p-4 rounded-xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className="w-4 h-4 text-text-muted" />
              <span className={`text-[10px] font-medium flex items-center gap-0.5 ${
                kpi.trend === 'up' && kpi.change.includes('+') ? 'text-success' : 'text-info'
              }`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{kpi.value}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Hiring Funnel</h2>
          <p className="text-sm text-text-muted mb-6">Conversion rates across pipeline stages</p>
          <div className="space-y-3">
            {funnelData.map((stage, i) => (
              <div key={stage.stage} className="flex items-center gap-3">
                <span className="text-xs text-text-secondary w-20 shrink-0">{stage.stage}</span>
                <div className="flex-1 h-8 rounded-lg bg-border/30 overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all duration-700 flex items-center px-3"
                    style={{
                      width: `${stage.rate}%`,
                      background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i]}88)`,
                    }}
                  >
                    <span className="text-[11px] font-bold text-white">{stage.rate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Performance */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Source Quality</h2>
          <p className="text-sm text-text-muted mb-6">Candidate quality score by source</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.sourcePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2432" vertical={false} />
              <XAxis dataKey="source" tick={{ fill: '#5C6478', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5C6478', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="quality" fill="#6C5CE7" radius={[4, 4, 0, 0]} barSize={32} name="Quality Score" />
              <Bar dataKey="count" fill="#00D2FF" radius={[4, 4, 0, 0]} barSize={32} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Applications Trend */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Application Trend</h2>
          <p className="text-sm text-text-muted mb-6">Weekly applications over time</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analyticsData.weeklyApplications}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C5CE7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6C5CE7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2432" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#5C6478', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5C6478', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#6C5CE7" strokeWidth={2.5} fill="url(#appGrad)" name="Applications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recruiter Productivity */}
        <div className="rounded-xl bg-surface border border-border p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Recruiter Productivity</h2>
          <p className="text-sm text-text-muted mb-6">Placements and interviews by recruiter</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.recruiterProductivity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2432" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#5C6478', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#9BA3B5', fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '11px' }}
                formatter={(value: string) => <span style={{ color: '#9BA3B5' }}>{value}</span>}
              />
              <Bar dataKey="placements" fill="#00E676" radius={[0, 4, 4, 0]} barSize={14} name="Placements" />
              <Bar dataKey="interviews" fill="#6C5CE7" radius={[0, 4, 4, 0]} barSize={14} name="Interviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
