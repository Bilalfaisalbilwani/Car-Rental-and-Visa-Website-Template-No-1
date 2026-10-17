import { Vehicle, VisaCategory } from '../types';

// Authentic images generated specifically for the Midnight Luxe visual system
import heroFleetImg from '../assets/images/hero_luxury_dubai_fleet_1792158272566.jpg';
import mercedesSClassImg from '../assets/images/car_mercedes_sclass_1792158274175.jpg';
import rangeRoverImg from '../assets/images/car_range_rover_suv_1792158274359.jpg';
import mercedesVClassImg from '../assets/images/car_mercedes_vclass_chauffeur_1792158276784.jpg';
import dubaiHospitalityImg from '../assets/images/dubai_hospitality_editorial_1792158275274.jpg';

export const ASSETS = {
  heroFleet: heroFleetImg,
  mercedesSClass: mercedesSClassImg,
  rangeRover: rangeRoverImg,
  mercedesVClass: mercedesVClassImg,
  dubaiHospitality: dubaiHospitalityImg,
};

export const CONTACT_DETAILS = {
  landline: '04-2226182',
  landlineDisplay: '+971 4 222 6182',
  whatsappRaw: '00971 551463555',
  whatsappDigits: '971551463555',
  whatsappFormatted: '+971 55 146 3555',
  email: 'Info@zonetourism.ae',
  website: 'https://hotwheelscarrentals.com/',
  hours: 'Monday – Sunday: 08:30 AM – 11:00 PM (UAE Time)',
  officeLocation: 'Business Bay & Deira Concierge Hubs, Dubai, United Arab Emirates',
};

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'hw-mercedes-s500',
    name: 'Mercedes-Benz S 500 4MATIC',
    brand: 'Mercedes-Benz',
    modelYear: 2024,
    category: 'Luxury',
    modes: ['Self Drive', 'Chauffeur Driven'],
    dailyRateAED: 1400,
    weeklyRateAED: 8500,
    monthlyRateAED: 28000,
    securityDepositAED: 3000,
    seats: 5,
    doors: 4,
    luggageCount: 3,
    transmission: 'Automatic',
    engine: '3.0L Inline-6 Turbo with EQ Boost',
    horsepower: 429,
    acceleration0to100: '4.9s',
    freeDailyKm: 250,
    extraKmFeeAED: 5,
    minimumAge: 23,
    image: mercedesSClassImg,
    isAvailable: true,
    featured: true,
    highlights: [
      'Executive rear seating package with massage functions',
      'Burmester® 3D surround sound system',
      'Airmatic adaptive air suspension for sovereign glide',
      'Soft-close doors and acoustic glass isolation'
    ]
  },
  {
    id: 'hw-range-rover-autobio',
    name: 'Range Rover Autobiography P530',
    brand: 'Land Rover',
    modelYear: 2024,
    category: 'SUV',
    modes: ['Self Drive', 'Chauffeur Driven'],
    dailyRateAED: 1850,
    weeklyRateAED: 11500,
    monthlyRateAED: 38000,
    securityDepositAED: 4000,
    seats: 5,
    doors: 5,
    luggageCount: 4,
    transmission: 'Automatic',
    engine: '4.4L Twin-Turbocharged V8',
    horsepower: 523,
    acceleration0to100: '4.6s',
    freeDailyKm: 250,
    extraKmFeeAED: 7,
    minimumAge: 25,
    image: rangeRoverImg,
    isAvailable: true,
    featured: true,
    highlights: [
      'Semi-aniline perforated leather executive cabin',
      'All-wheel steering with sovereign high-speed stability',
      'Pixel LED headlights with signature daytime optics',
      'Meridian™ Signature 1600W acoustic architecture'
    ]
  },
  {
    id: 'hw-mercedes-vclass',
    name: 'Mercedes-Benz V-Class VIP Edition',
    brand: 'Mercedes-Benz',
    modelYear: 2024,
    category: 'MPV',
    modes: ['Chauffeur Driven', 'Self Drive'],
    dailyRateAED: 1250,
    weeklyRateAED: 7500,
    monthlyRateAED: 24000,
    securityDepositAED: 2500,
    seats: 7,
    doors: 5,
    luggageCount: 7,
    transmission: 'Automatic',
    engine: '2.0L Turbo Diesel / Petrol Smooth Tourer',
    horsepower: 237,
    acceleration0to100: '7.8s',
    freeDailyKm: 250,
    extraKmFeeAED: 4,
    minimumAge: 23,
    image: mercedesVClassImg,
    isAvailable: true,
    featured: true,
    highlights: [
      'Face-to-face boardroom seating configuration with fold-out table',
      'Captain recliners with ambient night illumination',
      'High-capacity luggage trunk ideal for executive airport arrivals',
      'Dedicated rear climate zone and USB-C fast charging stations'
    ]
  },
  {
    id: 'hw-bmw-740li',
    name: 'BMW 740i M-Sport',
    brand: 'BMW',
    modelYear: 2024,
    category: 'Sedan',
    modes: ['Self Drive', 'Chauffeur Driven'],
    dailyRateAED: 1350,
    weeklyRateAED: 8200,
    monthlyRateAED: 27000,
    securityDepositAED: 3000,
    seats: 5,
    doors: 4,
    luggageCount: 3,
    transmission: 'Automatic',
    engine: '3.0L BMW TwinPower Turbo 6-Cylinder',
    horsepower: 375,
    acceleration0to100: '5.2s',
    freeDailyKm: 250,
    extraKmFeeAED: 5,
    minimumAge: 23,
    image: heroFleetImg,
    isAvailable: true,
    featured: false,
    highlights: [
      'BMW Interaction Bar with faceted crystalline glass',
      'Panoramic Sky Lounge LED glass roof',
      'Bowers & Wilkins Diamond Surround Sound',
      'Active roll stabilization & four-wheel steering'
    ]
  },
  {
    id: 'hw-cadillac-escalade',
    name: 'Cadillac Escalade Sport 6.2L V8',
    brand: 'Cadillac',
    modelYear: 2024,
    category: '7-Seater',
    modes: ['Self Drive', 'Chauffeur Driven'],
    dailyRateAED: 1600,
    weeklyRateAED: 9800,
    monthlyRateAED: 32000,
    securityDepositAED: 3500,
    seats: 7,
    doors: 5,
    luggageCount: 6,
    transmission: 'Automatic',
    engine: '6.2L EcoTec3 V8 with Dynamic Fuel Management',
    horsepower: 420,
    acceleration0to100: '5.9s',
    freeDailyKm: 250,
    extraKmFeeAED: 6,
    minimumAge: 25,
    image: rangeRoverImg,
    isAvailable: true,
    featured: false,
    highlights: [
      'Curved 38-inch total diagonal OLED display',
      'AKG Studio Reference 36-speaker acoustic system',
      'Air Ride Adaptive Suspension with magnetic ride control',
      'Ultra-spacious third-row legroom and rear cargo depth'
    ]
  }
];

