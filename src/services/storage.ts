import { 
  VisaApplication, 
  RentalEnquiry, 
  ChauffeurEnquiry, 
  Vehicle, 
  VisaCategory, 
  AuditLogEntry 
} from '../types';
import { INITIAL_VEHICLES, INITIAL_VISA_CATEGORIES } from '../data/mockData';

const STORAGE_KEYS = {
  VISA_APPLICATIONS: 'zt_visa_applications_v2',
  RENTAL_ENQUIRIES: 'hw_rental_enquiries_v2',
  CHAUFFEUR_ENQUIRIES: 'hw_chauffeur_enquiries_v2',
  VEHICLES: 'hw_fleet_vehicles_v2',
  VISA_CATEGORIES: 'zt_visa_categories_v2',
  AUDIT_LOG: 'zt_hw_audit_logs_v2',
};

// Generate authentic references
export function generateReference(prefix: 'ZT' | 'HW' | 'CH'): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${digits}`;
}

// Initial seed applications for realistic admin overview
const INITIAL_VISA_APPS: VisaApplication[] = [
  {
    id: 'app-seed-01',
    referenceNumber: 'ZT-684920',
    visaCategoryId: 'visa-30-days',
    visaCategoryName: '30 Days — Single Entry Tourist Visa',
    applicant: {
      title: 'Mr',
      firstName: 'Alexander',
      lastName: 'Vane',
      gender: 'Male',
      nationality: 'British',
      passportNumber: 'GB98421038',
      passportExpiry: '2030-08-15',
      dateOfBirth: '1988-04-12',
      email: 'a.vane@investments-london.co.uk',
      phone: '+44 7700 900342'
    },
    travel: {
      expectedArrivalDate: '2026-11-04',
      hotelOrAddressInUAE: 'The Lana Dorchester Collection, Business Bay Dubai'
    },
    documents: {
      passportCopyFileName: 'vane_alexander_passport_scan.pdf',
      passportCopyFileSize: '1.8 MB',
      photoFileName: 'vane_alexander_portrait.jpg',
      photoFileSize: '820 KB',
      ticketFileName: 'ba107_heathrow_dxb_confirmed.pdf',
      ticketFileSize: '410 KB'
    },
    status: 'Under Processing',
    paymentStatus: 'Paid',
    amountAED: 399,
    submittedAt: '2026-10-15T14:22:00Z',
    internalNotes: 'Documents verified with ICP format checklist. Submission batch #882.'
  },
  {
    id: 'app-seed-02',
    referenceNumber: 'ZT-749102',
    visaCategoryId: 'visa-60-days',
    visaCategoryName: '60 Days — Single Entry Tourist Visa',
    applicant: {
      title: 'Dr',
      firstName: 'Elena',
      lastName: 'Rostova',
      gender: 'Female',
      nationality: 'Swiss',
      passportNumber: 'CH44829105',
      passportExpiry: '2032-01-20',
      dateOfBirth: '1982-11-03',
      email: 'elena.rostova@geneva-med.ch',
      phone: '+41 79 555 4920'
    },
    travel: {
      expectedArrivalDate: '2026-11-18',
      hotelOrAddressInUAE: 'Bulgari Resort Jumeirah Bay, Dubai'
    },
    documents: {
      passportCopyFileName: 'rostova_e_passport.pdf',
      passportCopyFileSize: '2.1 MB',
      photoFileName: 'rostova_e_photo.jpg',
      photoFileSize: '940 KB'
    },
    status: 'Pending Review',
    paymentStatus: 'Paid',
    amountAED: 699,
    submittedAt: '2026-10-16T04:10:00Z',
    internalNotes: 'High priority VIP inquiry. Check hotel reservation voucher.'
  }
];

const INITIAL_RENTAL_ENQUIRIES: RentalEnquiry[] = [
  {
    id: 'rent-seed-01',
    referenceNumber: 'HW-849120',
    vehicleId: 'hw-mercedes-s500',
    vehicleName: 'Mercedes-Benz S 500 4MATIC',
    rentalMode: 'Self Drive',
    pickupDate: '2026-10-24',
    pickupTime: '11:00',
    returnDate: '2026-10-29',
    returnTime: '18:00',
    pickupLocation: 'Dubai International Airport (DXB) Terminal 3 Executive Arrival',
    returnLocation: 'One&Only Royal Mirage, Al Sufouh Dubai',
    totalDays: 6,
    estimatedTotalAED: 8400,
    securityDepositAED: 3000,
    customer: {
      fullName: 'Marcus Sterling',
      contactNumber: '+971 50 829 4410',
      email: 'm.sterling@sterlingcap.ae',
      nationality: 'UAE Resident',
      driverAge: 36,
      hasValidLicense: true
    },
    additionalRequirements: 'Please ensure baby seat (Group 1) is installed and car is sanitized.',
    status: 'Confirmed',
    paymentStatus: 'Deposit Paid',
    submittedAt: '2026-10-15T09:40:00Z',
    internalNotes: 'Customer requested black exterior finish. Assigned chassis VIN #9482.'
  },
  {
    id: 'rent-seed-02',
    referenceNumber: 'HW-920412',
    vehicleId: 'hw-range-rover-autobio',
    vehicleName: 'Range Rover Autobiography P530',
    rentalMode: 'Self Drive',
    pickupDate: '2026-11-01',
    pickupTime: '14:30',
    returnDate: '2026-11-05',
    returnTime: '14:30',
    pickupLocation: 'Armani Hotel Dubai, Burj Khalifa',
    returnLocation: 'Dubai International Airport (DXB) Terminal 1',
    totalDays: 4,
    estimatedTotalAED: 7400,
    securityDepositAED: 4000,
    customer: {
      fullName: 'Tariq Al-Mansoor',
      contactNumber: '+966 50 123 9876',
      email: 'tariq.mansoor@riyadhholdings.sa',
      nationality: 'Saudi Arabia',
      driverAge: 42,
      hasValidLicense: true
    },
    additionalRequirements: 'Delivery directly to Armani Hotel Valet desk.',
    status: 'New',
    paymentStatus: 'Unpaid',
    submittedAt: '2026-10-16T05:30:00Z',
    internalNotes: 'Pending identity card verification and GCC driving license copy.'
  }
];

const INITIAL_CHAUFFEUR_ENQUIRIES: ChauffeurEnquiry[] = [
  {
    id: 'ch-seed-01',
    referenceNumber: 'CH-491028',
    serviceType: 'Airport Transfer',
    preferredVehicle: 'Mercedes-Benz V-Class VIP Edition',
    pickupDate: '2026-10-28',
    pickupTime: '06:45',
    pickupLocation: 'DXB Terminal 3 (Emirates First/Business Arrival)',
    destinationLocation: 'Atlantis The Royal, Palm Jumeirah',
    passengers: 4,
    luggageCount: 5,
    customer: {
      fullName: 'Lord Henry Cavendish',
      contactNumber: '+44 7911 123456',
      email: 'h.cavendish@cavendish-estates.com',
      companyName: 'Cavendish Private Office'
    },
    flightNumber: 'EK 002 from London Heathrow',
    specialInstructions: 'Name board required: "Cavendish Delegation". Chauffeur in full dark lounge suit.',
    status: 'Chauffeur Assigned',
    estimatedCostAED: 650,
    submittedAt: '2026-10-14T11:20:00Z',
    internalNotes: 'Senior chauffeur Rashid assigned. Flight status tracked.'
  }
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-16T06:00:00Z',
    action: 'SYSTEM_BOOT',
    performedBy: 'System Architect',
    targetId: 'CORE-ENGINE',
    details: 'Midnight Luxe hospitality engine initialized with verified fleet and visa configurations.'
  },
  {
    id: 'log-02',
    timestamp: '2026-10-16T06:12:00Z',
    action: 'STATUS_UPDATE',
    performedBy: 'Operations Admin',
    targetId: 'ZT-684920',
    details: 'Visa application ZT-684920 moved from Pending Review to Under Processing.'
  }
];

// Helper safe storage methods
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`LocalStorage read failed for ${key}:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`LocalStorage write failed for ${key}:`, e);
  }
}

