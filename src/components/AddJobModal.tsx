'use client';

import { useState } from 'react';
import {
  X, Briefcase, MapPin, IndianRupee, Clock, Brain,
  Sparkles, Check, CheckCircle2, ChevronRight, ChevronLeft, Target, AlertCircle,
  Loader2, Globe, Building, Users
} from 'lucide-react';
import { Job } from '@/lib/types';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (job: Job) => void;
}

type Step = 'details' | 'requirements' | 'ai_settings' | 'review';

export default function AddJobModal({ isOpen, onClose, onAdd }: AddJobModalProps) {
  const [step, setStep] = useState<Step>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSimulatingAI, setIsSimulatingAI] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: '',
    type: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    experience: '',
    description: '',
    requirementsStr: '',
    aiAutoScreen: true,
    targetFitScore: '80',
    keyFocusAreas: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 'details') setStep('requirements');
    else if (step === 'requirements') setStep('ai_settings');
    else if (step === 'ai_settings') setStep('review');
  };

  const handleBack = () => {
    if (step === 'review') setStep('ai_settings');
    else if (step === 'ai_settings') setStep('requirements');
    else if (step === 'requirements') setStep('details');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const requirementsList = formData.requirementsStr
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
        
      if (requirementsList.length === 0) {
        requirementsList.push('React', 'TypeScript', 'Node.js'); // fallback
      }

      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: formData.title || 'New Position',
        department: formData.department,
        location: formData.location || 'Remote',
        type: formData.type as any,
        status: 'open',
        salary: formData.salaryMin && formData.salaryMax 
          ? `₹${formData.salaryMin} - ₹${formData.salaryMax}` 
          : 'Competitive',
        applicants: 0,
        postedDate: new Date().toISOString(),
        requirements: requirementsList,
        description: formData.description || 'Description not provided.',
      };

      onAdd(newJob);
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1500);
  };

  const resetForm = () => {
    setStep('details');
    setFormData({
      title: '', department: 'Engineering', location: '', type: 'Full-time',
      salaryMin: '', salaryMax: '', experience: '', description: '',
      requirementsStr: '', aiAutoScreen: true, targetFitScore: '80', keyFocusAreas: ''
    });
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleGenerateDescription = () => {
    if (!formData.title) return;
    setIsSimulatingAI(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        description: `We are looking for an experienced ${formData.title} to join our ${formData.department} team...`,
        requirementsStr: 'React, Node.js, System Design, Communication, Agile'
      }));
      setIsSimulatingAI(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay animate-fade-in" onClick={handleClose}>
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-xl shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Create New Job Post
            </h2>
            <p className="text-sm text-text-muted mt-1">Configure job details and AI screening parameters</p>
          </div>
          <button onClick={handleClose} className="p-2 text-text-muted hover:text-white transition-colors disabled:opacity-50" disabled={isSubmitting}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 border-b border-border bg-surface-hover/30">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border -z-10" />
            
            {[
              { id: 'details', label: 'Details', icon: Briefcase },
              { id: 'requirements', label: 'Requirements', icon: Target },
              { id: 'ai_settings', label: 'AI Settings', icon: Brain },
              { id: 'review', label: 'Review', icon: CheckCircle2 }
            ].map((s, index) => {
              const stepIndex = ['details', 'requirements', 'ai_settings', 'review'].indexOf(step);
              const isActive = s.id === step;
              const isPast = index < stepIndex;
              
              return (
                <div key={s.id} className="flex flex-col items-center gap-2 bg-surface px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isActive ? 'border-primary bg-primary/20 text-primary' : 
                    isPast ? 'border-primary bg-primary text-white' : 
                    'border-border bg-surface text-text-muted'
                  }`}>
                    {isPast ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-medium ${isActive || isPast ? 'text-white' : 'text-text-muted'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {step === 'details' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Department</label>
                  <select
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={formData.department}
                    onChange={e => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Employment Type</label>
                  <select
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, San Francisco"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Experience Limit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3-5 Years"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" /> Target Salary Range (INR)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Min (e.g. 15,00,000)"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={formData.salaryMin}
                    onChange={e => setFormData({...formData, salaryMin: e.target.value})}
                  />
                  <span className="text-text-muted">-</span>
                  <input
                    type="text"
                    placeholder="Max (e.g. 25,00,000)"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                    value={formData.salaryMax}
                    onChange={e => setFormData({...formData, salaryMax: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'requirements' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Job Description</label>
                  <button 
                    onClick={handleGenerateDescription}
                    disabled={!formData.title || isSimulatingAI}
                    className="text-xs text-primary font-medium flex items-center gap-1 hover:text-primary-light disabled:opacity-50"
                  >
                    {isSimulatingAI ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3" />}
                    Auto-generate Details
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Describe the role and responsibilities..."
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Mandatory Skills (Comma separated)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary resize-none"
                  value={formData.requirementsStr}
                  onChange={e => setFormData({...formData, requirementsStr: e.target.value})}
                />
                <p className="text-xs text-text-muted mt-2">These skills will be used by the AI engine to evaluate resumes.</p>
              </div>
            </div>
          )}

          {step === 'ai_settings' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <input 
                      type="checkbox" 
                      id="aiAutoScreen"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                      checked={formData.aiAutoScreen}
                      onChange={e => setFormData({...formData, aiAutoScreen: e.target.checked})}
                    />
                  </div>
                  <div>
                    <label htmlFor="aiAutoScreen" className="text-sm font-bold text-white block mb-1">
                      Enable Autopilot Candidate Screening
                    </label>
                    <p className="text-xs text-text-muted">
                      When enabled, inbound applications will automatically be parsed, scored, and optionally rejected if they fall below the target hit rate.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`transition-opacity ${!formData.aiAutoScreen ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Target Min. Fit Score</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="50" max="95" step="5"
                    className="flex-1 accent-primary"
                    value={formData.targetFitScore}
                    onChange={e => setFormData({...formData, targetFitScore: e.target.value})}
                  />
                  <span className="text-xl font-bold text-white w-12 text-right">{formData.targetFitScore}%</span>
                </div>
                <div className="flex justify-between text-[10px] text-text-muted mt-2 px-1">
                  <span>Lenient (50%)</span>
                  <span>Strict (95%)</span>
                </div>
              </div>

              <div className={`transition-opacity ${!formData.aiAutoScreen ? 'opacity-50 pointer-events-none' : ''}`}>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Key Focus Areas (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Focus on scalability experience, leadership skills"
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary"
                  value={formData.keyFocusAreas}
                  onChange={e => setFormData({...formData, keyFocusAreas: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-3 mb-4 border-b border-border pb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{formData.title || 'Untitled Role'}</h3>
                    <p className="text-sm text-text-muted">{formData.department} · {formData.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Location</p>
                    <p className="text-sm text-white font-medium">{formData.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Target Salary</p>
                    <p className="text-sm text-white font-medium">
                      {formData.salaryMin && formData.salaryMax ? `₹${formData.salaryMin} - ₹${formData.salaryMax}` : 'Competitive'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Required Skills</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.requirementsStr ? (
                      formData.requirementsStr.split(',').map(req => req.trim()).filter(Boolean).map(req => (
                        <span key={req} className="text-xs px-2.5 py-1 rounded-full bg-surface-hover text-text-secondary border border-border/50">
                          {req}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-text-muted italic">No requirements specified.</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-background flex items-start gap-4">
                <Brain className={`w-5 h-5 ${formData.aiAutoScreen ? 'text-primary' : 'text-text-muted'}`} />
                <div>
                  <p className="text-sm font-bold text-white mb-1">AI Assessor Configuration</p>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {formData.aiAutoScreen 
                      ? `Active. Will auto-screen inbound candidates against a target fit score of ${formData.targetFitScore}%.`
                      : 'AI pre-screening is disabled for this job post.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface-hover/30">
          <div>
            {step !== 'details' && (
              <button 
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-white transition-colors"
            >
              Cancel
            </button>
            
            {step === 'review' ? (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Publishing...</>
                ) : (
                  <><Globe className="w-4 h-4" /> Publish Job</>
                )}
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={step === 'details' && !formData.title}
                className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
