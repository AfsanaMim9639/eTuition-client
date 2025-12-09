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
  const isFetchingUser = useRef(false); // Prevent multiple API calls

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

      // Save token and user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      console.error('❌ Register error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      console.log('🔐 Starting login...');
      
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Firebase login successful');
      
      // Backend login
      const response = await api.post('/auth/login', { email, password });

      console.log('✅ Backend login successful');

      // Save token and user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
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

      // Save token and user
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      console.error('❌ Google login error:', error);
      toast.error(error.response?.data?.message || 'Google login failed');
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
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
      toast.error('Logout failed');
    }
  };

  // Update user profile
  const updateUserProfile = async (userData) => {
    try {
      console.log('🔄 Updating profile...');
      const response = await api.put('/users/profile', userData);
      
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success('Profile updated successfully');
      console.log('✅ Profile updated');
      return response.data;
    } catch (error) {
      console.error('❌ Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  };

  // Check authentication on mount - FIXED VERSION
  useEffect(() => {
    console.log('🔍 Setting up auth listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Firebase auth state changed:', firebaseUser ? 'Logged in' : 'Logged out');
      
      if (firebaseUser) {
        // Check if already fetching to prevent multiple calls
        if (isFetchingUser.current) {
          console.log('⏸️  Already fetching user, skipping...');
          return;
        }

        // Get user from localStorage first (faster)
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          console.log('✅ User loaded from localStorage');
          setUser(JSON.parse(storedUser));
          setLoading(false);
        } else {
          // Only fetch from backend if not in localStorage
          isFetchingUser.current = true;
          
          try {
            console.log('📡 Fetching user from backend...');
            const response = await api.get('/auth/me');
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            console.log('✅ User fetched from backend');
          } catch (error) {
            console.error('❌ Fetch user error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          } finally {
            isFetchingUser.current = false;
            setLoading(false);
          }
        }
      } else {
        console.log('👤 No Firebase user, clearing state');
        setUser(null);
        setLoading(false);
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