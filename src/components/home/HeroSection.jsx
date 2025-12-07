import { Link } from 'react-router-dom';
import { FaSearch, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      buttonsRef.current.children,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Floating animation for icons
    gsap.to('.float-icon', {
      y: -20,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Animated background circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-pink/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
            Find Your Perfect{' '}
            <span className="gradient-text">Tutor</span>
            <br />
            Start Learning{' '}
            <span className="neon-text-blue">Today</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-400 mb-12">
            Connect with qualified tutors and achieve your academic goals.
            <br />
            Quality education is just a click away!
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              to="/tuitions"
              className="btn btn-neon-pink px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 w-full sm:w-auto"
            >
              <FaSearch />
              <span>Find Tuitions</span>
            </Link>
            <Link 
              to="/tutors"
              className="btn btn-neon-blue px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 w-full sm:w-auto"
            >
              <FaChalkboardTeacher />
              <span>Browse Tutors</span>
            </Link>
            <Link 
              to="/register"
              className="btn btn-neon-green px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 w-full sm:w-auto"
            >
              <FaGraduationCap />
              <span>Register Now</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-neon card-neon-pink p-6 rounded-xl float-icon">
              <div className="text-4xl font-bold neon-text-pink mb-2">500+</div>
              <div className="text-gray-400">Active Tutors</div>
            </div>
            <div className="card-neon card-neon-blue p-6 rounded-xl float-icon" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold neon-text-blue mb-2">1000+</div>
              <div className="text-gray-400">Students</div>
            </div>
            <div className="card-neon card-neon-pink p-6 rounded-xl float-icon" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold neon-text-green mb-2">50+</div>
              <div className="text-gray-400">Subjects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;