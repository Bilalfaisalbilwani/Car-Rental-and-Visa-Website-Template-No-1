import React, { useState, useMemo } from 'react';
import { Vehicle, RentalEnquiry } from '../../types';
import { StorageService, generateReference } from '../../services/storage';
import { X, Calendar, Clock, MapPin, User, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface VehicleBookingModalProps {
  vehicle: Vehicle;
  initialMode?: 'Self Drive' | 'Chauffeur Driven';
  onClose: () => void;
  onSuccess: (enquiry: RentalEnquiry) => void;
}

export const VehicleBookingModal: React.FC<VehicleBookingModalProps> = ({
  vehicle,
  initialMode = 'Self Drive',
  onClose,
  onSuccess,
}) => {
  const [rentalMode, setRentalMode] = useState<'Self Drive' | 'Chauffeur Driven'>(
    vehicle.modes.includes(initialMode) ? initialMode : vehicle.modes[0] as 'Self Drive' | 'Chauffeur Driven'
  );

  // Default dates: tomorrow 10:00 to 4 days later 10:00
  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const defaultReturn = new Date(defaultPickup);
  defaultReturn.setDate(defaultPickup.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState<string>(formatDate(defaultPickup));
  const [pickupTime, setPickupTime] = useState<string>('11:00');
  const [returnDate, setReturnDate] = useState<string>(formatDate(defaultReturn));
  const [returnTime, setReturnTime] = useState<string>('18:00');
  const [pickupLocation, setPickupLocation] = useState<string>('Dubai International Airport (DXB) Terminal 3');
  const [returnLocation, setReturnLocation] = useState<string>('Dubai International Airport (DXB) Terminal 3');

  const [fullName, setFullName] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [nationality, setNationality] = useState<string>('UAE Resident / Tourist');
  const [driverAge, setDriverAge] = useState<number>(Math.max(25, vehicle.minimumAge));
  const [hasValidLicense, setHasValidLicense] = useState<boolean>(true);
  const [additionalRequirements, setAdditionalRequirements] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculate rental duration in days
  const { totalDays, estimatedTotalAED } = useMemo(() => {
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      return { totalDays: 0, estimatedTotalAED: 0 };
    }
    const start = new Date(`${pickupDate}T${pickupTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);
    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) {
      return { totalDays: 0, estimatedTotalAED: 0 };
    }
    // Calculate 24-hr periods with 2-hr grace period
    const diffHours = diffMs / (1000 * 60 * 60);
    const days = Math.max(1, Math.ceil((diffHours - 2) / 24));
    
    // Check if weekly rate applies
    let total = 0;
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      total = weeks * vehicle.weeklyRateAED + remainingDays * vehicle.dailyRateAED;
    } else {
      total = days * vehicle.dailyRateAED;
    }

    // If chauffeur mode, add chauffeur premium
    if (rentalMode === 'Chauffeur Driven') {
      total += days * 450; // AED 450/day standard professional chauffeur allowance (10 hrs/day)
    }

    return { totalDays: days, estimatedTotalAED: total };
  }, [pickupDate, returnDate, pickupTime, returnTime, vehicle, rentalMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }
    if (!contactNumber.trim() || contactNumber.length < 7) {
      setErrorMsg('Please enter a valid contact phone or WhatsApp number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address for reservation confirmation.');
      return;
    }
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      setErrorMsg('Pickup date, pickup time, return date, and return time are all mandatory.');
      return;
    }

    const start = new Date(`${pickupDate}T${pickupTime}`);
    const end = new Date(`${returnDate}T${returnTime}`);
    if (end <= start) {
      setErrorMsg('Return date and time must follow the scheduled pickup date and time.');
      return;
    }

    if (rentalMode === 'Self Drive') {
      if (driverAge < vehicle.minimumAge) {
        setErrorMsg(`The minimum driving age for this ${vehicle.name} is ${vehicle.minimumAge} years.`);
        return;
      }
      if (!hasValidLicense) {
        setErrorMsg('Self-drive rental requires a valid UAE driving license or International Driving Permit.');
        return;
      }
    }

    setIsSubmitting(true);

    const ref = generateReference('HW');
    const newEnquiry: RentalEnquiry = {
      id: `rent-${Date.now()}`,
      referenceNumber: ref,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      rentalMode,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLocation,
      returnLocation,
      totalDays,
      estimatedTotalAED,
      securityDepositAED: vehicle.securityDepositAED,
      customer: {
        fullName: fullName.trim(),
        contactNumber: contactNumber.trim(),
        email: email.trim(),
        nationality,
        driverAge,
        hasValidLicense,
      },
      additionalRequirements: additionalRequirements.trim(),
      status: 'New',
      paymentStatus: 'Unpaid',
      submittedAt: new Date().toISOString(),
      internalNotes: `Web reservation submission. Estimated rental: AED ${estimatedTotalAED}. Deposit: AED ${vehicle.securityDepositAED}.`
    };

    setTimeout(() => {
      StorageService.saveRentalEnquiry(newEnquiry);
      setIsSubmitting(false);
      onSuccess(newEnquiry);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#102C2B] text-[#F7F1E7] rounded-lg shadow-2xl border border-[#D7BC8A]/30 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#193D38] px-6 py-4 flex items-center justify-between border-b border-[#D7BC8A]/20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold">
              HOTWHEELS CAR RENTAL LLC · DUBAI
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#F7F1E7]">
              Reserve {vehicle.name}
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

        {/* Vehicle Highlights Bar */}
        <div className="px-6 py-3 bg-[#102C2B] border-b border-[#D7BC8A]/15 flex flex-wrap items-center justify-between text-xs text-[#E9E0D1] gap-2">
          <div className="flex items-center gap-3">
            <span>Daily: <strong className="text-[#D7BC8A]">AED {vehicle.dailyRateAED}</strong></span>
            <span>·</span>
            <span>Weekly: <strong className="text-[#D7BC8A]">AED {vehicle.weeklyRateAED}</strong></span>
            <span>·</span>
            <span>Deposit: <strong className="text-[#D7BC8A]">AED {vehicle.securityDepositAED}</strong></span>
          </div>
          <div className="text-[11px] text-[#DCE5DF]">
            Includes 250 km/day · Comprehensive UAE Insurance
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded flex items-start gap-2 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mode Selection */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D7BC8A] mb-2 font-medium">
              Select Rental Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRentalMode('Self Drive')}
                disabled={!vehicle.modes.includes('Self Drive')}
                className={`p-3 text-xs font-semibold rounded border transition-all text-left ${
                  rentalMode === 'Self Drive'
                    ? 'border-[#D7BC8A] bg-[#193D38] text-[#F7F1E7] ring-1 ring-[#D7BC8A]'
                    : 'border-[#D7BC8A]/20 bg-[#102C2B] text-[#F7F1E7]/70 hover:border-[#D7BC8A]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Self Drive</span>
                  <span className="text-[10px] text-[#D7BC8A]">Standard</span>
                </div>
                <p className="text-[11px] text-[#E9E0D1]/70 font-normal mt-1">
                  Enjoy sovereign driving with 250 km daily allowance included.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRentalMode('Chauffeur Driven')}
                disabled={!vehicle.modes.includes('Chauffeur Driven')}
                className={`p-3 text-xs font-semibold rounded border transition-all text-left ${
                  rentalMode === 'Chauffeur Driven'
                    ? 'border-[#D7BC8A] bg-[#193D38] text-[#F7F1E7] ring-1 ring-[#D7BC8A]'
                    : 'border-[#D7BC8A]/20 bg-[#102C2B] text-[#F7F1E7]/70 hover:border-[#D7BC8A]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Chauffeur Driven</span>
                  <span className="text-[10px] text-[#D7BC8A]">+AED 450/day</span>
                </div>
                <p className="text-[11px] text-[#E9E0D1]/70 font-normal mt-1">
                  Private English-speaking executive chauffeur (10 hours daily).
                </p>
              </button>
            </div>
          </div>

          {/* Mandatory Dates and Times */}
          <div className="p-4 bg-[#193D38]/60 rounded border border-[#D7BC8A]/20 space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#D7BC8A] font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Rental Schedule (Pickup & Return Times are Mandatory)</span>
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
                  Return Date *
                </label>
                <input
                  type="date"
                  required
                  min={pickupDate || formatDate(today)}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Return Time *
                </label>
                <input
                  type="time"
                  required
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D7BC8A]" />
                  <span>Pickup Location *</span>
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                >
                  <option value="Dubai International Airport (DXB) Terminal 3">Dubai International Airport (DXB) Terminal 3</option>
                  <option value="Dubai International Airport (DXB) Terminal 1">Dubai International Airport (DXB) Terminal 1</option>
                  <option value="Dubai Al Maktoum Airport (DWC)">Dubai Al Maktoum Airport (DWC)</option>
                  <option value="Hotel Delivery (Downtown / Business Bay)">Hotel Delivery (Downtown / Business Bay)</option>
                  <option value="Hotel Delivery (Palm Jumeirah / Marina)">Hotel Delivery (Palm Jumeirah / Marina)</option>
                  <option value="Private Residence / Villa Delivery">Private Residence / Villa Delivery</option>
                  <option value="Hotwheels Concierge Hub (Deira / Business Bay)">Hotwheels Concierge Hub Collection</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D7BC8A]" />
                  <span>Return Location *</span>
                </label>
                <select
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                >
                  <option value="Dubai International Airport (DXB) Terminal 3">Dubai International Airport (DXB) Terminal 3</option>
                  <option value="Dubai International Airport (DXB) Terminal 1">Dubai International Airport (DXB) Terminal 1</option>
                  <option value="Dubai Al Maktoum Airport (DWC)">Dubai Al Maktoum Airport (DWC)</option>
                  <option value="Hotel Collection (Downtown / Business Bay)">Hotel Collection (Downtown / Business Bay)</option>
                  <option value="Hotel Collection (Palm Jumeirah / Marina)">Hotel Collection (Palm Jumeirah / Marina)</option>
                  <option value="Private Residence / Villa Collection">Private Residence / Villa Collection</option>
                  <option value="Hotwheels Concierge Hub (Deira / Business Bay)">Hotwheels Concierge Hub Drop-off</option>
                </select>
              </div>
            </div>
          </div>

          {/* Customer & Driver Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-[#D7BC8A] font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Customer Information</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="As shown on Passport or License"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Contact Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 123 4567"
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
                  placeholder="reservation@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                  Nationality / Residence Status
                </label>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                >
                  <option value="UAE Resident">UAE Resident (Emirates ID Holder)</option>
                  <option value="GCC National">GCC National</option>
                  <option value="International Tourist (UK / EU / USA)">International Tourist (UK / EU / USA / Canada)</option>
                  <option value="International Tourist (Other)">International Tourist (Other with IDP)</option>
                </select>
              </div>

              {rentalMode === 'Self Drive' && (
                <>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                      Driver Age * (Min {vehicle.minimumAge} yrs)
                    </label>
                    <input
                      type="number"
                      min={vehicle.minimumAge}
                      max={85}
                      value={driverAge}
                      onChange={(e) => setDriverAge(parseInt(e.target.value) || vehicle.minimumAge)}
                      className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="licenseCheck"
                      checked={hasValidLicense}
                      onChange={(e) => setHasValidLicense(e.target.checked)}
                      className="rounded border-[#D7BC8A] text-[#102C2B] focus:ring-0 w-4 h-4"
                    />
                    <label htmlFor="licenseCheck" className="text-xs text-[#E9E0D1] cursor-pointer">
                      I hold a valid UAE license or eligible International Driving Permit.
                    </label>
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#E9E0D1] mb-1">
                Special Requests or Flight Details (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Flight number, child booster seats, VIP meet and greet preferences..."
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-[#F7F1E7] focus:border-[#D7BC8A] focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Pricing Calculation Summary */}
          <div className="p-4 bg-[#193D38] rounded border border-[#D7BC8A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#D7BC8A] font-semibold block">
                Estimated Duration: {totalDays} Day{totalDays > 1 ? 's' : ''}
              </span>
              <span className="text-xs text-[#E9E0D1]/80">
                Security deposit pre-auth: AED {vehicle.securityDepositAED.toLocaleString()} (Refundable)
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#E9E0D1] block">Estimated Total:</span>
              <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                AED {estimatedTotalAED.toLocaleString()}
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
              disabled={isSubmitting || totalDays <= 0}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#102C2B] bg-[#D7BC8A] rounded hover:bg-[#c5a872] disabled:opacity-50 transition-all shadow-md"
            >
              {isSubmitting ? (
                <span>Generating Reservation...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Reservation Enquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
