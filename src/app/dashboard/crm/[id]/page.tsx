'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Building2, MapPin, IndianRupee, Users, Clock,
  Calendar, Phone, Mail, Link as LinkIcon, Edit, MoreHorizontal,
  ChevronRight, Briefcase, TrendingUp, User, Globe
} from 'lucide-react';
import { clients as mockClients, deals as mockDeals } from '@/lib/mock-data';
import Link from 'next/link';
import EditClientModal from '@/components/EditClientModal';
import { Client } from '@/lib/types';

export default function ClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<'overview' | 'deals'>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Local state to reflect edits immediately
  const [clientData, setClientData] = useState<Client | undefined>(
    mockClients.find(c => c.id === id)
  );

  const client = clientData;

  const handleSaveClient = (updatedClient: Client) => {
    setClientData(updatedClient);
  };

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-xl font-bold text-white mb-2">Client Not Found</h2>
        <button onClick={() => router.back()} className="text-primary hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  const clientDeals = mockDeals.filter(d => d.clientId === id);
  const totalDealValue = clientDeals.reduce((a, b) => a + b.value, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 fade-in">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Client Portfolio</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Edit className="w-4 h-4" /> Edit Client
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl bg-surface border border-border overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30 shrink-0">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-white mb-1">{client.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                client.status === 'active' ? 'bg-success/10 text-success border-success/20' :
                client.status === 'prospect' ? 'bg-warning/10 text-warning border-warning/20' :
                'bg-surface-hover text-text-muted border-border'
              }`}>
                {client.status}
              </span>
            </div>
            
            <p className="text-lg text-text-secondary font-medium mb-4">{client.industry}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-text-secondary">
                 <User className="w-4 h-4 text-text-muted" /> {client.contactName}
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                 <Mail className="w-4 h-4 text-text-muted" /> {client.contactEmail}
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                 <Phone className="w-4 h-4 text-text-muted" /> {client.phone}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-4 rounded-xl bg-surface-hover border border-border flex flex-col items-center min-w-[110px] shrink-0">
              <Briefcase className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold text-white">{client.activeJobs}</p>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Live Jobs</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-hover border border-border flex flex-col items-center min-w-[110px] shrink-0">
              <TrendingUp className="w-6 h-6 text-accent mb-2" />
              <p className="text-2xl font-bold text-white">{client.totalPlacements}</p>
              <p className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Placements</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border">
        {[
          { id: 'overview', label: 'Overview', icon: Building2 },
          { id: 'deals', label: 'Commercial Deals', icon: IndianRupee },
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

      {activeTab === 'overview' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
           <div className="p-6 rounded-xl bg-surface border border-border space-y-6">
             <h3 className="text-lg font-bold text-white border-b border-border pb-3">Company Metadata</h3>
             <div className="space-y-4">
               <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Internal Reference ID</p>
                  <p className="text-sm font-mono text-text-primary bg-surface-hover px-3 py-1.5 rounded inline-block">{client.id}</p>
               </div>
               {client.location && (
                 <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Headquarters</p>
                    <p className="text-sm font-medium text-white flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-text-muted" /> {client.location}
                    </p>
                 </div>
               )}
               {client.website && (
                 <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Corporate Website</p>
                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline flex items-center gap-2">
                       <Globe className="w-4 h-4" /> {client.website.replace('https://', '').replace('http://', '')}
                    </a>
                 </div>
               )}
               <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Onboarding Date</p>
                  <p className="text-sm font-medium text-white">{new Date(client.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
               </div>
               <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Total Pipeline Value</p>
                  <p className="text-lg font-bold text-success flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {totalDealValue.toLocaleString()}</p>
               </div>
             </div>
           </div>

           <div className="p-6 rounded-xl bg-gradient-to-br from-surface to-background border border-border">
              <h3 className="text-lg font-bold text-white border-b border-border pb-3 mb-4">Company Overview</h3>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {client.description || "No detailed overview has been provided for this client yet. Use the edit feature to add internal notes about hiring culture and business needs."}
              </p>
           </div>
         </div>
      )}

      {activeTab === 'deals' && (
         <div className="space-y-4 animate-fade-in">
           <div className="flex items-center justify-between p-4 rounded-xl bg-surface border border-border mb-4">
             <div>
               <h3 className="text-lg font-bold text-white">Active Commercial Deals</h3>
               <p className="text-sm text-text-secondary mt-1">Track financial opportunities tied to this client.</p>
               <p className="text-xs text-success font-medium mt-1">Projected Revenue: ₹{totalDealValue.toLocaleString()}</p>
             </div>
             <Link 
               href="/dashboard/deals"
               className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition-colors flex items-center gap-2"
             >
               Go to Pipeline <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {clientDeals.map(deal => (
                 <div key={deal.id} className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                       <h4 className="text-base font-bold text-white">{deal.title}</h4>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          deal.stage === 'won' ? 'bg-success/10 text-success' :
                          deal.stage === 'lost' ? 'bg-danger/10 text-danger' :
                          deal.stage === 'negotiation' ? 'bg-warning/10 text-warning' :
                          'bg-primary/10 text-primary'
                       }`}>
                         {deal.stage}
                       </span>
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                      <IndianRupee className="w-5 h-5 text-text-muted" />
                      {deal.value.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-secondary pt-3 border-t border-border/50">
                       <span>Close Date: {new Date(deal.expectedClose).toLocaleDateString()}</span>
                       <span className="font-medium text-text-primary">Win Prob: {deal.probability}%</span>
                    </div>
                 </div>
              ))}
              {clientDeals.length === 0 && (
                <div className="lg:col-span-2 p-10 text-center rounded-xl bg-surface-hover/30 border border-border">
                  <p className="text-sm text-text-muted">No commercial deals logged for this client.</p>
                </div>
              )}
           </div>
         </div>
      )}

      {client && (
        <EditClientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveClient}
          client={client}
        />
      )}
    </div>
  );
}
