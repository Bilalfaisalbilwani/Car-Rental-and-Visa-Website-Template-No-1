import React from 'react';
import { NavigationPage } from '../../types';
import { CONTACT_DETAILS } from '../../data/mockData';
import { Phone, Mail, Globe, MessageSquare, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#102C2B] text-[#F7F1E7] border-t border-[#D7BC8A]/20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D7BC8A]/15">
          {/* Brand & Editorial Introduction (Col 1-5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-editorial text-2xl tracking-wide text-[#F7F1E7] font-semibold">
                ZONE TOURISM
              </span>
              <span className="text-sm text-[#D7BC8A] font-light">×</span>
              <span className="font-serif-editorial text-2xl tracking-wide text-[#D7BC8A] font-normal">
                HOTWHEELS
              </span>
            </div>
            
            <p className="text-sm text-[#F7F1E7]/70 leading-relaxed font-light max-w-md">
              A bespoke digital collaboration orchestrating luxury mobility and UAE immigration assistance. 
              ZONE TOURISM LLC provides verified visa application guidance, while HOTWHEELS CAR RENTAL LLC 
              delivers sovereign self-drive and executive chauffeur fleets across Dubai.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent('Hello, I would like to enquire about your Dubai services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#102C2B] bg-[#D7BC8A] font-medium px-4 py-2 rounded hover:bg-[#c5a872] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Concierge Desk WhatsApp</span>
              </a>
              <a
                href={`tel:${CONTACT_DETAILS.landline}`}
                className="inline-flex items-center gap-2 text-xs text-[#F7F1E7] bg-[#193D38] border border-[#D7BC8A]/30 font-medium px-4 py-2 rounded hover:border-[#D7BC8A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D7BC8A]" />
                <span>Call {CONTACT_DETAILS.landlineDisplay}</span>
              </a>
            </div>
          </div>

          {/* Business 1: ZONE TOURISM LLC (Col 6-7) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-editorial text-lg text-[#D7BC8A] tracking-wider uppercase">
              ZONE TOURISM LLC
            </h4>
            <p className="text-xs text-[#F7F1E7]/60 leading-relaxed">
              UAE Entry Visas & Curated Tourism Arrangements
            </p>
            <ul className="space-y-2.5 text-xs text-[#F7F1E7]/80">
              <li>
                <button
                  onClick={() => onNavigate('visa-services')}
                  className="hover:text-[#D7BC8A] transition-colors text-left"
                >
                  30 Days Single Entry Visa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('visa-services')}
                  className="hover:text-[#D7BC8A] transition-colors text-left"
                >
                  60 Days Single Entry Visa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('visa-application')}
                  className="hover:text-[#D7BC8A] transition-colors text-left flex items-center gap-1 text-[#D7BC8A]"
                >
                  <span>Online Application Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li>
                <span className="text-[#F7F1E7]/50 block pt-1">
                  Email: <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-[#F7F1E7]/80 hover:text-[#D7BC8A]">{CONTACT_DETAILS.email}</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Business 2: HOTWHEELS CAR RENTAL LLC (Col 8-10) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-editorial text-lg text-[#D7BC8A] tracking-wider uppercase">
              HOTWHEELS FLEET
            </h4>
            <p className="text-xs text-[#F7F1E7]/60 leading-relaxed">
              Prestige Mobility & Chauffeur Services
            </p>
            <ul className="space-y-2.5 text-xs text-[#F7F1E7]/80">
              <li>
                <button
                  onClick={() => onNavigate('car-rental')}
                  className="hover:text-[#D7BC8A] transition-colors text-left"
                >
                  Self-Drive Prestige Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chauffeur-services')}
                  className="hover:text-[#D7BC8A] transition-colors text-left"
                >
                  VIP Chauffeur & Transfers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('car-rental')}
                  className="hover:text-[#D7BC8A] transition-colors text-left"
                >
                  Mercedes V-Class VIP
                </button>
              </li>
              <li>
                <a
                  href={CONTACT_DETAILS.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D7BC8A] transition-colors inline-flex items-center gap-1 text-[#D7BC8A]"
                >
                  <span>hotwheelscarrentals.com</span>
                  <Globe className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Operations & Verified Trust (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-editorial text-lg text-[#D7BC8A] tracking-wider uppercase">
              Operational Office
            </h4>
            <div className="text-xs text-[#F7F1E7]/70 space-y-2 leading-relaxed">
              <p>Dubai, United Arab Emirates</p>
              <p className="text-[#F7F1E7]/50">Operating Hours:</p>
              <p className="text-[#F7F1E7]/80 font-mono text-[11px]">08:30 — 23:00 GST</p>
              <p className="pt-2 text-[11px] text-[#D7BC8A] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D7BC8A]" />
                <span>Verified UAE Entities</span>
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory & Sovereignty Disclaimer */}
        <div className="py-6 border-b border-[#D7BC8A]/10 text-[11px] text-[#F7F1E7]/50 leading-relaxed space-y-2">
          <p>
            <strong className="text-[#F7F1E7]/70">Immigration Disclaimer:</strong> ZONE TOURISM LLC operates as a licensed tourism and visa document preparation agency in the United Arab Emirates. ZONE TOURISM LLC does not represent itself as a government immigration department. Final entry visas and approval authorizations remain solely within the sovereign jurisdiction of the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and the General Directorate of Residency and Foreigners Affairs (GDRFA).
          </p>
          <p>
            <strong className="text-[#F7F1E7]/70">Automotive Terms:</strong> HOTWHEELS CAR RENTAL LLC is a registered car rental entity in Dubai. Vehicle rentals require an active valid driving permit (UAE or eligible international license with IDP), pre-authorized security deposit, and compliance with UAE traffic regulations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F1E7]/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ZONE TOURISM LLC & HOTWHEELS CAR RENTAL LLC. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-[#D7BC8A] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-[#D7BC8A] transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:text-[#D7BC8A] transition-colors flex items-center gap-1 text-[#D7BC8A]/80 hover:text-[#D7BC8A]"
            >
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
