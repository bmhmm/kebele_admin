

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const storedUser = localStorage.getItem('kebele_user');
//         const token = localStorage.getItem('kebele_token');

//         if (storedUser && token) {
//           setUser(JSON.parse(storedUser));
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error('Error initializing auth:', error);
//         // Clear invalid storage
//         localStorage.removeItem('kebele_user');
//         localStorage.removeItem('kebele_token');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Login function - MODIFIED: Accept any email and password
//   const login = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // ✅ Accept any email and password combination
//       const userData = {
//         id: Date.now(),
//         email: email,
//         name: email.split('@')[0], // Use email username as name
//         role: 'admin',
//         loginTime: new Date().toISOString()
//       };

//       const token = 'demo-token-' + Date.now();

//       // Save to localStorage
//       localStorage.setItem('kebele_user', JSON.stringify(userData));
//       localStorage.setItem('kebele_token', token);

//       // Update state
//       setUser(userData);
//       setIsAuthenticated(true);
//       setError(null);

//       // Redirect to intended page or dashboard
//       const intendedPath = location.state?.from?.pathname || '/';
//       navigate(intendedPath, { replace: true });

//       return { success: true, message: 'Login successful' };
//     } catch (error) {
//       const errorMessage = 'Login failed. Please try again.';
//       setError(errorMessage);
//       return { success: false, message: errorMessage };
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     // Clear storage
//     localStorage.removeItem('kebele_user');
//     localStorage.removeItem('kebele_token');

//     // Update state
//     setUser(null);
//     setIsAuthenticated(false);

//     // Navigate to login page
//     navigate('/login', { replace: true });
//   };

//   // Get user initials for avatar
//   const getUserInitials = () => {
//     if (!user?.name) return 'U';
//     return user.name
//       .split(' ')
//       .map(part => part.charAt(0).toUpperCase())
//       .join('')
//       .substring(0, 2);
//   };

//   // Clear error
//   const clearError = () => {
//     setError(null);
//   };

//   // Context value
//   const contextValue = {
//     // State
//     user,
//     isLoading,
//     isAuthenticated,
//     error,

//     // Actions
//     login,
//     logout,
//     clearError,

//     // Utilities
//     getUserInitials,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// };

// export default AuthContext;





// contexts/AuthContext.jsx - UPDATED VERSION
// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Define permissions for each role
// export const permissions = {
//   ADMIN: {
//     canEditSettings: true,
//     canManageUsers: true,
//     canAddCitizens: true,
//     canEditCitizens: true,
//     canDeleteCitizens: true,
//     canIssueIDCards: true,
//     canViewReports: true,
//     canExportData: true,
//     canViewAuditLogs: true,
//     dashboardPath: '/dashboard/admin',
//   },
//   DATA_ENTRY: {
//     canEditSettings: false,
//     canManageUsers: false,
//     canAddCitizens: true,
//     canEditCitizens: true,
//     canDeleteCitizens: false,
//     canIssueIDCards: true,
//     canViewReports: true,
//     canExportData: false,
//     canViewAuditLogs: false,
//     dashboardPath: '/dashboard/data-entry',
//   },
//   VIEWER: {
//     canEditSettings: false,
//     canManageUsers: false,
//     canAddCitizens: false,
//     canEditCitizens: false,
//     canDeleteCitizens: false,
//     canIssueIDCards: false,
//     canViewReports: true,
//     canExportData: false,
//     canViewAuditLogs: false,
//     dashboardPath: '/dashboard/viewer',
//   },
// };

// // Mock users database (In real app, this comes from backend)
// const mockUsers = [
//   {
//     id: 1,
//     email: 'admin@ginjoguduru.gov.et',
//     password: 'admin123', // In real app, this would be hashed
//     name: 'Admin User',
//     role: 'Administrator',
//     permissions: permissions.ADMIN,
//     status: 'Active',
//     createdAt: '2024-01-01',
//   },
//   {
//     id: 2,
//     email: 'clerk@ginjoguduru.gov.et',
//     password: 'clerk123',
//     name: 'Data Entry Clerk',
//     role: 'Data Entry',
//     permissions: permissions.DATA_ENTRY,
//     status: 'Active',
//     createdAt: '2024-01-15',
//   },
//   {
//     id: 3,
//     email: 'viewer@ginjoguduru.gov.et',
//     password: 'viewer123',
//     name: 'View Only User',
//     role: 'Viewer',
//     permissions: permissions.VIEWER,
//     status: 'Inactive',
//     createdAt: '2024-02-01',
//   },
// ];

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on app load
//     const storedUser = localStorage.getItem('kebele_user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     // In real app: API call to backend
//     // For now, using mock authentication

//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const foundUser = mockUsers.find(
//       user => user.email === email && user.password === password
//     );

//     if (!foundUser) {
//       return {
//         success: false,
//         message: 'Invalid email or password'
//       };
//     }

