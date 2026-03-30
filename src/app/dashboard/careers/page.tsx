'use client';

import { useState } from 'react';
import {
  Globe, Briefcase, MapPin, IndianRupee, Clock, ArrowRight,
  Building2, Users, Heart, Search, ExternalLink, Eye,
  Palette, Code
} from 'lucide-react';
import { jobs as mockJobs } from '@/lib/mock-data';

export default function CareerPageEditor() {
  const [previewMode, setPreviewMode] = useState(true);
  const openJobs = mockJobs.filter(j => j.status === 'open');

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Career Page</h1>
            <p className="text-text-secondary mt-1">Preview and manage your public career page</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(false)}
              className="px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Edit Design
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Live Page
            </button>
          </div>
        </div>

        {/* Career Page Preview */}
        <div className="rounded-xl border border-border overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-surface-hover px-4 py-2.5 flex items-center gap-3 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-danger/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-lg bg-background text-xs text-text-muted max-w-md w-full text-center">
                careers.cgtrecruit.ai
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="bg-background">
            {/* Hero */}
            <div className="relative py-20 px-8 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-[80px]" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">CGT RecruitAI</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Build the Future of<br />
                  <span className="gradient-text">AI-Powered Recruitment</span>
                </h1>
                <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
                  Join our team of innovators and help shape the next generation of talent acquisition technology.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> 50+ team members</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Remote-first</span>
                  <span className="flex items-center gap-1.5"><Heart className="w-4 h-4" /> Great benefits</span>
                </div>
              </div>
            </div>

            {/* Open Positions */}
            <div className="max-w-4xl mx-auto px-8 pb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Open Positions ({openJobs.length})</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    className="pl-9 pr-4 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {openJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors mb-1">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" />{job.salary}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{job.type}</span>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 self-start sm:self-center shrink-0">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Editor mode
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Career Page Editor</h1>
          <p className="text-text-secondary mt-1">Customize your public career page</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(true)}
            className="px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Company Branding</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Company Name</label>
                <input type="text" defaultValue="CGT RecruitAI" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Tagline</label>
                <input type="text" defaultValue="Build the Future of AI-Powered Recruitment" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Description</label>
                <textarea rows={3} defaultValue="Join our team of innovators and help shape the next generation of talent acquisition technology." className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" defaultValue="#6C5CE7" className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
                  <input type="text" defaultValue="#6C5CE7" className="flex-1 px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface border border-border p-6">
            <h3 className="text-sm font-semibold text-white mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Page Title</label>
                <input type="text" defaultValue="Careers at CGT RecruitAI" className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1.5">Meta Description</label>
                <textarea rows={2} defaultValue="Join CGT RecruitAI and help build the future of AI-powered recruitment technology." className="w-full px-3 py-2.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-surface border border-border p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Active Job Listings</h3>
          <p className="text-xs text-text-muted mb-4">Toggle which jobs appear on the career page</p>
          <div className="space-y-3">
            {mockJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-hover/50">
                <div>
                  <p className="text-sm font-medium text-text-primary">{job.title}</p>
                  <p className="text-xs text-text-muted">{job.department} · {job.location}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={job.status === 'open'} className="sr-only peer" />
                  <div className="w-9 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
