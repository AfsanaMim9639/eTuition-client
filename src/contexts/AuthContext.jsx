import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase.config';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFetchingUser = useRef(false);
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  // Register with email/password
  const register = async (userData) => {
    try {
      console.log('📝 Starting registration...');
      
      // Create Firebase user
      const { email, password, ...otherData } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Firebase user created');
      
      // Register in backend
      const response = await api.post('/auth/register', {
        ...userData,
        profileImage: userCredential.user.photoURL || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'
      });

      console.log('✅ Backend registration successful');

      // Validate response
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      // Save token and user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      console.error('❌ Register error:', error);
      
      // Handle specific errors
      if (error.message?.includes('timeout')) {
        toast.error('Registration timeout. Please try again.');
      } else if (error.message?.includes('Network error')) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Registration failed');
      }
      
      throw error;
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      console.log('🔐 Starting login for:', email);
      
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Firebase login successful');
      
      // Backend login
      const response = await api.post('/auth/login', { email, password });

      console.log('✅ Backend login response:', response.data);
      console.log('👤 User from backend:', response.data.user);
      console.log('🎭 User role:', response.data.user?.role);

      // Validate response
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      if (!response.data.user) {
        throw new Error('User data not received from server');
      }

      if (!response.data.token) {
        throw new Error('Token not received from server');
      }

      // Save token and user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update state
      setUser(response.data.user);

      console.log('✅ Login complete - User state updated:', response.data.user.role);

      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response?.data);
      
      // Clear any partial data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      
      // Handle specific errors
      let errorMessage = 'Login failed';
      
      if (error.message?.includes('timeout')) {
        errorMessage = 'Login timeout. Please try again.';
      } else if (error.message?.includes('Network error')) {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else {
        errorMessage = error.response?.data?.message || error.message || 'Login failed';
      }
      
      toast.error(errorMessage);
      throw error;
    }
  };

  // Google login
  const googleLogin = async (role = 'student') => {
    try {
      console.log('🔐 Starting Google login...');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('✅ Google popup successful');

      // Backend social login
      const response = await api.post('/auth/social-login', {
        name: user.displayName,
        email: user.email,
        profileImage: user.photoURL,
        role
      });

      console.log('✅ Backend social login successful');

      // Validate response
      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      // Save token and user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      console.error('❌ Google login error:', error);
      
      // Handle specific errors
      if (error.message?.includes('timeout')) {
        toast.error('Login timeout. Please try again.');
      } else if (error.message?.includes('Network error')) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error(error.response?.data?.message || error.message || 'Google login failed');
      }
      
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      console.log('👋 Logging out...');
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      retryCount.current = 0; // Reset retry count
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Force logout even if Firebase signOut fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      toast.error('Logout completed');
    }
  };

  // Update user profile
  const updateUserProfile = async (userData) => {
    try {
      console.log('🔄 Updating profile...');
      const response = await api.put('/users/profile', userData);
      
      const updatedUser = response.data.user;
      
      if (!updatedUser) {
        throw new Error('Updated user data not received');
      }
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success('Profile updated successfully');
      console.log('✅ Profile updated');
      return response.data;
    } catch (error) {
      console.error('❌ Update profile error:', error);
      
      // Handle specific errors
      if (error.message?.includes('timeout')) {
        toast.error('Update timeout. Please try again.');
      } else if (error.message?.includes('Network error')) {
        toast.error('Network error. Please check your connection.');
      } else if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      } else {
        toast.error(error.response?.data?.message || 'Failed to update profile');
      }
      
      throw error;
    }
  };

  // Fetch user with retry mechanism
  const fetchUserWithRetry = async () => {
    try {
      console.log(`📡 Fetching user from /auth/me (Attempt ${retryCount.current + 1}/${MAX_RETRIES})...`);
      const res = await api.get('/auth/me');

      if (!res.data.user) {
        throw new Error('User data not received from server');
      }

      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      retryCount.current = 0; // Reset on success
      
      console.log('✅ User fetched successfully');
    } catch (err) {
      console.error('❌ /auth/me failed:', err);
      
      // Check if it's a network/timeout error and we can retry
      const isNetworkError = err.message?.includes('timeout') || 
                             err.message?.includes('Network error');
      
      const canRetry = isNetworkError && retryCount.current < MAX_RETRIES;
      
      if (canRetry) {
        retryCount.current++;
        console.log(`⏱️ Retrying... (${retryCount.current}/${MAX_RETRIES})`);
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount.current));
        
        return fetchUserWithRetry();
      }
      
      // If it's an auth error or max retries reached, clear everything
      if (err.response?.status === 401 || retryCount.current >= MAX_RETRIES) {
        console.log('🚪 Clearing auth data');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
      
      throw err;
    }
  };

  // Check authentication on mount
  useEffect(() => {
    console.log('🔍 Setting up auth listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Firebase auth state changed:', firebaseUser ? 'Logged in' : 'Logged out');

      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      // If NO Firebase user → clear everything
      if (!firebaseUser) {
        console.log('👤 No Firebase user, clearing');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setLoading(false);
        retryCount.current = 0;
        return;
      }

      // If Firebase user exists but NO token → skip /auth/me
      if (!token) {
        console.log('⛔ Token missing → skip /auth/me call');
        setUser(null);
        setLoading(false);
        return;
      }

      // If token + user stored → use that (FAST)
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('⚡ Using stored user');
          setUser(parsedUser);
          setLoading(false);
          return;
        } catch (parseError) {
          console.error('❌ Error parsing stored user:', parseError);
          localStorage.removeItem('user');
          // Continue to fetch from backend
        }
      }

      // Otherwise fetch from backend (with token and retry mechanism)
      if (!isFetchingUser.current) {
        isFetchingUser.current = true;
        try {
          await fetchUserWithRetry();
        } catch (err) {
          console.error('❌ Failed to fetch user after retries:', err);
          
          // Show error toast only if it's not a network error
          if (!err.message?.includes('Network error') && !err.message?.includes('timeout')) {
            toast.error('Failed to load user data. Please login again.');
          }
        } finally {
          isFetchingUser.current = false;
          setLoading(false);
        }
      }
    });

    return () => {
      console.log('🧹 Cleaning up auth listener');
      unsubscribe();
    };
  }, []); // Empty dependency array - runs ONLY ONCE

  const value = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};