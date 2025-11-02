import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useApi } from './useApi';

// Auth context for providing auth state to components
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Main useAuth hook
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState([]);
  
  const api = useApi();

  // Check if token is expired
  const isTokenExpired = useCallback((token) => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }, []);

  // Get stored auth data
  const getStoredAuth = useCallback(() => {
    const token = localStorage.getItem('jwtToken');
    const userData = localStorage.getItem('user');
    const permissionsData = localStorage.getItem('permissions');
    
    if (!token || isTokenExpired(token)) {
      return null;
    }

    try {
      return {
        token,
        user: userData ? JSON.parse(userData) : null,
        permissions: permissionsData ? JSON.parse(permissionsData) : [],
      };
    } catch {
      return null;
    }
  }, [isTokenExpired]);

  // Set auth data in storage
  const setStoredAuth = useCallback((authData) => {
    if (authData) {
      localStorage.setItem('jwtToken', authData.token);
      localStorage.setItem('user', JSON.stringify(authData.user));
      localStorage.setItem('permissions', JSON.stringify(authData.permissions || []));
    } else {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedAuth = getStoredAuth();
      
      if (storedAuth) {
        setUser(storedAuth.user);
        setIsAuthenticated(true);
        setPermissions(storedAuth.permissions);
        
        // Verify token with server
        try {
          await api.get('/auth/verify');
        } catch (error) {
          // Token is invalid, logout
          setStoredAuth(null);
          setUser(null);
          setIsAuthenticated(false);
          setPermissions([]);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, [getStoredAuth, setStoredAuth, api]);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user, permissions } = response.data;
      
      const authData = { token, user, permissions };
      setStoredAuth(authData);
      
      setUser(user);
      setIsAuthenticated(true);
      setPermissions(permissions || []);
      
      return { success: true, user };
    } catch (error) {
      setStoredAuth(null);
      setUser(null);
      setIsAuthenticated(false);
      setPermissions([]);
      
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  }, [api, setStoredAuth]);

  // Register function
  const register = useCallback(async (userData) => {
    setLoading(true);
    
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user, permissions } = response.data;
      
      const authData = { token, user, permissions };
      setStoredAuth(authData);
      
      setUser(user);
      setIsAuthenticated(true);
      setPermissions(permissions || []);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  }, [api, setStoredAuth]);

  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      // Call logout endpoint if available
      await api.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors, still clear local storage
      console.warn('Logout API call failed:', error);
    } finally {
      setStoredAuth(null);
      setUser(null);
      setIsAuthenticated(false);
      setPermissions([]);
      setLoading(false);
    }
  }, [api, setStoredAuth]);

  // Refresh token
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh');
      const { token, user, permissions } = response.data;
      
      const authData = { token, user, permissions };
      setStoredAuth(authData);
      
      setUser(user);
      setIsAuthenticated(true);
      setPermissions(permissions || []);
      
      return { success: true };
    } catch (error) {
      // Refresh failed, logout user
      logout();
      return { success: false, error: error.message };
    }
  }, [api, setStoredAuth, logout]);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      
      // Update stored user data
      const storedAuth = getStoredAuth();
      if (storedAuth) {
        setStoredAuth({
          ...storedAuth,
          user: updatedUser,
        });
      }
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Profile update failed' 
      };
    }
  }, [api, getStoredAuth, setStoredAuth]);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      await api.put('/auth/password', {
        currentPassword,
        newPassword,
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Password change failed' 
      };
    }
  }, [api]);

  // Check if user has permission
  const hasPermission = useCallback((permission) => {
    if (!permissions || !Array.isArray(permissions)) {
      return false;
    }
    
    // Support for wildcard permissions (e.g., 'users.*')
    if (permission.includes('*')) {
      const basePermission = permission.replace('*', '');
      return permissions.some(p => p.startsWith(basePermission));
    }
    
    return permissions.includes(permission);
  }, [permissions]);

  // Check if user has any of the given permissions
  const hasAnyPermission = useCallback((requiredPermissions) => {
    if (!requiredPermissions || !Array.isArray(requiredPermissions)) {
      return false;
    }
    
    return requiredPermissions.some(permission => hasPermission(permission));
  }, [hasPermission]);

  // Check if user has all of the given permissions
  const hasAllPermissions = useCallback((requiredPermissions) => {
    if (!requiredPermissions || !Array.isArray(requiredPermissions)) {
      return false;
    }
    
    return requiredPermissions.every(permission => hasPermission(permission));
  }, [hasPermission]);

  // Get user role
  const getRole = useCallback(() => {
    return user?.role || 'user';
  }, [user]);

  // Check if user has role
  const hasRole = useCallback((role) => {
    return getRole() === role;
  }, [getRole]);

  // Check if user has any of the given roles
  const hasAnyRole = useCallback((roles) => {
    if (!roles || !Array.isArray(roles)) {
      return false;
    }
    
    return roles.includes(getRole());
  }, [getRole]);

  return {
    // State
    user,
    loading,
    isAuthenticated,
    permissions,
    
    // Authentication methods
    login,
    register,
    logout,
    refreshToken,
    
    // Profile methods
    updateProfile,
    changePassword,
    
    // Permission methods
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Role methods
    getRole,
    hasRole,
    hasAnyRole,
    
    // Utility methods
    isTokenExpired,
  };
};

// Higher-order component for protecting routes
export const withAuth = (Component, requiredPermissions = []) => {
  return function ProtectedComponent(props) {
    const auth = useAuthContext();
    
    // Show loading while checking authentication
    if (auth.loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    // Redirect to login if not authenticated
    if (!auth.isAuthenticated) {
      window.location.href = '/login';
      return null;
    }
    
    // Check permissions if required
    if (requiredPermissions.length > 0 && !auth.hasAnyPermission(requiredPermissions)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};

// Hook for protecting specific actions
export const useAuthGuard = (requiredPermissions = []) => {
  const auth = useAuthContext();
  
  const checkAccess = useCallback(() => {
    if (!auth.isAuthenticated) {
      throw new Error('Authentication required');
    }
    
    if (requiredPermissions.length > 0 && !auth.hasAnyPermission(requiredPermissions)) {
      throw new Error('Insufficient permissions');
    }
    
    return true;
  }, [auth.isAuthenticated, auth.hasAnyPermission, requiredPermissions]);
  
  return { checkAccess, hasAccess: checkAccess() };
};

export default useAuth;