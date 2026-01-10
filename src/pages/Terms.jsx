import { useState } from 'react';
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, DollarSign, Shield, Users } from 'lucide-react';

const Terms = () => {
  const [isDark, setIsDark] = useState(true);

  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using eTuitionBD ("the Platform"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.',
        'These terms apply to all users, including students, tutors, parents, and visitors.',
        'We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.'
      ]
    },
    {
      icon: Users,
      title: 'User Accounts',
      content: [
        'You must be at least 13 years old to create an account. Users under 18 should have parental consent.',
        'You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
        'You must provide accurate, current, and complete information during registration and keep your profile updated.',
        'Each person may only create one account. Creating multiple accounts may result in suspension or termination.',
        'You may not transfer or share your account with others without our permission.'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Acceptable Use',
      content: [
        'Use the platform only for lawful purposes and in accordance with these terms.',
        'Treat other users with respect and professionalism in all communications.',
        'Provide accurate information in your profile, tuition posts, and applications.',
        'Honor commitments made to other users, including scheduled tutoring sessions.',
        'Report any inappropriate behavior, fraud, or violations of these terms to our support team.'
      ]
    },
    {
      icon: XCircle,
      title: 'Prohibited Activities',
      content: [
        'Posting false, misleading, or fraudulent information about qualifications, experience, or services.',
        'Harassing, threatening, or abusing other users in any way.',
        'Attempting to bypass our platform to avoid service fees.',
        'Scraping, copying, or using automated systems to access user data without permission.',
        'Sharing inappropriate, offensive, or illegal content through our platform.',
        'Impersonating another person or entity.',
        'Using the platform for any illegal activities or to promote illegal services.'
      ]
    },
    {
      icon: DollarSign,
      title: 'Payments and Fees',
      content: [
        'Students and tutors agree to pay applicable service fees as outlined in our fee schedule.',
        'For successful connections, eTuitionBD charges a 10% service fee on the first month\'s payment.',
        'All payments must be processed through our secure payment system.',
        'Tutors are responsible for reporting and paying applicable taxes on their earnings.',
        'Refunds are provided according to our refund policy and may be subject to processing fees.',
        'We reserve the right to change our fee structure with 30 days\' notice to users.'
      ]
    },
    {
      icon: Scale,
      title: 'Tutor Responsibilities',
      content: [
        'Maintain valid qualifications and certifications as claimed in your profile.',
        'Provide quality tutoring services as agreed with students.',
        'Be punctual and professional in all tutoring sessions.',
        'Communicate clearly about availability, rates, and teaching methods.',
        'Report any issues or disputes with students promptly.',
        'Comply with all applicable laws and regulations regarding tutoring services.'
      ]
    },
    {
      icon: Users,
      title: 'Student Responsibilities',
      content: [
        'Communicate your learning needs and goals clearly to tutors.',
        'Be punctual and prepared for scheduled tutoring sessions.',
        'Treat tutors with respect and professionalism.',
        'Provide timely payment for tutoring services as agreed.',
        'Report any issues or concerns about tutors promptly.',
        'Provide honest feedback and reviews based on your experience.'
      ]
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      content: [
        'The eTuitionBD platform, including its design, features, and content, is owned by us and protected by intellectual property laws.',
        'You may not copy, modify, distribute, or create derivative works from our platform without permission.',
        'Tutors retain ownership of their original teaching materials but grant us a license to display them on the platform.',
        'User-generated content (reviews, messages, posts) may be used by us for platform improvement and marketing purposes.',
        'You grant us a non-exclusive license to use your name, profile picture, and testimonials for promotional purposes.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Disclaimers',
      content: [
        'eTuitionBD is a platform that connects students and tutors. We do not employ tutors or guarantee their qualifications.',
        'We are not responsible for the quality of tutoring services provided by tutors on our platform.',
        'Users are responsible for verifying tutor credentials and conducting their own due diligence.',
        'We do not guarantee specific academic outcomes or improvements from using our platform.',
        'The platform is provided "as is" without warranties of any kind, express or implied.',
        'We are not liable for any disputes between students and tutors arising from tutoring arrangements.'
      ]
    },
    {
      icon: XCircle,
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, eTuitionBD shall not be liable for any indirect, incidental, special, or consequential damages.',
        'Our total liability for any claims related to the platform shall not exceed the amount paid by you in the past 12 months.',
        'We are not responsible for losses resulting from unauthorized access to your account.',
        'We are not liable for technical issues, service interruptions, or data loss beyond our reasonable control.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Termination',
      content: [
        'You may terminate your account at any time through your account settings.',
        'We reserve the right to suspend or terminate accounts that violate these terms without prior notice.',
        'Upon termination, your right to access the platform ceases immediately.',
        'Sections of these terms that should reasonably survive termination will continue to apply.',
        'We may retain certain information as required by law or for legitimate business purposes after account termination.'
      ]
    },
    {
      icon: Scale,
      title: 'Dispute Resolution',
      content: [
        'Any disputes arising from these terms or use of the platform shall first be attempted to be resolved through good faith negotiation.',
        'If negotiation fails, disputes shall be resolved through binding arbitration in Dhaka, Bangladesh.',
        'You agree to waive the right to participate in class-action lawsuits or class-wide arbitration.',
        'These terms are governed by the laws of Bangladesh, without regard to conflict of law principles.'
      ]
    }
  ];

  return (
    <div className={`min-h-screen pt-10 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-[#0a0f0d]' : 'bg-green-200'
    }`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className={`w-16 h-16 mx-auto mb-4 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-600'
          }`} />
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Terms of <span className={isDark ? 'bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'}>Service</span>
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Last updated: January 10, 2026
          </p>
        </div>

        {/* Introduction */}
        <div className={`p-6 rounded-xl mb-8 ${
          isDark
            ? 'bg-[#0f1512] border-2 border-[#00ff88]/30'
            : 'bg-white border-2 border-emerald-300'
        }`}>
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Welcome to eTuitionBD. These Terms of Service ("Terms") govern your access to and use of our platform, services, and features. By using eTuitionBD, you agree to comply with these terms. Please read them carefully.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDark
                    ? 'bg-[#0f1512] border-2 border-[#00ff88]/30'
                    : 'bg-white border-2 border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className={`w-8 h-8 ${
                    isDark ? 'text-[#00ff88]' : 'text-emerald-600'
                  }`} />
                  <h2 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex gap-3 leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <span className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                        isDark ? 'bg-[#00ff88]' : 'bg-emerald-600'
                      }`}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Changes to Terms */}
        <div className={`p-6 rounded-xl mt-8 ${
          isDark
            ? 'bg-[#0f1512] border-2 border-[#00ff88]/30'
            : 'bg-white border-2 border-emerald-300'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Changes to These Terms
          </h2>
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes via email or through platform notifications. Your continued use of eTuitionBD after changes are posted constitutes acceptance of the modified terms.
          </p>
        </div>

        {/* Contact */}
        <div className={`p-6 rounded-xl mt-8 text-center ${
          isDark
            ? 'bg-gradient-to-r from-[#00ff88]/10 to-[#00ffcc]/10 border-2 border-[#00ff88]/30'
            : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300'
        }`}>
          <Scale className={`w-12 h-12 mx-auto mb-4 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-600'
          }`} />
          <h2 className={`text-2xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Questions About These Terms?
          </h2>
          <p className={`mb-4 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className={`space-y-2 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-700'
          }`}>
            <p className="font-semibold">Email: legal@etuitionbd.com</p>
            <p className="font-semibold">Phone: +880 1234-567890</p>
            <p className="font-semibold">Address: 123 Education Street, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className={`p-6 rounded-xl mt-8 ${
          isDark
            ? 'bg-[#00ff88]/5 border-2 border-[#00ff88]/30'
            : 'bg-emerald-50 border-2 border-emerald-300'
        }`}>
          <div className="flex items-start gap-3">
            <CheckCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${
              isDark ? 'text-[#00ff88]' : 'text-emerald-600'
            }`} />
            <div>
              <h3 className={`font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Acknowledgment
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                By using eTuitionBD, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you must discontinue use of the platform immediately.
              </p>
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

export default Terms;