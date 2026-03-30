'use client';

import { useState } from 'react';
import {
  X, Building2, User, Mail, Phone, Briefcase, ChevronRight, CheckCircle2,
  Globe, LayoutGrid, Handshake, MapPin
} from 'lucide-react';
import { Client } from '@/lib/types';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: Client) => void;
}

export default function AddClientModal({ isOpen, onClose, onAdd }: AddClientModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    status: 'prospect',
    website: '',
    location: '',
    description: '',
    contactName: '',
    contactEmail: '',
    phone: '',
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: formData.name || 'New Client',
      industry: formData.industry || 'Other',
      logo: '',
      contactName: formData.contactName || 'Unassigned',
      contactEmail: formData.contactEmail || 'No email',
      phone: formData.phone || 'No phone',
      activeJobs: 0,
      totalPlacements: 0,
      status: formData.status as any,
      createdAt: new Date().toISOString(),
      website: formData.website,
      location: formData.location,
      description: formData.description,
    };

    onAdd(newClient);
    onClose();
    setStep(1);
    setFormData({ 
      name: '', industry: '', status: 'prospect', website: '', 
      location: '', description: '', contactName: '', contactEmail: '', phone: '' 
    });
  };

  const steps = [
    { title: 'Company Profile', description: 'Basic company information' },
    { title: 'Business Details', description: 'Industry and location specifics' },
    { title: 'Primary Contact', description: 'Contact person for this account' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
               {step}
             </div>
             <div>
               <h2 className="text-xl font-bold text-white">{steps[step-1].title}</h2>
               <p className="text-sm text-text-secondary">{steps[step-1].description}</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Company Name *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Industry *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      placeholder="e.g. Technology"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      placeholder="https://acme.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Initial Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {['prospect', 'active', 'inactive'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                        formData.status === s
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-background border-border text-text-muted hover:border-primary/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Office Headquarters / Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                    placeholder="e.g. Bengaluru, India"
                  />
                </div>
              </div>

              <div>
                 <label className="block text-sm font-medium text-text-primary mb-2">Company Overview / Internal Notes</label>
                 <textarea
                   rows={6}
                   value={formData.description}
                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                   className="w-full p-4 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                   placeholder="Provide brief details about the client's business, culture, or hiring needs..."
                 />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Primary Contact Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Contact Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      placeholder="john@acmecorp.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-surface-hover/50 flex items-center justify-between">
          <div className="flex gap-2">
             {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2.5 rounded-xl font-medium text-text-primary hover:text-white transition-colors bg-surface border border-border"
                >
                  Back
                </button>
             )}
          </div>
          
          <div className="flex gap-3">
            <button
               onClick={onClose}
               className="px-6 py-2.5 rounded-xl font-medium text-text-muted hover:text-text-primary transition-colors"
            >
               Cancel
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!formData.name || !formData.industry)}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.contactName || !formData.contactEmail}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-success to-emerald-500 text-white font-medium hover:shadow-lg hover:shadow-success/25 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Registration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
