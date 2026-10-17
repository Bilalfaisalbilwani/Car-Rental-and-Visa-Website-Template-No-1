import React, { useState } from 'react';
import { NavigationPage, VisaCategory } from '../types';
import { StorageService } from '../services/storage';
import { ASSETS, CONTACT_DETAILS } from '../data/mockData';
import { Check, ShieldAlert, ArrowRight, FileText, Calendar, Clock } from 'lucide-react';

interface VisaServicesPageProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectCategoryForApplication: (catId: string) => void;
}

export const VisaServicesPage: React.FC<VisaServicesPageProps> = ({
  onNavigate,
  onSelectCategoryForApplication,
}) => {
  const [categories] = useState<VisaCategory[]>(() => StorageService.getVisaCategories());

  return (
    <div className="w-full pt-24 pb-20">
      {/* Editorial Header */}
      <section className="bg-[#102C2B] text-[#F7F1E7] py-20 border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              ZONE TOURISM LLC · DUBAI
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F1E7] leading-tight">
              UAE Tourist Visa Assistance
            </h1>
            <p className="text-sm sm:text-base text-[#F7F1E7]/80 font-light leading-relaxed">
              Professional document coordination and structured application processing for 30-day and 60-day single-entry tourist visas into the United Arab Emirates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="py-20 bg-[#F7F1E7] text-[#182B27] border-b border-[#E9E0D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 pb-14">
            <span className="text-xs uppercase tracking-widest text-[#102C2B] font-semibold block">
              Confirmed Visa Categories
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#102C2B]">
              Transparent Pricing & Requirements
            </h2>
            <p className="text-xs sm:text-sm text-[#182B27]/70">
              Only authentic, confirmed UAE single-entry tourist permits are supported.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-lg p-8 border border-[#E9E0D1] shadow-sm flex flex-col justify-between hover:border-[#102C2B]/30 transition-all"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs uppercase font-semibold text-[#102C2B] tracking-wider block">
                        {cat.entryType}
                      </span>
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#102C2B] mt-1">
                        {cat.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">Total Fee</span>
                      <span className="font-serif-editorial text-3xl font-bold text-[#102C2B]">
                        AED {cat.priceAED}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    {cat.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-gray-100 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-[#102C2B]" />
                      <span>Estimated Processing: <strong>{cat.processingTimeDays}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-[#102C2B]" />
                      <span>Entry Validity: <strong>{cat.validityDays} Days</strong> from issue date</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-bold text-[#102C2B] tracking-wider">
                      Mandatory Required Documents:
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-600">
                      {cat.requiredDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      onSelectCategoryForApplication(cat.id);
                      onNavigate('visa-application');
                    }}
                    className="w-full py-3.5 px-6 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Apply for {cat.durationDays}-Day Visa</span>
                    <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Official Government Disclaimer Section */}
      <section className="py-16 bg-[#102C2B] text-[#F7F1E7] border-b border-[#D7BC8A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-[#193D38] rounded-lg border border-[#D7BC8A]/30 space-y-4">
            <div className="flex items-center gap-3 text-[#D7BC8A]">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="font-serif-editorial text-2xl font-semibold">
                Sovereign Immigration Notice
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F7F1E7]/80 leading-relaxed font-light">
              ZONE TOURISM LLC is a licensed travel and tourism enterprise registered in Dubai, United Arab Emirates. We assist clients by auditing, formatting, and presenting visa applications through accredited UAE immigration portals. 
            </p>
            <p className="text-xs sm:text-sm text-[#F7F1E7]/80 leading-relaxed font-light">
              <strong>Please note:</strong> ZONE TOURISM LLC is not a government authority and does not issue visas directly. All approvals, background security clearances, processing intervals, and border entry decisions are determined exclusively by the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and the General Directorate of Residency and Foreigners Affairs (GDRFA). Application fees paid are non-refundable once immigration lodgement has occurred.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
