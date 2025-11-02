

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('kebele_user');
        const token = localStorage.getItem('kebele_token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid storage
        localStorage.removeItem('kebele_user');
        localStorage.removeItem('kebele_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function - MODIFIED: Accept any email and password
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ✅ Accept any email and password combination
      const userData = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0], // Use email username as name
        role: 'admin',
        loginTime: new Date().toISOString()
      };

      const token = 'demo-token-' + Date.now();

      // Save to localStorage
      localStorage.setItem('kebele_user', JSON.stringify(userData));
      localStorage.setItem('kebele_token', token);

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);

      // Redirect to intended page or dashboard
      const intendedPath = location.state?.from?.pathname || '/';
      navigate(intendedPath, { replace: true });

      return { success: true, message: 'Login successful' };
    } catch (error) {
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Clear storage
    localStorage.removeItem('kebele_user');
    localStorage.removeItem('kebele_token');

    // Update state
    setUser(null);
    setIsAuthenticated(false);

    // Navigate to login page
    navigate('/login', { replace: true });
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Context value
  const contextValue = {
    // State
    user,
    isLoading,
    isAuthenticated,
    error,

    // Actions
    login,
    logout,
    clearError,

    // Utilities
    getUserInitials,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;