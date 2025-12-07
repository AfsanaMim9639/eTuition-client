import React from 'react';
import HeroSection from '../components/home/HeroSection';
import LatestTuitions from '../components/home/LatestTuitions';
import LatestTutors from '../components/home/LatestTutors';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home = () => {
  return (
    <div className="bg-[#0a0f0d] text-white min-h-screen overflow-x-hidden">
      <HeroSection />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
      
      {/* CTA Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-[#0a0f0d]/60 backdrop-blur-xl border border-[#00ff88]/30 rounded-3xl p-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
                  Ready to Start Your Journey?
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students and tutors already using eTuitionBd to achieve academic excellence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105">
                  Register Now
                </button>
                <button className="px-8 py-4 border-2 border-[#00ff88] text-[#00ff88] rounded-lg font-bold text-lg hover:bg-[#00ff88]/10 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;