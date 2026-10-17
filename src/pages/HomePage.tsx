import React, { useState } from 'react';
import { NavigationPage, Vehicle, VehicleCategory } from '../types';
import { ASSETS, FAQ_ITEMS, CONTACT_DETAILS } from '../data/mockData';
import { StorageService } from '../services/storage';
import { 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Key, 
  UserCheck, 
  Sparkles,
  Plane,
  Clock,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onRequestChauffeur: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectVehicle,
  onRequestChauffeur,
}) => {
  const [vehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [visaCategories] = useState(() => StorageService.getVisaCategories());
  const [activeFleetCategory, setActiveFleetCategory] = useState<VehicleCategory>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredVehicles = activeFleetCategory === 'All'
    ? vehicles
    : vehicles.filter(v => v.category === activeFleetCategory);

  const categories: VehicleCategory[] = ['All', 'Luxury', 'SUV', 'Sedan', 'MPV', '7-Seater'];

  return (
    <div className="w-full">
      {/* ========================================================
          SECTION B: CINEMATIC HERO (Split Editorial Composition)
         ======================================================== */}
      <section className="relative min-h-[92vh] bg-[#102C2B] text-[#F7F1E7] pt-28 pb-16 lg:py-0 flex items-center overflow-hidden border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[82vh]">
            
            {/* Left Column: Large Editorial Statement & Clear Pathways */}
            <div className="lg:col-span-7 space-y-8 z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#D7BC8A]">
                  <span>Dubai Hospitality & Mobility</span>
                  <span aria-hidden="true">·</span>
                  <span>Two Sovereign Portfolios</span>
                </div>

                <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-normal tracking-tight text-[#F7F1E7] max-w-2xl text-balance">
                  Your Dubai Journey, <br />
                  <span className="italic font-normal text-[#D7BC8A]">Thoughtfully</span> Arranged.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#F7F1E7]/80 font-light leading-relaxed max-w-xl">
                A unified concierge standard bridging official UAE tourist visa documentation by <strong className="text-[#F7F1E7] font-medium">ZONE TOURISM LLC</strong> and peerless prestige fleet rental by <strong className="text-[#D7BC8A] font-medium">HOTWHEELS CAR RENTAL LLC</strong>.
              </p>

              {/* Two Distinct Customer Pathways */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-lg">
                <button
                  onClick={() => onNavigate('visa-application')}
                  className="flex items-center justify-between gap-4 px-6 py-4 bg-[#D7BC8A] text-[#102C2B] font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#c5a872] transition-all group shadow-md"
                >
                  <div className="text-left">
                    <span className="block text-[10px] text-[#102C2B]/70 tracking-widest">ZONE TOURISM</span>
                    <span className="text-xs font-bold">Apply For UAE Visa</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('car-rental')}
                  className="flex items-center justify-between gap-4 px-6 py-4 bg-[#193D38] border border-[#D7BC8A]/40 text-[#F7F1E7] font-semibold text-xs uppercase tracking-wider rounded hover:border-[#D7BC8A] hover:bg-[#102C2B] transition-all group"
                >
                  <div className="text-left">
                    <span className="block text-[10px] text-[#D7BC8A] tracking-widest">HOTWHEELS</span>
                    <span className="text-xs font-bold">Explore The Fleet</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D7BC8A]" />
                </button>
              </div>

              {/* Unboxed Restrained Trust Bar */}
              <div className="pt-4 border-t border-[#D7BC8A]/15 flex flex-wrap items-center gap-6 text-xs text-[#F7F1E7]/60">
                <span>30 & 60-Day Tourist Entry Assistance</span>
                <span aria-hidden="true" className="text-[#D7BC8A]/40">·</span>
                <span>Self-Drive & Chauffeur Logistics</span>
                <span aria-hidden="true" className="text-[#D7BC8A]/40">·</span>
                <span>Licensed UAE Operators</span>
              </div>
            </div>

            {/* Right Column: Hero Visual extending into off-grid prominence */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/11] rounded-lg overflow-hidden border border-[#D7BC8A]/30 shadow-2xl">
                <img
                  src={ASSETS.heroFleet}
                  alt="Luxury vehicle in modern Dubai twilight architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C2B] via-transparent to-transparent opacity-60" />
                
                {/* Subtle caption */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#102C2B]/85 backdrop-blur-md p-3 rounded border border-[#D7BC8A]/25 flex items-center justify-between text-xs text-[#F7F1E7]">
                  <div>
                    <span className="text-[10px] uppercase text-[#D7BC8A] block tracking-widest">Flagship Mobility</span>
                    <span className="font-serif-editorial text-base text-[#F7F1E7]">Hotwheels Executive Fleet</span>
                  </div>
                  <span className="text-xs text-[#D7BC8A] font-mono">DXB Airport Delivery</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C: TWO SERVICE WORLDS (Contrasting Editorial Compositions)
         ======================================================== */}
      <section className="w-full">
        {/* World 1: ZONE TOURISM (Light Warm Ivory Editorial Canvas) */}
        <div className="bg-[#F7F1E7] text-[#182B27] py-20 border-b border-[#E9E0D1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#102C2B]">
                    01. Sovereign Entry
                  </span>
                  <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#102C2B] leading-tight">
                    ZONE TOURISM LLC <br />
                    <span className="italic font-normal text-[#193D38]">UAE Visa Assistance</span>
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#182B27]/80 leading-relaxed font-light">
                  Navigating UAE tourist entry requires meticulous document preparation and adherence to immigration protocols. We provide comprehensive guidance, format auditing, and verified application submission for single-entry 30-day and 60-day tourist visas.
                </p>

                {/* Categories Overview */}
                <div className="space-y-3 pt-2">
                  {visaCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-4 bg-white rounded border border-[#E9E0D1] flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-[#102C2B]">{cat.name}</h4>
                        <p className="text-xs text-[#182B27]/60 mt-0.5">
                          Standard Processing: {cat.processingTimeDays} · {cat.entryType}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">Assistance Fee</span>
                        <span className="font-serif-editorial text-xl font-bold text-[#102C2B]">
                          AED {cat.priceAED}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('visa-application')}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors"
                  >
                    <span>Apply for a UAE Visa</span>
                    <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
                  </button>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#E9E0D1] shadow-xl">
                  <img
                    src={ASSETS.dubaiHospitality}
                    alt="Dubai Hospitality and iconic skyline architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#D7BC8A] block mb-1">
                      Concierge Travel Support
                    </span>
                    <p className="text-sm text-white/90 max-w-lg font-light">
                      From family holidays to international executive visits, entry clearance is verified through official channels before your flight departs.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* World 2: HOTWHEELS CAR RENTAL (Dark Deep Forest & Midnight Automotive Canvas) */}
        <div className="bg-[#193D38] text-[#F7F1E7] py-20 border-b border-[#D7BC8A]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Media */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#D7BC8A]/30 shadow-2xl">
                  <img
                    src={ASSETS.mercedesSClass}
                    alt="Mercedes-Benz S-Class luxury sedan in studio lighting"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102C2B] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs uppercase tracking-widest text-[#D7BC8A] block mb-1">
                      Automotive Refinement
                    </span>
                    <p className="text-sm text-[#F7F1E7]/90 max-w-lg font-light">
                      Flagship sedans, majestic SUVs, and VIP boardroom MPVs meticulously maintained to factory standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#D7BC8A]">
                    02. Prestige Mobility
                  </span>
                  <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F1E7] leading-tight">
                    HOTWHEELS <br />
                    <span className="italic font-normal text-[#D7BC8A]">Car Rental LLC</span>
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#F7F1E7]/80 leading-relaxed font-light">
                  Experience Dubai on your own terms. Whether taking sovereign control behind the wheel of a Range Rover Autobiography or reclining in the rear lounge of a chauffeur-driven Mercedes-Benz S-Class, HOTWHEELS delivers pristine automotive luxury without friction.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="p-3.5 bg-[#102C2B] rounded border border-[#D7BC8A]/20">
                    <Key className="w-4 h-4 text-[#D7BC8A] mb-2" />
                    <h4 className="text-xs font-bold text-[#F7F1E7] uppercase tracking-wider">Self Drive</h4>
                    <p className="text-[11px] text-[#F7F1E7]/70 mt-1">
                      250 km/day included, luxury insurance, seamless airport terminal handover.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#102C2B] rounded border border-[#D7BC8A]/20">
                    <UserCheck className="w-4 h-4 text-[#D7BC8A] mb-2" />
                    <h4 className="text-xs font-bold text-[#F7F1E7] uppercase tracking-wider">Chauffeur</h4>
                    <p className="text-[11px] text-[#F7F1E7]/70 mt-1">
                      Licensed executive chauffeurs, corporate transfers, hourly bespoke charter.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('car-rental')}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors"
                  >
                    <span>Request a Rental</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION D: FLEET EDITORIAL (Interactive Gallery & Specs)
         ======================================================== */}
      <section className="py-24 bg-[#102C2B] text-[#F7F1E7] border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#D7BC8A]/15 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block mb-2">
                Curated Automotive Catalog
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F1E7]">
                The Hotwheels Fleet
              </h2>
            </div>

            {/* Filter Tabs (Interactive Filter Controls) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#193D38] rounded-md border border-[#D7BC8A]/25 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFleetCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    activeFleetCategory === cat
                      ? 'bg-[#D7BC8A] text-[#102C2B] font-bold shadow-sm'
                      : 'text-[#F7F1E7]/70 hover:text-[#F7F1E7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-[#193D38] rounded-lg overflow-hidden border border-[#D7BC8A]/20 hover:border-[#D7BC8A]/60 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#102C2B]/90 backdrop-blur-sm border border-[#D7BC8A]/30 px-2.5 py-1 rounded text-[11px] text-[#D7BC8A] font-medium">
                      {vehicle.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#102C2B]/90 backdrop-blur-sm border border-[#D7BC8A]/30 px-2.5 py-1 rounded text-[11px] text-[#F7F1E7]">
                      {vehicle.modelYear}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif-editorial text-2xl font-bold text-[#F7F1E7] group-hover:text-[#D7BC8A] transition-colors">
                        {vehicle.name}
                      </h3>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#E9E0D1]/70 mt-1">
                        <span>{vehicle.engine}</span>
                        <span aria-hidden="true">·</span>
                        <span>{vehicle.horsepower} HP</span>
                        <span aria-hidden="true">·</span>
                        <span>0–100 in {vehicle.acceleration0to100}</span>
                      </div>
                    </div>

                    {/* Modes Available */}
                    <div className="text-xs text-[#DCE5DF]/80">
                      Modes: <strong className="text-[#D7BC8A]">{vehicle.modes.join(' & ')}</strong>
                    </div>

                    {/* Rates */}
                    <div className="pt-2 border-t border-[#D7BC8A]/15 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-gray-400 block">Daily Rental</span>
                        <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                          AED {vehicle.dailyRateAED}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 block">Weekly Package</span>
                        <span className="text-sm font-semibold text-[#F7F1E7]">
                          AED {vehicle.weeklyRateAED}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectVehicle(vehicle)}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F1E7] bg-[#102C2B] border border-[#D7BC8A]/40 rounded hover:border-[#D7BC8A] transition-colors"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onSelectVehicle(vehicle)}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('car-rental')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7BC8A] hover:text-white transition-colors border-b border-[#D7BC8A] pb-1"
            >
              <span>Explore Complete 2026 Dubai Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION E: CHAUFFEUR EXPERIENCE (Editorial Travel Magazine)
         ======================================================== */}
      <section className="py-24 bg-[#F7F1E7] text-[#182B27] border-b border-[#E9E0D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#102C2B] font-semibold block">
                Executive Chauffeur Logistics
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#102C2B] leading-tight">
                Discreet, Sovereign Transit Across The Emirates.
              </h2>
              <p className="text-sm sm:text-base text-[#182B27]/80 leading-relaxed font-light">
                Tailored for diplomatic delegations, corporate summits, private aviation arrivals, and high-net-worth families. Our professional uniformed chauffeurs possess comprehensive command of Dubai&apos;s routes and VIP hospitality protocols.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-white rounded border border-[#E9E0D1] flex items-start gap-3">
                  <Plane className="w-5 h-5 text-[#102C2B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase font-bold text-[#102C2B] tracking-wider">
                      DXB & DWC Airport Meet & Greet
                    </h4>
                    <p className="text-xs text-[#182B27]/70 mt-1">
                      Direct terminal arrival greetings with personalized name-board and luggage escort directly to your luxury vehicle.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded border border-[#E9E0D1] flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#102C2B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase font-bold text-[#102C2B] tracking-wider">
                      Bespoke Hourly & Daily Charter
                    </h4>
                    <p className="text-xs text-[#182B27]/70 mt-1">
                      Dedicated chauffeur on standby for board meetings, property inspections, dinner appointments, or intercity transfers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onRequestChauffeur}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors"
                >
                  <span>Request Chauffeur Service</span>
                  <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/11] rounded-lg overflow-hidden border border-[#E9E0D1] shadow-2xl">
                <img
                  src={ASSETS.mercedesVClass}
                  alt="Mercedes-Benz V-Class luxury VIP chauffeur"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#D7BC8A] block">
                    Featured VIP Chauffeur Model
                  </span>
                  <p className="font-serif-editorial text-2xl font-bold">
                    Mercedes-Benz V-Class VIP Edition
                  </p>
                  <p className="text-xs text-white/80 mt-1 font-light">
                    7 Executive Recliners · Conference Table · Sound Isolation
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION F: VISA APPLICATION JOURNEY (5 Real Stages)
         ======================================================== */}
      <section className="py-24 bg-[#102C2B] text-[#F7F1E7] border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 pb-16">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              Official Application Workflow
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F1E7]">
              The UAE Visa Application Journey
            </h2>
            <p className="text-sm sm:text-base text-[#F7F1E7]/70 font-light leading-relaxed">
              Transparent, stage-by-stage document processing without misleading approval guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                num: '01',
                title: 'Select Category',
                desc: 'Choose between 30-day or 60-day single-entry tourist visas based on your travel itinerary.'
              },
              {
                num: '02',
                title: 'Complete Details',
                desc: 'Enter applicant legal passport data, arrival dates, and UAE accommodation address.'
              },
              {
                num: '03',
                title: 'Upload Documents',
                desc: 'Upload clear scans of your passport bio-page and portrait photograph with verified specs.'
              },
              {
                num: '04',
                title: 'Review & Submit',
                desc: 'Our visa officers review formatting compliance before routing to UAE immigration systems.'
              },
              {
                num: '05',
                title: 'Track Reference',
                desc: 'Receive your unique ZT-XXXXXX reference, official dossier summary, and direct WhatsApp updates.'
              }
            ].map((step) => (
              <div
                key={step.num}
                className="p-6 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif-editorial text-3xl text-[#D7BC8A] font-light block">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-[#F7F1E7] uppercase tracking-wider mt-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#E9E0D1]/70 leading-relaxed font-light mt-2">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('visa-application')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Your Visa Application Online</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION G: BRAND STORY (Restrained Editorial Story)
         ======================================================== */}
      <section className="py-24 bg-[#F7F1E7] text-[#182B27] border-b border-[#E9E0D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#102C2B] font-semibold block">
                Operational Foundation
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#102C2B] leading-tight">
                Two Distinct Entities. <br />
                <span className="italic font-normal text-[#193D38]">One Unified Standard of Precision.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#182B27]/80 leading-relaxed font-light">
                ZONE TOURISM LLC and HOTWHEELS CAR RENTAL LLC operate under separate commercial licenses in Dubai, each focused on its dedicated operational domain:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 bg-white rounded border border-[#E9E0D1] space-y-2">
                  <h4 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
                    ZONE TOURISM LLC
                  </h4>
                  <p className="text-xs text-[#182B27]/70 leading-relaxed">
                    Licensed tourism company providing UAE inbound visa coordination, document auditing, and bespoke hospitality services.
                  </p>
                </div>

                <div className="p-5 bg-white rounded border border-[#E9E0D1] space-y-2">
                  <h4 className="font-serif-editorial text-xl font-bold text-[#102C2B]">
                    HOTWHEELS CAR RENTAL LLC
                  </h4>
                  <p className="text-xs text-[#182B27]/70 leading-relaxed">
                    Registered luxury vehicle rental enterprise offering pristine self-drive fleets and executive chauffeur-driven transport in Dubai.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#102C2B] hover:text-[#193D38] border-b border-[#102C2B] pb-1 transition-colors"
                >
                  <span>Read Detailed Company Background</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 bg-[#102C2B] text-[#F7F1E7] rounded-lg border border-[#D7BC8A]/25 space-y-6">
                <h4 className="font-serif-editorial text-2xl text-[#D7BC8A] font-semibold">
                  Verified Contact Concierge
                </h4>
                <div className="space-y-4 text-xs text-[#F7F1E7]/80">
                  <div>
                    <span className="text-[#D7BC8A] block font-mono">LANDLINE DESK</span>
                    <a href={`tel:${CONTACT_DETAILS.landline}`} className="text-sm font-bold text-white hover:text-[#D7BC8A]">
                      {CONTACT_DETAILS.landlineDisplay}
                    </a>
                  </div>

                  <div>
                    <span className="text-[#D7BC8A] block font-mono">WHATSAPP DIRECT</span>
                    <a href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-[#D7BC8A]">
                      {CONTACT_DETAILS.whatsappFormatted}
                    </a>
                  </div>

                  <div>
                    <span className="text-[#D7BC8A] block font-mono">OFFICIAL INQUIRY EMAIL</span>
                    <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-sm font-bold text-white hover:text-[#D7BC8A]">
                      {CONTACT_DETAILS.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[#D7BC8A] block font-mono">CAR RENTAL PORTAL</span>
                    <a href={CONTACT_DETAILS.website} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#D7BC8A] hover:underline">
                      {CONTACT_DETAILS.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION H: FAQ (Verified Common Inquiries)
         ======================================================== */}
      <section className="py-24 bg-[#193D38] text-[#F7F1E7] border-b border-[#D7BC8A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 pb-12">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              Clear & Factual Guidance
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F1E7]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#102C2B] rounded-lg border border-[#D7BC8A]/20 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif-editorial text-lg sm:text-xl font-medium text-[#F7F1E7]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#D7BC8A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#D7BC8A]/70 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#E9E0D1]/80 leading-relaxed font-light border-t border-[#D7BC8A]/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION I: CLOSING CTA (Midnight Luxe Choice)
         ======================================================== */}
      <section className="py-24 bg-[#102C2B] text-[#F7F1E7] text-center border-b border-[#D7BC8A]/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
            Begin Your Dubai Journey
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F1E7] leading-tight text-balance">
            Allow us to coordinate your visa and automotive requirements with sovereign precision.
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('visa-application')}
              className="w-full sm:w-auto px-8 py-4 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors shadow-lg"
            >
              Apply for a UAE Visa
            </button>

            <button
              onClick={() => onNavigate('car-rental')}
              className="w-full sm:w-auto px-8 py-4 bg-[#193D38] border border-[#D7BC8A]/40 text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:border-[#D7BC8A] transition-colors"
            >
              Explore the Fleet
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:border-white transition-colors"
            >
              Contact Concierge Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
