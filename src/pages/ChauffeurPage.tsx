import React from 'react';
import { NavigationPage } from '../types';
import { ASSETS, CONTACT_DETAILS } from '../data/mockData';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Users, 
  Plane, 
  Sparkles, 
  ArrowRight,
  Briefcase,
  Check
} from 'lucide-react';

interface ChauffeurPageProps {
  onNavigate: (page: NavigationPage) => void;
  onRequestChauffeurModal: () => void;
}

export const ChauffeurPage: React.FC<ChauffeurPageProps> = ({
  onNavigate,
  onRequestChauffeurModal,
}) => {
  return (
    <div className="w-full pt-24 pb-20 bg-[#102C2B] text-[#F7F1E7]">
      {/* Header */}
      <section className="py-20 border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
                HOTWHEELS CHAUFFEUR DIVISION · DUBAI
              </span>
              <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F1E7] leading-tight">
                Executive Chauffeur Logistics
              </h1>
              <p className="text-sm sm:text-base text-[#F7F1E7]/80 font-light leading-relaxed max-w-xl">
                Bespoke point-to-point transportation, airport meet-and-greet services, and all-day private chauffeur charters for executive delegations, private aviation guests, and luxury travelers in Dubai.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onRequestChauffeurModal}
                  className="px-8 py-4 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Chauffeur Service</span>
                </button>
                <a
                  href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent('Hello, I would like to inquire about executive chauffeur booking in Dubai.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#193D38] border border-[#D7BC8A]/40 text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:border-[#D7BC8A] transition-colors flex items-center justify-center gap-2"
                >
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] rounded-lg overflow-hidden border border-[#D7BC8A]/30 shadow-2xl">
                <img
                  src={ASSETS.mercedesVClass}
                  alt="Mercedes-Benz V-Class chauffeur vehicle at private aviation terminal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C2B] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#102C2B]/85 backdrop-blur-sm p-3 rounded border border-[#D7BC8A]/30 text-xs">
                  <span className="text-[#D7BC8A] font-semibold block">VIP Boardroom Transit</span>
                  <span className="text-gray-300">Executive Mercedes-Benz V-Class Fleet</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-20 bg-[#193D38] border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              Service Pillars
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#F7F1E7]">
              Four Refined Chauffeur Formats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Plane,
                title: 'Airport Meet & Greet',
                rate: 'From AED 650',
                desc: 'Flight radar tracking, baggage assistance at DXB Terminals 1, 2, 3 or DWC, and seamless direct transit to your hotel.'
              },
              {
                icon: Clock,
                title: 'Hourly VIP Charter',
                rate: 'From AED 250 / hr',
                desc: 'Dedicated vehicle and chauffeur on standby for back-to-back corporate meetings, art fairs, and citywide engagements.'
              },
              {
                icon: Briefcase,
                title: 'Corporate Delegation',
                rate: 'Custom Itinerary',
                desc: 'Multi-vehicle coordinated convoys for summits, state visits, and investor roadshows across the UAE.'
              },
              {
                icon: MapPin,
                title: 'Intercity Transfers',
                rate: 'From AED 1,100',
                desc: 'Effortless door-to-door transit between Dubai and Abu Dhabi, Ras Al Khaimah, or Fujairah in sovereign comfort.'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-[#102C2B] p-6 rounded-lg border border-[#D7BC8A]/20 flex flex-col justify-between space-y-4 hover:border-[#D7BC8A]/60 transition-colors"
              >
                <div className="space-y-3">
                  <s.icon className="w-6 h-6 text-[#D7BC8A]" />
                  <h3 className="font-serif-editorial text-xl font-bold text-white">
                    {s.title}
                  </h3>
                  <span className="text-xs text-[#D7BC8A] font-mono block">{s.rate}</span>
                  <p className="text-xs text-[#E9E0D1]/70 leading-relaxed font-light">
                    {s.desc}
                  </p>
                </div>

                <button
                  onClick={onRequestChauffeurModal}
                  className="pt-2 text-xs font-semibold text-[#D7BC8A] hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Book Format</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Chauffeur Code of Conduct */}
      <section className="py-20 bg-[#102C2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 bg-[#193D38] rounded-lg border border-[#D7BC8A]/30 space-y-6">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#F7F1E7]">
              The Hotwheels Chauffeur Standard
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#E9E0D1]/80">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#D7BC8A] shrink-0 mt-0.5" />
                <span>Strict non-disclosure agreement (NDA) protecting client privacy & conversations.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#D7BC8A] shrink-0 mt-0.5" />
                <span>Uniformed executive attire (dark suit, tie, polished dress shoes).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#D7BC8A] shrink-0 mt-0.5" />
                <span>Complimentary bottled artisan still & sparkling water, Wi-Fi, and phone chargers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#D7BC8A] shrink-0 mt-0.5" />
                <span>Immaculately sanitized vehicles detailed prior to each assignment.</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button
                onClick={onRequestChauffeurModal}
                className="px-8 py-3.5 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors"
              >
                Arrange Your Chauffeur Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
