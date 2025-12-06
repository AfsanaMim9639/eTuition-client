import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaBook, FaDollarSign, FaClock } from 'react-icons/fa';

const Modern3DSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample tuition data
  const tuitions = [
    {
      id: 1,
      title: "Mathematics Tutor Needed",
      subject: "Higher Mathematics",
      class: "Class 11-12",
      location: "Dhanmondi, Dhaka",
      budget: "8,000 BDT/month",
      schedule: "3 days/week",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&h=300&fit=crop",
      bgColor: "from-[#00ff88] to-[#00ffcc]"
    },
    {
      id: 2,
      title: "Physics Tutor Required",
      subject: "Physics",
      class: "Class 9-10",
      location: "Gulshan, Dhaka",
      budget: "6,500 BDT/month",
      schedule: "4 days/week",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
      bgColor: "from-[#00ffcc] to-[#00ff88]"
    },
    {
      id: 3,
      title: "Chemistry Home Tuition",
      subject: "Chemistry",
      class: "HSC 1st Year",
      location: "Mirpur, Dhaka",
      budget: "7,000 BDT/month",
      schedule: "3 days/week",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop",
      bgColor: "from-[#00ff88] to-[#33ffaa]"
    },
    {
      id: 4,
      title: "English Language Tutor",
      subject: "English",
      class: "Class 6-8",
      location: "Uttara, Dhaka",
      budget: "5,500 BDT/month",
      schedule: "2 days/week",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop",
      bgColor: "from-[#00ffcc] to-[#00ccaa]"
    },
    {
      id: 5,
      title: "Computer Science Tuition",
      subject: "Programming",
      class: "University Level",
      location: "Banani, Dhaka",
      budget: "10,000 BDT/month",
      schedule: "2 days/week",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=300&fit=crop",
      bgColor: "from-[#33ffaa] to-[#00ff88]"
    }
  ];

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tuitions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, tuitions.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tuitions.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tuitions.length) % tuitions.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full bg-[#050807] py-20 overflow-hidden">
      <div className="w-full max-w-8xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#050807] bg-clip-text text-transparent">
              Latest Tuitions
            </span>
          </h2>
          <p className="text-[#050807] text-lg">Find your perfect teaching opportunity</p>
        </div>

        {/* Slider Container - Centered with proper spacing */}
        <div className="relative w-full">
          
          {/* Navigation Buttons - Outside of slider with proper spacing */}
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-[#0d1612] border-2 border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 hover:border-[#00ff88]/50 transition-all hover:scale-110 shadow-lg hover:shadow-[#00ff88]/30"
          >
            <FaChevronLeft size={24} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-[#0d1612] border-2 border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 hover:border-[#00ff88]/50 transition-all hover:scale-110 shadow-lg hover:shadow-[#00ff88]/30"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Main Slider - Properly Centered */}
          <div className="relative h-[600px] perspective-1000 flex items-center justify-center">
            
            {/* Cards */}
            <div className="relative w-full h-full flex items-center justify-center">
              {tuitions.map((tuition, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;
                
                return (
                  <div
                    key={tuition.id}
                    className="absolute transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform: `
                        translateX(${offset * 280}px) 
                        translateZ(${isActive ? 0 : -200}px)
                        rotateY(${offset * -15}deg)
                        scale(${isActive ? 1 : 0.85})
                      `,
                      opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.5,
                      zIndex: isActive ? 20 : 10 - Math.abs(offset),
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                    onClick={() => !isActive && goToSlide(index)}
                  >
                    {/* Card */}
                    <div className={`w-[350px] h-[500px] rounded-3xl overflow-hidden border-2 ${
                      isActive ? 'border-[#00ff88]/50' : 'border-[#00ff88]/20'
                    } bg-[#0d1612] shadow-2xl ${
                      isActive ? 'shadow-[#00ff88]/30' : 'shadow-black/50'
                    }`}>
                      
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={tuition.image} 
                          alt={tuition.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${tuition.bgColor} opacity-40`} />
                        
                        {/* Badge */}
                        <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-[#00ff88]/30">
                          <span className="text-[#00ff88] font-semibold text-sm">New</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">
                          {tuition.title}
                        </h3>
                        
                        {/* Subject & Class */}
                        <div className="flex items-center gap-2 mb-4">
                          <FaBook className="text-[#00ff88]" />
                          <span className="text-white/80">{tuition.subject}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/60">{tuition.class}</span>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-6">
                          {/* Location */}
                          <div className="flex items-center gap-3 text-white/70">
                            <FaMapMarkerAlt className="text-[#00ff88]" />
                            <span>{tuition.location}</span>
                          </div>

                          {/* Budget */}
                          <div className="flex items-center gap-3 text-white/70">
                            <FaDollarSign className="text-[#00ff88]" />
                            <span className="font-semibold text-[#00ff88]">{tuition.budget}</span>
                          </div>

                          {/* Schedule */}
                          <div className="flex items-center gap-3 text-white/70">
                            <FaClock className="text-[#00ff88]" />
                            <span>{tuition.schedule}</span>
                          </div>
                        </div>

                        {/* Apply Button */}
                        <button className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#00ff88] to-[#00ffcc] hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all duration-300 hover:scale-105">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {tuitions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-[#00ff88] to-[#00ffcc]'
                  : 'w-3 h-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Custom Styles for 3D Effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Modern3DSlider;