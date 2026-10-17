import React from 'react';
import { Vehicle } from '../../types';
import { X, Check, Gauge, Fuel, Shield, Users, Briefcase, Zap, Key } from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onBookNow: (vehicle: Vehicle, mode: 'Self Drive' | 'Chauffeur Driven') => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onBookNow,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#102C2B] text-[#F7F1E7] rounded-lg shadow-2xl border border-[#D7BC8A]/30 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#193D38] px-6 py-4 flex items-center justify-between border-b border-[#D7BC8A]/20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold">
              {vehicle.brand} · {vehicle.category}
            </span>
            <h3 className="font-serif-editorial text-2xl font-bold text-[#F7F1E7]">
              {vehicle.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#F7F1E7]/70 hover:text-white p-1 rounded"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Visual */}
          <div className="relative aspect-video rounded overflow-hidden border border-[#D7BC8A]/20 bg-black/40">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-[#102C2B]/90 backdrop-blur-sm border border-[#D7BC8A]/30 px-3.5 py-1.5 rounded text-xs text-[#D7BC8A] font-semibold">
              Chassis Year: {vehicle.modelYear} · Immaculate Condition
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#193D38]/80 rounded border border-[#D7BC8A]/20 text-xs">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#D7BC8A]" />
              <div>
                <span className="text-[#E9E0D1]/60 block">Power</span>
                <span className="font-bold text-[#F7F1E7]">{vehicle.horsepower} HP</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Gauge className="w-5 h-5 text-[#D7BC8A]" />
              <div>
                <span className="text-[#E9E0D1]/60 block">0–100 km/h</span>
                <span className="font-bold text-[#F7F1E7]">{vehicle.acceleration0to100}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#D7BC8A]" />
              <div>
                <span className="text-[#E9E0D1]/60 block">Seating</span>
                <span className="font-bold text-[#F7F1E7]">{vehicle.seats} Passengers</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#D7BC8A]" />
              <div>
                <span className="text-[#E9E0D1]/60 block">Luggage</span>
                <span className="font-bold text-[#F7F1E7]">{vehicle.luggageCount} Large Cases</span>
              </div>
            </div>
          </div>

          {/* Pricing & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#193D38]/50 rounded border border-[#D7BC8A]/15 text-center">
              <span className="text-xs text-[#E9E0D1]/70 block">Daily Rental</span>
              <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                AED {vehicle.dailyRateAED}
              </span>
              <span className="text-[11px] text-[#E9E0D1]/60 block mt-1">Includes 250 km / day</span>
            </div>

            <div className="p-4 bg-[#193D38]/50 rounded border border-[#D7BC8A]/15 text-center">
              <span className="text-xs text-[#E9E0D1]/70 block">Weekly Package</span>
              <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                AED {vehicle.weeklyRateAED}
              </span>
              <span className="text-[11px] text-[#E9E0D1]/60 block mt-1">AED {(vehicle.weeklyRateAED / 7).toFixed(0)} / day equivalent</span>
            </div>

            <div className="p-4 bg-[#193D38]/50 rounded border border-[#D7BC8A]/15 text-center">
              <span className="text-xs text-[#E9E0D1]/70 block">Security Deposit</span>
              <span className="font-serif-editorial text-2xl font-bold text-[#F7F1E7]">
                AED {vehicle.securityDepositAED}
              </span>
              <span className="text-[11px] text-emerald-400 block mt-1">100% Refundable pre-auth</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold">
              Bespoke Vehicle Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F7F1E7]/90">
              {vehicle.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D7BC8A] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Inclusions */}
          <div className="p-4 bg-[#193D38]/40 rounded border border-[#D7BC8A]/15 space-y-2 text-xs text-[#E9E0D1]/80">
            <div className="flex items-center gap-2 text-[#D7BC8A] font-medium">
              <Shield className="w-4 h-4" />
              <span>Rental Inclusions & Sovereign Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              • Comprehensive insurance with zero deductible option available.<br />
              • Complimentary delivery to Dubai International Airport (DXB) or luxury hotels.<br />
              • 24/7 Roadside Assistance anywhere across the United Arab Emirates.<br />
              • Salik (toll gate) automated tracking at standard statutory AED 5 per crossing.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#D7BC8A]/20">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs text-[#F7F1E7]/70 hover:text-white"
            >
              Back to Catalog
            </button>

            {vehicle.modes.includes('Chauffeur Driven') && (
              <button
                onClick={() => {
                  onClose();
                  onBookNow(vehicle, 'Chauffeur Driven');
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F1E7] bg-[#193D38] border border-[#D7BC8A] rounded hover:bg-[#102C2B] transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Chauffeur Driven</span>
              </button>
            )}

            {vehicle.modes.includes('Self Drive') && (
              <button
                onClick={() => {
                  onClose();
                  onBookNow(vehicle, 'Self Drive');
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] transition-colors flex items-center justify-center gap-2"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Reserve Self Drive</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
