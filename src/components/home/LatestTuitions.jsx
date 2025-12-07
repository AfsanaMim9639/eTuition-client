import React from 'react';
import { BookOpen, MapPin, DollarSign, Clock, ChevronRight } from 'lucide-react';

const LatestTuitions = () => {
  const tuitions = [
    {
      id: 1,
      title: 'Mathematics Tutor Needed',
      class: 'Class 10',
      batch: 'SSC Batch',
      location: 'Dhanmondi, Dhaka',
      budget: '5,000 - 7,000 BDT/month',
      schedule: '3 days per week'
    },
    {
      id: 2,
      title: 'Physics Teacher Required',
      class: 'Class 11',
      batch: 'HSC Batch',
      location: 'Mirpur, Dhaka',
      budget: '6,000 - 8,000 BDT/month',
      schedule: '4 days per week'
    },
    {
      id: 3,
      title: 'English Language Tutor',
      class: 'Class 8',
      batch: 'JSC Batch',
      location: 'Gulshan, Dhaka',
      budget: '4,000 - 6,000 BDT/month',
      schedule: '2 days per week'
    },
    {
      id: 4,
      title: 'Chemistry Expert Needed',
      class: 'Class 12',
      batch: 'HSC Batch',
      location: 'Uttara, Dhaka',
      budget: '7,000 - 9,000 BDT/month',
      schedule: '3 days per week'
    },
    {
      id: 5,
      title: 'Biology Teacher Required',
      class: 'Class 10',
      batch: 'SSC Batch',
      location: 'Banani, Dhaka',
      budget: '5,500 - 7,500 BDT/month',
      schedule: '3 days per week'
    },
    {
      id: 6,
      title: 'Computer Science Tutor',
      class: 'Class 11',
      batch: 'HSC Batch',
      location: 'Mohakhali, Dhaka',
      budget: '6,500 - 8,500 BDT/month',
      schedule: '2 days per week'
    }
  ];

  return (
    <section className="relative py-20 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Latest Tuition Posts
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Find the perfect opportunity for your expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions.map((tuition, idx) => (
            <div
              key={tuition.id}
              className="group relative bg-gradient-to-br from-[#0a0f0d] to-[#0f1512] backdrop-blur-sm border border-[#00ff88]/20 rounded-2xl overflow-hidden hover:border-[#00ff88] transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#00ff88]/30"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
              }}
            >
              {/* Header with Badge */}
              <div className="relative bg-gradient-to-r from-[#00ff88]/10 to-[#00ffcc]/10 p-8 pb-10 border-b border-[#00ff88]/10">
                <div className="absolute top-5 right-5 bg-[#00ff88] text-[#0a0f0d] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-[#00ff88]/50">
                  New
                </div>

                <div className="flex items-start space-x-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl blur opacity-40"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-xl flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-[#0a0f0d]" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#00ff88] transition-colors">
                      {tuition.title}
                    </h3>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#00ff88] text-sm font-semibold">{tuition.class}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{tuition.batch}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-9 space-y-6">
                {/* Location */}
                <div className="flex items-start group/item">
                  <div className="w-12 h-12 rounded-lg bg-[#00ff88]/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:bg-[#00ff88]/20 transition-colors">
                    <MapPin className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Location</p>
                    <p className="text-white font-medium text-[15px] leading-relaxed">{tuition.location}</p>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-start group/item">
                  <div className="w-12 h-12 rounded-lg bg-[#00ff88]/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:bg-[#00ff88]/20 transition-colors">
                    <DollarSign className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Budget</p>
                    <p className="text-white font-medium text-[15px] leading-relaxed">{tuition.budget}</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start group/item">
                  <div className="w-12 h-12 rounded-lg bg-[#00ff88]/10 flex items-center justify-center mr-4 flex-shrink-0 group-hover/item:bg-[#00ff88]/20 transition-colors">
                    <Clock className="w-5 h-5 text-[#00ff88]" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Schedule</p>
                    <p className="text-white font-medium text-[15px] leading-relaxed">{tuition.schedule}</p>
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div className="px-8 pb-8">
                <button className="w-full py-4 bg-[#00ff88]/10 border-2 border-[#00ff88]/30 text-[#00ff88] rounded-xl group-hover:bg-[#00ff88] group-hover:border-[#00ff88] group-hover:text-[#0a0f0d] transition-all duration-300 font-bold flex items-center justify-center gap-2 relative overflow-hidden text-base">
                  <span className="relative z-10">View Details</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Decorative Corner Gradient */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#00ff88]/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="group px-10 py-4 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#00ff88]/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
            View All Tuitions
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LatestTuitions;