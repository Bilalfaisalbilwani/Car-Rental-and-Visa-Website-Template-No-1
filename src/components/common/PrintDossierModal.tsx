import React from 'react';
import { VisaApplication, RentalEnquiry } from '../../types';
import { X, Printer, ShieldCheck, Calendar, User, FileText } from 'lucide-react';
import { CONTACT_DETAILS } from '../../data/mockData';

interface PrintDossierModalProps {
  type: 'visa' | 'rental';
  data: VisaApplication | RentalEnquiry;
  onClose: () => void;
}

export const PrintDossierModal: React.FC<PrintDossierModalProps> = ({ type, data, onClose }) => {
  const isVisa = type === 'visa';
  const visaData = isVisa ? (data as VisaApplication) : null;
  const rentalData = !isVisa ? (data as RentalEnquiry) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white text-[#182B27] rounded-lg shadow-2xl border border-[#D7BC8A]/30 overflow-hidden my-8">
        {/* Modal Top Actions (no-print) */}
        <div className="no-print bg-[#102C2B] text-[#F7F1E7] px-6 py-4 flex items-center justify-between border-b border-[#D7BC8A]/20">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#D7BC8A]" />
            <div>
              <h3 className="font-serif-editorial text-lg text-[#F7F1E7] font-semibold">
                Official Dossier & Documentation Summary
              </h3>
              <p className="text-xs text-[#D7BC8A]">
                Reference: {data.referenceNumber} · {new Date(data.submittedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold px-4 py-2 rounded hover:bg-[#c5a872] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-[#F7F1E7]/70 hover:text-white p-1 rounded"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 md:p-12 space-y-8 bg-white print:p-0">
          {/* Header of Dossier */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b-2 border-[#102C2B] gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                  {isVisa ? 'ZONE TOURISM LLC' : 'HOTWHEELS CAR RENTAL LLC'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isVisa
                  ? 'UAE Inbound Visa Services & Hospitality Arrangements'
                  : 'Prestige Automotive Fleet & Chauffeur Logistics'}
              </p>
              <p className="text-xs text-gray-400 font-mono">Dubai, United Arab Emirates · Tel: {CONTACT_DETAILS.landlineDisplay}</p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#102C2B] text-[#D7BC8A] font-mono text-xs font-semibold rounded">
                REF: {data.referenceNumber}
              </span>
              <p className="text-[11px] text-gray-500 mt-1">
                Date: {new Date(data.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold uppercase tracking-wider">
                Status: {data.status}
              </p>
            </div>
          </div>

          {/* Visa Specific Content */}
          {isVisa && visaData && (
            <div className="space-y-6">
              <div className="bg-[#F7F1E7]/70 p-4 rounded border border-[#E9E0D1]">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#102C2B] mb-2">
                  Service Category
                </h4>
                <p className="font-serif-editorial text-xl font-bold text-[#102C2B]">
                  {visaData.visaCategoryName}
                </p>
                <div className="flex gap-6 text-xs text-gray-600 mt-2">
                  <span>Processing Type: Standard ICP Review</span>
                  <span>Fee: AED {visaData.amountAED}</span>
                  <span>Payment: {visaData.paymentStatus}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#102C2B]" />
                  <span>Applicant Information</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-gray-50 p-4 rounded border border-gray-200">
                  <div>
                    <span className="text-gray-500 block">Full Name:</span>
                    <span className="font-bold text-[#102C2B]">
                      {visaData.applicant.title} {visaData.applicant.firstName} {visaData.applicant.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Nationality:</span>
                    <span className="font-bold text-[#102C2B]">{visaData.applicant.nationality}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Gender:</span>
                    <span className="font-bold text-[#102C2B]">{visaData.applicant.gender}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Passport Number:</span>
                    <span className="font-mono font-bold text-[#102C2B]">{visaData.applicant.passportNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Passport Expiry:</span>
                    <span className="font-bold text-[#102C2B]">{visaData.applicant.passportExpiry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Date of Birth:</span>
                    <span className="font-bold text-[#102C2B]">{visaData.applicant.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Contact Email:</span>
                    <span className="text-[#102C2B]">{visaData.applicant.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Phone / WhatsApp:</span>
                    <span className="text-[#102C2B]">{visaData.applicant.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Expected Arrival:</span>
                    <span className="font-bold text-[#102C2B]">{visaData.travel.expectedArrivalDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Document Verification Manifest</span>
                </h4>
                <div className="space-y-2 text-xs border border-gray-200 rounded p-4">
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Passport Bio Page Scan:</span>
                    <span className="font-mono text-gray-500">{visaData.documents.passportCopyFileName} ({visaData.documents.passportCopyFileSize}) — Verified</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Applicant Portrait Photo:</span>
                    <span className="font-mono text-gray-500">{visaData.documents.photoFileName} ({visaData.documents.photoFileSize}) — Verified</span>
                  </div>
                  {visaData.documents.ticketFileName && (
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-700">Flight / Hotel Confirmation:</span>
                      <span className="font-mono text-gray-500">{visaData.documents.ticketFileName} ({visaData.documents.ticketFileSize})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rental Specific Content */}
          {!isVisa && rentalData && (
            <div className="space-y-6">
              <div className="bg-[#102C2B] text-[#F7F1E7] p-5 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#D7BC8A] font-medium">
                      Reserved Vehicle
                    </h4>
                    <p className="font-serif-editorial text-2xl font-bold text-white">
                      {rentalData.vehicleName}
                    </p>
                    <p className="text-xs text-[#E9E0D1] mt-1">
                      Mode: <span className="font-semibold text-[#D7BC8A]">{rentalData.rentalMode}</span> · Total Duration: {rentalData.totalDays} Days
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-300 block">Estimated Rental:</span>
                    <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                      AED {rentalData.estimatedTotalAED.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-gray-400 block">+ AED {rentalData.securityDepositAED} Security Deposit</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#102C2B]" />
                  <span>Schedule & Handover Location</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="border-r border-gray-200 pr-2">
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase">Pick-Up Details</span>
                    <p className="text-sm font-bold text-[#102C2B] mt-1">{rentalData.pickupDate} at {rentalData.pickupTime}</p>
                    <p className="text-gray-600 mt-1">{rentalData.pickupLocation}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 font-semibold block text-[11px] uppercase">Return Details</span>
                    <p className="text-sm font-bold text-[#102C2B] mt-1">{rentalData.returnDate} at {rentalData.returnTime}</p>
                    <p className="text-gray-600 mt-1">{rentalData.returnLocation}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#102C2B]" />
                  <span>Customer & Driver Record</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs bg-gray-50 p-4 rounded border border-gray-200">
                  <div>
                    <span className="text-gray-500 block">Customer Name:</span>
                    <span className="font-bold text-[#102C2B]">{rentalData.customer.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Contact Phone:</span>
                    <span className="font-bold text-[#102C2B]">{rentalData.customer.contactNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Email Address:</span>
                    <span className="text-[#102C2B]">{rentalData.customer.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Driver Age:</span>
                    <span className="font-bold text-[#102C2B]">{rentalData.customer.driverAge} Years</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">License Eligibility:</span>
                    <span className="font-bold text-emerald-700">Verified UAE / International IDP</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Payment State:</span>
                    <span className="font-bold text-[#102C2B]">{rentalData.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legal Stamp & Disclaimer */}
          <div className="pt-6 border-t border-gray-200 text-[10px] text-gray-500 leading-relaxed flex flex-col md:flex-row justify-between gap-4">
            <div className="max-w-md">
              <p className="font-semibold text-gray-700">Legal Operational Notice:</p>
              <p>
                This dossier is generated by the administrative system of {isVisa ? 'ZONE TOURISM LLC' : 'HOTWHEELS CAR RENTAL LLC'}. 
                {isVisa 
                  ? ' Issuance of UAE Entry Visas is subject to final security approval by the UAE ICP and GDRFA.'
                  : ' Vehicle handover requires presentation of original physical driving license, passport/Emirates ID, and credit card for deposit.'}
              </p>
            </div>
            <div className="text-right flex flex-col items-end justify-center">
              <div className="w-24 h-12 border-2 border-dashed border-[#102C2B]/40 flex items-center justify-center text-[9px] uppercase font-bold text-[#102C2B]/60 text-center px-1">
                Official Concierge Stamp
              </div>
              <span className="text-[9px] text-gray-400 mt-1">Authorized Verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
