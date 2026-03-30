'use client';

import { useState, useRef, useCallback } from 'react';
import {
  X, Upload, FileText, Brain, Sparkles, Check, ChevronRight,
  ChevronLeft, User, Mail, Phone, MapPin, Briefcase, IndianRupee,
  Clock, Link, AlertCircle, Loader2, Trash2, GripVertical,
  Zap, Target, CheckCircle2, FileUp, Plus
} from 'lucide-react';
import { jobs as mockJobs } from '@/lib/mock-data';
import { Candidate } from '@/lib/types';

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (candidate: Candidate) => void;
}

type Step = 'upload' | 'details' | 'review';

interface FormData {
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  experience: string;
  salary: string;
  linkedinUrl: string;
  source: string;
  jobId: string;
  skills: string[];
  notes: string;
}

interface ParsedResumeData {
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  summary: string;
}

// Simulated AI resume parsing results for different "resume" files
const simulatedParseResults: Record<string, ParsedResumeData> = {
  default: {
    name: 'Jordan Mitchell',
    email: 'jordan.mitchell@email.com',
    phone: '+1 (555) 432-7890',
    title: 'Senior Software Engineer',
    location: 'Denver, CO',
    experience: '6',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL'],
    education: 'M.S. Computer Science, Stanford University',
    summary: 'Full-stack engineer with 6 years of experience building scalable web applications. Led migration of monolith to microservices architecture serving 2M+ users.',
  },
};

