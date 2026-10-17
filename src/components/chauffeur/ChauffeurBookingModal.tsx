import React, { useState } from 'react';
import { ChauffeurEnquiry } from '../../types';
import { StorageService, generateReference } from '../../services/storage';
import { X, Calendar, Clock, MapPin, Users, Briefcase, Plane, AlertCircle, Sparkles } from 'lucide-react';

interface ChauffeurBookingModalProps {
  onClose: () => void;
  onSuccess: (enquiry: ChauffeurEnquiry) => void;
  initialService?: ChauffeurEnquiry['serviceType'];
}

export const ChauffeurBookingModal: React.FC<ChauffeurBookingModalProps> = ({
  onClose,
  onSuccess,
  initialService = 'Airport Transfer',
}) => {
  const [serviceType, setServiceType] = useState<ChauffeurEnquiry['serviceType']>(initialService);
  const [preferredVehicle, setPreferredVehicle] = useState<string>('Mercedes-Benz V-Class VIP Edition');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState<string>(formatDate(tomorrow));
  const [pickupTime, setPickupTime] = useState<string>('10:00');
  const [pickupLocation, setPickupLocation] = useState<string>('Dubai International Airport (DXB) Terminal 3');
  const [destinationLocation, setDestinationLocation] = useState<string>('Atlantis The Royal, Palm Jumeirah');
  const [hoursRequired, setHoursRequired] = useState<number>(5);
  const [passengers, setPassengers] = useState<number>(3);
  const [luggageCount, setLuggageCount] = useState<number>(4);

  const [fullName, setFullName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [flightNumber, setFlightNumber] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const estimatedCost = serviceType === 'Airport Transfer' 
    ? 650 
    : serviceType === 'Intercity Transfer' 
      ? 1100 
      : hoursRequired * 250;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please specify your legal name for the chauffeur reservation.');
      return;
    }
    if (!contactNumber.trim() || contactNumber.length < 7) {
      setErrorMsg('Please provide a valid contact phone or WhatsApp number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!pickupDate || !pickupTime || !pickupLocation.trim()) {
      setErrorMsg('Pickup date, time, and address are mandatory.');
      return;
    }

    setIsSubmitting(true);
    const ref = generateReference('CH');

    const enquiry: ChauffeurEnquiry = {
      id: `ch-${Date.now()}`,
      referenceNumber: ref,
      serviceType,
      preferredVehicle,
      pickupDate,
      pickupTime,
      pickupLocation: pickupLocation.trim(),
      destinationLocation: destinationLocation.trim(),
      hoursRequired: serviceType === 'Hourly Charter' ? hoursRequired : undefined,
      passengers,
      luggageCount,
      customer: {
        fullName: fullName.trim(),
        contactNumber: contactNumber.trim(),
        email: email.trim(),
        companyName: companyName.trim() || undefined,
      },
      flightNumber: flightNumber.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      status: 'New',
      estimatedCostAED: estimatedCost,
      submittedAt: new Date().toISOString(),
      internalNotes: `Chauffeur reservation web request. Service: ${serviceType}, Vehicle: ${preferredVehicle}.`
    };

    setTimeout(() => {
      StorageService.saveChauffeurEnquiry(enquiry);
      setIsSubmitting(false);
      onSuccess(enquiry);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#102C2B] text-[#F7F1E7] rounded-lg shadow-2xl border border-[#D7BC8A]/30 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#193D38] px-6 py-4 flex items-center justify-between border-b border-[#D7BC8A]/20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold">
              HOTWHEELS CHAUFFEUR LOGISTICS · DUBAI
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#F7F1E7]">
              Executive Chauffeur Service Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#F7F1E7]/70 hover:text-white p-1 rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded flex items-start gap-2 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Service Type Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D7BC8A] mb-2 font-medium">
              Select Chauffeur Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Airport Transfer', 'Hourly Charter', 'Corporate Delegation', 'Intercity Transfer'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setServiceType(type)}
                  className={`py-2 px-3 text-xs font-semibold rounded border transition-all text-center ${
                    serviceType === type
                      ? 'border-[#D7BC8A] bg-[#193D38] text-[#D7BC8A]'
                      : 'border-[#D7BC8A]/20 bg-[#102C2B] text-[#F7F1E7]/70 hover:border-[#D7BC8A]/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D7BC8A] mb-1 font-medium">
              Preferred Chauffeur Vehicle
            </label>
            <select
              value={preferredVehicle}
              onChange={(e) => setPreferredVehicle(e.target.value)}
              className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
            >
              <option value="Mercedes-Benz V-Class VIP Edition">Mercedes-Benz V-Class VIP Edition (Up to 7 Guests)</option>
              <option value="Mercedes-Benz S 500 4MATIC">Mercedes-Benz S 500 4MATIC (Executive Sedan)</option>
              <option value="Range Rover Autobiography P530">Range Rover Autobiography P530 (VIP Luxury SUV)</option>
              <option value="Cadillac Escalade Sport 6.2L">Cadillac Escalade Sport 6.2L (Spacious 7-Seater)</option>
              <option value="BMW 740i M-Sport">BMW 740i M-Sport (Flagship Sedan)</option>
            </select>
          </div>

          {/* Schedule */}
          <div className="p-4 bg-[#193D38]/60 rounded border border-[#D7BC8A]/20 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#D7BC8A] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Chauffeur Mission Itinerary</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={formatDate(today)}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Pickup Time *
                </label>
                <input
                  type="time"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Pickup Location / Airport Terminal *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DXB Terminal 3, Armani Hotel Dubai..."
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Destination / Drop-off *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emirates Palace Abu Dhabi, Palm Jumeirah..."
                  value={destinationLocation}
                  onChange={(e) => setDestinationLocation(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>
            </div>

            {serviceType === 'Hourly Charter' && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Charter Duration ({hoursRequired} Hours)
                </label>
                <input
                  type="range"
                  min={3}
                  max={14}
                  value={hoursRequired}
                  onChange={(e) => setHoursRequired(parseInt(e.target.value))}
                  className="w-full accent-[#D7BC8A]"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>3 Hours (Min)</span>
                  <span>8 Hours (Business Day)</span>
                  <span>14 Hours (Extended)</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Passengers
                </label>
                <input
                  type="number"
                  min={1}
                  max={7}
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Luggage Bags
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={luggageCount}
                  onChange={(e) => setLuggageCount(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Flight # (Airport)
                </label>
                <input
                  type="text"
                  placeholder="e.g. EK 008"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Guest Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                Guest / Client Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Lord / Lady / Dr / Mr..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+971 55 123 4567"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="chauffeur@vip-delegation.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                Company / Delegation Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Private Office / Corporation"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
              Chauffeur Instructions or Name-Board Details
            </label>
            <textarea
              rows={2}
              placeholder="e.g. VIP terminal meet and greet, quiet cabin preference, mineral water requirements..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none resize-none"
            />
          </div>

          {/* Price Preview */}
          <div className="p-4 bg-[#193D38] rounded border border-[#D7BC8A]/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#D7BC8A] font-semibold block">
                Chauffeur Package: {serviceType}
              </span>
              <span className="text-[11px] text-[#E9E0D1]/70">
                Includes private licensed chauffeur, fuel, Salik toll fees & bottled water.
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#E9E0D1] block">Estimated Rate:</span>
              <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                AED {estimatedCost.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs text-[#F7F1E7]/70 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] disabled:opacity-50 transition-all shadow-md"
            >
              {isSubmitting ? (
                <span>Confirming Request...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Chauffeur Enquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
