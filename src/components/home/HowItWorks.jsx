import React from 'react';
import { Users, BookOpen, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Users,
      title: 'Create Account',
      description: 'Register as a student or tutor in minutes'
    },
    {
      icon: BookOpen,
      title: 'Post or Browse',
      description: 'Students post tuitions, tutors browse and apply'
    },
    {
      icon: TrendingUp,
      title: 'Start Learning',
      description: 'Connect, manage payments, and track progress'
    }
  ];

  return (
    <section className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Get started in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#00ffcc]" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative text-center group">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-24 h-24 bg-[#0a0f0d] border-4 border-[#00ff88] rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-10 h-10 text-[#00ff88]" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#00ff88] to-[#00ffcc] rounded-full flex items-center justify-center text-[#0a0f0d] font-bold">
                  {idx + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;