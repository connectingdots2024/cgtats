'use client';

import { useState } from 'react';
import {
  TrendingDown, Search, Plus, Filter, Download, 
  ChevronRight, Calendar, ArrowDownRight, CreditCard,
  Users, Briefcase, FileText, X, CheckCircle2,
  IndianRupee, MoreHorizontal, Receipt, Laptop, Megaphone,
  Settings
} from 'lucide-react';
import { expenses as initialExpenses } from '@/lib/mock-data';
import { Expense } from '@/lib/types';
import Link from 'next/link';
import { AddExpenseModal } from '@/components/FinanceModals';
import { exportToCSV } from '@/lib/export-utils';

export default function ExpensesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [expenseList, setExpenseList] = useState<Expense[]>(initialExpenses);

  const handleExport = () => {
    exportToCSV(expenseList, 'expense-report');
  };

  const handleAddExpense = (newExpense: Expense) => {
    setExpenseList([newExpense, ...expenseList]);
  };

  const filteredExpenses = expenseList.filter(exp => 
    (exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     exp.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterCategory === 'all' || exp.category === filterCategory)
  );

  const stats = [
    { label: 'Total Expenses', value: expenseList.reduce((a, b) => a + b.amount, 0), icon: TrendingDown, color: 'text-danger' },
    { label: 'Salaries', value: expenseList.filter(e => e.category === 'salaries').reduce((a, b) => a + b.amount, 0), icon: Users, color: 'text-primary' },
    { label: 'Software', value: expenseList.filter(e => e.category === 'software').reduce((a, b) => a + b.amount, 0), icon: Laptop, color: 'text-info' },
    { label: 'Marketing', value: expenseList.filter(e => e.category === 'marketing').reduce((a, b) => a + b.amount, 0), icon: Megaphone, color: 'text-accent' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'salaries': return Users;
      case 'marketing': return Megaphone;
      case 'software': return Laptop;
      case 'operations': return Settings;
      default: return Receipt;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'salaries': return 'bg-primary/10 text-primary';
      case 'marketing': return 'bg-accent/10 text-accent';
      case 'software': return 'bg-info/10 text-info';
      case 'operations': return 'bg-warning/10 text-warning';
      default: return 'bg-surface-hover text-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-text-muted mb-1 text-sm">
            <Link href="/dashboard/finance" className="hover:text-primary">Finance</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Expenses</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Expense Tracking</h1>
          <p className="text-text-secondary mt-1">Track operational costs, software subscriptions, and payroll</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-surface border border-border text-sm text-text-primary hover:bg-surface-hover transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export Expenses
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-danger to-red-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-danger/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-surface border border-border group hover:border-danger/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-1.5 rounded-lg bg-background ${stat.color} bg-opacity-10 group-hover:bg-opacity-20`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-xs text-text-muted font-semibold uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-white">₹{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search expenses..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-white focus:outline-none focus:border-danger/50"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full md:w-auto">
          {['all', 'salaries', 'marketing', 'software', 'operations'].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                filterCategory === c 
                  ? 'bg-danger/10 border-danger/30 text-danger' 
                  : 'bg-surface border-border text-text-muted hover:text-text-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-surface border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredExpenses.map((exp) => {
              const Icon = getCategoryIcon(exp.category);
              return (
                <tr key={exp.id} className="group hover:bg-surface-hover/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-text-secondary">{exp.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{exp.description}</span>
                      <span className="text-[10px] font-mono text-text-muted uppercase">{exp.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${getCategoryColor(exp.category)}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-text-primary capitalize">{exp.category}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-danger">₹{exp.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-background transition-all">
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddExpenseModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddExpense}
      />
    </div>
  );
}
