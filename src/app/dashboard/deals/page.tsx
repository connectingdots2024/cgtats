'use client';

import { useState } from 'react';
import {
  HandshakeIcon, Plus, IndianRupee, Calendar, User, TrendingUp,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { deals as mockDeals, clients as mockClients } from '@/lib/mock-data';

const dealStages = [
  { id: 'lead', label: 'Lead', color: 'bg-blue-500' },
  { id: 'proposal', label: 'Proposal', color: 'bg-cyan-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-amber-500' },
  { id: 'won', label: 'Won', color: 'bg-emerald-500' },
  { id: 'lost', label: 'Lost', color: 'bg-red-500' },
];

export default function DealsPage() {
  const totalPipeline = mockDeals.filter(d => d.stage !== 'lost').reduce((a, d) => a + d.value, 0);
  const wonValue = mockDeals.filter(d => d.stage === 'won').reduce((a, d) => a + d.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Deals Pipeline</h1>
          <p className="text-text-secondary mt-1">Track and manage your recruitment deals</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" />
          New Deal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-border">
          <p className="text-2xl font-bold text-primary">₹{(totalPipeline / 1000).toFixed(0)}K</p>
          <p className="text-xs text-text-muted mt-1">Pipeline Value</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border">
          <p className="text-2xl font-bold text-success">₹{(wonValue / 1000).toFixed(0)}K</p>
          <p className="text-xs text-text-muted mt-1">Won Deals</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border">
          <p className="text-2xl font-bold text-accent">{mockDeals.length}</p>
          <p className="text-xs text-text-muted mt-1">Total Deals</p>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border">
          <p className="text-2xl font-bold text-warning">61%</p>
          <p className="text-xs text-text-muted mt-1">Avg. Win Rate</p>
        </div>
      </div>

      {/* Deal Pipeline Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        {dealStages.filter(s => s.id !== 'lost').map((stage) => {
          const stageDeals = mockDeals.filter(d => d.stage === stage.id);
          const stageValue = stageDeals.reduce((a, d) => a + d.value, 0);

          return (
            <div key={stage.id} className="flex-shrink-0 w-72 lg:flex-1 lg:min-w-[220px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <h3 className="text-sm font-semibold text-white">{stage.label}</h3>
                  <span className="text-xs text-text-muted bg-surface-hover px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <span className="text-xs text-text-muted">₹{(stageValue / 1000).toFixed(0)}K</span>
              </div>

              <div className="space-y-3">
                {stageDeals.map((deal) => {
                  const client = mockClients.find(c => c.id === deal.clientId);
                  return (
                    <div
                      key={deal.id}
                      className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                    >
                      <h4 className="text-sm font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        {deal.title}
                      </h4>
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <IndianRupee className="w-3 h-3 text-text-muted" />
                          ₹{deal.value.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                          <Calendar className="w-3 h-3 text-text-muted" />
                          Close: {new Date(deal.expectedClose).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        {client && (
                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <User className="w-3 h-3 text-text-muted" />
                            {client.name}
                          </div>
                        )}
                      </div>

                      {/* Probability bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              deal.probability >= 75 ? 'bg-success' :
                              deal.probability >= 50 ? 'bg-warning' : 'bg-info'
                            }`}
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-medium text-text-muted">{deal.probability}%</span>
                      </div>
                    </div>
                  );
                })}

                {stageDeals.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-text-muted">
                    <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center mb-2">
                      <Plus className="w-5 h-5" />
                    </div>
                    <p className="text-xs">No deals yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
