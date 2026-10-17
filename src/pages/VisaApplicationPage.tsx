import React, { useState } from 'react';
import { NavigationPage, VisaApplication, VisaCategory } from '../types';
import { StorageService, generateReference } from '../services/storage';
import { 
  Check, 
  Upload, 
  FileText, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';

interface VisaApplicationPageProps {
  initialCategoryId?: string;
  onNavigate: (page: NavigationPage) => void;
  onSuccess: (app: VisaApplication) => void;
}

export const VisaApplicationPage: React.FC<VisaApplicationPageProps> = ({
  initialCategoryId,
  onNavigate,
  onSuccess,
}) => {
  const [categories] = useState<VisaCategory[]>(() => StorageService.getVisaCategories());
  
  const [step, setStep] = useState<number>(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategoryId || categories[0]?.id || 'visa-30-days'
  );

  // Applicant info
  const [title, setTitle] = useState<string>('Mr');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [nationality, setNationality] = useState<string>('United Kingdom');
  const [passportNumber, setPassportNumber] = useState<string>('');
  const [passportExpiry, setPassportExpiry] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Travel info
  const [expectedArrivalDate, setExpectedArrivalDate] = useState<string>('');
  const [hotelOrAddressInUAE, setHotelOrAddressInUAE] = useState<string>('');

  // Documents
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [ticketFile, setTicketFile] = useState<File | null>(null);

  // Consent & Terms
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [accurateInfoConfirmed, setAccurateInfoConfirmed] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

  const handlePassportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Passport copy file exceeds 5MB limit. Please upload a compressed scan.');
      return;
    }
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowed.includes(file.type)) {
      setErrorMessage('Invalid file type. Please upload a PDF, JPG, or PNG document.');
      return;
    }
    setPassportFile(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Portrait photograph exceeds 5MB limit.');
      return;
    }
    const allowed = ['image/jpeg', 'image/png'];
    if (!allowed.includes(file.type)) {
      setErrorMessage('Photograph must be in JPG or PNG format with white background.');
      return;
    }
    setPhotoFile(file);
  };

  const handleTicketUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Flight/hotel ticket file exceeds 5MB limit.');
      return;
    }
    setTicketFile(file);
  };

  const validateStep2 = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please provide both first name and last name as written on passport.');
      return false;
    }
    if (!passportNumber.trim()) {
      setErrorMessage('Passport number is required.');
      return false;
    }
    if (!passportExpiry) {
      setErrorMessage('Passport expiry date is required.');
      return false;
    }
    // Check 6 months validity from today
    const expiry = new Date(passportExpiry);
    const minValidity = new Date();
    minValidity.setMonth(minValidity.getMonth() + 6);
    if (expiry < minValidity) {
      setErrorMessage('UAE immigration requires passports to have at least 6 months validity.');
      return false;
    }
    if (!dateOfBirth) {
      setErrorMessage('Date of birth is required.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return false;
    }
    if (!phone.trim() || phone.length < 7) {
      setErrorMessage('Please provide a valid phone/WhatsApp number.');
      return false;
    }
    if (!expectedArrivalDate) {
      setErrorMessage('Expected arrival date in UAE is required.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!passportFile) {
      setErrorMessage('Clear passport bio-page copy is mandatory for UAE immigration.');
      return false;
    }
    if (!photoFile) {
      setErrorMessage('Passport-sized portrait photo with white background is mandatory.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreedToTerms || !accurateInfoConfirmed) {
      setErrorMessage('Please review and confirm the accuracy declarations and terms.');
      return;
    }

    setIsSubmitting(true);
    const ref = generateReference('ZT');

    const newApp: VisaApplication = {
      id: `app-${Date.now()}`,
      referenceNumber: ref,
      visaCategoryId: selectedCategory.id,
      visaCategoryName: selectedCategory.name,
      applicant: {
        title,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender,
        nationality,
        passportNumber: passportNumber.trim().toUpperCase(),
        passportExpiry,
        dateOfBirth,
        email: email.trim(),
        phone: phone.trim(),
      },
      travel: {
        expectedArrivalDate,
        hotelOrAddressInUAE: hotelOrAddressInUAE.trim() || 'Hotel reservation to be finalized in Dubai',
      },
      documents: {
        passportCopyFileName: passportFile ? passportFile.name : 'passport_scan.pdf',
        passportCopyFileSize: passportFile ? `${(passportFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
        photoFileName: photoFile ? photoFile.name : 'applicant_photo.jpg',
        photoFileSize: photoFile ? `${(photoFile.size / 1024).toFixed(0)} KB` : '420 KB',
        ticketFileName: ticketFile ? ticketFile.name : undefined,
        ticketFileSize: ticketFile ? `${(ticketFile.size / 1024).toFixed(0)} KB` : undefined,
      },
      status: 'Pending Review',
      paymentStatus: 'Unpaid',
      amountAED: selectedCategory.priceAED,
      submittedAt: new Date().toISOString(),
      internalNotes: `Web submission received. Document format pre-check passed for ${nationality} citizen.`
    };

    setTimeout(() => {
      StorageService.saveVisaApplication(newApp);
      setIsSubmitting(false);
      onSuccess(newApp);
    }, 500);
  };

  return (
    <div className="w-full pt-24 pb-20 bg-[#F7F1E7] text-[#182B27]">
      {/* Header */}
      <div className="bg-[#102C2B] text-[#F7F1E7] py-16 border-b border-[#D7BC8A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#D7BC8A] font-semibold block">
            ZONE TOURISM LLC · OFFICIAL ENTRY PORTAL
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#F7F1E7]">
            UAE Tourist Visa Application
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F1E7]/70 font-light max-w-xl mx-auto">
            Secure, end-to-end document processing for single-entry tourist visas into Dubai and the UAE.
          </p>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-lg p-4 shadow-md border border-[#E9E0D1] flex items-center justify-between">
          {[
            { num: 1, label: 'Category' },
            { num: 2, label: 'Applicant Data' },
            { num: 3, label: 'Document Uploads' },
            { num: 4, label: 'Review & Submit' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? 'bg-[#102C2B] text-[#D7BC8A] ring-2 ring-[#D7BC8A]'
                    : step > s.num
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-xs hidden sm:inline ${step === s.num ? 'font-bold text-[#102C2B]' : 'text-gray-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-lg p-6 sm:p-10 border border-[#E9E0D1] shadow-lg space-y-8">
          
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-md flex items-start gap-3 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: CATEGORY SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                  Step 1: Select Visa Duration
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Choose the single-entry tourist visa duration corresponding to your planned stay.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCategoryId === cat.id
                        ? 'border-[#102C2B] bg-[#F7F1E7]/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase font-bold text-[#102C2B] tracking-wider">
                        {cat.durationDays} Days Stay
                      </span>
                      <span className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                        AED {cat.priceAED}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#102C2B] mt-2">{cat.name}</h4>
                    <p className="text-xs text-gray-600 mt-2 font-light leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-gray-200 text-[11px] text-gray-500">
                      Standard ICP processing: {cat.processingTimeDays}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors"
                >
                  <span>Continue to Applicant Data</span>
                  <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: APPLICANT DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                  Step 2: Applicant & Travel Details
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Ensure all information matches your passport exactly to prevent immigration rejection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Title *
                  </label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  >
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    First & Middle Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="As shown on passport"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Last / Surname *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Surname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Nationality on Passport *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. British, French, American..."
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GB1234567"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs font-mono focus:ring-1 focus:ring-[#102C2B] focus:outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Passport Expiry Date * (Min 6 months)
                  </label>
                  <input
                    type="date"
                    required
                    value={passportExpiry}
                    onChange={(e) => setPassportExpiry(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="visa-updates@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7700 900123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Expected Arrival Date in UAE *
                  </label>
                  <input
                    type="date"
                    required
                    value={expectedArrivalDate}
                    onChange={(e) => setExpectedArrivalDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Hotel or Residence in UAE
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Lana, Dorchester Collection, Dubai"
                    value={hotelOrAddressInUAE}
                    onChange={(e) => setHotelOrAddressInUAE(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#102C2B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs text-gray-600 hover:text-black"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors"
                >
                  <span>Proceed to Document Uploads</span>
                  <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOADS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                  Step 3: Secure Document Uploads
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Upload clear, legible files. Max size 5MB each. Formats: PDF, JPG, PNG.
                </p>
              </div>

              {/* Passport Upload */}
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#102C2B] transition-colors">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#102C2B]" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#102C2B]">
                        Passport Bio-Page Scan *
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Color scan showing photo, signature, and MRZ lines clearly.
                      </p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="passportUpload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handlePassportUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="passportUpload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 rounded cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{passportFile ? 'Replace File' : 'Select File'}</span>
                    </label>
                  </div>
                </div>
                {passportFile && (
                  <div className="mt-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                    ✓ {passportFile.name} ({(passportFile.size / 1024).toFixed(0)} KB)
                  </div>
                )}
              </div>

              {/* Photo Upload */}
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#102C2B] transition-colors">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Upload className="w-8 h-8 text-[#102C2B]" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#102C2B]">
                        Applicant Portrait Photograph *
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        Passport-sized color photograph with white background.
                      </p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="photoUpload"
                      accept=".jpg,.jpeg,.png"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="photoUpload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 rounded cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{photoFile ? 'Replace Photo' : 'Select Photo'}</span>
                    </label>
                  </div>
                </div>
                {photoFile && (
                  <div className="mt-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                    ✓ {photoFile.name} ({(photoFile.size / 1024).toFixed(0)} KB)
                  </div>
                )}
              </div>

              {/* Ticket Upload (Optional) */}
              <div className="p-4 border border-dashed border-gray-200 rounded-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gray-700">
                      Confirmed Flight or Hotel Itinerary (Optional)
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Recommended for priority visa processing.
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="ticketUpload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleTicketUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="ticketUpload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 rounded cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{ticketFile ? 'Replace Itinerary' : 'Upload (Optional)'}</span>
                    </label>
                  </div>
                </div>
                {ticketFile && (
                  <div className="mt-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                    ✓ {ticketFile.name} ({(ticketFile.size / 1024).toFixed(0)} KB)
                  </div>
                )}
              </div>

              <div className="p-3 bg-[#102C2B]/5 rounded flex items-center gap-2 text-xs text-gray-700">
                <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Documents are stored in private encrypted storage and purged according to UAE retention laws.</span>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs text-gray-600 hover:text-black"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep3()) setStep(4);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] transition-colors"
                >
                  <span>Review Application</span>
                  <ArrowRight className="w-4 h-4 text-[#D7BC8A]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMISSION */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-[#102C2B]">
                  Step 4: Review & Legal Declarations
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Verify your submission details before final dispatch to our concierge visa desk.
                </p>
              </div>

              <div className="bg-[#F7F1E7] p-5 rounded-lg border border-[#E9E0D1] space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E9E0D1]">
                  <div>
                    <span className="text-xs uppercase text-gray-500 block">Selected Product</span>
                    <strong className="text-sm text-[#102C2B]">{selectedCategory.name}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Assistance Fee</span>
                    <strong className="font-serif-editorial text-2xl text-[#102C2B]">AED {selectedCategory.priceAED}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Applicant:</span>
                    <span className="font-bold text-[#102C2B]">{title} {firstName} {lastName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Nationality:</span>
                    <span className="font-bold text-[#102C2B]">{nationality}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Passport #:</span>
                    <span className="font-mono font-bold text-[#102C2B]">{passportNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Passport Expiry:</span>
                    <span className="font-bold text-[#102C2B]">{passportExpiry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Arrival Date:</span>
                    <span className="font-bold text-[#102C2B]">{expectedArrivalDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Contact Phone:</span>
                    <span className="font-bold text-[#102C2B]">{phone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E9E0D1] text-xs">
                  <span className="text-gray-500 block">Attached Documents:</span>
                  <span className="text-emerald-800 font-medium">
                    ✓ {passportFile?.name} · ✓ {photoFile?.name} {ticketFile ? `· ✓ ${ticketFile.name}` : ''}
                  </span>
                </div>
              </div>

              {/* Declarations */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsAgree"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="rounded border-gray-300 text-[#102C2B] focus:ring-0 mt-1 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="termsAgree" className="text-xs text-gray-700 cursor-pointer">
                    I acknowledge that ZONE TOURISM LLC is an application assistance agency and does not guarantee visa approval, which is solely granted at the discretion of the UAE ICP and GDRFA.
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="accurateAgree"
                    required
                    checked={accurateInfoConfirmed}
                    onChange={(e) => setAccurateInfoConfirmed(e.target.checked)}
                    className="rounded border-gray-300 text-[#102C2B] focus:ring-0 mt-1 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="accurateAgree" className="text-xs text-gray-700 cursor-pointer">
                    I confirm that the applicant details and uploaded identity scans are genuine, un-doctored, and accurately reflect the traveler&apos;s legal documents.
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs text-gray-600 hover:text-black"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms || !accurateInfoConfirmed}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#102C2B] text-[#F7F1E7] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#193D38] disabled:opacity-50 transition-colors shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Registering Application...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#D7BC8A]" />
                      <span>Submit Official Application (AED {selectedCategory.priceAED})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
