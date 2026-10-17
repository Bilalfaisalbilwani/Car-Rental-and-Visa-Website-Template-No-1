import React from 'react';
import { NavigationPage } from '../types';
import { CONTACT_DETAILS } from '../data/mockData';
import { Shield, Lock, FileText } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = () => {
  return (
    <div className="w-full pt-24 pb-20 bg-[#F7F1E7] text-[#182B27]">
      <section className="bg-[#102C2B] text-[#F7F1E7] py-16 border-b border-[#D7BC8A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block mb-2">
            REGULATORY & DATA PROTECTION
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F1E7]">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F1E7]/70 font-light mt-2">
            ZONE TOURISM LLC & HOTWHEELS CAR RENTAL LLC · Last updated October 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs sm:text-sm text-[#182B27]/80 leading-relaxed font-light">
          
          <div className="p-5 bg-white rounded-lg border border-[#E9E0D1] space-y-2">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              1. Overview & Data Controller Identification
            </h3>
            <p>
              This Privacy Policy explains how <strong>ZONE TOURISM LLC</strong> (licensed for tourism and visa application coordination) and <strong>HOTWHEELS CAR RENTAL LLC</strong> (licensed for motor vehicle hire and chauffeur services) in the Emirate of Dubai, United Arab Emirates, collect, manage, and safeguard your personal information in compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              2. Nature of Data Collected
            </h3>
            <p>Depending on the service requested, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Visa Services:</strong> Full legal name, nationality, date of birth, gender, passport biographical scans, passport numbers and expiry dates, passport-style photographs, flight tickets, and UAE residential/hotel addresses as mandated by UAE immigration authorities.</li>
              <li><strong>Car Rental Services:</strong> Valid UAE or International Driving Permit scans, passport/Emirates ID copies, contact telephone, email address, credit card payment details for security deposit pre-authorization, and rental itinerary data.</li>
              <li><strong>Chauffeur Services:</strong> Flight numbers, terminal arrival times, pickup and drop-off addresses, and corporate billing details.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              3. Purpose & Legal Basis for Processing
            </h3>
            <p>
              Your personal data is processed solely for executing the requested services:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Filing electronic entry visa applications through official channels of the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and the General Directorate of Residency and Foreigners Affairs (GDRFA).</li>
              <li>Executing valid vehicle rental contracts complying with Dubai Roads and Transport Authority (RTA) regulations.</li>
              <li>Processing tolls (Salik), parking, and traffic enforcement clearances with Dubai Police.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              4. Document Security & Storage
            </h3>
            <p>
              All passport scans, identity credentials, and driver permits are stored in encrypted, access-restricted repositories. We do not sell, rent, or lease applicant or driver data to any commercial third parties. Documents are retained only for the duration required under statutory UAE commercial audit and immigration guidelines, after which they are systematically deleted.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              5. Contacting the Data Protection Officer
            </h3>
            <p>
              To request inspection, correction, or deletion of your stored records, contact our compliance officer at:
              <br />
              <strong>Email:</strong> {CONTACT_DETAILS.email}
              <br />
              <strong>Phone:</strong> {CONTACT_DETAILS.landlineDisplay}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
