export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getStatusColor = (status) => {
  const colors = {
    approved: 'text-neon-green bg-neon-green/20 border-neon-green/30',
    pending: 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30',
    rejected: 'text-red-500 bg-red-500/20 border-red-500/30',
    ongoing: 'text-neon-blue bg-neon-blue/20 border-neon-blue/30',
    completed: 'text-neon-green bg-neon-green/20 border-neon-green/30',
    cancelled: 'text-red-500 bg-red-500/20 border-red-500/30'
  };
  return colors[status] || 'text-gray-500 bg-gray-500/20 border-gray-500/30';
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};