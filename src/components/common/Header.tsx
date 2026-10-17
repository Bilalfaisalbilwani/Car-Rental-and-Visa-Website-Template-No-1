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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
            ? 'bg-[#102C2B]/95 backdrop-blur-md border-b border-[#D7BC8A]/20 py-2.5 sm:py-3 shadow-lg'
            : 'bg-[#102C2B] border-b border-[#D7BC8A]/15 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 w-full">
            
            {/* Zone 1: Brand Wordmark (Protected with shrink-0 so it never overlaps or gets squeezed) */}
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7BC8A] shrink-0"
              aria-label="Zone Tourism × Hotwheels Home"
            >
              <div className="flex items-baseline gap-1.5 sm:gap-2 whitespace-nowrap">
                <span className="font-serif-editorial text-base sm:text-xl lg:text-2xl tracking-wide text-[#F7F1E7] font-semibold">
                  ZONE TOURISM
                </span>
                <span className="text-xs text-[#D7BC8A] font-light">×</span>
                <span className="font-serif-editorial text-base sm:text-xl lg:text-2xl tracking-wide text-[#D7BC8A] font-normal">
                  HOTWHEELS
                </span>
              </div>
            </button>

            {/* Zone 2: Desktop Nav Links (Hidden on screens < 1280px to guarantee zero overlap with logo) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 shrink-0" aria-label="Main Navigation">
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

            {/* Zone 3: Desktop Primary Action (Hidden on screens < 1280px) */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
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

            {/* Mobile/Tablet Controls (< 1280px: WhatsApp quick link on tablets + Always visible Hamburger button) */}
            <div className="flex items-center gap-2.5 xl:hidden shrink-0">
              {/* Tablet WhatsApp pill */}
              <a
                href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent(
                  'Hello, I am contacting Zone Tourism × Hotwheels concierge.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#F7F1E7] bg-[#193D38] border border-[#D7BC8A]/30 px-3 py-1.5 rounded hover:border-[#D7BC8A] whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                <span className="text-[#D7BC8A]">WhatsApp</span>
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2.5 rounded-md bg-[#193D38] border border-[#D7BC8A]/40 text-[#D7BC8A] hover:text-[#F7F1E7] hover:border-[#D7BC8A] focus:outline-none focus:ring-1 focus:ring-[#D7BC8A] transition-colors flex items-center justify-center shrink-0 shadow-sm"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7BC8A]" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7BC8A]" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer (Accessible overlay with high contrast and smooth entrance) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-[#102C2B] border-l border-[#D7BC8A]/25 p-6 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            <div className="space-y-6">
              
              {/* Drawer Header with Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D7BC8A]/20">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D7BC8A] font-semibold block">
                    EDITORIAL CONCIERGE
                  </span>
                  <span className="font-serif-editorial text-lg text-[#F7F1E7] font-bold">
                    ZONE × HOTWHEELS
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#F7F1E7]/80 hover:text-[#D7BC8A] rounded-md border border-[#D7BC8A]/20 hover:border-[#D7BC8A]/50 bg-[#193D38] transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-[#D7BC8A]" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  return (
                    <button
                      key={link.page}
                      onClick={() => {
                        onNavigate(link.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left py-3 px-4 text-xs tracking-wider uppercase font-medium transition-all rounded ${
                        isActive
                          ? 'bg-[#193D38] text-[#D7BC8A] font-bold border-l-2 border-[#D7BC8A] shadow-inner'
                          : 'text-[#F7F1E7]/90 hover:text-[#D7BC8A] hover:bg-[#193D38]/60'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}

                {/* Admin Portal Link */}
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-3 px-4 text-xs tracking-wider uppercase font-medium transition-all rounded flex items-center justify-between ${
                    currentPage === 'admin'
                      ? 'bg-[#193D38] text-[#D7BC8A] font-bold border-l-2 border-[#D7BC8A]'
                      : 'text-[#D7BC8A]/80 hover:text-[#D7BC8A] hover:bg-[#193D38]/60'
                  }`}
                >
                  <span>Operations Admin Portal</span>
                  <ShieldCheck className="w-4 h-4 text-[#D7BC8A]" />
                </button>
              </nav>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-[#D7BC8A]/15 space-y-2.5">
                <button
                  onClick={() => {
                    onNavigate('visa-application');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] transition-colors shadow-md"
                >
                  Apply For UAE Visa
                </button>
                <button
                  onClick={() => {
                    onNavigate('car-rental');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#F7F1E7] bg-[#193D38] border border-[#D7BC8A]/40 rounded hover:border-[#D7BC8A] transition-colors"
                >
                  Explore Luxury Fleet
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact Details */}
            <div className="pt-6 mt-6 border-t border-[#D7BC8A]/20 text-xs text-[#F7F1E7]/80 space-y-3">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D7BC8A] shrink-0" />
                <a href={`tel:${CONTACT_DETAILS.landline}`} className="hover:text-white font-mono text-[11px]">
                  {CONTACT_DETAILS.landlineDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent(
                    'Hello, I am contacting Zone Tourism × Hotwheels concierge regarding Dubai visa & luxury car rental arrangements.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-mono text-[11px] text-[#25D366]"
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