//     if (foundUser.status === 'Inactive') {
//       return {
//         success: false,
//         message: 'Account is inactive. Please contact administrator.'
//       };
//     }

//     // Create user object with permissions
//     const userData = {
//       id: foundUser.id,
//       email: foundUser.email,
//       name: foundUser.name,
//       role: foundUser.role,
//       permissions: foundUser.permissions,
//     };

//     // Store in localStorage (in real app, use tokens)
//     localStorage.setItem('kebele_user', JSON.stringify(userData));
//     setUser(userData);

//     return {
//       success: true,
//       user: userData,
//       redirectTo: foundUser.permissions.dashboardPath
//     };
//   };

//   const logout = () => {
//     localStorage.removeItem('kebele_user');
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // export const useAuth = () => useContext(AuthContext);
// // contexts/AuthContext.jsx - ADD THIS DEBUG
// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   // Debug logging
//   console.log('Auth Context:', {
//     user: context?.user,
//     isAuthenticated: context?.isAuthenticated,
//     loading: context?.loading
//   });

//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return context;
// };









// contexts/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('kebele_token'));

//   // Check if user is authenticated on app load
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const storedToken = localStorage.getItem('kebele_token');
//       const storedUser = localStorage.getItem('kebele_user');

//       if (storedToken && storedUser) {
//         // Set token in axios headers
//         api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
//         setToken(storedToken);
//         setUser(JSON.parse(storedUser));
//       }

//       setLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await api.post('/auth/login', { email, password });

//       if (response.data.success) {
//         const { token, user, redirectTo } = response.data;

//         // Store token and user
//         localStorage.setItem('kebele_token', token);
//         localStorage.setItem('kebele_user', JSON.stringify(user));

//         // Set axios default headers
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//         setToken(token);
//         setUser(user);

//         return {
//           success: true,
//           user,
//           redirectTo
//         };
//       } else {
//         return {
//           success: false,
//           message: response.data.message
//         };
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       const message = error.response?.data?.message || 'Login failed. Please try again.';
//       return {
//         success: false,
//         message
//       };
//     }
//   };

//   const logout = () => {
//     // Clear localStorage
//     localStorage.removeItem('kebele_token');
//     localStorage.removeItem('kebele_user');

//     // Clear axios headers
//     delete api.defaults.headers.common['Authorization'];

//     // Clear state
//     setToken(null);
//     setUser(null);
//   };

//   const checkPermission = (permission) => {
//     if (!user || !user.permissions) return false;
//     return user.permissions[permission] || false;
//   };

//   const value = {
//     user,
//     token,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!token && !!user,
//     checkPermission
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };






import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Define permissions for each role
const getPermissionsByRole = (role) => {
  const permissions = {
    'Administrator': {
      canEditSettings: true,
      canManageUsers: true,
      canAddCitizens: true,
      canEditCitizens: true,
      canDeleteCitizens: true,
      canIssueIDCards: true,
      canViewReports: true,
      canExportData: true,
      canViewAuditLogs: true,
      dashboardPath: '/',
    },
    'Data Entry Clerk': {
      canEditSettings: false,
      canManageUsers: false,
      canAddCitizens: true,
      canEditCitizens: true,
      canDeleteCitizens: false,
      canIssueIDCards: true,
      canViewReports: true,
      canExportData: false,
      canViewAuditLogs: false,
      dashboardPath: '/',
    },
    'View Only': {
      canEditSettings: false,
      canManageUsers: false,
      canAddCitizens: false,
      canEditCitizens: false,
      canDeleteCitizens: false,
      canIssueIDCards: false,
      canViewReports: true,
      canExportData: false,
      canViewAuditLogs: false,
      dashboardPath: '/',
    }
  };

  return permissions[role] || permissions['View Only'];
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('kebele_token');
      const storedUser = localStorage.getItem('kebele_user');

      if (token && storedUser) {
        try {
          // Set the token in axios headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Parse and set user
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('kebele_token');
          localStorage.removeItem('kebele_user');
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email, password });

      const response = await api.post('/auth/login', {
        email,
        password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        const { token, user } = response.data;

        // Store token and user
        localStorage.setItem('kebele_token', token);
        localStorage.setItem('kebele_user', JSON.stringify(user));

        // Set axios default headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Update state
        setUser(user);

        return {
          success: true,
          user,
          redirectTo: user.permissions.dashboardPath || '/'
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error details:', error);

      // More detailed error message
      let message = 'Login failed. Please try again.';

      if (error.response) {
        // The request was made and the server responded with a status code
        message = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        message = 'No response from server. Please check your connection.';
      }

      return {
        success: false,
        message
      };
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('kebele_token');
    localStorage.removeItem('kebele_user');

    // Clear axios headers
    delete api.defaults.headers.common['Authorization'];

    // Clear state
    setUser(null);

    // Optional: Redirect to login page
    window.location.href = '/login';
  };

  const checkPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions[permission] || false;
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    checkPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};