export const INITIAL_VISA_CATEGORIES: VisaCategory[] = [
  {
    id: 'visa-30-days',
    name: '30 Days — Single Entry Tourist Visa',
    entryType: 'Single Entry',
    durationDays: 30,
    validityDays: 60,
    priceAED: 399,
    processingTimeDays: '2 to 3 Business Days',
    requiredDocuments: [
      'Coloured passport copy with minimum 6 months validity',
      'Passport-size photograph with crisp white background',
      'Confirmed onward or return flight itinerary'
    ],
    description: 'The standard choice for tourists, family visits, short vacations, and attending business exhibitions or conferences across Dubai and the UAE.',
    isActive: true
  },
  {
    id: 'visa-60-days',
    name: '60 Days — Single Entry Tourist Visa',
    entryType: 'Single Entry',
    durationDays: 60,
    validityDays: 60,
    priceAED: 699,
    processingTimeDays: '2 to 4 Business Days',
    requiredDocuments: [
      'Coloured passport copy with minimum 6 months validity',
      'Passport-size photograph with crisp white background',
      'Proof of UAE hotel reservation or host residence address',
      'Confirmed return or onward flight itinerary'
    ],
    description: 'Designed for extended vacations, property search, winter stays, and extended familial visits across Dubai, Abu Dhabi, and the Northern Emirates.',
    isActive: true
  }
];

export const FAQ_ITEMS = [
  {
    question: 'How do ZONE TOURISM LLC and HOTWHEELS CAR RENTAL LLC operate together?',
    answer: 'ZONE TOURISM LLC and HOTWHEELS CAR RENTAL LLC are two legally distinct, affiliated Dubai entities coordinated to provide seamless luxury travel in the UAE. ZONE TOURISM LLC specializes in UAE entry visa coordination and hospitality assistance, while HOTWHEELS CAR RENTAL LLC provides premium self-drive vehicle hire and executive chauffeur mobility.'
  },
  {
    question: 'What documents are required to apply for a UAE Tourist Visa?',
    answer: 'Applicants require a high-resolution colour scan of their valid passport (with at least 6 months remaining validity from expected entry) and a passport-style portrait photo against a clean white background. For certain nationalities, hotel bookings or confirmed return tickets may also be requested.'
  },
  {
    question: 'Does ZONE TOURISM LLC guarantee visa issuance?',
    answer: 'No. ZONE TOURISM LLC provides rigorous application review, formatting, and submission through authorized UAE immigration channels. Actual entry permits, approvals, and security clearances are issued exclusively at the sovereign discretion of the UAE Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) and Dubai GDRFA.'
  },
  {
    question: 'What are the driving license requirements for HOTWHEELS car rental?',
    answer: 'UAE residents must hold a valid UAE driving license (minimum 1 year old for performance models). International tourists must possess their home country driving license accompanied by an International Driving Permit (IDP) or an eligible license from recognized GCC, EU, UK, US, or Commonwealth jurisdictions.'
  },
  {
    question: 'Are pickup and return dates/times strictly observed for car rentals?',
    answer: 'Yes. Every rental contract requires explicit pickup and return dates and times. Rental charges are calculated on a 24-hour cycle from the handover moment. We offer delivery and collection directly to Dubai International Airport (DXB), private VIP aviation terminals, or your hotel.'
  },
  {
    question: 'How does the security deposit work for vehicle rentals?',
    answer: 'A refundable security deposit is pre-authorized via credit card upon vehicle handover (ranging from AED 2,500 to AED 4,000 depending on vehicle tier). The pre-authorization release occurs 21 to 28 days post-return to allow for official UAE traffic fines and Salik toll clearance.'
  },
  {
    question: 'Can I book a Chauffeur Service for airport transfers or private delegations?',
    answer: 'Yes. Our chauffeur service features professional, English-speaking executive chauffeurs and vehicles such as the Mercedes-Benz V-Class, S-Class, and Cadillac Escalade. Services include DXB meet-and-greet, corporate hourly charter, and private intercity travel between Dubai and Abu Dhabi.'
  }
];
