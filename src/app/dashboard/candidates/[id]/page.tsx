'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Mail, Phone, MapPin, Clock, Brain, Sparkles,
  Briefcase, IndianRupee, Link as LinkIcon, Download, Star,
  Calendar, Award, CheckCircle2, ChevronRight, MessageSquare,
  FileText, Activity, AlertCircle, Eye, X, Loader2
} from 'lucide-react';
import { candidates as mockCandidates, jobs as mockJobs } from '@/lib/mock-data';

export default function CandidateProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'activity'>('overview');
  
  // Modals state
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [interviewForm, setInterviewForm] = useState({ date: '', time: '', type: 'Technical', interviewer: '' });
  const [offerForm, setOfferForm] = useState({ salary: '', equity: '', startDate: '' });

  // Force re-render for mutated mock data
  const [renderTick, setRenderTick] = useState(0);
  
  // Local activities log state to demonstrate the flow dynamically
  const [localActivities, setLocalActivities] = useState<any[]>([]);

  const candidate = mockCandidates.find(c => c.id === id);
  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-xl font-bold text-white mb-2">Candidate Not Found</h2>
        <button onClick={() => router.back()} className="text-primary hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // Populate initial realistic history
  if (localActivities.length === 0 && renderTick === 0) {
    const defaultActivities = [
      { status: 'Application Submitted', date: new Date(candidate.appliedDate).toLocaleDateString(), icon: CheckCircle2, color: 'text-success bg-success/10' },
      { status: 'AI Analysis Completed', date: 'Just after application', icon: Brain, color: 'text-primary bg-primary/10' }
    ];
    if (candidate.status === 'interview' || candidate.status === 'offer' || candidate.status === 'hired') {
      defaultActivities.unshift({ status: 'Moved to Interview', date: 'Previously', icon: Activity, color: 'text-warning bg-warning/10' });
    }
    if (candidate.status === 'offer' || candidate.status === 'hired') {
      defaultActivities.unshift({ status: 'Offer Extended', date: 'Previously', icon: Star, color: 'text-emerald-500 bg-emerald-500/10' });
    }
    setLocalActivities(defaultActivities);
  }

  const handleScheduleInterview = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Mutate mock data 
      candidate.status = 'interview';
      
      const newActivity = {
        status: `Interview Scheduled (${interviewForm.type})`,
        date: 'Just now',
        icon: Calendar,
        color: 'text-warning bg-warning/10',
        detail: `Date: ${interviewForm.date} at ${interviewForm.time} with ${interviewForm.interviewer}`
      };
      
      setLocalActivities([newActivity, ...localActivities]);
      setIsSubmitting(false);
      setShowInterviewModal(false);
      setRenderTick(t => t + 1);
    }, 1500);
  };

  const handleMoveToOffer = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      // Mutate mock data 
      candidate.status = 'offer';
      
      const newActivity = {
        status: 'Offer Extended',
        date: 'Just now',
        icon: Star,
        color: 'text-emerald-500 bg-emerald-500/10',
        detail: `Salary: ${offerForm.salary} | Equity: ${offerForm.equity} | Start Date: ${offerForm.startDate}`
      };
      
      setLocalActivities([newActivity, ...localActivities]);
      setIsSubmitting(false);
      setShowOfferModal(false);
      setRenderTick(t => t + 1);
    }, 1500);
  };

  const scoreColor = 
    candidate.aiScore >= 90 ? 'text-success bg-success/10 border-success/20' :
    candidate.aiScore >= 80 ? 'text-primary bg-primary/10 border-primary/20' :
    candidate.aiScore >= 70 ? 'text-warning bg-warning/10 border-warning/20' :
    'text-text-muted bg-surface-hover border-border';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 fade-in relative">
      {/* Header & Back Button */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Candidate Profile</h1>
        </div>
      </div>

      {/* Hero Profile Card */}
      <div className="relative rounded-2xl bg-surface border border-border overflow-hidden leading-relaxed">
        {/* Background Decorative */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent blur-3xl opacity-50" />
        
        <div className="relative p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary/20 shrink-0">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white mb-1">{candidate.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                candidate.status === 'interview' ? 'bg-warning/10 text-warning border-warning/20' :
                candidate.status === 'screening' ? 'bg-info/10 text-info border-info/20' :
                candidate.status === 'offer' ? 'bg-success/10 text-success border-success/20' :
                candidate.status === 'hired' ? 'bg-primary/10 text-primary border-primary/20' :
                'bg-surface-hover text-text-muted border-border'
              }`}>
                {candidate.status}
              </span>
            </div>
            
            <p className="text-lg text-text-secondary font-medium mb-4">{candidate.title}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {candidate.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {candidate.experience} Years Exp</span>
              {candidate.salary && (
                <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" /> {candidate.salary}</span>
              )}
            </div>
          </div>
          
          {/* Big Score */}
          <div className="p-6 rounded-2xl bg-surface-hover border border-border flex flex-col items-center min-w-[140px] shrink-0">
            <div className="relative w-16 h-16 mb-2">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" className="text-border" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="16" fill="none"
                  stroke="currentColor"
                  className={scoreColor.split(' ')[0]}
                  strokeWidth="3"
                  strokeDasharray={`${candidate.aiScore * 0.88} 88`}
                  strokeLinecap="round"
                />
              </svg>
              <Brain className={`absolute inset-0 m-auto w-6 h-6 ${scoreColor.split(' ')[0]}`} />
            </div>
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">AI Match</p>
            <p className={`text-2xl font-bold ${scoreColor.split(' ')[0]}`}>{candidate.aiScore}/100</p>
          </div>
        </div>

        {/* Global Actions Bar */}
        <div className="bg-surface-hover/50 border-t border-border px-8 py-4 flex flex-wrap gap-3">
          <button 
            onClick={() => setShowInterviewModal(true)}
            disabled={candidate.status === 'hired'}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="w-4 h-4" /> Schedule Interview
          </button>
          <button 
            onClick={() => window.location.href = `mailto:${candidate.email}`}
            className="px-5 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm font-medium hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Connect
          </button>
          <button 
            onClick={() => setShowOfferModal(true)}
            disabled={candidate.status === 'offer' || candidate.status === 'hired'}
            className="px-5 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm font-medium hover:bg-surface-hover transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle2 className="w-4 h-4" /> Move to Offer
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-4 border-b border-border">
        {[
          { id: 'overview', label: 'Overview', icon: Brain },
          { id: 'resume', label: 'Original Resume', icon: FileText },
          { id: 'activity', label: 'Activity Log', icon: Activity },
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
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface border border-border">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Email Address</p>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Mail className="w-4 h-4 text-primary" /> {candidate.email}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Phone Number</p>
                <div className="flex items-center gap-2 text-white font-medium">
                  <Phone className="w-4 h-4 text-accent" /> {candidate.phone}
                </div>
              </div>
            </div>

            {/* AI Analysis Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Sparkles className="w-32 h-32 text-primary" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Recruiter Insights
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Predicted Level</p>
                    <p className="text-lg font-bold text-accent">{candidate.enrichment?.predictedSeniority || 'Senior'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Overall Fit Score</p>
                    <p className="text-lg font-bold text-success">{candidate.enrichment?.overallFit || candidate.aiScore}%</p>
                  </div>
                </div>

                {/* Match Breakdown */}
                {candidate.enrichment?.skillMatchBreakdown && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">Skill Matching Analysis</h4>
                    <div className="space-y-3">
                      {candidate.enrichment.skillMatchBreakdown.map((skill) => (
                        <div key={skill.skill} className="flex items-center gap-3">
                          <span className="text-sm text-text-secondary w-32 shrink-0">{skill.skill}</span>
                          <div className="flex-1 h-3 rounded-full bg-surface-hover overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                              style={{ width: `${skill.match}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-white w-10 text-right">{skill.match}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI-Inferred / Missing Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {candidate.enrichment?.inferredSkills && (
                 <div className="p-5 rounded-xl bg-surface border border-info/20">
                   <h4 className="text-sm font-semibold text-info flex items-center gap-2 mb-3">
                     <Brain className="w-4 h-4" /> AI-Inferred Skills
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {candidate.enrichment.inferredSkills.map(skill => (
                       <span key={skill} className="text-xs px-2.5 py-1 rounded-md bg-info/10 text-info border border-info/20 font-medium">{skill}</span>
                     ))}
                   </div>
                 </div>
               )}
               
               {candidate.enrichment?.missingSkills && candidate.enrichment.missingSkills.length > 0 && (
                 <div className="p-5 rounded-xl bg-surface border border-warning/20">
                   <h4 className="text-sm font-semibold text-warning flex items-center gap-2 mb-3">
                     <AlertCircle className="w-4 h-4" /> Missing Requirements
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {candidate.enrichment.missingSkills.map(skill => (
                       <span key={skill} className="text-xs px-2.5 py-1 rounded-md bg-warning/10 text-warning border border-warning/20 font-medium">{skill}</span>
                     ))}
                   </div>
                 </div>
               )}
            </div>

            {/* Extracted Skills Map */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-lg font-bold text-white mb-4">Extracted Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(skill => (
                  <span key={skill} className="text-sm px-3 py-1.5 rounded-lg bg-surface-hover text-text-primary border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes Section */}
            <div className="p-6 rounded-xl bg-surface border border-border">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-border pb-2">Internal Notes</h3>
              {candidate.notes.length > 0 ? (
                <div className="space-y-3">
                  {candidate.notes.map((note, index) => (
                    <div key={index} className="p-3 rounded-lg bg-background border border-border/50 text-sm text-text-secondary leading-relaxed">
                      {note}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted italic">No internal notes added yet.</p>
              )}
              <div className="mt-4 pt-4 border-t border-border">
                <button className="w-full py-2.5 rounded-lg bg-surface-hover text-text-primary text-sm font-medium border border-border border-dashed hover:bg-surface-active hover:border-primary/50 transition-all">
                  + Add Note
                </button>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="p-6 rounded-xl bg-surface border border-border text-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Source:</span>
                <span className="text-text-primary font-medium bg-surface-hover px-2 py-0.5 rounded">{candidate.source}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Applied On:</span>
                <span className="text-text-primary font-medium">{new Date(candidate.appliedDate).toLocaleDateString()}</span>
              </div>
              {candidate.jobId && (
                <div className="flex justify-between items-center border-t border-border pt-4 mt-4">
                  <span className="text-text-muted">Applied Job:</span>
                  <span className="text-primary font-medium flex items-center gap-1 cursor-pointer hover:underline">
                    {mockJobs.find(j => j.id === candidate.jobId)?.title || 'Unknown Job'}
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'resume' && (
        <div className="p-12 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center min-h-[400px] text-center animate-fade-in">
          <FileText className="w-16 h-16 text-text-muted mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">Resume Document</h3>
          <p className="text-text-secondary max-w-sm mb-6">Original resume document is available for viewing and download.</p>
          <div className="flex gap-4">
            <button className="px-5 py-2.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 text-sm font-medium transition-colors flex items-center gap-2">
              <Eye className="w-4 h-4" /> View PDF
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-surface-hover border border-border text-text-primary text-sm font-medium hover:bg-surface-active transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="p-6 rounded-2xl bg-surface border border-border animate-fade-in">
          <div className="relative pl-6 border-l border-border/50 space-y-8 py-4">
            {localActivities.map((event, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-9 w-6 h-6 rounded-full flex items-center justify-center ${event.color}`}>
                  <event.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{event.status}</h4>
                  <p className="text-xs text-text-muted mt-1">{event.date}</p>
                  {event.detail && (
                    <div className="mt-2 p-3 rounded-lg bg-surface-hover/50 border border-border text-sm text-text-secondary">
                      {event.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay animate-fade-in" onClick={() => !isSubmitting && setShowInterviewModal(false)}>
          <div className="w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-white">Schedule Interview</h3>
              <button onClick={() => !isSubmitting && setShowInterviewModal(false)} className="text-text-muted hover:text-white transition-colors disabled:opacity-50" disabled={isSubmitting}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Interview Type</label>
                <select 
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                  value={interviewForm.type}
                  onChange={e => setInterviewForm({...interviewForm, type: e.target.value})}
                  disabled={isSubmitting}
                >
                  <option value="Initial Screening">Initial Screening</option>
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="System Design">System Design</option>
                  <option value="Culture Fit">Culture Fit</option>
                  <option value="Executive Round">Executive Round</option>
                </select>
              </div>
            
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={interviewForm.date}
                    onChange={e => setInterviewForm({...interviewForm, date: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Time</label>
                  <input 
                    type="time" 
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={interviewForm.time}
                    onChange={e => setInterviewForm({...interviewForm, time: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Interviewer</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sarah Chen or Tech Team"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                  value={interviewForm.interviewer}
                  onChange={e => setInterviewForm({...interviewForm, interviewer: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="p-5 border-t border-border flex justify-end gap-3 bg-surface-hover/30">
              <button 
                onClick={() => setShowInterviewModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleScheduleInterview}
                disabled={isSubmitting || !interviewForm.date || !interviewForm.time || !interviewForm.interviewer}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Scheduling...</> : 'Confirm Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move to Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay animate-fade-in" onClick={() => !isSubmitting && setShowOfferModal(false)}>
          <div className="w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <Star className="w-5 h-5" /> Extend Offer
              </h3>
              <button onClick={() => !isSubmitting && setShowOfferModal(false)} className="text-text-muted hover:text-white transition-colors disabled:opacity-50" disabled={isSubmitting}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-sm text-emerald-200 mb-4">
                You are about to extend an offer to <strong>{candidate.name}</strong> for the role of <strong>{candidate.title}</strong>.
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Offered Salary</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="e.g. 180,000"
                    className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    value={offerForm.salary}
                    onChange={e => setOfferForm({...offerForm, salary: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Equity</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 0.1% or 5000 RSUs"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    value={offerForm.equity}
                    onChange={e => setOfferForm({...offerForm, equity: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Target Start Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    value={offerForm.startDate}
                    onChange={e => setOfferForm({...offerForm, startDate: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-border flex justify-end gap-3 bg-surface-hover/30">
              <button 
                onClick={() => setShowOfferModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                onClick={handleMoveToOffer}
                disabled={isSubmitting || !offerForm.salary || !offerForm.startDate}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : 'Send Offer Package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
