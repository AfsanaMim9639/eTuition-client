import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ParticleBackground from '../components/shared/ParticleBackground';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0f0d]">
      <ParticleBackground />
      <Navbar />
      
      {/* Main content wrapper - mt instead of pt to push content down */}
      <main className="mt-20 relative z-10">
        <Outlet />
      </main>
      
      {/* Footer without any gap */}
      <Footer />
    </div>
  );
};

export default MainLayout;