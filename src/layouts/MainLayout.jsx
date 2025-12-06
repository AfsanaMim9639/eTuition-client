// src/layouts/MainLayout.jsx
import Modern3DSlider from '../components/shared/Modern3DSlider';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#050807] via-[#0a0f0d] to-[#0d1612]">
      {/* Navbar - Fixed at top with highest z-index */}
      <Navbar />
      
      {/* Main Content - With proper spacing for fixed navbar */}
      <main className="w-full">
        <Modern3DSlider />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;