export const StorageService = {
  // Visa Applications
  getVisaApplications(): VisaApplication[] {
    return safeGet<VisaApplication[]>(STORAGE_KEYS.VISA_APPLICATIONS, INITIAL_VISA_APPS);
  },

  saveVisaApplication(app: VisaApplication): void {
    const list = this.getVisaApplications();
    const updated = [app, ...list.filter(x => x.id !== app.id)];
    safeSet(STORAGE_KEYS.VISA_APPLICATIONS, updated);
    this.addAuditLog('VISA_SUBMISSION', 'Client Guest', app.referenceNumber, `Application created for ${app.applicant.firstName} ${app.applicant.lastName} (${app.visaCategoryName})`);
  },

  updateVisaApplicationStatus(id: string, status: VisaApplication['status'], internalNotes?: string): void {
    const list = this.getVisaApplications();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          internalNotes: internalNotes !== undefined ? internalNotes : item.internalNotes
        };
      }
      return item;
    });
    safeSet(STORAGE_KEYS.VISA_APPLICATIONS, updated);
    this.addAuditLog('STATUS_UPDATE', 'Admin Concierge', id, `Updated visa status to ${status}`);
  },

  // Rental Enquiries
  getRentalEnquiries(): RentalEnquiry[] {
    return safeGet<RentalEnquiry[]>(STORAGE_KEYS.RENTAL_ENQUIRIES, INITIAL_RENTAL_ENQUIRIES);
  },

  saveRentalEnquiry(enquiry: RentalEnquiry): void {
    const list = this.getRentalEnquiries();
    const updated = [enquiry, ...list.filter(x => x.id !== enquiry.id)];
    safeSet(STORAGE_KEYS.RENTAL_ENQUIRIES, updated);
    this.addAuditLog('RENTAL_ENQUIRY', 'Client Guest', enquiry.referenceNumber, `Reservation inquiry for ${enquiry.vehicleName} (${enquiry.totalDays} days)`);
  },

  updateRentalStatus(id: string, status: RentalEnquiry['status'], internalNotes?: string): void {
    const list = this.getRentalEnquiries();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          internalNotes: internalNotes !== undefined ? internalNotes : item.internalNotes
        };
      }
      return item;
    });
    safeSet(STORAGE_KEYS.RENTAL_ENQUIRIES, updated);
    this.addAuditLog('RENTAL_STATUS_UPDATE', 'Admin Concierge', id, `Updated rental status to ${status}`);
  },

  // Chauffeur Enquiries
  getChauffeurEnquiries(): ChauffeurEnquiry[] {
    return safeGet<ChauffeurEnquiry[]>(STORAGE_KEYS.CHAUFFEUR_ENQUIRIES, INITIAL_CHAUFFEUR_ENQUIRIES);
  },

  saveChauffeurEnquiry(enquiry: ChauffeurEnquiry): void {
    const list = this.getChauffeurEnquiries();
    const updated = [enquiry, ...list.filter(x => x.id !== enquiry.id)];
    safeSet(STORAGE_KEYS.CHAUFFEUR_ENQUIRIES, updated);
    this.addAuditLog('CHAUFFEUR_ENQUIRY', 'Client Guest', enquiry.referenceNumber, `Chauffeur transfer inquiry for ${enquiry.customer.fullName} (${enquiry.serviceType})`);
  },

  updateChauffeurStatus(id: string, status: ChauffeurEnquiry['status'], internalNotes?: string): void {
    const list = this.getChauffeurEnquiries();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          internalNotes: internalNotes !== undefined ? internalNotes : item.internalNotes
        };
      }
      return item;
    });
    safeSet(STORAGE_KEYS.CHAUFFEUR_ENQUIRIES, updated);
    this.addAuditLog('CHAUFFEUR_STATUS_UPDATE', 'Admin Concierge', id, `Updated chauffeur status to ${status}`);
  },

  // Fleet Management
  getVehicles(): Vehicle[] {
    return safeGet<Vehicle[]>(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
  },

  saveVehicle(vehicle: Vehicle): void {
    const list = this.getVehicles();
    const index = list.findIndex(v => v.id === vehicle.id);
    let updated: Vehicle[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = vehicle;
    } else {
      updated = [vehicle, ...list];
    }
    safeSet(STORAGE_KEYS.VEHICLES, updated);
    this.addAuditLog('FLEET_MUTATION', 'Admin Fleet Manager', vehicle.id, `Saved vehicle details for ${vehicle.name}`);
  },

  toggleVehicleAvailability(id: string): void {
    const list = this.getVehicles();
    const updated = list.map(v => v.id === id ? { ...v, isAvailable: !v.isAvailable } : v);
    safeSet(STORAGE_KEYS.VEHICLES, updated);
    this.addAuditLog('FLEET_AVAILABILITY_TOGGLED', 'Admin Fleet Manager', id, `Toggled availability state`);
  },

  // Visa Categories
  getVisaCategories(): VisaCategory[] {
    return safeGet<VisaCategory[]>(STORAGE_KEYS.VISA_CATEGORIES, INITIAL_VISA_CATEGORIES);
  },

  updateVisaCategory(category: VisaCategory): void {
    const list = this.getVisaCategories();
    const updated = list.map(c => c.id === category.id ? category : c);
    safeSet(STORAGE_KEYS.VISA_CATEGORIES, updated);
    this.addAuditLog('VISA_CAT_UPDATE', 'Admin Visa Officer', category.id, `Updated price/terms for ${category.name}`);
  },

  // Audit Logs
  getAuditLogs(): AuditLogEntry[] {
    return safeGet<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOG, INITIAL_AUDIT_LOGS);
  },

  addAuditLog(action: string, performedBy: string, targetId: string, details: string): void {
    const list = this.getAuditLogs();
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      action,
      performedBy,
      targetId,
      details,
    };
    safeSet(STORAGE_KEYS.AUDIT_LOG, [entry, ...list.slice(0, 99)]);
  }
};
