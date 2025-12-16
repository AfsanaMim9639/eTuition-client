import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  FaArrowLeft, 
  FaUser, 
  FaGraduationCap, 
  FaDollarSign,
  FaBook,
  FaCreditCard,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ✅ Helper function to safely render education
const renderEducationText = (education) => {
  if (!education) return 'N/A';
  
  // If it's a string, return directly
  if (typeof education === 'string') {
    return education;
  }
  
  // If it's an array
  if (Array.isArray(education)) {
    return education.map((edu, index) => {
      if (typeof edu === 'string') {
        return edu;
      }
      
      if (typeof edu === 'object' && edu !== null) {
        const parts = [];
        if (edu.degree) parts.push(edu.degree);
        if (edu.institution) parts.push(edu.institution);
        if (edu.year) parts.push(`(${edu.year})`);
        return parts.join(' - ') || 'Education info';
      }
      
      return null;
    }).filter(Boolean).join(', ');
  }
  
  // If it's a single object
  if (typeof education === 'object' && education !== null) {
    const parts = [];
    if (education.degree) parts.push(education.degree);
    if (education.institution) parts.push(education.institution);
    if (education.year) parts.push(`(${education.year})`);
    return parts.join(' - ') || 'Education info';
  }
  
  return 'N/A';
};

// Payment Form Component
const PaymentForm = ({ application, tuition, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const amount = application.expectedSalary || tuition.salary || 0;
  const platformFee = amount * 0.10;
  const tutorReceives = amount - platformFee;

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-intent`,
        {
          applicationId: application._id,
          amount: amount
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setClientSecret(response.data.clientSecret);
      setPaymentIntentId(response.data.paymentIntentId);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      toast.error('Payment system not ready. Please wait...');
      return;
    }

    setLoading(true);

    try {
      // Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Confirm payment in backend
        const token = localStorage.getItem('token');
        await axios.post(
          `${import.meta.env.VITE_API_URL}/payments/confirm`,
          {
            paymentIntentId: paymentIntent.id,
            applicationId: application._id,
            amount: amount
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        toast.success('Payment successful! Tutor approved.');
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed');
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: 'transparent',
      },
      invalid: {
        color: '#ff006e',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Breakdown */}
      <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#00ffcc] mb-4">Payment Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Tuition Fee:</span>
            <span className="font-bold">{amount} BDT</span>
          </div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Platform Fee (10%):</span>
            <span>-{platformFee.toFixed(2)} BDT</span>
          </div>
          <div className="h-px bg-[#00ffcc]/30"></div>
          <div className="flex justify-between text-gray-400 text-sm">
            <span>Tutor Receives:</span>
            <span className="text-[#00ff88] font-bold">{tutorReceives.toFixed(2)} BDT</span>
          </div>
          <div className="h-px bg-[#00ffcc]/30"></div>
          <div className="flex justify-between text-white text-lg">
            <span className="font-bold">Total Amount:</span>
            <span className="font-bold text-[#00ffcc]">{amount} BDT</span>
          </div>
        </div>
      </div>

      {/* Card Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          <FaCreditCard className="inline mr-2" />
          Card Details
        </label>
        <div className="bg-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-lg p-4 focus-within:border-[#00ffcc] transition-all">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Test Card Info */}
      <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg p-4">
        <p className="text-xs text-yellow-400 flex items-start gap-2">
          <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
          <span>
            <strong>Test Mode:</strong> Use card 4242 4242 4242 4242, any future expiry date, and any 3-digit CVC
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-[#00ffcc] to-[#00ff88] text-[#0a0f0d] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00ffcc]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0a0f0d] border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              <FaCheckCircle />
              Pay {amount} BDT
            </>
          )}
        </button>
      </div>
    </form>
  );
};

// Main Checkout Component
const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { application, tuition } = location.state || {};

  useEffect(() => {
    if (!application || !tuition) {
      toast.error('Invalid payment request');
      navigate('/dashboard/student/tuitions');
    }
  }, [application, tuition, navigate]);

  const handleSuccess = () => {
    // Redirect to success page or tuition list
    setTimeout(() => {
      navigate('/dashboard/student/tuitions', {
        state: { paymentSuccess: true }
      });
    }, 2000);
  };

  const handleCancel = () => {
    navigate(-1); // Go back
  };

  if (!application || !tuition) {
    return null;
  }

  // ✅ Get tutor name safely
  const tutorName = application.tutor?.name || application.name || 'Tutor';
  const tutorProfileImage = application.tutor?.profileImage;
  const tutorEducation = application.tutor?.education || application.qualifications;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleCancel}
          className="p-2 bg-[#00ffcc]/20 border border-[#00ffcc]/50 text-[#00ffcc] rounded-lg hover:bg-[#00ffcc]/30 transition-all"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00ff88] bg-clip-text text-transparent">
            Complete Payment
          </h1>
          <p className="text-gray-400 mt-1">Secure payment powered by Stripe</p>
        </div>
      </div>

      {/* Tuition Details Card */}
      <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">{tuition.title}</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <FaBook className="text-[#00ff88]" />
            <span>{tuition.subject} • {tuition.grade}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaDollarSign className="text-[#00ff88]" />
            <span className="font-bold text-[#00ffcc]">{tuition.salary} BDT/month</span>
          </div>
        </div>
      </div>

      {/* Tutor Details Card - ✅ FIXED */}
      <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#00ffcc] mb-4">Selected Tutor</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00ffcc] to-[#00ff88] flex items-center justify-center text-[#0a0f0d] font-bold text-xl overflow-hidden">
            {tutorProfileImage ? (
              <img
                src={tutorProfileImage}
                alt={tutorName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{tutorName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">{tutorName}</h4>
            {tutorEducation && (
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <FaGraduationCap className="text-[#00ff88]" />
                <span>{renderEducationText(tutorEducation)}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-gradient-to-br from-[#0f1512] to-[#0a0f0d] border-2 border-[#00ffcc]/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#00ffcc] mb-6">Payment Information</h3>
        <Elements stripe={stripePromise}>
          <PaymentForm
            application={application}
            tuition={tuition}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </Elements>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-400 text-center">
          🔒 Your payment is secure and encrypted. We never store your card details.
        </p>
      </div>
    </div>
  );
};

export default Checkout;