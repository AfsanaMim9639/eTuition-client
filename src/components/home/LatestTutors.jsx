import React from 'react';
import { Award, Star } from 'lucide-react';

const LatestTutors = () => {
  const tutors = [
    {
      id: 1,
      name: 'Dr. Kamal Hassan',
      subject: 'Mathematics Expert',
      education: 'B.Sc in Mathematics • BUET',
      rating: 4.9,
      students: 50,
      experience: 5
    },
    {
      id: 2,
      name: 'Fatima Rahman',
      subject: 'Physics Specialist',
      education: 'M.Sc in Physics • DU',
      rating: 4.8,
      students: 42,
      experience: 4
    },
    {
      id: 3,
      name: 'Rafiq Ahmed',
      subject: 'Chemistry Teacher',
      education: 'B.Sc in Chemistry • CUET',
      rating: 4.7,
      students: 38,
      experience: 6
    },
    {
      id: 4,
      name: 'Nusrat Jahan',
      subject: 'English Literature',
      education: 'M.A in English • JU',
      rating: 4.9,
      students: 55,
      experience: 7
    }
  ];

  return (
    <section className="relative py-20 z-10 bg-[#0a0f0d]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Featured Tutors
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Meet our verified and experienced educators</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutors.map((tutor, idx) => (
            <div
              key={tutor.id}
              className="group relative bg-gradient-to-b from-[#0a0f0d] to-[#0a0f0d]/40 border border-[#00ff88]/20 rounded-xl p-6 hover:border-[#00ff88] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#00ff88]/20"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
              }}
            >
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-full mx-auto" />
                  <div className="absolute -bottom-2 -right-2 bg-[#00ff88] text-[#0a0f0d] rounded-full p-2">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{tutor.name}</h3>
                <p className="text-[#00ff88] text-sm mb-2">{tutor.subject}</p>
                <p className="text-gray-400 text-sm mb-4">{tutor.education}</p>

                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 fill-[#00ff88] text-[#00ff88]" />
                  ))}
                  <span className="text-gray-300 text-sm ml-2">({tutor.rating})</span>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-4 text-sm">
                  <div className="text-center">
                    <p className="text-[#00ff88] font-bold">{tutor.students}+</p>
                    <p className="text-gray-400">Students</p>
                  </div>
                  <div className="w-px h-8 bg-[#00ff88]/20" />
                  <div className="text-center">
                    <p className="text-[#00ff88] font-bold">{tutor.experience} yrs</p>
                    <p className="text-gray-400">Experience</p>
                  </div>
                </div>

                <button className="w-full py-2 bg-[#00ff88]/10 border border-[#00ff88] text-[#00ff88] rounded-lg group-hover:bg-[#00ff88] group-hover:text-[#0a0f0d] transition-all duration-300 font-semibold">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all duration-300">
            Browse All Tutors
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

export default LatestTutors;