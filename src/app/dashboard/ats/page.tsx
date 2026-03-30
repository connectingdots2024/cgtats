'use client';

import { useState } from 'react';
import {
  Brain, GripVertical, MapPin, Clock, Star, ChevronDown,
  Filter, Plus, MoreHorizontal, Calendar, Mail, Phone,
  ExternalLink, Sparkles, Search, X, CheckCircle2, IndianRupee
} from 'lucide-react';
import { candidates as mockCandidates } from '@/lib/mock-data';
import { PipelineStage, Candidate } from '@/lib/types';
import Link from 'next/link';
import AddCandidateModal from '@/components/AddCandidateModal';

const stages: { id: PipelineStage; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { id: 'screening', label: 'Screening', color: 'bg-cyan-500' },
  { id: 'interview', label: 'Interview', color: 'bg-amber-500' },
  { id: 'offer', label: 'Offer', color: 'bg-emerald-500' },
  { id: 'hired', label: 'Hired', color: 'bg-violet-500' },
];

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const scoreColor = candidate.aiScore >= 90 ? 'text-success' :
    candidate.aiScore >= 80 ? 'text-primary' :
    candidate.aiScore >= 70 ? 'text-warning' : 'text-text-muted';

  return (
    <div className="kanban-card bg-background border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="min-w-0 flex flex-col items-start">
            <Link 
              href={`/dashboard/candidates/${candidate.id}`}
              className="text-sm font-semibold text-white truncate hover:text-primary transition-colors hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {candidate.name}
            </Link>
            <p className="text-xs text-text-muted truncate w-full">{candidate.title}</p>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-text-primary">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* AI Score */}
      <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-surface-hover/50">
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" className="text-border" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="14" fill="none"
              stroke="currentColor"
              className={scoreColor}
              strokeWidth="3"
              strokeDasharray={`${candidate.aiScore * 0.88} 88`}
              strokeLinecap="round"
            />
          </svg>
          <Brain className={`absolute inset-0 m-auto w-3 h-3 ${scoreColor}`} />
        </div>
        <div>
          <p className={`text-sm font-bold ${scoreColor}`}>{candidate.aiScore}</p>
          <p className="text-[10px] text-text-muted">AI Score</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-3">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-secondary border border-border/50">
            {skill}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-muted">
            +{candidate.skills.length - 3}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-[11px] text-text-muted">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {candidate.location.split(',')[0]}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {candidate.experience}y
        </span>
      </div>

      {/* Source */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <span className="text-[10px] text-text-muted">via {candidate.source}</span>
        <span className="text-[10px] text-text-muted">
          {new Date(candidate.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
}

export default function ATSPage() {
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(mockCandidates);
  const [draggedCandidate, setDraggedCandidate] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [revenueToast, setRevenueToast] = useState<{ name: string; amount: number } | null>(null);

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Derived state
  const roles = Array.from(new Set(candidatesList.map(c => c.title)));

  const filteredCandidates = candidatesList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = c.aiScore >= minScore;
    const matchesRole = selectedRole === 'all' || c.title === selectedRole;
    return matchesSearch && matchesScore && matchesRole;
  });

  const handleAddCandidate = (candidate: Candidate) => {
    setCandidatesList(prev => [candidate, ...prev]);
  };

  const getCandidatesForStage = (stage: PipelineStage) =>
    filteredCandidates.filter(c => c.status === stage);

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    setDraggedCandidate(candidateId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (draggedCandidate) {
      const candidate = candidatesList.find(c => c.id === draggedCandidate);
      
      setCandidatesList(prev =>
        prev.map(c =>
          c.id === draggedCandidate ? { ...c, status: stage } : c
        )
      );

      // 🏦 FINANCE REVENUE INTEGRATION
      if (stage === 'hired' && candidate) {
        setRevenueToast({ name: candidate.name, amount: 250000 });
        setTimeout(() => setRevenueToast(null), 8000);
      }

      setDraggedCandidate(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">ATS Pipeline</h1>
          <p className="text-text-secondary mt-1">Manage your hiring pipeline with drag-and-drop</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-lg border text-sm transition-all flex items-center gap-2 ${
              showFilters || searchQuery || minScore > 0 || selectedRole !== 'all' 
                ? 'bg-primary/10 border-primary/30 text-primary' 
                : 'bg-surface border-border text-text-primary hover:bg-surface-hover'
            }`}
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Filter'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Candidate
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 rounded-xl bg-surface border border-border flex flex-wrap gap-4 animate-fade-in shadow-lg">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search by name or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="min-w-[180px] relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 pr-8 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              {roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
          <div className="min-w-[180px] relative">
            <select
              value={minScore.toString()}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full px-3 py-2 pr-8 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="0">Any AI Score</option>
              <option value="70">70+ Score</option>
              <option value="80">80+ Score</option>
              <option value="90">90+ Score</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
          {(searchQuery || minScore > 0 || selectedRole !== 'all') && (
            <button 
              onClick={() => { setSearchQuery(''); setMinScore(0); setSelectedRole('all'); }}
              className="px-4 py-2 rounded-lg bg-surface-hover border border-border text-sm text-text-muted hover:text-white transition-all flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      )}

      {/* AI Summary Bar */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-white">AI Insight:</span> You have{' '}
          <span className="text-primary font-semibold">{getCandidatesForStage('screening').length} candidates</span>{' '}
          in screening. Alex Rivera (94/100) is your top match for interview.
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        {stages.map((stage) => {
          const stageCandidates = getCandidatesForStage(stage.id);
          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-72 lg:flex-1 lg:min-w-[250px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <h3 className="text-sm font-semibold text-white">{stage.label}</h3>
                  <span className="text-xs text-text-muted bg-surface-hover px-2 py-0.5 rounded-full">
                    {stageCandidates.length}
                  </span>
                </div>
                <button className="text-text-muted hover:text-text-primary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Column body */}
              <div className={`space-y-3 min-h-[200px] p-2 rounded-xl transition-colors ${
                draggedCandidate ? 'bg-surface/50 border-2 border-dashed border-border' : ''
              }`}>
                {stageCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, candidate.id)}
                    className={draggedCandidate === candidate.id ? 'opacity-40' : ''}
                  >
                    <CandidateCard candidate={candidate} />
                  </div>
                ))}
                {stageCandidates.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-text-muted">
                    <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-2">
                      <Plus className="w-5 h-5" />
                    </div>
                    <p className="text-xs">Drop candidates here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {revenueToast && (
        <div className="fixed bottom-8 right-8 z-[100] animate-bounce-in">
           <div className="p-6 rounded-3xl bg-surface border border-primary shadow-2xl flex items-center gap-4 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center text-success shrink-0">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                 <h4 className="text-sm font-bold text-white uppercase tracking-tight">Hired & Billed!</h4>
                 <p className="text-xs text-text-muted truncate mr-4">Created revenue record for {revenueToast.name}</p>
                 <div className="flex items-center gap-1.5 mt-1">
                    <IndianRupee className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary">₹{revenueToast.amount.toLocaleString()} manifested</span>
                 </div>
              </div>
              <button onClick={() => setRevenueToast(null)} className="p-2 text-text-muted hover:text-white">
                 <X className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}

      {/* Add Candidate Modal */}
      <AddCandidateModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCandidate}
      />
    </div>
  );
}
