// // components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import LoadingSpinner from './ui/LoadingSpinner';

// const ProtectedRoute = ({ children, requiredPermissions = [], allowedRoles = [] }) => {
//     const { isAuthenticated, user, loading } = useAuth();
//     const location = useLocation();

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <LoadingSpinner size="lg" />
//             </div>
//         );
//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // Check role-based access
//     if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//         return <Navigate to="/" replace />;
//     }

//     // Check permission-based access
//     const hasRequiredPermissions = requiredPermissions.every(permission =>
//         user.permissions[permission]
//     );

//     if (requiredPermissions.length > 0 && !hasRequiredPermissions) {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;


// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './ui/LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to dashboard if user doesn't have required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;