import React from 'react';
import { NavigationPage } from '../types';
import { CONTACT_DETAILS } from '../data/mockData';

interface TermsPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const TermsPage: React.FC<TermsPageProps> = () => {
  return (
    <div className="w-full pt-24 pb-20 bg-[#F7F1E7] text-[#182B27]">
      <section className="bg-[#102C2B] text-[#F7F1E7] py-16 border-b border-[#D7BC8A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block mb-2">
            LEGAL FRAMEWORK & SERVICE AGREEMENTS
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F1E7]">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F1E7]/70 font-light mt-2">
            Governing ZONE TOURISM LLC & HOTWHEELS CAR RENTAL LLC · Dubai, UAE
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-xs sm:text-sm text-[#182B27]/80 leading-relaxed font-light">
          
          <div className="p-5 bg-white rounded-lg border border-[#E9E0D1] space-y-2">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              1. Commercial Relationship
            </h3>
            <p>
              By utilizing this website, submitting an application, or initiating an automotive reservation, you enter into a binding agreement governed by the commercial laws of the Emirate of Dubai and the federal statutes of the United Arab Emirates. Services are rendered independently by ZONE TOURISM LLC (tourism & visa services) or HOTWHEELS CAR RENTAL LLC (automotive rental and chauffeur services).
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              2. ZONE TOURISM LLC — Visa Assistance Terms
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Agency Role:</strong> ZONE TOURISM LLC acts solely as an intermediary and preparation agency. The approval, rejection, or delay of any visa application is the sovereign prerogative of the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and the General Directorate of Residency and Foreigners Affairs (GDRFA).</li>
              <li><strong>Non-Refundable Immigration Fees:</strong> Once an application dossier has been lodged into the government immigration system, all government application and processing charges are strictly non-refundable regardless of the decision outcome.</li>
              <li><strong>Applicant Responsibility:</strong> The applicant bears complete responsibility for ensuring that passport validity exceeds 6 months from entry, and that all provided personal and biographical scans are legitimate and un-tampered. Providing fraudulent documents constitutes an offense under UAE Penal Code.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              3. HOTWHEELS CAR RENTAL LLC — Vehicle Rental Terms
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Mandatory Schedule Observance:</strong> All rental contracts must specify pickup and return dates and times. Charges operate on a 24-hour cycle. Extensions must be requested and authorized at least 24 hours prior to the scheduled return time.</li>
              <li><strong>Driver Eligibility:</strong> Drivers must be at least 23 or 25 years old (depending on the vehicle horsepower tier) with an active, unendorsed driving permit. UAE residents must hold a UAE license. International visitors must hold their national license accompanied by an International Driving Permit (IDP), or a direct eligible license from recognized GCC, EU, UK, US, or Commonwealth jurisdictions.</li>
              <li><strong>Security Deposit:</strong> A refundable security deposit is pre-authorized via credit card. Release occurs 21 to 28 days post-return to allow for official UAE traffic fine and Salik toll clearances.</li>
              <li><strong>Mileage Policy:</strong> Standard rental agreements include a generous allowance of 250 kilometers per day. Additional mileage is invoiced at the configured statutory rate per kilometer (AED 4 to AED 7 depending on vehicle model).</li>
              <li><strong>Road Tolls (Salik) & Fines:</strong> Each Salik toll crossing is billed at AED 5.00. Traffic violations registered by Dubai Police radars during the rental period remain the legal liability of the renter, plus applicable administrative processing charges.</li>
              <li><strong>Fuel Policy:</strong> Vehicles are delivered with a documented fuel level and must be returned with an equivalent level (same-to-same).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              4. Chauffeur Service Protocols
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>Airport transfers include complimentary 60 minutes of waiting time from the actual landed flight time. Hourly charter packages adhere to the agreed service window.</li>
              <li>Smoking, vaping, or consumption of prohibited substances inside vehicles is strictly prohibited.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
              5. Dispute Jurisdiction
            </h3>
            <p>
              Any controversy, claim, or dispute arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the Courts of the Emirate of Dubai, United Arab Emirates.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
