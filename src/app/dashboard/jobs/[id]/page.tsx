'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Briefcase, MapPin, IndianRupee, Users, Clock,
  Calendar, Sparkles, Brain, Share2, Target, FileText, CheckCircle2,
  AlertCircle, ChevronRight, PenTool, Check
} from 'lucide-react';
import { jobs as mockJobs, candidates as mockCandidates } from '@/lib/mock-data';
import Link from 'next/link';

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates'>('overview');

  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-xl font-bold text-white mb-2">Job Not Found</h2>
        <button onClick={() => router.back()} className="text-primary hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // Find simulated candidates that could map to this role by checking title or randomly picking the top ones
  // In a real app we'd filter by candidate.jobId === job.id
  const matchingCandidates = mockCandidates
    .filter(c => c.title.toLowerCase().includes(job.title.toLowerCase().split(' ')[0]) || c.aiScore >= 85)
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 fade-in relative">
      {/* Header & Back Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Job Details</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2">
            <PenTool className="w-4 h-4" /> Edit Job
          </button>
        </div>
      </div>

      {/* Hero Profile Card */}
      <div className="relative rounded-2xl bg-surface border border-border overflow-hidden leading-relaxed">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/20 shrink-0">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white mb-1">{job.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                job.status === 'open' ? 'bg-success/10 text-success border-success/20' :
                job.status === 'closed' ? 'bg-danger/10 text-danger border-danger/20' :
                'bg-surface-hover text-text-muted border-border'
              }`}>
                {job.status}
              </span>
            </div>
            
            <p className="text-lg text-text-secondary font-medium mb-4">{job.department} Team</p>
            
            <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="flex items-center gap-1.5 capitalize"><Clock className="w-4 h-4" /> {job.type.replace('-', ' ')}</span>
              <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" /> {job.salary}</span>
              <span className="flex items-center gap-1.5" suppressHydrationWarning><Calendar className="w-4 h-4" /> Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Stats Box */}
          <div className="flex gap-4">
            <div className="p-4 rounded-xl bg-surface-hover border border-border flex flex-col items-center min-w-[100px] shrink-0">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold text-white">{job.applicants}</p>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Applicants</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-hover border border-border flex flex-col items-center min-w-[100px] shrink-0">
              <Target className="w-6 h-6 text-warning mb-2" />
              <p className="text-2xl font-bold text-white">{matchingCandidates.length}</p>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Top Matches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-4 border-b border-border">
        {[
          { id: 'overview', label: 'Job Overview', icon: FileText },
          { id: 'candidates', label: 'Matched Candidates', icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-text-muted hover:text-text-primary hover:border-border'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description */}
            <div className="p-8 rounded-xl bg-surface border border-border">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Role Description
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {job.description || 
                   "We are looking for an exceptional professional to join our team. In this role, you will be responsible for driving key technical/business outcomes and working closely with cross-functional stakeholders. \n\nThe ideal candidate has a strong track record of delivering measurable impact, tackling complex problems with elegant solutions, and thriving in a fast-paced environment."}
                </p>
              </div>
            </div>

            {/* AI Assessor Setup */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="text-lg font-bold text-white">AI Screening Rules</h3>
                  <p className="text-xs text-text-muted mt-1">These parameters dictate how Candidate AI scores inbound resumes.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Automated Action</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" /> Auto-Reject if Score &lt; 70%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Skill Enforcement</p>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-warning" /> Flag missing mandatory skills
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Requirements Box */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" /> Mandatory Skills
              </h3>
              <div className="space-y-3">
                {job.requirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span className="text-sm text-text-secondary font-medium">{req}</span>
                  </div>
                ))}
                {job.requirements.length === 0 && (
                  <p className="text-sm text-text-muted italic">No specific skills listed.</p>
                )}
              </div>
            </div>
            
            {/* Key Info */}
            <div className="p-6 rounded-xl bg-surface border border-border space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-border pb-2">Quick Facts</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Job ID</span>
                <span className="text-text-primary font-mono bg-surface-hover px-2 py-0.5 rounded">{job.id}</span>
              </div>
              <div className="flex justify-between items-center text-sm" suppressHydrationWarning>
                <span className="text-text-muted">Created</span>
                <span className="text-text-primary font-medium">{new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'candidates' && (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Recommended Pipeline</h3>
              <p className="text-sm text-text-secondary mt-1">Inbound applicants processed by the AI Assessor.</p>
            </div>
            <Link 
              href="/dashboard/ats"
              className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition-colors flex items-center gap-2"
            >
              Go to Full ATS Board <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {matchingCandidates.map(candidate => (
               <Link 
                 href={`/dashboard/candidates/${candidate.id}`}
                 key={candidate.id}
                 className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all group gap-4"
               >
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shrink-0">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                        {candidate.name}
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          candidate.status === 'offer' || candidate.status === 'hired' ? 'bg-success/10 text-success border-success/20' :
                          candidate.status === 'interview' ? 'bg-warning/10 text-warning border-warning/20' :
                          'bg-surface-hover text-text-muted border-border'
                        }`}>
                          {candidate.status}
                        </span>
                      </h4>
                      <p className="text-sm text-text-muted">{candidate.title}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-hover">
                      <Brain className={`w-4 h-4 ${candidate.aiScore >= 90 ? 'text-success' : 'text-primary'}`} />
                      <span className="text-sm font-bold text-white">{candidate.aiScore}/100 Match</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                 </div>
               </Link>
            ))}
            
            {matchingCandidates.length === 0 && (
              <div className="p-8 text-center rounded-xl border border-dashed border-border bg-surface/50">
                <Users className="w-8 h-8 text-text-muted mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium text-text-secondary">No candidates matched specifically for this job yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
