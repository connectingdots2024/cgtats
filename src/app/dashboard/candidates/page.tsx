'use client';

import { useState } from 'react';
import {
  Search, Filter, Plus, Brain, MapPin, Clock, Mail, Phone,
  ExternalLink, MoreHorizontal, Download, Upload, ChevronDown,
  Sparkles, Star, Eye, X, ArrowUpDown, Grid3X3, List
} from 'lucide-react';
import { candidates as mockCandidates } from '@/lib/mock-data';
import { Candidate } from '@/lib/types';
import Link from 'next/link';
import AddCandidateModal from '@/components/AddCandidateModal';

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 90 ? 'text-success bg-success/10 border-success/20' :
    score >= 80 ? 'text-primary bg-primary/10 border-primary/20' :
    score >= 70 ? 'text-warning bg-warning/10 border-warning/20' :
    'text-text-muted bg-surface-hover border-border';

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-bold ${color}`}>
      <Brain className="w-3 h-3" />
      {score}
    </div>
  );
}

function CandidateDetail({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-surface border border-border rounded-2xl shadow-2xl animate-scale-in mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
              <p className="text-sm text-text-secondary">{candidate.title}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-text-muted">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{candidate.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{candidate.experience} years</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* AI Score Section */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-white">AI Analysis</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-3 rounded-lg bg-background/50">
                <p className="text-2xl font-bold text-primary">{candidate.aiScore}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Overall Score</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <p className="text-2xl font-bold text-accent">{candidate.enrichment?.predictedSeniority || 'N/A'}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Seniority</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <p className="text-2xl font-bold text-success">{candidate.enrichment?.overallFit || 0}%</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Job Fit</p>
              </div>
            </div>

            {/* Skill Match */}
            {candidate.enrichment?.skillMatchBreakdown && (
              <div>
                <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Skill Match Breakdown</h4>
                <div className="space-y-2">
                  {candidate.enrichment.skillMatchBreakdown.map((skill) => (
                    <div key={skill.skill} className="flex items-center gap-3">
                      <span className="text-xs text-text-secondary w-24 shrink-0">{skill.skill}</span>
                      <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${skill.match}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-text-primary w-8 text-right">{skill.match}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {candidate.enrichment?.missingSkills && candidate.enrichment.missingSkills.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-warning uppercase tracking-wider mb-2">Missing Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.enrichment.missingSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-warning/10 text-warning border border-warning/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inferred Skills */}
            {candidate.enrichment?.inferredSkills && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-info uppercase tracking-wider mb-2">AI-Inferred Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.enrichment.inferredSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-info/10 text-info border border-info/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-hover">
                <Mail className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-primary">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-hover">
                <Phone className="w-4 h-4 text-text-muted" />
                <span className="text-sm text-text-primary">{candidate.phone}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1.5 rounded-lg bg-surface-hover text-text-primary border border-border">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          {candidate.notes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Notes</h3>
              <div className="space-y-2">
                {candidate.notes.map((note, i) => (
                  <div key={i} className="p-3 rounded-lg bg-surface-hover text-sm text-text-secondary">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
              Schedule Interview
            </button>
            <button className="flex-1 py-2.5 rounded-lg bg-surface-hover border border-border text-text-primary text-sm font-medium hover:bg-surface-active transition-all">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CandidatesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'date'>('score');
  const [showAddModal, setShowAddModal] = useState(false);
  const [candidatesList, setCandidatesList] = useState<Candidate[]>(mockCandidates);

  const handleAddCandidate = (candidate: Candidate) => {
    setCandidatesList(prev => [candidate, ...prev]);
  };

  const filteredCandidates = candidatesList
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.aiScore - a.aiScore;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Candidates</h1>
          <p className="text-text-secondary mt-1">{candidatesList.length} total candidates, {candidatesList.filter(c => c.aiScore >= 80).length} AI-recommended</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
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

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, title, or skill..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="hired">Hired</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50"
        >
          <option value="score">Sort by AI Score</option>
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
        <div className="flex border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'bg-surface text-text-muted hover:text-text-primary'} transition-all`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'bg-surface text-text-muted hover:text-text-primary'} transition-all`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Candidates List / Grid */}
      {viewMode === 'list' ? (
        <div className="rounded-xl bg-surface border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Candidate</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">AI Score</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden md:table-cell">Skills</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:table-cell">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider hidden lg:table-cell">Source</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-b border-border/50 hover:bg-surface-hover/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <Link href={`/dashboard/candidates/${candidate.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-semibold text-white hover:text-primary transition-colors hover:underline">
                            {candidate.name}
                          </Link>
                          <p className="text-xs text-text-muted">{candidate.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBadge score={candidate.aiScore} />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-secondary">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 2 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-muted">
                            +{candidate.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-text-secondary">{candidate.location}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        candidate.status === 'interview' ? 'bg-warning/10 text-warning' :
                        candidate.status === 'screening' ? 'bg-info/10 text-info' :
                        candidate.status === 'offer' ? 'bg-success/10 text-success' :
                        candidate.status === 'hired' ? 'bg-primary/10 text-primary' :
                        'bg-surface-hover text-text-muted'
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-text-muted">{candidate.source}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-text-muted hover:text-text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate)}
              className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <Link href={`/dashboard/candidates/${candidate.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-semibold text-white hover:text-primary transition-colors hover:underline">
                      {candidate.name}
                    </Link>
                    <p className="text-xs text-text-muted">{candidate.title}</p>
                  </div>
                </div>
                <ScoreBadge score={candidate.aiScore} />
              </div>

              <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{candidate.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{candidate.experience}y exp</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover text-text-secondary border border-border/50">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  candidate.status === 'interview' ? 'bg-warning/10 text-warning' :
                  candidate.status === 'screening' ? 'bg-info/10 text-info' :
                  candidate.status === 'offer' ? 'bg-success/10 text-success' :
                  candidate.status === 'hired' ? 'bg-primary/10 text-primary' :
                  'bg-surface-hover text-text-muted'
                }`}>
                  {candidate.status}
                </span>
                <span className="text-xs text-text-muted">via {candidate.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetail
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
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
