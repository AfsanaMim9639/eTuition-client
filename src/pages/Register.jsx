import React, { useState } from 'react';

const Register = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      alert('Please select your role (Student or Tutor)');
      return;
    }

    const registrationData = {
      ...formData,
      role: selectedRole
    };

    console.log('Registration Data:', registrationData);
    
    // Here you would integrate with Firebase Authentication and MongoDB
    // Example:
    // 1. Create user with Firebase Auth
    // 2. Save profile to MongoDB
    
    alert('Registration successful! (Integration with Firebase & MongoDB pending)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(180deg, #050807 0%, #0a0f0d 50%, #0d1612 100%)',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --color-primary: #00ff88;
          --color-accent: #00ffcc;
          --color-bg-dark: #0a0f0d;
        }

        .input-glow:focus {
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
          border-color: var(--color-primary);
        }

        .role-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .role-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
        }

        .role-card.selected {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 204, 170, 0.2) 100%);
          border-color: var(--color-primary);
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.4);
        }

        .btn-primary {
          background: linear-gradient(135deg, #00ff88 0%, #00ccaa 100%);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #33ffaa 0%, #00ff88 100%);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
          transform: translateY(-2px);
        }

        .logo-glow {
          filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.6));
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 floating"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 floating" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Registration Container */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-gray-900 bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center items-center text-center border-r border-gray-800">
              <div className="logo-glow mb-6">
                <svg width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" stroke="#00ff88" strokeWidth="4" fill="none"/>
                  <path d="M70 100 L90 120 L130 80" stroke="#00ff88" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="100" cy="100" r="70" stroke="#00ffcc" strokeWidth="2" fill="none" opacity="0.3"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>eTuitionBD</h1>
              <p className="text-gray-400 text-lg">Connect. Learn. Grow Together.</p>
            </div>

            {/* Right Side - Registration Form */}
            <div className="p-12">
              <h2 className="text-3xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-400 mb-8">Join our learning community today</p>

              <div className="space-y-6">
                
                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-300">I want to register as:</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`role-card border-2 ${selectedRole === 'student' ? 'selected' : 'border-gray-700'} rounded-xl p-4 text-center`}
                      onClick={() => handleRoleSelect('student')}
                    >
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                      <p className="font-semibold">Student</p>
                    </div>
                    <div 
                      className={`role-card border-2 ${selectedRole === 'tutor' ? 'selected' : 'border-gray-700'} rounded-xl p-4 text-center`}
                      onClick={() => handleRoleSelect('tutor')}
                    >
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <p className="font-semibold">Tutor</p>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none input-glow text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none input-glow text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none input-glow text-white"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none input-glow text-white"
                    placeholder="Create a strong password"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  onClick={handleSubmit}
                  className="w-full btn-primary text-gray-900 font-bold py-3 px-6 rounded-lg"
                >
                  Create Account
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-400 text-sm">
                  Already have an account? 
                  <a href="#" className="font-medium hover:underline ml-1" style={{ color: 'var(--color-primary)' }}>Login here</a>
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;