import React from 'react';
import { BookOpen, MapPin, DollarSign, Clock } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Latest Tuition Posts
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Find the perfect opportunity for your expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((tuition, idx) => (
            <div
              key={tuition.id}
              className="group relative bg-[#0a0f0d]/40 backdrop-blur-sm border border-[#00ff88]/20 rounded-xl p-6 hover:border-[#00ff88] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#00ff88]/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="absolute top-4 right-4 bg-[#00ff88]/20 text-[#00ff88] px-3 py-1 rounded-full text-sm font-semibold">
                New
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#0a0f0d]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{tuition.title}</h3>
                  <p className="text-gray-400 text-sm">{tuition.class} • {tuition.batch}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-[#00ff88]" />
                  <span className="text-sm">{tuition.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-4 h-4 mr-2 text-[#00ff88]" />
                  <span className="text-sm">{tuition.budget}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-[#00ff88]" />
                  <span className="text-sm">{tuition.schedule}</span>
                </div>
              </div>

              <button className="w-full py-2 bg-[#00ff88]/10 border border-[#00ff88] text-[#00ff88] rounded-lg group-hover:bg-[#00ff88] group-hover:text-[#0a0f0d] transition-all duration-300 font-semibold">
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all duration-300">
            View All Tuitions
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