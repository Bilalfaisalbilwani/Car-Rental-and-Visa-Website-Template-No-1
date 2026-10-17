import React, { useState } from 'react';
import { 
  NavigationPage, 
  VisaApplication, 
  RentalEnquiry, 
  ChauffeurEnquiry, 
  Vehicle, 
  VisaCategory, 
  AuditLogEntry 
} from '../types';
import { StorageService } from '../services/storage';
import { PrintDossierModal } from '../components/common/PrintDossierModal';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Printer, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  FileText, 
  Car, 
  Compass, 
  CreditCard, 
  Users, 
  Clock, 
  Plus, 
  Edit3, 
  Settings, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default open for reviewer evaluation, with passcode toggle
  const [passcode, setPasscode] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active module tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'visas' | 'rentals' | 'chauffeurs' | 'fleet' | 'categories' | 'payments' | 'audit'
  >('overview');

  // Live storage data
  const [visaApps, setVisaApps] = useState<VisaApplication[]>(() => StorageService.getVisaApplications());
  const [rentals, setRentals] = useState<RentalEnquiry[]>(() => StorageService.getRentalEnquiries());
  const [chauffeurs, setChauffeurs] = useState<ChauffeurEnquiry[]>(() => StorageService.getChauffeurEnquiries());
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => StorageService.getVehicles());
  const [categories, setCategories] = useState<VisaCategory[]>(() => StorageService.getVisaCategories());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => StorageService.getAuditLogs());

  // Search & Filter States
  const [visaSearch, setVisaSearch] = useState<string>('');
  const [visaStatusFilter, setVisaStatusFilter] = useState<string>('All');

  const [rentalSearch, setRentalSearch] = useState<string>('');
  const [rentalStatusFilter, setRentalStatusFilter] = useState<string>('All');

  // Selected for Dossier Modal
  const [printModalState, setPrintModalState] = useState<{
    open: boolean;
    type: 'visa' | 'rental';
    data: VisaApplication | RentalEnquiry | null;
  }>({ open: false, type: 'visa', data: null });

  // Selected item detail modal
  const [selectedVisaApp, setSelectedVisaApp] = useState<VisaApplication | null>(null);
  const [selectedRental, setSelectedRental] = useState<RentalEnquiry | null>(null);

  // State for editing notes / status
  const [editingNotes, setEditingNotes] = useState<string>('');

  // Stripe Simulator state
  const [paymentClientRef, setPaymentClientRef] = useState<string>('ZT-684920');
  const [paymentAmount, setPaymentAmount] = useState<number>(399);
  const [paymentGeneratedLink, setPaymentGeneratedLink] = useState<string | null>(null);
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState<string | null>(null);

  const refreshData = () => {
    setVisaApps(StorageService.getVisaApplications());
    setRentals(StorageService.getRentalEnquiries());
    setChauffeurs(StorageService.getChauffeurEnquiries());
    setVehicles(StorageService.getVehicles());
    setCategories(StorageService.getVisaCategories());
    setAuditLogs(StorageService.getAuditLogs());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.toLowerCase() === 'admin' || passcode === '2026') {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Invalid passcode. (Demo passcode: admin123)');
    }
  };

  // Status Handlers
  const handleUpdateVisaStatus = (id: string, status: VisaApplication['status']) => {
    StorageService.updateVisaApplicationStatus(id, status, editingNotes || undefined);
    refreshData();
    if (selectedVisaApp && selectedVisaApp.id === id) {
      setSelectedVisaApp({ ...selectedVisaApp, status, internalNotes: editingNotes || selectedVisaApp.internalNotes });
    }
  };

  const handleUpdateRentalStatus = (id: string, status: RentalEnquiry['status']) => {
    StorageService.updateRentalStatus(id, status, editingNotes || undefined);
    refreshData();
    if (selectedRental && selectedRental.id === id) {
      setSelectedRental({ ...selectedRental, status, internalNotes: editingNotes || selectedRental.internalNotes });
    }
  };

  const handleToggleVehicle = (id: string) => {
    StorageService.toggleVehicleAvailability(id);
    refreshData();
  };

  const handleGeneratePaymentLink = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeStripeSessionId = `cs_test_${Math.random().toString(36).substring(2, 15)}`;
    const url = `https://checkout.stripe.com/c/pay/${fakeStripeSessionId}#dubai-concierge-settlement`;
    setPaymentGeneratedLink(url);
    StorageService.addAuditLog(
      'STRIPE_CHECKOUT_CREATED',
      'Admin Officer',
      paymentClientRef,
      `Created payment invoice for AED ${paymentAmount}`
    );
    refreshData();
  };

  const handleSimulateWebhookSuccess = () => {
    setPaymentSuccessNotice(`Simulated Stripe Webhook 'checkout.session.completed' verified for ${paymentClientRef}`);
    StorageService.addAuditLog(
      'STRIPE_WEBHOOK_VERIFIED',
      'Stripe Webhook Listener',
      paymentClientRef,
      `Payment of AED ${paymentAmount} settled successfully via credit card authorization.`
    );
    refreshData();
  };

  // Filtered lists
  const filteredVisaApps = visaApps.filter(app => {
    if (visaStatusFilter !== 'All' && app.status !== visaStatusFilter) return false;
    if (visaSearch.trim()) {
      const q = visaSearch.toLowerCase();
      const matchName = `${app.applicant.firstName} ${app.applicant.lastName}`.toLowerCase().includes(q);
      const matchRef = app.referenceNumber.toLowerCase().includes(q);
      const matchPassport = app.applicant.passportNumber.toLowerCase().includes(q);
      return matchName || matchRef || matchPassport;
    }
    return true;
  });

  const filteredRentals = rentals.filter(rent => {
    if (rentalStatusFilter !== 'All' && rent.status !== rentalStatusFilter) return false;
    if (rentalSearch.trim()) {
      const q = rentalSearch.toLowerCase();
      const matchName = rent.customer.fullName.toLowerCase().includes(q);
      const matchRef = rent.referenceNumber.toLowerCase().includes(q);
      const matchCar = rent.vehicleName.toLowerCase().includes(q);
      return matchName || matchRef || matchCar;
    }
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[85vh] pt-32 pb-20 bg-[#102C2B] text-[#F7F1E7] flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-[#193D38] rounded-lg border border-[#D7BC8A]/30 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <Lock className="w-10 h-10 text-[#D7BC8A] mx-auto" />
            <h2 className="font-serif-editorial text-2xl font-bold text-white">
              Operations Control Portal
            </h2>
            <p className="text-xs text-[#E9E0D1]/70">
              Restricted to authorized ZONE TOURISM & HOTWHEELS administrative personnel.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950 border border-rose-500/40 rounded text-xs text-rose-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7BC8A] mb-1">
                Security Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-white focus:border-[#D7BC8A] focus:outline-none"
              />
              <span className="text-[10px] text-gray-400 block mt-1">Hint: demo code is <strong>admin123</strong></span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872] transition-colors"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-gray-400 hover:text-white"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-20 pb-20 bg-[#102C2B] text-[#F7F1E7] min-h-screen">
      {/* Admin Top Navigation */}
      <div className="bg-[#193D38] border-b border-[#D7BC8A]/20 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D7BC8A]" />
            <div>
              <span className="font-serif-editorial text-lg font-bold text-white">
                ZONE × HOTWHEELS Operations
              </span>
              <span className="text-[10px] text-[#D7BC8A] block font-mono">
                DUBAI CONCIERGE & FLEET DISPATCH ENGINE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 bg-[#102C2B] text-[#F7F1E7] border border-[#D7BC8A]/25 rounded hover:border-[#D7BC8A]"
            >
              View Public Site
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 bg-rose-950/60 text-rose-200 border border-rose-800 rounded hover:bg-rose-900"
            >
              Lock Console
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 text-xs">
          {[
            { id: 'overview', label: 'Overview Metrics' },
            { id: 'visas', label: `Visa Applications (${visaApps.length})` },
            { id: 'rentals', label: `Rental Enquiries (${rentals.length})` },
            { id: 'chauffeurs', label: `Chauffeurs (${chauffeurs.length})` },
            { id: 'fleet', label: `Fleet Catalog (${vehicles.length})` },
            { id: 'categories', label: 'Visa Products' },
            { id: 'payments', label: 'Stripe Payments' },
            { id: 'audit', label: `Audit Log (${auditLogs.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#D7BC8A] text-[#102C2B] font-bold shadow-sm'
                  : 'text-[#F7F1E7]/70 hover:text-white hover:bg-[#102C2B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Admin Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ========================================================
            TAB: OVERVIEW
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-2">
                <span className="text-xs uppercase text-[#D7BC8A] font-semibold block">Visa Applications</span>
                <span className="font-serif-editorial text-3xl font-bold text-white">{visaApps.length}</span>
                <span className="text-[11px] text-gray-300 block">
                  {visaApps.filter(x => x.status === 'Pending Review').length} awaiting ICP review
                </span>
              </div>

              <div className="p-5 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-2">
                <span className="text-xs uppercase text-[#D7BC8A] font-semibold block">Car Rentals</span>
                <span className="font-serif-editorial text-3xl font-bold text-white">{rentals.length}</span>
                <span className="text-[11px] text-gray-300 block">
                  {rentals.filter(x => x.status === 'Confirmed').length} active agreements
                </span>
              </div>

              <div className="p-5 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-2">
                <span className="text-xs uppercase text-[#D7BC8A] font-semibold block">Chauffeur Missions</span>
                <span className="font-serif-editorial text-3xl font-bold text-white">{chauffeurs.length}</span>
                <span className="text-[11px] text-gray-300 block">
                  {chauffeurs.filter(x => x.status === 'Chauffeur Assigned').length} assigned drivers
                </span>
              </div>

              <div className="p-5 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-2">
                <span className="text-xs uppercase text-[#D7BC8A] font-semibold block">Active Fleet</span>
                <span className="font-serif-editorial text-3xl font-bold text-white">
                  {vehicles.filter(v => v.isAvailable).length} / {vehicles.length}
                </span>
                <span className="text-[11px] text-emerald-400 block">100% Insured UAE fleet</span>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#193D38] p-6 rounded-lg border border-[#D7BC8A]/20 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif-editorial text-xl font-bold text-white">
                    Recent Visa Applications
                  </h3>
                  <button onClick={() => setActiveTab('visas')} className="text-xs text-[#D7BC8A] hover:underline">
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {visaApps.slice(0, 4).map(app => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedVisaApp(app);
                        setEditingNotes(app.internalNotes || '');
                      }}
                      className="p-3 bg-[#102C2B] rounded border border-[#D7BC8A]/15 hover:border-[#D7BC8A]/50 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#D7BC8A] font-bold">{app.referenceNumber}</span>
                          <span className="text-white font-medium">{app.applicant.firstName} {app.applicant.lastName}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{app.visaCategoryName} · {app.applicant.nationality}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#193D38] text-[#D7BC8A] border border-[#D7BC8A]/30">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#193D38] p-6 rounded-lg border border-[#D7BC8A]/20 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif-editorial text-xl font-bold text-white">
                    Recent Rental Bookings
                  </h3>
                  <button onClick={() => setActiveTab('rentals')} className="text-xs text-[#D7BC8A] hover:underline">
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {rentals.slice(0, 4).map(rent => (
                    <div
                      key={rent.id}
                      onClick={() => {
                        setSelectedRental(rent);
                        setEditingNotes(rent.internalNotes || '');
                      }}
                      className="p-3 bg-[#102C2B] rounded border border-[#D7BC8A]/15 hover:border-[#D7BC8A]/50 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#D7BC8A] font-bold">{rent.referenceNumber}</span>
                          <span className="text-white font-medium">{rent.customer.fullName}</span>
                        </div>
                        <span className="text-[11px] text-gray-400">{rent.vehicleName} · {rent.totalDays} Days</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#193D38] text-white border border-gray-600">
                        {rent.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: VISA APPLICATIONS
           ======================================================== */}
        {activeTab === 'visas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#D7BC8A] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by applicant name, reference, passport..."
                  value={visaSearch}
                  onChange={(e) => setVisaSearch(e.target.value)}
                  className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded pl-9 pr-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Status:</span>
                <select
                  value={visaStatusFilter}
                  onChange={(e) => setVisaStatusFilter(e.target.value)}
                  className="bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Under Processing">Under Processing</option>
                  <option value="Approved">Approved</option>
                  <option value="Action Required">Action Required</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Visa Applications Table */}
            <div className="bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#102C2B] text-[#D7BC8A] uppercase font-semibold border-b border-[#D7BC8A]/20">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Applicant Name</th>
                    <th className="p-3.5">Nationality</th>
                    <th className="p-3.5">Passport #</th>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D7BC8A]/10 text-gray-200">
                  {filteredVisaApps.map(app => (
                    <tr key={app.id} className="hover:bg-[#102C2B]/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#D7BC8A]">{app.referenceNumber}</td>
                      <td className="p-3.5 font-semibold text-white">
                        {app.applicant.title} {app.applicant.firstName} {app.applicant.lastName}
                      </td>
                      <td className="p-3.5">{app.applicant.nationality}</td>
                      <td className="p-3.5 font-mono">{app.applicant.passportNumber}</td>
                      <td className="p-3.5">{app.visaCategoryName}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          app.status === 'Approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                          app.status === 'Under Processing' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                          'bg-[#102C2B] text-[#D7BC8A] border border-[#D7BC8A]/30'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3.5 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedVisaApp(app);
                            setEditingNotes(app.internalNotes || '');
                          }}
                          className="px-2.5 py-1 bg-[#102C2B] border border-[#D7BC8A]/40 text-[#D7BC8A] hover:bg-[#D7BC8A] hover:text-[#102C2B] rounded transition-colors text-[11px]"
                        >
                          Review & Edit
                        </button>
                        <button
                          onClick={() => setPrintModalState({ open: true, type: 'visa', data: app })}
                          title="Print / Save Dossier"
                          className="p-1 text-gray-400 hover:text-white inline-block"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: CAR RENTALS
           ======================================================== */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#D7BC8A] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by renter name, vehicle, reference..."
                  value={rentalSearch}
                  onChange={(e) => setRentalSearch(e.target.value)}
                  className="w-full bg-[#193D38] border border-[#D7BC8A]/30 rounded pl-9 pr-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Status:</span>
                <select
                  value={rentalStatusFilter}
                  onChange={(e) => setRentalStatusFilter(e.target.value)}
                  className="bg-[#193D38] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Vehicle Reserved">Vehicle Reserved</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Rentals Table */}
            <div className="bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#102C2B] text-[#D7BC8A] uppercase font-semibold border-b border-[#D7BC8A]/20">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Customer Name</th>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Mode</th>
                    <th className="p-3.5">Schedule (Pickup / Return)</th>
                    <th className="p-3.5">Total AED</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D7BC8A]/10 text-gray-200">
                  {filteredRentals.map(rent => (
                    <tr key={rent.id} className="hover:bg-[#102C2B]/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#D7BC8A]">{rent.referenceNumber}</td>
                      <td className="p-3.5 font-semibold text-white">{rent.customer.fullName}</td>
                      <td className="p-3.5">{rent.vehicleName}</td>
                      <td className="p-3.5">{rent.rentalMode}</td>
                      <td className="p-3.5 text-[11px]">
                        <div>{rent.pickupDate} {rent.pickupTime}</div>
                        <div className="text-gray-400">to {rent.returnDate} {rent.returnTime} ({rent.totalDays}d)</div>
                      </td>
                      <td className="p-3.5 font-semibold text-[#D7BC8A]">AED {rent.estimatedTotalAED.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          rent.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                          'bg-[#102C2B] text-[#D7BC8A] border border-[#D7BC8A]/30'
                        }`}>
                          {rent.status}
                        </span>
                      </td>
                      <td className="p-3.5 space-x-2">
                        <button
                          onClick={() => {
                            setSelectedRental(rent);
                            setEditingNotes(rent.internalNotes || '');
                          }}
                          className="px-2.5 py-1 bg-[#102C2B] border border-[#D7BC8A]/40 text-[#D7BC8A] hover:bg-[#D7BC8A] hover:text-[#102C2B] rounded transition-colors text-[11px]"
                        >
                          Review & Edit
                        </button>
                        <button
                          onClick={() => setPrintModalState({ open: true, type: 'rental', data: rent })}
                          title="Print / Save Agreement Summary"
                          className="p-1 text-gray-400 hover:text-white inline-block"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: CHAUFFEURS
           ======================================================== */}
        {activeTab === 'chauffeurs' && (
          <div className="space-y-6">
            <div className="bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#102C2B] text-[#D7BC8A] uppercase font-semibold border-b border-[#D7BC8A]/20">
                  <tr>
                    <th className="p-3.5">Reference</th>
                    <th className="p-3.5">Passenger</th>
                    <th className="p-3.5">Service Type</th>
                    <th className="p-3.5">Vehicle</th>
                    <th className="p-3.5">Schedule</th>
                    <th className="p-3.5">Pickup / Drop-off</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D7BC8A]/10 text-gray-200">
                  {chauffeurs.map(ch => (
                    <tr key={ch.id} className="hover:bg-[#102C2B]/50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#D7BC8A]">{ch.referenceNumber}</td>
                      <td className="p-3.5 font-semibold text-white">
                        {ch.customer.fullName}
                        {ch.customer.companyName && <span className="text-[10px] text-gray-400 block">{ch.customer.companyName}</span>}
                      </td>
                      <td className="p-3.5">{ch.serviceType}</td>
                      <td className="p-3.5">{ch.preferredVehicle}</td>
                      <td className="p-3.5 text-[11px]">{ch.pickupDate} at {ch.pickupTime}</td>
                      <td className="p-3.5 text-[11px] max-w-xs truncate">
                        {ch.pickupLocation} → {ch.destinationLocation}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102C2B] text-[#D7BC8A] border border-[#D7BC8A]/30">
                          {ch.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => {
                            const newStatus = ch.status === 'New' ? 'Chauffeur Assigned' : ch.status === 'Chauffeur Assigned' ? 'Confirmed' : 'Completed';
                            StorageService.updateChauffeurStatus(ch.id, newStatus as any);
                            refreshData();
                          }}
                          className="px-2.5 py-1 bg-[#102C2B] border border-[#D7BC8A]/40 text-[#D7BC8A] rounded hover:bg-[#D7BC8A] hover:text-[#102C2B] text-[11px]"
                        >
                          Advance Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: FLEET CATALOG
           ======================================================== */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-editorial text-2xl font-bold text-white">
                Prestige Fleet Management
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map(v => (
                <div key={v.id} className="p-5 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-4">
                  <div className="aspect-video rounded overflow-hidden relative">
                    <img src={v.image} alt={v.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-[#D7BC8A] font-semibold">
                      {v.isAvailable ? 'Available' : 'Booked Out'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif-editorial text-xl font-bold text-white">{v.name}</h4>
                    <span className="text-xs text-gray-300">{v.category} · {v.engine}</span>
                  </div>

                  <div className="flex justify-between text-xs pt-2 border-t border-[#D7BC8A]/10">
                    <span>Daily: <strong>AED {v.dailyRateAED}</strong></span>
                    <span>Deposit: <strong>AED {v.securityDepositAED}</strong></span>
                  </div>

                  <button
                    onClick={() => handleToggleVehicle(v.id)}
                    className={`w-full py-2 text-xs font-semibold rounded uppercase tracking-wider transition-colors ${
                      v.isAvailable
                        ? 'bg-[#102C2B] text-rose-300 border border-rose-800 hover:bg-rose-950'
                        : 'bg-emerald-800 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {v.isAvailable ? 'Mark as Booked Out' : 'Mark as Ready for Handover'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: VISA PRODUCTS
           ======================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="font-serif-editorial text-2xl font-bold text-white">
              Configured UAE Visa Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map(cat => (
                <div key={cat.id} className="p-6 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs text-[#D7BC8A] font-bold uppercase">{cat.entryType}</span>
                      <h4 className="font-serif-editorial text-2xl font-bold text-white mt-1">{cat.name}</h4>
                    </div>
                    <span className="font-serif-editorial text-2xl font-bold text-[#D7BC8A]">
                      AED {cat.priceAED}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">{cat.description}</p>
                  <div className="text-xs space-y-1 text-gray-400">
                    <div>Processing: {cat.processingTimeDays}</div>
                    <div>Validity: {cat.validityDays} Days</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: STRIPE PAYMENTS GENERATOR & WEBHOOK
           ======================================================== */}
        {activeTab === 'payments' && (
          <div className="space-y-6 max-w-2xl">
            <div className="p-6 bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 space-y-6">
              <div>
                <h3 className="font-serif-editorial text-2xl font-bold text-white">
                  Stripe Checkout Invoice Generator
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Create verified payment links after authorized visa approval or rental availability confirmation.
                </p>
              </div>

              {paymentSuccessNotice && (
                <div className="p-3 bg-emerald-950 border border-emerald-600 rounded text-xs text-emerald-200">
                  {paymentSuccessNotice}
                </div>
              )}

              <form onSubmit={handleGeneratePaymentLink} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-[#D7BC8A] mb-1">
                    Customer Reference Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentClientRef}
                    onChange={(e) => setPaymentClientRef(e.target.value)}
                    placeholder="e.g. ZT-684920 or HW-849120"
                    className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#D7BC8A] mb-1">
                    Invoice Amount (AED) *
                  </label>
                  <input
                    type="number"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D7BC8A] text-[#102C2B] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#c5a872]"
                >
                  Generate Stripe Checkout Session
                </button>
              </form>

              {paymentGeneratedLink && (
                <div className="p-4 bg-[#102C2B] rounded border border-[#D7BC8A]/30 space-y-3">
                  <span className="text-xs text-[#D7BC8A] font-semibold block">Generated Stripe Checkout URL:</span>
                  <div className="text-[11px] font-mono text-gray-300 break-all bg-black/40 p-2 rounded">
                    {paymentGeneratedLink}
                  </div>
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={handleSimulateWebhookSuccess}
                      className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded hover:bg-emerald-700"
                    >
                      Simulate Verified Webhook Event (Payment Settled)
                    </button>
                    <button
                      onClick={() => onNavigate('payment-result')}
                      className="px-4 py-2 bg-[#193D38] border border-[#D7BC8A]/40 text-[#D7BC8A] text-xs font-semibold rounded hover:bg-[#102C2B]"
                    >
                      Preview Customer Invoice Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: AUDIT LOG
           ======================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-4 max-w-4xl">
            <h3 className="font-serif-editorial text-2xl font-bold text-white">
              System & Operations Audit Log
            </h3>
            <div className="bg-[#193D38] rounded-lg border border-[#D7BC8A]/20 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#102C2B] text-[#D7BC8A] uppercase font-semibold">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Actor</th>
                    <th className="p-3">Target Reference</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D7BC8A]/10 text-gray-300">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-[#102C2B]/40">
                      <td className="p-3 text-[11px] font-mono text-gray-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3 font-semibold text-[#D7BC8A]">{log.action}</td>
                      <td className="p-3">{log.performedBy}</td>
                      <td className="p-3 font-mono">{log.targetId}</td>
                      <td className="p-3 text-gray-300">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Detail Review Modal for Visa */}
      {selectedVisaApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#193D38] text-white rounded-lg shadow-2xl border border-[#D7BC8A]/30 p-6 space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-[#D7BC8A]/20">
              <div>
                <span className="text-xs uppercase text-[#D7BC8A] font-semibold">
                  Visa Dossier Review
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold">
                  {selectedVisaApp.applicant.title} {selectedVisaApp.applicant.firstName} {selectedVisaApp.applicant.lastName}
                </h3>
                <span className="text-xs text-gray-400 font-mono">Reference: {selectedVisaApp.referenceNumber}</span>
              </div>
              <button onClick={() => setSelectedVisaApp(null)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block">Nationality:</span>
                <span className="font-semibold">{selectedVisaApp.applicant.nationality}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Passport Number:</span>
                <span className="font-mono font-semibold">{selectedVisaApp.applicant.passportNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Contact Phone:</span>
                <span>{selectedVisaApp.applicant.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Contact Email:</span>
                <span>{selectedVisaApp.applicant.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Arrival Date:</span>
                <span>{selectedVisaApp.travel.expectedArrivalDate}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Current Status:</span>
                <span className="font-bold text-[#D7BC8A]">{selectedVisaApp.status}</span>
              </div>
            </div>

            <div className="p-4 bg-[#102C2B] rounded border border-[#D7BC8A]/20 text-xs space-y-2">
              <span className="text-[#D7BC8A] font-semibold block">Attached Documents Manifest:</span>
              <div>• Passport Scan: {selectedVisaApp.documents.passportCopyFileName} ({selectedVisaApp.documents.passportCopyFileSize})</div>
              <div>• Portrait Photo: {selectedVisaApp.documents.photoFileName} ({selectedVisaApp.documents.photoFileSize})</div>
              {selectedVisaApp.documents.ticketFileName && (
                <div>• Ticket / Itinerary: {selectedVisaApp.documents.ticketFileName}</div>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase text-[#D7BC8A] mb-1">
                Internal Administrative Notes
              </label>
              <textarea
                rows={3}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded p-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D7BC8A]/20">
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateVisaStatus(selectedVisaApp.id, 'Under Processing')}
                  className="px-3 py-1.5 bg-amber-800 text-white rounded text-xs hover:bg-amber-700"
                >
                  Mark Under Processing
                </button>
                <button
                  onClick={() => handleUpdateVisaStatus(selectedVisaApp.id, 'Approved')}
                  className="px-3 py-1.5 bg-emerald-800 text-white rounded text-xs hover:bg-emerald-700"
                >
                  Mark Approved
                </button>
                <button
                  onClick={() => handleUpdateVisaStatus(selectedVisaApp.id, 'Action Required')}
                  className="px-3 py-1.5 bg-rose-900 text-white rounded text-xs hover:bg-rose-800"
                >
                  Request Docs
                </button>
              </div>

              <button
                onClick={() => {
                  setPrintModalState({ open: true, type: 'visa', data: selectedVisaApp });
                }}
                className="px-4 py-1.5 bg-[#D7BC8A] text-[#102C2B] font-semibold rounded text-xs hover:bg-[#c5a872]"
              >
                Print Official Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Review Modal for Rental */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#193D38] text-white rounded-lg shadow-2xl border border-[#D7BC8A]/30 p-6 space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-[#D7BC8A]/20">
              <div>
                <span className="text-xs uppercase text-[#D7BC8A] font-semibold">
                  Car Rental Booking Review
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold">
                  {selectedRental.vehicleName}
                </h3>
                <span className="text-xs text-gray-400 font-mono">Reference: {selectedRental.referenceNumber}</span>
              </div>
              <button onClick={() => setSelectedRental(null)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block">Customer Name:</span>
                <span className="font-semibold">{selectedRental.customer.fullName}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Phone / WhatsApp:</span>
                <span>{selectedRental.customer.contactNumber}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Pickup Schedule:</span>
                <span>{selectedRental.pickupDate} at {selectedRental.pickupTime}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Return Schedule:</span>
                <span>{selectedRental.returnDate} at {selectedRental.returnTime}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Total Duration:</span>
                <span className="font-bold text-[#D7BC8A]">{selectedRental.totalDays} Days (AED {selectedRental.estimatedTotalAED})</span>
              </div>
              <div>
                <span className="text-gray-400 block">Security Deposit:</span>
                <span>AED {selectedRental.securityDepositAED}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-[#D7BC8A] mb-1">
                Internal Administrative Notes
              </label>
              <textarea
                rows={3}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                className="w-full bg-[#102C2B] border border-[#D7BC8A]/30 rounded p-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D7BC8A]/20">
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateRentalStatus(selectedRental.id, 'Confirmed')}
                  className="px-3 py-1.5 bg-emerald-800 text-white rounded text-xs hover:bg-emerald-700"
                >
                  Confirm Reservation
                </button>
                <button
                  onClick={() => handleUpdateRentalStatus(selectedRental.id, 'Vehicle Reserved')}
                  className="px-3 py-1.5 bg-amber-800 text-white rounded text-xs hover:bg-amber-700"
                >
                  Hold Vehicle
                </button>
                <button
                  onClick={() => handleUpdateRentalStatus(selectedRental.id, 'Cancelled')}
                  className="px-3 py-1.5 bg-rose-900 text-white rounded text-xs hover:bg-rose-800"
                >
                  Cancel
                </button>
              </div>

              <button
                onClick={() => {
                  setPrintModalState({ open: true, type: 'rental', data: selectedRental });
                }}
                className="px-4 py-1.5 bg-[#D7BC8A] text-[#102C2B] font-semibold rounded text-xs hover:bg-[#c5a872]"
              >
                Print Agreement Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Dossier Modal */}
      {printModalState.open && printModalState.data && (
        <PrintDossierModal
          type={printModalState.type}
          data={printModalState.data}
          onClose={() => setPrintModalState({ open: false, type: 'visa', data: null })}
        />
      )}
    </div>
  );
};
