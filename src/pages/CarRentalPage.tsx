import React, { useState, useMemo } from 'react';
import { NavigationPage, Vehicle, VehicleCategory, RentalMode } from '../types';
import { StorageService } from '../services/storage';
import { CONTACT_DETAILS } from '../data/mockData';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  Calendar, 
  Key, 
  UserCheck, 
  Sparkles,
  Info
} from 'lucide-react';

interface CarRentalPageProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectVehicleForSpecs: (vehicle: Vehicle) => void;
  onSelectVehicleForBooking: (vehicle: Vehicle, mode: 'Self Drive' | 'Chauffeur Driven') => void;
}

export const CarRentalPage: React.FC<CarRentalPageProps> = ({
  onNavigate,
  onSelectVehicleForSpecs,
  onSelectVehicleForBooking,
}) => {
  const [vehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory>('All');
  const [selectedMode, setSelectedMode] = useState<'All' | 'Self Drive' | 'Chauffeur Driven'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'power'>('price-asc');

  const categories: VehicleCategory[] = ['All', 'Luxury', 'SUV', 'Sedan', 'MPV', '7-Seater'];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
        if (selectedMode !== 'All' && !v.modes.includes(selectedMode)) return false;
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = v.name.toLowerCase().includes(query);
          const matchBrand = v.brand.toLowerCase().includes(query);
          if (!matchName && !matchBrand) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.dailyRateAED - b.dailyRateAED;
        if (sortBy === 'price-desc') return b.dailyRateAED - a.dailyRateAED;
        if (sortBy === 'power') return b.horsepower - a.horsepower;
        return 0;
      });
  }, [vehicles, selectedCategory, selectedMode, searchQuery, sortBy]);

  return (
    <div className="w-full pt-24 pb-20 bg-[#102C2B] text-[#F7F1E7]">
      {/* Editorial Header */}
      <section className="py-16 border-b border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              HOTWHEELS CAR RENTAL LLC · DUBAI
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#F7F1E7] leading-tight">
              Prestige Automotive Fleet
            </h1>
            <p className="text-sm sm:text-base text-[#F7F1E7]/80 font-light leading-relaxed">
              Sovereign luxury motoring across the United Arab Emirates. Experience immaculate self-drive rentals and discreet executive chauffeur services with verified Dubai airport delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="bg-[#193D38] py-6 border-b border-[#D7BC8A]/15 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#D7BC8A] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by model (e.g. Mercedes, Range Rover, V-Class)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded pl-9 pr-4 py-2 text-xs text-[#F7F1E7] placeholder-[#F7F1E7]/40 focus:border-[#D7BC8A] focus:outline-none"
              />
            </div>

            {/* Mode Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#D7BC8A] uppercase font-semibold hidden lg:inline">Rental Mode:</span>
              <div className="flex items-center p-1 bg-[#102C2B] rounded border border-[#D7BC8A]/20">
                {(['All', 'Self Drive', 'Chauffeur Driven'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
                      selectedMode === mode
                        ? 'bg-[#D7BC8A] text-[#102C2B] font-bold'
                        : 'text-[#F7F1E7]/70 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#D7BC8A] uppercase font-semibold hidden lg:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="power">Highest Horsepower</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1">
            <span className="text-xs uppercase font-semibold text-[#D7BC8A] mr-2 shrink-0">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 text-xs rounded transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#D7BC8A] text-[#102C2B] font-bold shadow-sm'
                    : 'bg-[#102C2B]/80 text-[#F7F1E7]/70 hover:text-white hover:bg-[#102C2B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredVehicles.length === 0 ? (
            <div className="p-12 text-center bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-4">
              <Info className="w-8 h-8 text-[#D7BC8A] mx-auto" />
              <h3 className="font-serif-editorial text-2xl font-bold text-white">No vehicles match your search</h3>
              <p className="text-xs text-gray-300">Try adjusting your filters or search keywords.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedMode('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold rounded hover:bg-[#c5a872]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-[#193D38] rounded-lg overflow-hidden border border-[#D7BC8A]/20 hover:border-[#D7BC8A]/60 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Visual */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#102C2B]/90 backdrop-blur-sm border border-[#D7BC8A]/30 px-2.5 py-1 rounded text-[11px] text-[#D7BC8A] font-medium">
                        {vehicle.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#102C2B]/90 backdrop-blur-sm border border-[#D7BC8A]/30 px-2.5 py-1 rounded text-[11px] text-white">
                        {vehicle.modelYear}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-serif-editorial text-2xl font-bold text-[#F7F1E7] group-hover:text-[#D7BC8A] transition-colors">
                          {vehicle.name}
                        </h3>
                        {/* Unboxed specs */}
                        <div className="flex items-center gap-2 text-xs text-[#E9E0D1]/70 mt-1">
                          <span>{vehicle.engine}</span>
                          <span aria-hidden="true">·</span>
                          <span>{vehicle.horsepower} HP</span>
                          <span aria-hidden="true">·</span>
                          <span>{vehicle.seats} Seats</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#102C2B] rounded border border-[#D7BC8A]/15 text-xs text-[#E9E0D1]/80 space-y-1">
                        <div className="flex justify-between">
                          <span>Deposit: <strong>AED {vehicle.securityDepositAED}</strong></span>
                          <span>Daily Km: <strong>{vehicle.freeDailyKm} km</strong></span>
                        </div>
                        <div className="text-[11px] text-[#D7BC8A]">
                          Modes: {vehicle.modes.join(' & ')}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#D7BC8A]/15 flex items-baseline justify-between">
                        <div>
                          <span className="text-[11px] text-gray-400 block">Daily Rate</span>
                          <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                            AED {vehicle.dailyRateAED}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-gray-400 block">Weekly Package</span>
                          <span className="text-sm font-semibold text-white">
                            AED {vehicle.weeklyRateAED}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onSelectVehicleForSpecs(vehicle)}
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F1E7] bg-[#102C2B] border border-[#D7BC8A]/40 rounded hover:border-[#D7BC8A] transition-colors"
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => onSelectVehicleForBooking(vehicle, 'Self Drive')}
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] transition-colors"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Verified UAE Rental Policy & Guidelines */}
      <section className="py-16 bg-[#193D38] border-t border-[#D7BC8A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
              Operational Standards
            </span>
            <h2 className="font-serif-editorial text-3xl font-bold text-[#F7F1E7]">
              HOTWHEELS Rental Requirements & Inclusions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs text-[#E9E0D1]/80 leading-relaxed">
              <div className="p-4 bg-[#102C2B] rounded border border-[#D7BC8A]/20 space-y-2">
                <h4 className="text-sm font-bold text-[#D7BC8A]">Driver License Protocol</h4>
                <p>
                  <strong>UAE Residents:</strong> Valid UAE Driving License (minimum 1 year held for luxury vehicles).<br />
                  <strong>Tourists / Visitors:</strong> Passport with UAE entry stamp, home country license, and valid International Driving Permit (IDP). Visitors holding GCC, US, UK, EU, or Canadian licenses can drive directly on their original permit without an IDP.
                </p>
              </div>

              <div className="p-4 bg-[#102C2B] rounded border border-[#D7BC8A]/20 space-y-2">
                <h4 className="text-sm font-bold text-[#D7BC8A]">Security Deposit & Tolls</h4>
                <p>
                  A refundable security deposit (AED 2,500 – AED 4,000 depending on category) is blocked on credit card during handover. The release occurs automatically within 21–28 working days following vehicle return to settle official Dubai Police traffic fines and Salik toll crossings (AED 5 per toll).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
