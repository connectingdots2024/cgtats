'use client';

import { useState } from 'react';
import {
  X, IndianRupee, TrendingUp, TrendingDown,
  Building2, Users, FileText, Calendar,
  CheckCircle2, Plus, Download, ChevronRight,
  Briefcase, User, Mail, Phone, Calculator,
  Tag, Info, Zap, CreditCard, ShieldCheck
} from 'lucide-react';
import { clients, jobs } from '@/lib/mock-data';
import { Revenue, Expense, Invoice } from '@/lib/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => void;
}

// 💵 Add Revenue Modal
export function AddRevenueModal({ isOpen, onClose, onAdd }: ModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    sourceType: 'placement',
    clientId: '',
    recruiterId: 'u1',
    description: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newRevenue: Revenue = {
      id: `rev-${Date.now()}`,
      amount: parseFloat(formData.amount),
      sourceType: formData.sourceType as any,
      clientId: formData.clientId || 'cl1',
      recruiterId: formData.recruiterId,
      date: formData.date,
      description: formData.description || `Revenue from ${formData.sourceType}`,
      status: formData.status as any,
    };
    onAdd(newRevenue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                <TrendingUp className="w-5 h-5" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Record Revenue</h2>
                <p className="text-xs text-text-muted">Manually track a new income stream</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Revenue Amount (₹)</label>
               <div className="relative">
                  <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-success transition-colors"
                    placeholder="250000"
                  />
               </div>
            </div>
            <div>
               <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Source Type</label>
               <select
                 value={formData.sourceType}
                 onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
                 className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-success transition-colors"
               >
                 <option value="placement">Placement Fee</option>
                 <option value="retainer">Monthly Retainer</option>
                 <option value="subscription">Software SaaS</option>
                 <option value="other">Other Income</option>
               </select>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Select Client</label>
             <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <select
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-success transition-colors"
                >
                  <option value="">Choose a client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
             </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Internal Description / Memo</label>
             <textarea
               rows={3}
               value={formData.description}
               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
               className="w-full p-4 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-success transition-colors resize-none"
               placeholder="e.g. Senior Java Dev placement - Q1 milestone"
             />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
             <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-text-primary uppercase tracking-wider leading-none">Status: {formData.status.toUpperCase()}</span>
             </div>
             <button
               onClick={() => setFormData({ ...formData, status: formData.status === 'collected' ? 'pending' : 'collected' })}
               className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                 formData.status === 'collected' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
               }`}
             >
               {formData.status === 'collected' ? 'Mark Pending' : 'Mark Collected'}
             </button>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-surface-hover/30 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-text-primary uppercase tracking-widest">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!formData.amount || !formData.clientId}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-success to-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-success/20 transition-all disabled:opacity-50"
          >
            Finalize Entry
          </button>
        </div>
      </div>
    </div>
  );
}

// 💸 Add Expense Modal
export function AddExpenseModal({ isOpen, onClose, onAdd }: ModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'software',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      amount: parseFloat(formData.amount),
      category: formData.category as any,
      date: formData.date,
      description: formData.description,
    };
    onAdd(newExpense);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                <TrendingDown className="w-5 h-5" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Record Expense</h2>
                <p className="text-xs text-text-muted">Track outgoing operational capital</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Expense Amount (₹)</label>
               <input
                 type="number"
                 value={formData.amount}
                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                 className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-danger transition-colors"
                 placeholder="5000"
               />
            </div>
            <div>
               <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Category</label>
               <select
                 value={formData.category}
                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                 className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-danger transition-colors"
               >
                 <option value="salaries">Salaries & Payroll</option>
                 <option value="software">Tech / SaaS Tools</option>
                 <option value="marketing">Marketing & Ads</option>
                 <option value="operations">General Operations</option>
                 <option value="other">Other Expenses</option>
               </select>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Purpose / Expense Details</label>
             <input
               type="text"
               value={formData.description}
               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
               className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-danger transition-colors"
               placeholder="e.g. Monthly rent for Mumbai office"
             />
          </div>

          <div className="p-4 rounded-xl border border-dashed border-border flex items-center justify-center text-center cursor-pointer hover:bg-surface-hover transition-all">
             <div className="space-y-1">
                <FileText className="w-6 h-6 text-text-muted mx-auto" />
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Drag or Click to Upload Receipt</p>
             </div>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-surface-hover/30 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-text-primary uppercase tracking-widest">Discard</button>
          <button
            onClick={handleSubmit}
            disabled={!formData.amount}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-danger to-red-600 text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-danger/20 transition-all disabled:opacity-50"
          >
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
}

// 🧾 Create Invoice Modal
export function CreateInvoiceModal({ isOpen, onClose, onAdd }: ModalProps) {
  const [formData, setFormData] = useState({
    clientId: '',
    amount: '',
    items: [{ description: '', amount: '' }],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  if (!isOpen) return null;

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: '', amount: '' }] });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...formData.items];
    (newItems[index] as any)[field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = () => {
    const newInvoice: Invoice = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      clientId: formData.clientId || 'cl1',
      amount: formData.items.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0),
      status: 'pending',
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString().split('T')[0],
      items: formData.items.map(i => ({ description: i.description, amount: parseFloat(i.amount) })),
    };
    onAdd(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="w-5 h-5" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Generate Invoice</h2>
                <p className="text-xs text-text-muted">Multi-item billing for clients</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-hover text-text-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Bill To Client</label>
                <select
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Payment Terms (Due Date)</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Line Items</h3>
                <button 
                  onClick={handleAddItem}
                  className="p-1 px-3 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/20 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3" /> Add Row
                </button>
             </div>
             
             {formData.items.map((item, idx) => (
               <div key={idx} className="flex gap-4 items-center animate-fade-in">
                  <div className="flex-1">
                     <input
                       type="text"
                       value={item.description}
                       onChange={(e) => updateItem(idx, 'description', e.target.value)}
                       className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-colors"
                       placeholder="Senior Placement - Fee (15% CTC)"
                     />
                  </div>
                  <div className="w-32">
                     <input
                       type="number"
                       value={item.amount}
                       onChange={(e) => updateItem(idx, 'amount', e.target.value)}
                       className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-white focus:outline-none focus:border-primary transition-colors"
                       placeholder="Amount"
                     />
                  </div>
                  {formData.items.length > 1 && (
                    <button 
                      onClick={() => setFormData({ ...formData, items: formData.items.filter((_, i) => i !== idx) })}
                      className="p-3 rounded-xl bg-danger/10 text-danger hover:bg-danger/20 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
               </div>
             ))}
          </div>
        </div>

        <div className="p-6 border-t border-border bg-surface-hover/30 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Total Payable</p>
            <p className="text-2xl font-bold text-white leading-none mt-1">₹{formData.items.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-xs font-bold text-text-muted hover:text-text-primary uppercase tracking-widest">Cancel</button>
             <button
               onClick={handleSubmit}
               className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-primary/25 transition-all"
             >
               Confirm & Send
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 👨💼 Recruiter Payout Flow (Internal Logic Visualization)
export function RecruiterPayoutSuccess({ recruiterName, amount }: { recruiterName: string, amount: number }) {
  return (
    <div className="p-6 rounded-3xl bg-success/5 border border-success/20 flex items-center gap-6 animate-scale-in">
       <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success">
          <CheckCircle2 className="w-8 h-8" />
       </div>
       <div>
          <h3 className="text-lg font-bold text-white italic">Payout Manifest Generated</h3>
          <p className="text-sm text-text-muted">Successfully calculated and authorized commission of ₹{amount.toLocaleString()} for {recruiterName}. Funding is now in queue for disbursement.</p>
       </div>
    </div>
  );
}
