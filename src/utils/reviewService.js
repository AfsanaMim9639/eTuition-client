import api from './api';

export const reviewAPI = {
  // Create a new review
  createReview: (data) => {
    console.log('📝 Creating review:', data);
    return api.post('/reviews', data);
  },

  // Get all reviews for a tutor
  getTutorReviews: (tutorId, params = {}) => {
    console.log('🔍 Fetching reviews for tutor:', tutorId);
    return api.get(`/reviews/tutor/${tutorId}`, { params });
  },

  // Get student's all reviews
  getMyReviews: () => {
    console.log('🔍 Fetching my reviews');
    return api.get('/reviews/my-reviews');
  },

  // Update a review
  updateReview: (reviewId, data) => {
    console.log('✏️ Updating review:', reviewId, data);
    return api.put(`/reviews/${reviewId}`, data);
  },

  // Delete a review
  deleteReview: (reviewId) => {
    console.log('🗑️ Deleting review:', reviewId);
    return api.delete(`/reviews/${reviewId}`);
  },

  // Check if student can review tutor
  canReviewTutor: (tutorId) => {
    console.log('🔍 Checking if can review tutor:', tutorId);
    return api.get(`/reviews/can-review/${tutorId}`);
  }
};

export default reviewAPI;