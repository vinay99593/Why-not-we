/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { Footer } from './components/common/Footer';
import { LocationModal } from './components/common/LocationModal';
import { InvoiceModal } from './components/common/InvoiceModal';
import { CallModal } from './components/common/CallModal';
import { ChatDrawer } from './components/chat/ChatDrawer';
import { CartDrawer } from './components/grocery/CartDrawer';
import { ProviderRegistrationModal } from './components/provider/ProviderRegistrationModal';
import { HelpSupportModal } from './components/static/HelpSupportModal';
import { LegalModal } from './components/static/LegalModal';

// Pages
import { HomePage } from './components/home/HomePage';
import { ServicesPage } from './components/customer/ServicesPage';
import { GrocerySection } from './components/grocery/GrocerySection';
import { FuelDeliverySection } from './components/fuel/FuelDeliverySection';
import { EmergencyServicesSection } from './components/emergency/EmergencyServicesSection';
import { OrdersPage } from './components/customer/OrdersPage';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navbar with location, search, role toggle, cart & notifications */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'services' && <ServicesPage />}
        {activePage === 'grocery' && <GrocerySection />}
        {activePage === 'fuel' && <FuelDeliverySection />}
        {activePage === 'emergency' && <EmergencyServicesSection />}
        {activePage === 'orders' && <OrdersPage />}
        {activePage === 'customer_dashboard' && <CustomerDashboard />}
        {activePage === 'provider_dashboard' && <ProviderDashboard />}
        {activePage === 'admin_dashboard' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar />

      {/* Global Modals & Slide-over Drawers */}
      <LocationModal />
      <CartDrawer />
      <ChatDrawer />
      <CallModal />
      <InvoiceModal />
      <ProviderRegistrationModal />
      <HelpSupportModal />
      <LegalModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
