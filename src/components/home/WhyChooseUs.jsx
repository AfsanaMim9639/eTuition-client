import React from 'react';
import { Shield, Zap, DollarSign, Clock, TrendingUp, Award } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const WhyChooseUs = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Shield,
      title: 'Verified Tutors',
      description: 'All tutors are verified with proper credentials and background checks'
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'AI-powered matching connects students with the perfect tutor'
    },
    {
      icon: DollarSign,
      title: 'Secure Payments',
      description: 'Safe and transparent payment system with transaction history'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor academic progress with detailed analytics and reports'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Regular quality checks and feedback system ensure excellence'
    }
  ];

  return (
    <section className={`relative py-20 z-10 ${
      isDark ? 'bg-[#0a0f0d]/50' : 'bg-gradient-to-b from-emerald-200 via-teal-100 to-emerald-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${
            isDark ? '' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              Why Choose eTuitionBd
            </span>
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-800'
          }`}>
            The ultimate platform for tuition management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                isDark
                  ? 'bg-[#0a0f0d]/40 border-[#00ff88]/20 hover:border-[#00ff88] hover:shadow-[#00ff88]/20'
                  : 'bg-white/80 border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-300/50'
              }`}
            >
              <div className={`w-14 h-14 bg-gradient-to-br from-[#00ff88] to-[#00ffcc] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                isDark ? '' : 'shadow-lg shadow-emerald-300/50'
              }`}>
                <feature.icon className={`w-7 h-7 ${
                  isDark ? 'text-[#0a0f0d]' : 'text-white'
                }`} />
              </div>

              <h3 className={`text-xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-800'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;