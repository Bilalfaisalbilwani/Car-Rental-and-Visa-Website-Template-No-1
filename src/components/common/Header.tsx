import React, { useState, useEffect } from 'react';
import { NavigationPage } from '../../types';
import { Menu, X, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { CONTACT_DETAILS } from '../../data/mockData';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'UAE Visa Services', page: 'visa-services' },
    { label: 'Car Rental', page: 'car-rental' },
    { label: 'Chauffeur Services', page: 'chauffeur-services' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#102C2B]/95 backdrop-blur-md border-b border-[#D7BC8A]/20 py-3 shadow-lg'
            : 'bg-[#102C2B] border-b border-[#D7BC8A]/15 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single clean line) */}
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7BC8A]"
            >
              <div className="flex items-baseline gap-2 whitespace-nowrap shrink-0">
                <span className="font-serif-editorial text-xl md:text-2xl tracking-wide text-[#F7F1E7] font-semibold">
                  ZONE TOURISM
                </span>
                <span className="text-xs text-[#D7BC8A] font-light">×</span>
                <span className="font-serif-editorial text-xl md:text-2xl tracking-wide text-[#D7BC8A] font-normal">
                  HOTWHEELS
                </span>
              </div>
            </button>

            {/* Zone 2: 4-5 Nav Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className={`text-xs uppercase tracking-widest transition-colors whitespace-nowrap shrink-0 pb-1 relative ${
                      isActive
                        ? 'text-[#D7BC8A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#D7BC8A]'
                        : 'text-[#F7F1E7]/80 hover:text-[#F7F1E7]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Concierge Desk & WhatsApp CTA) */}
            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <a
                href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent(
                  'Hello, I am contacting Zone Tourism × Hotwheels concierge regarding Dubai visa & luxury car rental arrangements.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-[#F7F1E7] bg-[#193D38] border border-[#D7BC8A]/30 px-3.5 py-2 rounded hover:border-[#D7BC8A] hover:bg-[#102C2B] transition-all whitespace-nowrap shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span className="text-[#D7BC8A] font-serif-editorial text-sm italic">WhatsApp:</span>
                <span>{CONTACT_DETAILS.whatsappFormatted}</span>
              </a>

              <button
                onClick={() => onNavigate('admin')}
                title="Management Portal"
                className={`p-2 text-xs rounded border transition-colors ${
                  currentPage === 'admin'
                    ? 'border-[#D7BC8A] text-[#D7BC8A] bg-[#193D38]'
                    : 'border-transparent text-[#F7F1E7]/60 hover:text-[#D7BC8A]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onNavigate('admin')}
                className="p-2 text-[#F7F1E7]/70 hover:text-[#D7BC8A]"
                aria-label="Admin Access"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F7F1E7] hover:text-[#D7BC8A] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#D7BC8A]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-xs bg-[#102C2B] border-l border-[#D7BC8A]/20 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#D7BC8A]/15">
                <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-medium block">
                  Editorial Concierge
                </span>
                <span className="text-sm text-[#F7F1E7]/70 font-light">
                  ZONE TOURISM × HOTWHEELS
                </span>
              </div>

              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => {
                        onNavigate(link.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left py-2 px-3 text-sm tracking-wider uppercase transition-colors rounded ${
                        isActive
                          ? 'bg-[#193D38] text-[#D7BC8A] font-semibold border-l-2 border-[#D7BC8A]'
                          : 'text-[#F7F1E7]/90 hover:text-[#D7BC8A]'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-[#D7BC8A]/15 space-y-2">
                <button
                  onClick={() => {
                    onNavigate('visa-application');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] transition-colors"
                >
                  Apply For UAE Visa
                </button>
                <button
                  onClick={() => {
                    onNavigate('car-rental');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#F7F1E7] bg-[#193D38] border border-[#D7BC8A]/40 rounded hover:border-[#D7BC8A] transition-colors"
                >
                  Explore Luxury Fleet
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D7BC8A]/15 text-xs text-[#F7F1E7]/70 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D7BC8A]" />
                <a href={`tel:${CONTACT_DETAILS.landline}`} className="hover:text-[#F7F1E7]">
                  {CONTACT_DETAILS.landlineDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F1E7]"
                >
                  {CONTACT_DETAILS.whatsappFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
