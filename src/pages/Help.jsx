import { useState } from 'react';
import { HelpCircle, MessageSquare, Mail, Phone, ChevronDown, Search, BookOpen, Users, CreditCard, Settings } from 'lucide-react';

const Help = () => {
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      icon: BookOpen,
      questions: [
        {
          id: 1,
          question: 'How do I create an account?',
          answer: 'Click on the "Register" button in the top navigation. Choose your role (Student or Tutor), fill in your details, and verify your email address to get started.'
        },
        {
          id: 2,
          question: 'Is eTuitionBD free to use?',
          answer: 'Creating an account and browsing tutors/tuitions is completely free. We charge a small service fee only when a successful connection is made between students and tutors.'
        },
        {
          id: 3,
          question: 'How do I find a tutor?',
          answer: 'Go to the "Tutors" page, use filters to narrow down your search by subject, location, experience, and rating. Click on a tutor profile to view details and contact them directly.'
        }
      ]
    },
    {
      category: 'For Students',
      icon: Users,
      questions: [
        {
          id: 4,
          question: 'How do I post a tuition request?',
          answer: 'After logging in, go to your dashboard and click "Post Tuition". Fill in details about the subject, location, preferred timing, and budget. Tutors will then apply to your posting.'
        },
        {
          id: 5,
          question: 'Can I contact multiple tutors?',
          answer: 'Yes! You can contact as many tutors as you like. We recommend reaching out to 3-5 tutors to compare their qualifications and find the best fit.'
        },
        {
          id: 6,
          question: 'How do I review a tutor?',
          answer: 'After completing sessions with a tutor, you can leave a review and rating on their profile. This helps other students make informed decisions.'
        }
      ]
    },
    {
      category: 'For Tutors',
      icon: Users,
      questions: [
        {
          id: 7,
          question: 'How do I become a verified tutor?',
          answer: 'Complete your profile with accurate information, upload verification documents (ID, certificates), and our team will review your application within 2-3 business days.'
        },
        {
          id: 8,
          question: 'How do I apply for tuitions?',
          answer: 'Browse available tuitions on your dashboard, read the requirements carefully, and click "Apply" to express your interest. Students will review applications and contact selected tutors.'
        },
        {
          id: 9,
          question: 'What are the fees and commission?',
          answer: 'eTuitionBD charges a 10% service fee on the first month\'s payment when you successfully connect with a student. There are no recurring fees after the first month.'
        }
      ]
    },
    {
      category: 'Payments',
      icon: CreditCard,
      questions: [
        {
          id: 10,
          question: 'What payment methods are accepted?',
          answer: 'We accept bKash, Nagad, Rocket, bank transfers, and credit/debit cards. All payments are processed securely through our platform.'
        },
        {
          id: 11,
          question: 'Is my payment information secure?',
          answer: 'Yes! We use industry-standard encryption and never store your complete payment details. All transactions are processed through secure payment gateways.'
        },
        {
          id: 12,
          question: 'What is your refund policy?',
          answer: 'If you\'re not satisfied within the first 7 days, contact us for a refund. Refunds are processed within 5-7 business days to your original payment method.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      icon: Settings,
      questions: [
        {
          id: 13,
          question: 'How do I change my password?',
          answer: 'Go to your Dashboard > Profile > Settings. Click on "Change Password", enter your current password and new password, then save changes.'
        },
        {
          id: 14,
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account from Settings > Account > Delete Account. Please note this action is permanent and cannot be undone.'
        },
        {
          id: 15,
          question: 'How do I update my profile information?',
          answer: 'Navigate to your Dashboard > Profile. Click "Edit Profile" to update your information, including photo, bio, subjects, and contact details.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className={`min-h-screen pt-10 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f0d]' : 'bg-green-200'
    }`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className={`w-16 h-16 mx-auto mb-4 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-600'
          }`} />
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Help & <span className={isDark ? 'bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'}>Support</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-600'
            }`} />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                isDark
                  ? 'bg-[#0f1512] border-[#00ff88]/30 text-white placeholder-gray-500 focus:ring-[#00ff88]/50'
                  : 'bg-white border-emerald-300 text-gray-900 placeholder-gray-500 focus:ring-emerald-500'
              }`}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {filteredFaqs.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div key={category.category}>
                    <div className="flex items-center gap-2 mb-4">
                      <IconComponent className={`w-5 h-5 ${
                        isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                      }`} />
                      <h3 className={`text-xl font-bold ${
                        isDark ? 'text-[#00ff88]' : 'text-emerald-700'
                      }`}>
                        {category.category}
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {category.questions.map((faq) => (
                        <div
                          key={faq.id}
                          className={`rounded-lg border-2 overflow-hidden transition-all ${
                            isDark
                              ? 'bg-[#0f1512] border-[#00ff88]/30'
                              : 'bg-white border-emerald-200'
                          }`}
                        >
                          <button
                            onClick={() => toggleFaq(faq.id)}
                            className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                              isDark
                                ? 'hover:bg-[#00ff88]/5'
                                : 'hover:bg-emerald-50'
                            }`}
                          >
                            <span className={`font-semibold ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {faq.question}
                            </span>
                            <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${
                              openFaq === faq.id ? 'rotate-180' : ''
                            } ${isDark ? 'text-[#00ff88]' : 'text-emerald-600'}`} />
                          </button>
                          
                          {openFaq === faq.id && (
                            <div className={`p-4 pt-0 border-t ${
                              isDark ? 'border-[#00ff88]/20' : 'border-emerald-200'
                            }`}>
                              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className={`w-16 h-16 mx-auto mb-4 ${
                  isDark ? 'text-[#00ff88]/50' : 'text-emerald-500/50'
                }`} />
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  No results found
                </h3>
                <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
                  Try a different search term or contact support
                </p>
              </div>
            )}
          </div>

          {/* Contact Support Section */}
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Contact Support
            </h2>

            {/* Email Support */}
            <div className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
              isDark
                ? 'bg-[#0f1512] border-[#00ff88]/30 hover:border-[#00ff88]'
                : 'bg-white border-emerald-300 hover:border-emerald-500'
            }`}>
              <Mail className={`w-8 h-8 mb-3 ${
                isDark ? 'text-[#00ff88]' : 'text-emerald-600'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Email Support
              </h3>
              <p className={`text-sm mb-3 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Get help via email
              </p>
              <a
                href="mailto:support@etuitionbd.com"
                className={`text-sm font-semibold ${
                  isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                }`}
              >
                support@etuitionbd.com
              </a>
            </div>

            {/* Phone Support */}
            <div className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
              isDark
                ? 'bg-[#0f1512] border-[#00ff88]/30 hover:border-[#00ff88]'
                : 'bg-white border-emerald-300 hover:border-emerald-500'
            }`}>
              <Phone className={`w-8 h-8 mb-3 ${
                isDark ? 'text-[#00ff88]' : 'text-emerald-600'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Phone Support
              </h3>
              <p className={`text-sm mb-3 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Call us: 9 AM - 9 PM
              </p>
              <a
                href="tel:+8801234567890"
                className={`text-sm font-semibold ${
                  isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                }`}
              >
                +880 1234-567890
              </a>
            </div>

            {/* Live Chat */}
            <div className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
              isDark
                ? 'bg-[#0f1512] border-[#00ff88]/30 hover:border-[#00ff88]'
                : 'bg-white border-emerald-300 hover:border-emerald-500'
            }`}>
              <MessageSquare className={`w-8 h-8 mb-3 ${
                isDark ? 'text-[#00ff88]' : 'text-emerald-600'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Live Chat
              </h3>
              <p className={`text-sm mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Chat with our team
              </p>
              <button className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                isDark
                  ? 'bg-[#00ff88] text-[#0a0f0d] hover:bg-[#00ffcc]'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}>
                Start Chat
              </button>
            </div>
          </div>
        </div>

        {/* Theme Toggle (for demo) */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-4 rounded-full shadow-lg transition-all ${
              isDark
                ? 'bg-[#00ff88] text-[#0a0f0d] hover:bg-[#00ffcc]'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;