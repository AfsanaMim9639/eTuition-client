// Format time for messages (e.g., "2 hours ago", "Just now")
export const formatDistanceToNow = (date, options = {}) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return options.addSuffix ? 'Just now' : 'now';
  } else if (minutes < 60) {
    return options.addSuffix ? `${minutes}m ago` : `${minutes}m`;
  } else if (hours < 24) {
    return options.addSuffix ? `${hours}h ago` : `${hours}h`;
  } else if (days < 7) {
    return options.addSuffix ? `${days}d ago` : `${days}d`;
  } else if (weeks < 4) {
    return options.addSuffix ? `${weeks}w ago` : `${weeks}w`;
  } else if (months < 12) {
    return options.addSuffix ? `${months}mo ago` : `${months}mo`;
  } else {
    return options.addSuffix ? `${years}y ago` : `${years}y`;
  }
};

// Format time for message bubbles (e.g., "10:30 AM", "Yesterday 3:45 PM")
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  if (hours < 24) {
    // Today - just show time
    return timeString;
  } else if (hours < 48) {
    // Yesterday
    return `Yesterday ${timeString}`;
  } else if (hours < 168) {
    // This week - show day name
    return date.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' + timeString;
  } else {
    // Older - show date
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }) + ' ' + timeString;
  }
};

// Format full date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};