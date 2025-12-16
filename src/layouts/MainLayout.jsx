import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ParticleBackground from '../components/shared/ParticleBackground';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
  const location = useLocation();

  // ✅ Force scroll on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#0a0f0d] flex flex-col">
      <ScrollToTop />
      
      {/* Fixed position for particle background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Navbar - fixed at top */}
      <Navbar />
      
      {/* Main content wrapper - grows to fill space */}
      <main className="flex-1 relative z-10 mt-20">
        <Outlet />
      </main>
      
      {/* Footer - always at bottom */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;