'use client';

import { useState } from 'react';
import {
  Building2, Plus, Search, Phone, Mail, MapPin, Users,
  Briefcase, TrendingUp, MoreHorizontal, ExternalLink,
  ChevronRight, Star
} from 'lucide-react';
import { clients as mockClients } from '@/lib/mock-data';
import AddClientModal from '@/components/AddClientModal';
import { Client } from '@/lib/types';
import Link from 'next/link';

export default function CRMPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clientsList, setClientsList] = useState(mockClients);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredClients = clientsList.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = (client: Client) => {
    setClientsList(prev => [client, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM</h1>
          <p className="text-text-secondary mt-1">Manage your clients and company relationships</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: clientsList.length, color: 'text-primary' },
          { label: 'Active', value: clientsList.filter(c => c.status === 'active').length, color: 'text-success' },
          { label: 'Total Placements', value: clientsList.reduce((a, c) => a + c.totalPlacements, 0), color: 'text-accent' },
          { label: 'Active Jobs', value: clientsList.reduce((a, c) => a + c.activeJobs, 0), color: 'text-warning' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => (
          <Link
            href={`/dashboard/crm/${client.id}`}
            key={client.id}
            className="p-6 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors">{client.name}</h3>
                  <p className="text-xs text-text-muted">{client.industry}</p>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${
                client.status === 'active' ? 'bg-success/10 text-success' :
                client.status === 'prospect' ? 'bg-warning/10 text-warning' :
                'bg-surface-hover text-text-muted'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-surface-hover/50">
                <p className="text-lg font-bold text-white">{client.activeJobs}</p>
                <p className="text-[10px] text-text-muted">Active Jobs</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-hover/50">
                <p className="text-lg font-bold text-white">{client.totalPlacements}</p>
                <p className="text-[10px] text-text-muted">Placements</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Users className="w-3.5 h-3.5 text-text-muted" />
                {client.contactName}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-3.5 h-3.5 text-text-muted" />
                {client.contactEmail}
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="w-3.5 h-3.5 text-text-muted" />
                {client.phone}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <span className="text-xs text-text-muted">
                Client since {new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
              <span className="text-xs text-primary font-medium group-hover:text-primary-light flex items-center gap-1 transition-colors">
                View Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddClient}
      />
    </div>
  );
}
