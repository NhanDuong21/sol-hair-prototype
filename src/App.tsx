import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { BookingProvider } from './state/BookingContext';
import { AppHeader } from './components/layout/AppHeader';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { Footer } from './components/layout/Footer';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { StylistSelectionPage } from './pages/StylistSelectionPage';
import { DateTimeSelectionPage } from './pages/DateTimeSelectionPage';
import { BookingSummaryPage } from './pages/BookingSummaryPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { AccountPage } from './pages/AccountPage';
import { HomePage } from './pages/HomePage';

// Scroll to top helper on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BookingProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-canvas text-text-primary selection:bg-terracotta/20 selection:text-terracotta-dark pb-16 lg:pb-0">
          <AppHeader />

          <main className="flex-1">
            <Routes>
              {/* Editorial homepage */}
              <Route path="/" element={<HomePage />} />

              {/* Service Discovery & Detail */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

              {/* Booking Flow Wizard */}
              <Route path="/booking/stylist" element={<StylistSelectionPage />} />
              <Route path="/booking/time" element={<DateTimeSelectionPage />} />
              <Route path="/booking/summary" element={<BookingSummaryPage />} />
              <Route path="/booking/success" element={<BookingSuccessPage />} />

              {/* Customer Dashboard & History */}
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/account" element={<AccountPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <MobileNavigation />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;
