import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaTimes, FaCreditCard } from 'react-icons/fa';
import api from '../../utils/api';
import toast from 'react-hot-toast';

// ✅ FIXED: Check if key exists before loading Stripe
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// Log stripe status
if (!stripeKey) {
  console.warn('⚠️  Stripe public key not found. Payment features will be disabled.');
} else {
  console.log('✅ Stripe initialized with key:', stripeKey.substring(0, 10) + '...');
}

const CheckoutForm = ({ application, amount, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded yet. Please try again.');
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const intentResponse = await api.post('/payments/create-intent', {
        applicationId: application._id,
        amount: amount
      });

      const { clientSecret } = intentResponse.data;

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

      // Confirm payment in backend
      await api.post('/payments/confirm', {
        paymentIntentId: paymentIntent.id,
        applicationId: application._id,
        amount: amount
      });

      toast.success('Payment successful! Tutor approved.');
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: '#1a1a1a',
        padding: '12px',
      },
      invalid: {
        color: '#ff006e',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Application Details */}
      <div className="bg-dark-bg p-4 rounded-lg border-2 border-neon-blue/30">
        <h3 className="font-bold neon-text-blue mb-2">Payment Details</h3>
        <div className="space-y-1 text-sm text-gray-400">
          <p><span className="text-white">Tutor:</span> {application.tutor?.name}</p>
          <p><span className="text-white">Education:</span> {application.tutor?.education}</p>
          <p><span className="text-white">Amount:</span> <span className="text-neon-green font-bold text-lg">{amount} BDT</span></p>
        </div>
      </div>

      {/* Card Element */}
      <div>
        <label className="block text-sm font-semibold mb-2 neon-text-pink">
          <FaCreditCard className="inline mr-2" />
          Card Details
        </label>
        <div className="input-neon p-4">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Test Card Info */}
      <div className="bg-yellow-500/10 border-2 border-yellow-500/30 p-3 rounded-lg">
        <p className="text-xs text-yellow-500">
          <strong>Test Card:</strong> 4242 4242 4242 4242 | Exp: Any future date | CVC: Any 3 digits
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 btn border-2 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500 py-3 rounded-lg font-semibold transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 btn btn-neon-green py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay ${amount} BDT`}
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onClose, application, onSuccess }) => {
  if (!isOpen) return null;

  const amount = application?.expectedSalary || 0;

  // ✅ FIXED: Show error if Stripe is not configured
  if (!stripePromise) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="card-neon card-neon-pink p-6 rounded-xl max-w-md w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 btn btn-neon-blue p-2 rounded-lg"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold neon-text-pink mb-4">Payment Unavailable</h2>
          <div className="bg-red-500/10 border-2 border-red-500/30 p-4 rounded-lg">
            <p className="text-red-400 mb-2">⚠️ Stripe is not configured.</p>
            <p className="text-sm text-gray-400">
              Please add <code className="bg-black/50 px-2 py-1 rounded">VITE_STRIPE_PUBLIC_KEY</code> to your .env file.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-4 btn btn-neon-blue py-3 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="card-neon card-neon-pink p-6 rounded-xl max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-neon-blue p-2 rounded-lg"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold neon-text-pink mb-6">Complete Payment</h2>

        {/* Stripe Elements */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            application={application}
            amount={amount}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;