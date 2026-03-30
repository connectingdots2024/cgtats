/**
 * Shared utility for managing global billing and invoice branding settings
 */

export interface BillingSettings {
  companyName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
  taxId: string;
  footerNote: string;
}

export const DEFAULT_BILLING_SETTINGS: BillingSettings = {
  companyName: 'CGT RecruitAI Inc.',
  address: '123 Tech Park, Financial District',
  city: 'Mumbai',
  state: 'Maharashtra',
  zip: '400001',
  country: 'India',
  email: 'billing@cgtrecruital.com',
  phone: '+91-22-4932-9011',
  taxId: 'GSTIN-27AAACG1234F1Z5',
  footerNote: 'Please remit payment via NEFT/Bank Transfer. Late payments attract 2.5% penalty.',
};

export const getBillingSettings = (): BillingSettings => {
  if (typeof window === 'undefined') return DEFAULT_BILLING_SETTINGS;
  const saved = localStorage.getItem('cgt_billing_settings');
  return saved ? JSON.parse(saved) : DEFAULT_BILLING_SETTINGS;
};

export const saveBillingSettings = (settings: BillingSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cgt_billing_settings', JSON.stringify(settings));
  }
};
