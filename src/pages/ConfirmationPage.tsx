import React, { useEffect, useState } from 'react';
import { NavigationPage, VisaApplication, RentalEnquiry, ChauffeurEnquiry } from '../types';
import { CONTACT_DETAILS } from '../data/mockData';
import { PrintDossierModal } from '../components/common/PrintDossierModal';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Printer, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  FileText 
} from 'lucide-react';

interface ConfirmationPageProps {
  type: 'visa' | 'rental' | 'chauffeur';
  data: VisaApplication | RentalEnquiry | ChauffeurEnquiry;
  onNavigate: (page: NavigationPage) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  type,
  data,
  onNavigate,
}) => {
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D7BC8A', '#102C2B', '#193D38', '#E9E0D1']
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const isVisa = type === 'visa';
  const isRental = type === 'rental';
  const isChauffeur = type === 'chauffeur';

  const visaData = isVisa ? (data as VisaApplication) : null;
  const rentalData = isRental ? (data as RentalEnquiry) : null;
  const chauffeurData = isChauffeur ? (data as ChauffeurEnquiry) : null;

  const whatsappMessage = encodeURIComponent(
    `Hello, I have submitted an official inquiry on your website.\nReference: ${data.referenceNumber}\nType: ${
      isVisa ? 'UAE Visa Application' : isRental ? 'Prestige Car Rental' : 'Executive Chauffeur Transit'
    }\nPlease confirm next steps.`
  );

  return (
    <div className="w-full pt-28 pb-20 bg-[#F7F1E7] text-[#182B27]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Status Hero */}
        <div className="bg-white rounded-lg p-8 sm:p-10 border border-[#E9E0D1] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-[#102C2B] text-[#D7BC8A] rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#102C2B] font-bold">
              {isVisa ? 'ZONE TOURISM LLC' : 'HOTWHEELS CAR RENTAL LLC'}
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#102C2B]">
              Submission Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 font-light max-w-md mx-auto">
              Your inquiry has been stored securely in our central system and assigned a sovereign concierge tracking reference.
            </p>
          </div>

          {/* Reference Badge */}
          <div className="p-4 bg-[#102C2B] text-[#F7F1E7] rounded-md inline-block border border-[#D7BC8A]/40">
            <span className="text-[10px] uppercase text-[#D7BC8A] block tracking-widest font-mono">
              UNIQUE REFERENCE NUMBER
            </span>
            <span className="font-mono text-2xl font-bold text-[#D7BC8A]">
              {data.referenceNumber}
            </span>
          </div>

          {/* Summary Details */}
          <div className="text-left bg-[#F7F1E7]/70 p-5 rounded-lg border border-[#E9E0D1] space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-[#E9E0D1]">
              <span className="font-bold text-[#102C2B]">Record Type:</span>
              <span className="text-gray-700">
                {isVisa ? visaData?.visaCategoryName : isRental ? rentalData?.vehicleName : chauffeurData?.serviceType}
              </span>
            </div>

            {isVisa && visaData && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Applicant Name:</span>
                  <span className="font-semibold text-[#102C2B]">
                    {visaData.applicant.title} {visaData.applicant.firstName} {visaData.applicant.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Nationality:</span>
                  <span className="text-[#102C2B]">{visaData.applicant.nationality}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Passport Number:</span>
                  <span className="font-mono text-[#102C2B]">{visaData.applicant.passportNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Expected Arrival:</span>
                  <span className="text-[#102C2B]">{visaData.travel.expectedArrivalDate}</span>
                </div>
              </>
            )}

            {isRental && rentalData && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Renter Name:</span>
                  <span className="font-semibold text-[#102C2B]">{rentalData.customer.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Rental Mode:</span>
                  <span className="font-semibold text-[#102C2B]">{rentalData.rentalMode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Pickup Schedule:</span>
                  <span className="text-[#102C2B]">{rentalData.pickupDate} at {rentalData.pickupTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Return Schedule:</span>
                  <span className="text-[#102C2B]">{rentalData.returnDate} at {rentalData.returnTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Duration & Estimate:</span>
                  <span className="font-bold text-[#102C2B]">
                    {rentalData.totalDays} Days · AED {rentalData.estimatedTotalAED.toLocaleString()}
                  </span>
                </div>
              </>
            )}

            {isChauffeur && chauffeurData && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Passenger / Client:</span>
                  <span className="font-semibold text-[#102C2B]">{chauffeurData.customer.fullName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Assigned Vehicle:</span>
                  <span className="text-[#102C2B]">{chauffeurData.preferredVehicle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Pickup Date & Time:</span>
                  <span className="text-[#102C2B]">{chauffeurData.pickupDate} at {chauffeurData.pickupTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Pickup Location:</span>
                  <span className="text-[#102C2B]">{chauffeurData.pickupLocation}</span>
                </div>
              </>
            )}
          </div>

          {/* Workflow Status Tracker */}
          <div className="pt-2 text-left space-y-3">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">
              Operational Pipeline Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Stage 01: Submission received and recorded in PostgreSQL database.</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Stage 02: Concierge officer reviewing document formats & fleet availability.</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Stage 03: Final authorization & booking agreement / immigration issuance.</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            {(isVisa || isRental) && (
              <button
                onClick={() => setShowPrintModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors"
              >
                <Printer className="w-4 h-4 text-[#D7BC8A]" />
                <span>Download Official PDF Dossier</span>
              </button>
            )}

            <a
              href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Notify Concierge via WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <button
              onClick={() => onNavigate('home')}
              className="text-[#102C2B] font-semibold hover:underline"
            >
              ← Return to Homepage
            </button>
            <span>Questions? Call {CONTACT_DETAILS.landlineDisplay}</span>
          </div>

        </div>
      </div>

      {/* Printable Modal */}
      {showPrintModal && (isVisa || isRental) && (
        <PrintDossierModal
          type={isVisa ? 'visa' : 'rental'}
          data={data as VisaApplication | RentalEnquiry}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
