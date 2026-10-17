import React from 'react';
import { NavigationPage } from '../types';
import { CheckCircle2, ShieldCheck, ArrowRight, Printer, FileText } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/mockData';

interface PaymentResultPageProps {
  onNavigate: (page: NavigationPage) => void;
  referenceNumber?: string;
  amountAED?: number;
  serviceDescription?: string;
}

export const PaymentResultPage: React.FC<PaymentResultPageProps> = ({
  onNavigate,
  referenceNumber = 'INV-982104',
  amountAED = 1400,
  serviceDescription = 'Authorized Service Invoice (Stripe Checkout Verified)',
}) => {
  return (
    <div className="w-full pt-28 pb-20 bg-[#F7F1E7] text-[#182B27]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 sm:p-10 border border-[#E9E0D1] shadow-xl text-center space-y-6">
          
          <div className="w-16 h-16 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#102C2B] font-bold">
              STRIPE VERIFIED TRANSACTION
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#102C2B]">
              Payment Processed Successfully
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-md mx-auto">
              Your payment has been securely authorized and settled via Stripe Payment Gateway.
            </p>
          </div>

          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Transaction Reference:</span>
              <span className="font-mono font-bold text-[#102C2B]">{referenceNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Service Description:</span>
              <span className="font-medium text-[#102C2B]">{serviceDescription}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Settled Amount:</span>
              <span className="font-serif-editorial text-xl font-bold text-emerald-800">AED {amountAED.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Payment Channel:</span>
              <span className="text-[#102C2B]">Stripe Hosted Checkout · 256-bit SSL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Settlement Time:</span>
              <span className="text-gray-700">{new Date().toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-2.5 bg-[#102C2B] hover:bg-[#193D38] text-[#F7F1E7] text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
            </button>
          </div>

          <p className="text-[11px] text-gray-400 pt-2">
            For billing inquiries or corporate invoices with UAE TRN VAT number, contact {CONTACT_DETAILS.email}.
          </p>
        </div>
      </div>
    </div>
  );
};