export default function AddCandidateModal({ isOpen, onClose, onAdd }: AddCandidateModalProps) {
  const [step, setStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [parseStage, setParseStage] = useState('');
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    title: '',
    location: '',
    experience: '',
    salary: '',
    linkedinUrl: '',
    source: 'Manual Entry',
    jobId: '',
    skills: [],
    notes: '',
  });

  const resetModal = () => {
    setStep('upload');
    setUploadedFile(null);
    setIsDragOver(false);
    setIsParsing(false);
    setParseProgress(0);
    setParseStage('');
    setParsedData(null);
    setSkillInput('');
    setIsSubmitting(false);
    setAiScore(null);
    setFormData({
      name: '', email: '', phone: '', title: '', location: '',
      experience: '', salary: '', linkedinUrl: '', source: 'Manual Entry',
      jobId: '', skills: [], notes: '',
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  // --- File Upload Handlers ---
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelected(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      return; // silently reject invalid types
    }
    setUploadedFile(file);
    startAIParsing(file);
  };

  const startAIParsing = (file: File) => {
    setIsParsing(true);
    setParseProgress(0);

    const stages = [
      { progress: 15, label: 'Reading document structure...' },
      { progress: 30, label: 'Extracting text content...' },
      { progress: 45, label: 'Identifying contact information...' },
      { progress: 60, label: 'Analyzing work experience...' },
      { progress: 75, label: 'Detecting technical skills...' },
      { progress: 88, label: 'Running AI enrichment...' },
      { progress: 100, label: 'Parsing complete!' },
    ];

    stages.forEach((stage, i) => {
      setTimeout(() => {
        setParseProgress(stage.progress);
        setParseStage(stage.label);

        if (i === stages.length - 1) {
          setTimeout(() => {
            const result = simulatedParseResults.default;
            setParsedData(result);
            setFormData(prev => ({
              ...prev,
              name: result.name,
              email: result.email,
              phone: result.phone,
              title: result.title,
              location: result.location,
              experience: result.experience,
              skills: result.skills,
              source: 'Resume Upload',
            }));
            setIsParsing(false);
          }, 400);
        }
      }, 450 * (i + 1));
    });
  };

  const removeFile = () => {
    setUploadedFile(null);
    setParsedData(null);
    setIsParsing(false);
    setParseProgress(0);
    setFormData(prev => ({
      ...prev,
      name: '', email: '', phone: '', title: '', location: '',
      experience: '', skills: [],
    }));
  };

  // --- Skills Management ---
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, trimmed] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  // --- Form Validation ---
  const isDetailsValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.title.trim() !== '';

  // --- Submit ---
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate AI scoring
    let scoreProgress = 0;
    const scoreInterval = setInterval(() => {
      scoreProgress += Math.random() * 25;
      if (scoreProgress >= 100) {
        clearInterval(scoreInterval);
        const score = Math.floor(Math.random() * 20) + 78; // 78-97
        setAiScore(score);

        setTimeout(() => {
          const newCandidate: Candidate = {
            id: `c${Date.now()}`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '+1 (555) 000-0000',
            avatar: '',
            title: formData.title,
            location: formData.location || 'Remote',
            experience: parseInt(formData.experience) || 0,
            skills: formData.skills,
            aiScore: score,
            source: formData.source,
            status: 'applied',
            salary: formData.salary || undefined,
            appliedDate: new Date().toISOString().split('T')[0],
            jobId: formData.jobId || undefined,
            linkedinUrl: formData.linkedinUrl || undefined,
            resumeUrl: uploadedFile ? uploadedFile.name : undefined,
            notes: formData.notes ? [formData.notes] : [],
            enrichment: {
              inferredSkills: ['Problem Solving', 'Communication', 'Collaboration'],
              predictedSeniority: parseInt(formData.experience) >= 7 ? 'Staff' :
                parseInt(formData.experience) >= 4 ? 'Senior' : 'Mid-Level',
              skillMatchBreakdown: formData.skills.slice(0, 5).map(skill => ({
                skill,
                match: Math.floor(Math.random() * 20) + 78,
              })),
              missingSkills: ['Terraform', 'CI/CD'],
              overallFit: score,
            },
          };
          onAdd(newCandidate);
          setIsSubmitting(false);
          handleClose();
        }, 800);
      }
    }, 100);
  };

  // --- Step Navigation ---
  const goToDetails = () => setStep('details');
  const goToReview = () => setStep('review');
  const goBack = () => {
    if (step === 'details') setStep('upload');
    if (step === 'review') setStep('details');
  };

  if (!isOpen) return null;

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: 'upload', label: 'Resume', icon: FileUp },
    { id: 'details', label: 'Details', icon: User },
    { id: 'review', label: 'Review', icon: CheckCircle2 },
  ];

  const stepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay" onClick={handleClose}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-surface border border-border rounded-2xl shadow-2xl mx-4 animate-scale-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Add New Candidate</h2>
            <p className="text-xs text-text-muted mt-0.5">Upload a resume or enter details manually</p>
          </div>
          <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 border-b border-border/50 shrink-0">
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < stepIndex ? 'bg-success text-white' :
                    i === stepIndex ? 'bg-primary text-white shadow-lg shadow-primary/30' :
                    'bg-surface-hover text-text-muted'
                  }`}>
                    {i < stepIndex ? <Check className="w-4 h-4" /> : <s.icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${
                    i === stepIndex ? 'text-white' : 'text-text-muted'
                  }`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-3">
                    <div className="h-px bg-border relative">
                      <div
                        className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                        style={{ width: i < stepIndex ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Resume Upload */}
          {step === 'upload' && (
            <div className="space-y-5">
              {/* Drag & Drop Zone */}
              {!uploadedFile && !isParsing && (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group ${
                    isDragOver
                      ? 'border-primary bg-primary/5 scale-[1.01]'
                      : 'border-border hover:border-primary/40 hover:bg-surface-hover/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                    isDragOver
                      ? 'bg-primary/20 scale-110'
                      : 'bg-surface-hover group-hover:bg-primary/10'
                  }`}>
                    <Upload className={`w-7 h-7 transition-all duration-300 ${
                      isDragOver ? 'text-primary animate-bounce' : 'text-text-muted group-hover:text-primary'
                    }`} />
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1">
                    {isDragOver ? 'Drop your resume here' : 'Upload Resume'}
                  </h3>
                  <p className="text-sm text-text-muted mb-3">
                    Drag and drop or <span className="text-primary font-medium">browse files</span>
                  </p>
                  <p className="text-xs text-text-muted">
                    Supports PDF, DOC, DOCX, TXT · Max 10MB
                  </p>

                  {/* AI Badge */}
                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-primary font-medium">AI will auto-parse and extract candidate data</span>
                  </div>
                </div>
              )}

              {/* Parsing Progress */}
              {isParsing && uploadedFile && (
                <div className="rounded-2xl border border-border p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">AI is parsing your resume...</h3>
                      <p className="text-xs text-text-muted">{uploadedFile.name}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                        style={{ width: `${parseProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary flex items-center gap-1.5">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {parseStage}
                      </span>
                      <span className="text-xs font-medium text-primary">{parseProgress}%</span>
                    </div>
                  </div>

                  {/* Live extraction preview */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      { label: 'Text Extraction', done: parseProgress >= 30 },
                      { label: 'Contact Info', done: parseProgress >= 45 },
                      { label: 'Experience', done: parseProgress >= 60 },
                      { label: 'Skills', done: parseProgress >= 75 },
                      { label: 'Education', done: parseProgress >= 88 },
                      { label: 'AI Scoring', done: parseProgress >= 100 },
                    ].map(item => (
                      <div key={item.label} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        item.done ? 'bg-success/5 border border-success/20' : 'bg-surface-hover/50 border border-transparent'
                      }`}>
                        {item.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-border shrink-0" />
                        )}
                        <span className={`text-xs ${item.done ? 'text-success font-medium' : 'text-text-muted'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed result preview */}
              {parsedData && !isParsing && uploadedFile && (
                <div className="space-y-4">
                  {/* File info */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{uploadedFile.name}</p>
                        <p className="text-xs text-text-muted">
                          {(uploadedFile.size / 1024).toFixed(1)} KB · Parsed successfully
                        </p>
                      </div>
                    </div>
                    <button onClick={removeFile} className="p-1.5 rounded-lg hover:bg-danger/10 text-text-muted hover:text-danger transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Extracted data preview */}
                  <div className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h3 className="text-sm font-semibold text-white">AI Extracted Data</h3>
                      <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-medium">Auto-filled</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Name</p>
                        <p className="text-sm text-white font-medium">{parsedData.name}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Title</p>
                        <p className="text-sm text-white font-medium">{parsedData.title}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm text-white font-medium truncate">{parsedData.email}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Location</p>
                        <p className="text-sm text-white font-medium">{parsedData.location}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-background/50 mb-3">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1.5">Detected Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedData.skills.map(skill => (
                          <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-background/50">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Summary</p>
                      <p className="text-xs text-text-secondary leading-relaxed">{parsedData.summary}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Skip upload option */}
              {!uploadedFile && !isParsing && (
                <div className="text-center">
                  <div className="flex items-center gap-4 my-2">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-text-muted uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <button
                    onClick={goToDetails}
                    className="mt-2 text-sm text-primary hover:text-primary-light font-medium transition-colors flex items-center gap-1.5 mx-auto"
                  >
                    <User className="w-4 h-4" />
                    Enter details manually
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Candidate Details */}
          {step === 'details' && (
            <div className="space-y-5">
              {/* Contact info section */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@email.com"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="San Francisco, CA"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional info */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">
                      Job Title <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        value={formData.title}
                        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Senior Software Engineer"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Experience (years)</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="5"
                        min="0"
                        max="50"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Salary Expectations</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={e => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                        placeholder="₹150,000 - ₹180,000"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">LinkedIn URL</label>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={e => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                        placeholder="linkedin.com/in/johndoe"
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning" />
                  Skills
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="Type a skill and press Enter..."
                    className="flex-1 px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <button
                    onClick={addSkill}
                    disabled={!skillInput.trim()}
                    className="p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {formData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map(skill => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-surface-hover text-text-primary border border-border group"
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-text-muted hover:text-danger transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted italic">No skills added yet</p>
                )}
              </div>

              {/* Source & Job Assignment */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-info" />
                  Assignment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Source</label>
                    <select
                      value={formData.source}
                      onChange={e => setFormData(prev => ({ ...prev, source: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-all"
                    >
                      <option>Manual Entry</option>
                      <option>Resume Upload</option>
                      <option>LinkedIn</option>
                      <option>Referral</option>
                      <option>Job Board</option>
                      <option>Career Page</option>
                      <option>Headhunting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1.5">Assign to Job (optional)</label>
                    <select
                      value={formData.jobId}
                      onChange={e => setFormData(prev => ({ ...prev, jobId: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-all"
                    >
                      <option value="">No job assigned</option>
                      {mockJobs.filter(j => j.status === 'open').map(job => (
                        <option key={job.id} value={job.id}>{job.title} · {job.department}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about this candidate..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Review & Confirm */}
          {step === 'review' && (
            <div className="space-y-5">
              {/* AI Scoring animation */}
              {isSubmitting && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-border" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {aiScore ? (
                        <span className="text-2xl font-bold text-primary animate-fade-in">{aiScore}</span>
                      ) : (
                        <Brain className="w-8 h-8 text-primary animate-pulse" />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-base font-semibold text-white">
                      {aiScore ? 'AI Scoring Complete!' : 'Running AI Analysis...'}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      {aiScore
                        ? `Candidate scored ${aiScore}/100. Adding to pipeline...`
                        : 'Analyzing skills, experience, and job fit'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Review summary */}
              {!isSubmitting && (
                <>
                  {/* Candidate summary card */}
                  <div className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold">
                        {formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{formData.name || 'Unnamed'}</h3>
                        <p className="text-sm text-text-secondary">{formData.title || 'No title'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Mail, label: 'Email', value: formData.email },
                        { icon: Phone, label: 'Phone', value: formData.phone || 'Not provided' },
                        { icon: MapPin, label: 'Location', value: formData.location || 'Not provided' },
                        { icon: Clock, label: 'Experience', value: formData.experience ? `${formData.experience} years` : 'Not provided' },
                        { icon: IndianRupee, label: 'Salary', value: formData.salary || 'Not provided' },
                        { icon: Target, label: 'Source', value: formData.source },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                          <item.icon className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[10px] text-text-muted">{item.label}</p>
                            <p className="text-xs text-text-primary truncate">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  {formData.skills.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Skills ({formData.skills.length})</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.skills.map(skill => (
                          <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Job assignment */}
                  {formData.jobId && (
                    <div className="p-3 rounded-lg bg-surface-hover border border-border">
                      <p className="text-xs text-text-muted mb-1">Assigned Job</p>
                      <p className="text-sm font-medium text-white">
                        {mockJobs.find(j => j.id === formData.jobId)?.title || 'Unknown'}
                      </p>
                    </div>
                  )}

                  {/* Resume */}
                  {uploadedFile && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                      <FileText className="w-5 h-5 text-success shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">{uploadedFile.name}</p>
                        <p className="text-xs text-text-muted">{(uploadedFile.size / 1024).toFixed(1)} KB · Resume attached</p>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {formData.notes && (
                    <div>
                      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Notes</h4>
                      <p className="text-sm text-text-secondary p-3 rounded-lg bg-surface-hover">{formData.notes}</p>
                    </div>
                  )}

                  {/* AI Notice */}
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Brain className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-primary mb-0.5">AI Processing</p>
                      <p className="text-xs text-text-muted">
                        Upon adding, AI will automatically score this candidate, analyze skill matches, and generate enrichment data.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between shrink-0">
          {step === 'upload' ? (
            <>
              <button onClick={handleClose} className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors">
                Cancel
              </button>
              <button
                onClick={goToDetails}
                disabled={isParsing}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {parsedData ? 'Continue with Parsed Data' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : step === 'details' ? (
            <>
              <button onClick={goBack} className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={goToReview}
                disabled={!isDetailsValid}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={goBack}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-success to-emerald-700 text-white text-sm font-medium hover:shadow-lg hover:shadow-success/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Add Candidate & Run AI
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
