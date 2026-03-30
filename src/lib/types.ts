// Core types for CGT RecruitAI

export type UserRole = 'admin' | 'recruiter' | 'hiring_manager' | 'finance_manager';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  organizationId: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  location: string;
  experience: number;
  skills: string[];
  aiScore: number;
  source: string;
  status: PipelineStage;
  resumeUrl?: string;
  linkedinUrl?: string;
  salary?: string;
  appliedDate: string;
  jobId?: string;
  clientId?: string;
  notes: string[];
  enrichment?: CandidateEnrichment;
}

export interface CandidateEnrichment {
  inferredSkills: string[];
  predictedSeniority: string;
  skillMatchBreakdown: { skill: string; match: number }[];
  missingSkills: string[];
  overallFit: number;
}

export type PipelineStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed' | 'draft';
  applicants: number;
  postedDate: string;
  closingDate?: string;
  hiringManagerId?: string;
  clientId?: string;
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  logo: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  activeJobs: number;
  totalPlacements: number;
  status: 'active' | 'inactive' | 'prospect';
  createdAt: string;
  website?: string;
  location?: string;
  description?: string;
}

export interface Deal {
  id: string;
  title: string;
  clientId: string;
  value: number;
  stage: 'lead' | 'proposal' | 'negotiation' | 'won' | 'lost';
  probability: number;
  assignedTo: string;
  createdAt: string;
  expectedClose: string;
}

export interface Activity {
  id: string;
  type: 'candidate_added' | 'status_change' | 'note_added' | 'interview_scheduled' | 'email_sent' | 'ai_scoring';
  description: string;
  userId: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'action';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface AnalyticsData {
  timeToHire: number;
  totalCandidates: number;
  openPositions: number;
  placementRate: number;
  activeRecruiters: number;
  conversionRates: { stage: string; rate: number }[];
  sourcePerformance: { source: string; count: number; quality: number }[];
  weeklyApplications: { week: string; count: number }[];
  recruiterProductivity: { name: string; placements: number; interviews: number }[];
}

export interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'suggestion';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionLabel?: string;
  actionLink?: string;
}

export interface Revenue {
  id: string;
  amount: number;
  sourceType: 'placement' | 'retainer' | 'subscription' | 'other';
  clientId: string;
  recruiterId: string;
  jobId?: string;
  candidateId?: string;
  date: string;
  description: string;
  status: 'pending' | 'collected';
}

export interface Expense {
  id: string;
  category: 'salaries' | 'marketing' | 'software' | 'operations' | 'other';
  amount: number;
  description: string;
  date: string;
  receiptUrl?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  candidateId?: string;
  jobId?: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'void';
  dueDate: string;
  createdAt: string;
  items: Array<{ description: string; amount: number }>;
}

export interface RecruiterEarnings {
  recruiterId: string;
  totalRevenue: number;
  commission: number;
  placementsCount: number;
  lastPayoutDate?: string;
}

export interface FinancialStats {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  mrr: number;
  outstandingPayments: number;
  revenueThisMonth: number;
}
