import { useState } from 'react';
import { Shield, Lock, Eye, Database, Users, FileText, Mail } from 'lucide-react';

const Privacy = () => {
  const [isDark, setIsDark] = useState(true);

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you register on eTuitionBD, we collect information such as your name, email address, phone number, location, and profile picture. For tutors, we also collect educational qualifications, experience, and teaching subjects.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about how you interact with our platform, including IP address, browser type, pages visited, time spent on pages, and device information.'
        },
        {
          subtitle: 'Communication Data',
          text: 'We store messages exchanged between students and tutors through our platform to ensure quality service and resolve disputes.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your information to provide, maintain, and improve our tutoring platform, including matching students with appropriate tutors and facilitating communication.'
        },
        {
          subtitle: 'Communication',
          text: 'We send you service-related emails, notifications about tuition opportunities, platform updates, and promotional materials (which you can opt out of).'
        },
        {
          subtitle: 'Safety and Security',
          text: 'We use your data to verify identities, prevent fraud, ensure platform safety, and comply with legal obligations.'
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We analyze usage patterns to understand how users interact with our platform and make improvements to enhance user experience.'
        }
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        {
          subtitle: 'With Other Users',
          text: 'Your profile information (name, photo, subjects, experience) is visible to other users. Students and tutors can see each other\'s contact information when a connection is established.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We share data with third-party service providers who help us operate our platform, such as payment processors, hosting services, and email providers.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, court order, or to protect the rights, property, or safety of eTuitionBD, our users, or others.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'If eTuitionBD is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We limit access to personal information to employees and contractors who need it to perform their duties, and they are bound by confidentiality obligations.'
        },
        {
          subtitle: 'Data Breach Protocol',
          text: 'In the event of a data breach, we will notify affected users and relevant authorities as required by law, and take immediate steps to mitigate harm.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Your Rights and Choices',
      content: [
        {
          subtitle: 'Access and Update',
          text: 'You can access and update your personal information at any time through your account settings or by contacting our support team.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You can request deletion of your account and associated data. Some information may be retained for legal or business purposes as permitted by law.'
        },
        {
          subtitle: 'Marketing Preferences',
          text: 'You can opt out of promotional emails by clicking the unsubscribe link in any marketing email or adjusting your notification settings.'
        },
        {
          subtitle: 'Cookie Management',
          text: 'You can control cookies through your browser settings. Note that disabling cookies may affect your ability to use certain features of our platform.'
        }
      ]
    },
    {
      icon: FileText,
      title: 'Data Retention',
      content: [
        {
          subtitle: 'Active Accounts',
          text: 'We retain your information for as long as your account is active or as needed to provide you services.'
        },
        {
          subtitle: 'Inactive Accounts',
          text: 'If your account is inactive for an extended period, we may delete or anonymize your data after providing you with notice.'
        },
        {
          subtitle: 'Legal Obligations',
          text: 'Some information may be retained longer if required for legal, tax, or accounting purposes.'
        }
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
          <Shield className={`w-16 h-16 mx-auto mb-4 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-600'
          }`} />
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Privacy <span className={isDark ? 'bg-gradient-to-r from-[#00ff88] to-[#00ffcc] bg-clip-text text-transparent' : 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'}>Policy</span>
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
            At eTuitionBD, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully to understand our practices regarding your personal data.
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

                <div className="space-y-4">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className={`font-semibold mb-2 ${
                        isDark ? 'text-[#00ff88]' : 'text-emerald-700'
                      }`}>
                        {item.subtitle}
                      </h3>
                      <p className={`leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Children's Privacy */}
        <div className={`p-6 rounded-xl mt-8 ${
          isDark
            ? 'bg-[#0f1512] border-2 border-[#00ff88]/30'
            : 'bg-white border-2 border-emerald-300'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Children's Privacy
          </h2>
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className={`p-6 rounded-xl mt-8 ${
          isDark
            ? 'bg-[#0f1512] border-2 border-[#00ff88]/30'
            : 'bg-white border-2 border-emerald-300'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Changes to This Policy
          </h2>
          <p className={`leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically for any changes.
          </p>
        </div>

        {/* Contact */}
        <div className={`p-6 rounded-xl mt-8 text-center ${
          isDark
            ? 'bg-gradient-to-r from-[#00ff88]/10 to-[#00ffcc]/10 border-2 border-[#00ff88]/30'
            : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300'
        }`}>
          <Mail className={`w-12 h-12 mx-auto mb-4 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-600'
          }`} />
          <h2 className={`text-2xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Contact Us
          </h2>
          <p className={`mb-4 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className={`space-y-2 ${
            isDark ? 'text-[#00ff88]' : 'text-emerald-700'
          }`}>
            <p className="font-semibold">Email: privacy@etuitionbd.com</p>
            <p className="font-semibold">Phone: +880 1234-567890</p>
            <p className="font-semibold">Address: 123 Education Street, Dhaka, Bangladesh</p>
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

export default Privacy;