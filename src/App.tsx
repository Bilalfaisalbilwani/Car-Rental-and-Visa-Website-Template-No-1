import React, { useState, useEffect } from 'react';
import { NavigationPage, Vehicle, VisaApplication, RentalEnquiry, ChauffeurEnquiry } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { VisaServicesPage } from './pages/VisaServicesPage';
import { VisaApplicationPage } from './pages/VisaApplicationPage';
import { CarRentalPage } from './pages/CarRentalPage';
import { ChauffeurPage } from './pages/ChauffeurPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { PaymentResultPage } from './pages/PaymentResultPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { VehicleBookingModal } from './components/fleet/VehicleBookingModal';
import { VehicleDetailModal } from './components/fleet/VehicleDetailModal';
import { ChauffeurBookingModal } from './components/chauffeur/ChauffeurBookingModal';
import { CONTACT_DETAILS } from './data/mockData';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedVisaCategoryId, setSelectedVisaCategoryId] = useState<string>('visa-30-days');

  // Modals state
  const [activeSpecsVehicle, setActiveSpecsVehicle] = useState<Vehicle | null>(null);
  const [activeBookingVehicle, setActiveBookingVehicle] = useState<Vehicle | null>(null);
  const [bookingMode, setBookingMode] = useState<'Self Drive' | 'Chauffeur Driven'>('Self Drive');
  const [chauffeurModalOpen, setChauffeurModalOpen] = useState<boolean>(false);

  // Confirmation screen payload
  const [confirmationPayload, setConfirmationPayload] = useState<{
    type: 'visa' | 'rental' | 'chauffeur';
    data: VisaApplication | RentalEnquiry | ChauffeurEnquiry;
  } | null>(null);

  // Scroll to top on page change
  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for vehicle booking flow
  const handleOpenSpecs = (vehicle: Vehicle) => {
    setActiveSpecsVehicle(vehicle);
  };

  const handleOpenBooking = (vehicle: Vehicle, mode: 'Self Drive' | 'Chauffeur Driven' = 'Self Drive') => {
    setActiveBookingVehicle(vehicle);
    setBookingMode(mode);
  };

  const handleRentalSuccess = (enquiry: RentalEnquiry) => {
    setActiveBookingVehicle(null);
    setConfirmationPayload({
      type: 'rental',
      data: enquiry,
    });
    navigateTo('confirmation');
  };

  const handleVisaSuccess = (app: VisaApplication) => {
    setConfirmationPayload({
      type: 'visa',
      data: app,
    });
    navigateTo('confirmation');
  };

  const handleChauffeurSuccess = (enquiry: ChauffeurEnquiry) => {
    setChauffeurModalOpen(false);
    setConfirmationPayload({
      type: 'chauffeur',
      data: enquiry,
    });
    navigateTo('confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1E7] text-[#182B27]">
      {/* Top Bar Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectVehicle={handleOpenSpecs}
            onRequestChauffeur={() => setChauffeurModalOpen(true)}
          />
        )}

        {currentPage === 'visa-services' && (
          <VisaServicesPage
            onNavigate={navigateTo}
            onSelectCategoryForApplication={(catId) => setSelectedVisaCategoryId(catId)}
          />
        )}

        {currentPage === 'visa-application' && (
          <VisaApplicationPage
            initialCategoryId={selectedVisaCategoryId}
            onNavigate={navigateTo}
            onSuccess={handleVisaSuccess}
          />
        )}

        {currentPage === 'car-rental' && (
          <CarRentalPage
            onNavigate={navigateTo}
            onSelectVehicleForSpecs={handleOpenSpecs}
            onSelectVehicleForBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'chauffeur-services' && (
          <ChauffeurPage
            onNavigate={navigateTo}
            onRequestChauffeurModal={() => setChauffeurModalOpen(true)}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {currentPage === 'privacy' && <PrivacyPolicyPage onNavigate={navigateTo} />}

        {currentPage === 'terms' && <TermsPage onNavigate={navigateTo} />}

        {currentPage === 'confirmation' && confirmationPayload && (
          <ConfirmationPage
            type={confirmationPayload.type}
            data={confirmationPayload.data}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'payment-result' && (
          <PaymentResultPage onNavigate={navigateTo} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard onNavigate={navigateTo} />
        )}

        {currentPage === '404' && <NotFoundPage onNavigate={navigateTo} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Quick Concierge Action Button */}
      <aside aria-label="Concierge Support" className="fixed bottom-6 right-6 z-30 no-print">
        <a
          href={`https://wa.me/${CONTACT_DETAILS.whatsappDigits}?text=${encodeURIComponent(
            'Hello Zone Tourism & Hotwheels, I am seeking concierge assistance with Dubai visas / luxury car rentals.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Concierge"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-105 group border border-white/20"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="text-xs font-semibold hidden md:inline pr-1">
            WhatsApp Concierge
          </span>
        </a>
      </aside>

      {/* Modals */}
      {activeSpecsVehicle && (
        <VehicleDetailModal
          vehicle={activeSpecsVehicle}
          onClose={() => setActiveSpecsVehicle(null)}
          onBookNow={(v, mode) => {
            setActiveSpecsVehicle(null);
            handleOpenBooking(v, mode);
          }}
        />
      )}

      {activeBookingVehicle && (
        <VehicleBookingModal
          vehicle={activeBookingVehicle}
          initialMode={bookingMode}
          onClose={() => setActiveBookingVehicle(null)}
          onSuccess={handleRentalSuccess}
        />
      )}

      {chauffeurModalOpen && (
        <ChauffeurBookingModal
          onClose={() => setChauffeurModalOpen(false)}
          onSuccess={handleChauffeurSuccess}
        />
      )}
    </div>
  );
}
