'use client';

import { useState } from 'react';
import {
  Plus, Search, Filter, Briefcase, MapPin, Users, Clock,
  IndianRupee, MoreHorizontal, Eye, Edit, Trash2, ExternalLink,
  ChevronRight
} from 'lucide-react';
import { jobs as mockJobs } from '@/lib/mock-data';
import AddJobModal from '@/components/AddJobModal';
import Link from 'next/link';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobsList, setJobsList] = useState(mockJobs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddJob = (job: any) => {
    setJobsList([job, ...jobsList]);
  };

  const filteredJobs = jobsList.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCount = jobsList.filter(j => j.status === 'open').length;
  const totalApplicants = jobsList.reduce((acc, j) => acc + j.applicants, 0);
  const avgPerJob = jobsList.length > 0 ? Math.round(totalApplicants / jobsList.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <p className="text-text-secondary mt-1">
            {openCount} open positions · {totalApplicants} total applicants
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Positions', value: openCount, color: 'text-primary' },
          { label: 'Total Applicants', value: totalApplicants, color: 'text-accent' },
          { label: 'Avg. per Job', value: avgPerJob, color: 'text-success' },
          { label: 'Closing Soon', value: 2, color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Jobs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <Link
            href={`/dashboard/jobs/${job.id}`}
            key={job.id}
            className="group p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                job.status === 'open' ? 'bg-success/10 text-success' :
                job.status === 'closed' ? 'bg-danger/10 text-danger' :
                'bg-surface-hover text-text-muted'
              }`}>
                {job.status}
              </span>
            </div>

            <h3 className="text-base font-semibold text-white mb-1 group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-text-muted mb-4">{job.department}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-text-muted" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <IndianRupee className="w-3.5 h-3.5 text-text-muted" />
                {job.salary}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Users className="w-3.5 h-3.5 text-text-muted" />
                {job.applicants} applicants
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.requirements.slice(0, 3).map((req) => (
                <span key={req} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-secondary border border-border/50">
                  {req}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <span className="text-xs text-text-muted" suppressHydrationWarning>
                Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-xs text-primary font-medium group-hover:text-primary-light flex items-center gap-1 transition-colors">
                View Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}

        {/* Add Job Card */}
        <div 
          onClick={() => setIsAddModalOpen(true)}
          className="p-5 rounded-xl border-2 border-dashed border-border hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[280px] group"
        >
          <div className="w-12 h-12 rounded-xl bg-surface-hover group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
            <Plus className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">Post New Job</p>
          <p className="text-xs text-text-muted mt-1">Create a new job listing</p>
        </div>
      </div>

      <AddJobModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddJob} 
      />
    </div>
  );
}
