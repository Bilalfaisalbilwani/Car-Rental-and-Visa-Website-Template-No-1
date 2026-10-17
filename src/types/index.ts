export type NavigationPage = 
  | 'home' 
  | 'visa-services' 
  | 'visa-application' 
  | 'car-rental' 
  | 'chauffeur-services' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'confirmation' 
  | 'payment-result' 
  | 'admin'
  | '404';

export type VehicleCategory = 'All' | 'Sedan' | 'SUV' | 'Luxury' | '7-Seater' | 'MPV';
export type RentalMode = 'Self Drive' | 'Chauffeur Driven' | 'Both';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  modelYear: number;
  category: 'Sedan' | 'SUV' | 'Luxury' | '7-Seater' | 'MPV';
  modes: RentalMode[];
  dailyRateAED: number;
  weeklyRateAED: number;
  monthlyRateAED?: number;
  securityDepositAED: number;
  seats: number;
  doors: number;
  luggageCount: number;
  transmission: 'Automatic';
  engine: string;
  horsepower: number;
  acceleration0to100: string;
  freeDailyKm: number;
  extraKmFeeAED: number;
  minimumAge: number;
  image: string;
  isAvailable: boolean;
  featured: boolean;
  highlights: string[];
}

export interface VisaCategory {
  id: string;
  name: string;
  entryType: 'Single Entry';
  durationDays: 30 | 60;
  validityDays: number;
  priceAED: number;
  processingTimeDays: string;
  requiredDocuments: string[];
  description: string;
  isActive: boolean;
}

export interface VisaApplication {
  id: string;
  referenceNumber: string; // e.g. ZT-849201
  visaCategoryId: string;
  visaCategoryName: string;
  applicant: {
    title: string;
    firstName: string;
    lastName: string;
    gender: 'Male' | 'Female' | 'Other';
    nationality: string;
    passportNumber: string;
    passportExpiry: string;
    dateOfBirth: string;
    email: string;
    phone: string;
  };
  travel: {
    expectedArrivalDate: string;
    hotelOrAddressInUAE: string;
  };
  documents: {
    passportCopyFileName: string;
    passportCopyFileSize: string;
    photoFileName: string;
    photoFileSize: string;
    ticketFileName?: string;
    ticketFileSize?: string;
  };
  status: 'Pending Review' | 'Under Processing' | 'Approved' | 'Action Required' | 'Rejected';
  paymentStatus: 'Unpaid' | 'Paid' | 'Waived';
  amountAED: number;
  submittedAt: string;
  internalNotes?: string;
}

export interface RentalEnquiry {
  id: string;
  referenceNumber: string; // e.g. HW-394812
  vehicleId: string;
  vehicleName: string;
  rentalMode: 'Self Drive' | 'Chauffeur Driven';
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation: string;
  returnLocation: string;
  totalDays: number;
  estimatedTotalAED: number;
  securityDepositAED: number;
  customer: {
    fullName: string;
    contactNumber: string;
    email: string;
    nationality: string;
    driverAge: number;
    hasValidLicense: boolean;
  };
  additionalRequirements?: string;
  status: 'New' | 'Vehicle Reserved' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Unpaid' | 'Deposit Paid' | 'Fully Paid';
  submittedAt: string;
  internalNotes?: string;
}

export interface ChauffeurEnquiry {
  id: string;
  referenceNumber: string; // e.g. CH-291039
  serviceType: 'Airport Transfer' | 'Hourly Charter' | 'Corporate Delegation' | 'Intercity Transfer';
  preferredVehicle: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  destinationLocation: string;
  hoursRequired?: number;
  passengers: number;
  luggageCount: number;
  customer: {
    fullName: string;
    contactNumber: string;
    email: string;
    companyName?: string;
  };
  flightNumber?: string;
  specialInstructions?: string;
  status: 'New' | 'Chauffeur Assigned' | 'Confirmed' | 'Completed' | 'Cancelled';
  estimatedCostAED?: number;
  submittedAt: string;
  internalNotes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  targetId: string;
  details: string;
}
