import React from 'react';
import { NavigationPage } from '../types';
import { ASSETS, CONTACT_DETAILS } from '../data/mockData';
import { Shield, Check, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full pt-24 pb-20 bg-[#F7F1E7] text-[#182B27]">
      {/* Editorial Header */}
      <section className="bg-[#102C2B] text-[#F7F1E7] py-20 border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              CORPORATE PROFILE
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F1E7] leading-tight">
              Hospitality & Mobility, Curated For Dubai.
            </h1>
            <p className="text-sm sm:text-base text-[#F7F1E7]/80 font-light leading-relaxed">
              An authentic partnership between ZONE TOURISM LLC and HOTWHEELS CAR RENTAL LLC, delivering specialized entry documentation and luxury vehicular logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Two Company Profiles */}
      <section className="py-20 border-b border-[#E9E0D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Entity 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#102C2B] font-bold block">
                ENTITY 01 · TOURISM & IMMIGRATION LIAISON
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#102C2B]">
                ZONE TOURISM LLC
              </h2>
              <p className="text-sm text-[#182B27]/80 leading-relaxed font-light">
                ZONE TOURISM LLC is an officially registered travel and inbound tourism management company based in Dubai, United Arab Emirates. The company focuses on simplifying entry into the UAE through accurate visa preparation, applicant document auditing, and structured submissions for 30-day and 60-day tourist visas.
              </p>
              <div className="space-y-2 text-xs text-[#182B27]/70">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Licensed inbound tourism operator in the Emirate of Dubai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Verified 30-day and 60-day tourist entry processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Transparent document coordination without misleading approval guarantees</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('visa-services')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#102C2B] hover:text-[#193D38] border-b border-[#102C2B] pb-1"
                >
                  <span>Explore Visa Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#E9E0D1] shadow-lg">
                <img
                  src={ASSETS.dubaiHospitality}
                  alt="Dubai Hospitality"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Entity 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-[#E9E0D1]">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#E9E0D1] shadow-lg">
                <img
                  src={ASSETS.mercedesSClass}
                  alt="Hotwheels luxury fleet"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#102C2B] font-bold block">
                ENTITY 02 · LUXURY AUTOMOTIVE FLEET
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#102C2B]">
                HOTWHEELS CAR RENTAL LLC
              </h2>
              <p className="text-sm text-[#182B27]/80 leading-relaxed font-light">
                HOTWHEELS CAR RENTAL LLC is a dedicated luxury and executive automotive leasing company operating in Dubai. Dedicated to providing pristine vehicles to discerning residents and international visitors, the company maintains a curated fleet spanning flagship sedans, spacious SUVs, and VIP chauffeur-driven multi-passenger vehicles.
              </p>
              <div className="space-y-2 text-xs text-[#182B27]/70">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Licensed automotive rental provider under Dubai RTA jurisdiction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Self-drive luxury cars and executive chauffeur transport</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Clear, verifiable policies on deposits, insurance, and mileage</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('car-rental')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#102C2B] hover:text-[#193D38] border-b border-[#102C2B] pb-1"
                >
                  <span>Browse Active Fleet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Factual Integrity Promise */}
      <section className="py-16 bg-[#102C2B] text-[#F7F1E7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Shield className="w-8 h-8 text-[#D7BC8A] mx-auto" />
          <h3 className="font-serif-editorial text-3xl font-bold">
            Our Commitment to Factual Transparency
          </h3>
          <p className="text-xs sm:text-sm text-[#F7F1E7]/80 leading-relaxed font-light max-w-2xl mx-auto">
            We adhere strictly to verified business practices. We do not manufacture fictitious awards, inflated customer counts, or false affiliations. Every vehicle displayed in our fleet is actively configured, and all visa procedures follow verified UAE immigration channels.
          </p>
        </div>
      </section>
    </div>
  );
};
