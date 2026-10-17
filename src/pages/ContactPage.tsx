import React, { useState } from 'react';
import { NavigationPage } from '../types';
import { CONTACT_DETAILS } from '../data/mockData';
import { StorageService } from '../services/storage';
import { Phone, Mail, Globe, MessageSquare, Clock, MapPin, CheckCircle, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState<'Visa Services' | 'Car Rental' | 'Chauffeur' | 'General'>('Visa Services');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    StorageService.addAuditLog(
      'CONTACT_INQUIRY',
      name,
      `INQ-${Date.now()}`,
      `Service: ${service}, Email: ${email}, Phone: ${phone}`
    );

    setSubmitted(true);
  };

  return (
    <div className="w-full pt-24 pb-20 bg-[#F7F1E7] text-[#182B27]">
      {/* Header */}
      <section className="bg-[#102C2B] text-[#F7F1E7] py-20 border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              CONCIERGE DESK
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F1E7] leading-tight">
              Connect With Our Team
            </h1>
            <p className="text-sm sm:text-base text-[#F7F1E7]/80 font-light leading-relaxed">
              Direct communication channels for UAE visa applications, luxury self-drive reservations, and executive chauffeur bookings.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#102C2B] font-bold block mb-2">
                  Verified Contact Information
                </span>
                <h2 className="font-serif-editorial text-3xl font-bold text-[#102C2B]">
                  Direct Executive Desks
                </h2>
                <p className="text-xs sm:text-sm text-[#182B27]/70 mt-2 font-light leading-relaxed">
                  Our bilingual concierge officers are available 7 days a week to assist with urgent visas and vehicle logistics.
                </p>
              </div>

              <div className="space-y-4">
                {/* Landline */}
                <div className="p-5 bg-white rounded-lg border border-[#E9E0D1] flex items-start gap-4 shadow-sm">
                  <div className="p-3 bg-[#102C2B] text-[#D7BC8A] rounded">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 block">
                      Direct Landline
                    </span>
                    <a
                      href={`tel:${CONTACT_DETAILS.landline}`}
                      className="text-base font-bold text-[#102C2B] hover:text-[#193D38]"
                    >
                      {CONTACT_DETAILS.landlineDisplay} ({CONTACT_DETAILS.landline})
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Central Dubai Operations Desk</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-5 bg-white rounded-lg border border-[#E9E0D1] flex items-start gap-4 shadow-sm">
                  <div className="p-3 bg-[#25D366] text-white rounded">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 block">
                      WhatsApp Priority Concierge
                    </span>
                    <a
                      href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent('Hello, I am contacting Zone Tourism × Hotwheels concierge regarding Dubai visa & luxury car rental arrangements.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-emerald-800 hover:underline"
                    >
                      {CONTACT_DETAILS.whatsappFormatted}
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">Instant response during operating hours</span>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 bg-white rounded-lg border border-[#E9E0D1] flex items-start gap-4 shadow-sm">
                  <div className="p-3 bg-[#102C2B] text-[#D7BC8A] rounded">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 block">
                      Official Inquiries & Documents
                    </span>
                    <a
                      href={`mailto:${CONTACT_DETAILS.email}`}
                      className="text-base font-bold text-[#102C2B] hover:underline"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">ZONE TOURISM LLC official inbox</span>
                  </div>
                </div>

                {/* Website */}
                <div className="p-5 bg-white rounded-lg border border-[#E9E0D1] flex items-start gap-4 shadow-sm">
                  <div className="p-3 bg-[#102C2B] text-[#D7BC8A] rounded">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 block">
                      Car Rental Portal
                    </span>
                    <a
                      href={CONTACT_DETAILS.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#102C2B] hover:underline"
                    >
                      {CONTACT_DETAILS.website}
                    </a>
                    <span className="text-[11px] text-gray-400 block mt-0.5">HOTWHEELS CAR RENTAL LLC</span>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="p-5 bg-[#102C2B] text-[#F7F1E7] rounded-lg border border-[#D7BC8A]/20 space-y-2">
                <div className="flex items-center gap-2 text-[#D7BC8A]">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs uppercase font-bold tracking-wider">Service Operating Window</span>
                </div>
                <p className="text-xs text-[#F7F1E7]/80">
                  {CONTACT_DETAILS.hours}
                </p>
                <p className="text-[11px] text-[#DCE5DF]/60">
                  Airport meet & greet transfers and vehicle handovers operate 24/7 with confirmed advance reservation.
                </p>
              </div>
            </div>

            {/* Interactive Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg p-8 sm:p-10 border border-[#E9E0D1] shadow-lg">
                <h3 className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                  Send a Detailed Enquiry
                </h3>
                <p className="text-xs text-gray-500 mt-1 mb-6">
                  Our operations team will review and reply with formal quotes or document instructions.
                </p>

                {submitted ? (
                  <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-lg space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-700 mx-auto" />
                    <h4 className="font-serif-editorial text-2xl font-bold text-emerald-950">
                      Message Dispatched Successfully
                    </h4>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto">
                      Thank you, {name}. Your inquiry has been routed to our Dubai operations team. We will respond promptly via email ({email}) or WhatsApp.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setMessage('');
                        }}
                        className="text-xs text-emerald-800 underline font-medium"
                      >
                        Submit another message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                          WhatsApp / Phone
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 000 0000"
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                          Primary Service Interest
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value as any)}
                          className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                        >
                          <option value="Visa Services">ZONE TOURISM — UAE Visa Services</option>
                          <option value="Car Rental">HOTWHEELS — Self-Drive Car Rental</option>
                          <option value="Chauffeur">HOTWHEELS — Executive Chauffeur</option>
                          <option value="General">Corporate / General Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">
                        Detailed Message / Itinerary *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please include relevant travel dates, vehicle models of interest, or visa questions..."
                        className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3.5 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5 text-[#D7BC8A]" />
                        <span>Dispatch Concierge Enquiry</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
