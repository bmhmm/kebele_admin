// import React, { Suspense, useEffect } from 'react'
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'; //aditional one
// import { useAuth } from './contexts/AuthContext'
// import Layout from './components/layout/Layout'
// import LoadingSpinner from './components/ui/LoadingSpinner'
// import { MembersPopupProvider } from './contexts/MembersPopupContext';
// import ListIdCards from '../src/pages/listcards';


// // Lazy load pages for better performance
// const Login = React.lazy(() => import('./pages/Login'))
// const Dashboard = React.lazy(() => import('./pages/Dashboard'))
// const AddIndividual = React.lazy(() => import('./pages/AddIndividual'))
// const AddFamily = React.lazy(() => import('./pages/AddFamily'))
// const AddFamilyMembers = React.lazy(() => import('./pages/addFamilyMembers'))
// const AddHouse = React.lazy(() => import('./pages/AddHouse'))
// const AddIdCard = React.lazy(() => import('./pages/AddIdCard'))
// const ListIndividuals = React.lazy(() => import('./pages/ListIndividuals'))
// const ListFamilies = React.lazy(() => import('./pages/ListFamilies'))
// // const Search = React.lazy(() => import('./pages/Search'))
// // const Settings = React.lazy(() => import('./pages/Settings'))
// const FamilyDetails = React.lazy(() => import('./pages/FamilyDetails'))
// // const ListIdCards = React.lazy(() => import('./pages/listcards'));
// const ListHouses = React.lazy(() => import('./pages/listHouse'))

// //importing editindividual.jsx
// import EditIndividual from './pages/EditIndividual';


// // Loading component for suspense fallback
// const PageLoader = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//     <div className="text-center">
//       <LoadingSpinner size="lg" />
//       <p className="mt-4 text-gray-600 font-medium">Loading page...</p>
//     </div>
//   </div>
// )

// // Protected Route wrapper
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth()
//   const location = useLocation()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />
//   }

//   return <Layout>{children}</Layout>
// }

// // Public Route wrapper (redirect to dashboard if already authenticated)
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth()

//   if (isLoading) {
//     return (


//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">


//         <div className="text-center">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     )
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// function App() {
//   const location = useLocation()

//   // Scroll to top on route change
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   // Handle online/offline status
//   useEffect(() => {
//     const handleOnline = () => {
//       // You could show a toast notification here
//       console.log('App is online')
//     }

//     const handleOffline = () => {
//       // You could show a toast notification here
//       console.log('App is offline')
//     }

//     window.addEventListener('online', handleOnline)
//     window.addEventListener('offline', handleOffline)

//     return () => {
//       window.removeEventListener('online', handleOnline)
//       window.removeEventListener('offline', handleOffline)
//     }
//   }, [])

//   return (
//     <div className="App">
//       <Toaster position="top-right" />
//       <Suspense fallback={<PageLoader />}>
//         <MembersPopupProvider>
//           <Routes>
//             {/* Public Routes */}
//             <Route
//               path="/login"
//               element={
//                 <PublicRoute>
//                   <Login />
//                 </PublicRoute>
//               }
//             />

//             {/*here is for login page and role based dashboards*/}
//             {/* Role-specific dashboards */}
//             <Route path="/dashboard/admin" element={
//               <ProtectedRoute allowedRoles={['Administrator']}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } />
//             {/*end of login and role based dashboards*/}

//             {/* Protected Routes */}
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/add-individual"
//               element={
//                 <ProtectedRoute>
//                   <AddIndividual />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/add-family"
//               element={
//                 <ProtectedRoute>
//                   <AddFamily />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/add-house"
//               element={
//                 <ProtectedRoute>
//                   <AddHouse />
//                 </ProtectedRoute>
//               }
//             />
//             {/*Listing Houses*/}
//             <Route path="/list-houses" element={<ListHouses />} />
//             {/*ending of listing houses*/}
//             <Route
//               path="/add-id-card"
//               element={
//                 <ProtectedRoute>
//                   <AddIdCard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/list-id-cards" element={<ListIdCards />} />
//             <Route
//               path="/list-individuals"
//               element={
//                 <ProtectedRoute>
//                   <ListIndividuals />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/edit-individual/:id" element={<EditIndividual />} />
//             <Route
//               path="/list-families"
//               element={
//                 <ProtectedRoute>
//                   <ListFamilies />
//                 </ProtectedRoute>
//               }
//             />
//             {/*family details route*/}
//             <Route path="/families/:id" element={<FamilyDetails />} />
//             {/**/}

//             {/* adding addmembers routes*/}
//             <Route
//               path="/families/:familyId/add-members"
//               element={<AddFamilyMembers />} />

//             {/* ending adding addmembers route*/}
//             {/* <Route
//               path="/search"
//               element={
//                 <ProtectedRoute>
//                   <Search />
//                 </ProtectedRoute>
//               }
//             /> */}
//             {/* <Route
//               path="/list-id-cards"
//               element={
//                 <ProtectedRoute>
//                   <ListIdCards />
//                 </ProtectedRoute>
//               }
//             /> */}
//             <Route
//               path="/settings"
//               element={
//                 <ProtectedRoute>
//                   <Settings />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Fallback routes */}
//             <Route path="/dashboard" element={<Navigate to="/" replace />} />

//             {/* 404 Not Found */}

//           </Routes>
//         </MembersPopupProvider>
//       </Suspense>
//     </div>
//   )
// }

// export default App











// import React, { Suspense, useEffect } from 'react'
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import { useAuth } from './contexts/AuthContext'
// import Layout from './components/layout/Layout'
// import LoadingSpinner from './components/ui/LoadingSpinner'
// import { MembersPopupProvider } from './contexts/MembersPopupContext'

// // Import role-based components
// import ProtectedRoute from './components/protectedRoutes'
// import LoginPage from './pages/Login'
// import SettingsPage from './pages/Settings'
// import AdminDashboard from './components/dashboard/admindashboard'
// import DataEntryDashboard from './components/dashboard/dataentrydashboards'
// import ViewerDashboard from './components/dashboard/viewerdashboard'
// import ListIdCards from './pages/listcards'
// import EditIndividual from './pages/EditIndividual'
// import ListHouses from './pages/listHouse'

// // Lazy load pages for better performance
// const Login = React.lazy(() => import('./pages/Login'))
// const Dashboard = React.lazy(() => import('./pages/Dashboard'))
// const AddIndividual = React.lazy(() => import('./pages/AddIndividual'))
// const AddFamily = React.lazy(() => import('./pages/AddFamily'))
// const AddFamilyMembers = React.lazy(() => import('./pages/addFamilyMembers'))
// const AddHouse = React.lazy(() => import('./pages/AddHouse'))
// const AddIdCard = React.lazy(() => import('./pages/AddIdCard'))
// const ListIndividuals = React.lazy(() => import('./pages/ListIndividuals'))
// const ListFamilies = React.lazy(() => import('./pages/ListFamilies'))
// const FamilyDetails = React.lazy(() => import('./pages/FamilyDetails'))

// // Loading component for suspense fallback
// const PageLoader = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//     <div className="text-center">
//       <LoadingSpinner size="lg" />
//       <p className="mt-4 text-gray-600 font-medium">Loading page...</p>
//     </div>
//   </div>
// )

// // Protected Route wrapper (updated to handle roles)
// const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
//   const { isAuthenticated, isLoading, user } = useAuth()
//   const location = useLocation()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />
//   }

//   // Check role-based access if allowedRoles is specified
//   if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center p-6">
//           <div className="text-center">
//             <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
//             <p className="text-gray-600 mb-4">
//               Your role ({user.role}) doesn't have permission to access this page.
//             </p>
//             <button
//               onClick={() => window.history.back()}
//               className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return <Layout>{children}</Layout>
// }

// // Public Route wrapper (redirect to dashboard if already authenticated)
// const PublicRouteWrapper = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     )
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// // Role-based redirect component
// const RoleBasedRedirect = () => {
//   const { user } = useAuth()

//   if (!user) return <Navigate to="/login" />

//   switch (user.role) {
//     case 'Administrator':
//       return <Navigate to="/dashboard/admin" />
//     case 'Data Entry':
//       return <Navigate to="/dashboard/data-entry" />
//     case 'Viewer':
//       return <Navigate to="/dashboard/viewer" />
//     default:
//       return <Navigate to="/" />
//   }
// }

// function App() {
//   const location = useLocation()

//   // Scroll to top on route change
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   // Handle online/offline status
//   useEffect(() => {
//     const handleOnline = () => {
//       console.log('App is online')
//     }

//     const handleOffline = () => {
//       console.log('App is offline')
//     }

//     window.addEventListener('online', handleOnline)
//     window.addEventListener('offline', handleOffline)

//     return () => {
//       window.removeEventListener('online', handleOnline)
//       window.removeEventListener('offline', handleOffline)
//     }
//   }, [])

//   return (
//     <div className="App">
//       <Toaster position="top-right" />
//       <Suspense fallback={<PageLoader />}>
//         <MembersPopupProvider>
//           <Routes>
//             {/* Public Routes - using LoginPage component */}
//             <Route
//               path="/login"
//               element={
//                 <PublicRouteWrapper>
//                   <LoginPage />
//                 </PublicRouteWrapper>
//               }
//             />

//             {/* Old login route for backward compatibility */}
//             <Route
//               path="/old-login"
//               element={
//                 <PublicRouteWrapper>
//                   <Login />
//                 </PublicRouteWrapper>
//               }
//             />

//             {/* Role-specific dashboards */}
//             <Route path="/dashboard/admin" element={
//               <ProtectedRouteWrapper allowedRoles={['Administrator']}>
//                 <AdminDashboard />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/dashboard/data-entry" element={
//               <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                 <DataEntryDashboard />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/dashboard/viewer" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ViewerDashboard />
//               </ProtectedRouteWrapper>
//             } />

//             {/* Protected Routes with role-based access */}
//             <Route
//               path="/"
//               element={
//                 <ProtectedRouteWrapper>
//                   <RoleBasedRedirect />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRouteWrapper>
//                   <Dashboard />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             {/* Data entry routes - accessible to Data Entry and Admin */}
//             <Route
//               path="/add-individual"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddIndividual />
//                 </ProtectedRouteWrapper>
//               }
//             />
//             <Route
//               path="/add-family"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddFamily />
//                 </ProtectedRouteWrapper>
//               }
//             />
//             <Route
//               path="/add-house"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddHouse />
//                 </ProtectedRouteWrapper>
//               }
//             />
//             <Route
//               path="/add-id-card"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddIdCard />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             {/* Listings - accessible to all roles except Viewer for some */}
//             <Route path="/list-houses" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListHouses />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/list-id-cards" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListIdCards />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/list-individuals" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListIndividuals />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/edit-individual/:id" element={
//               <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                 <EditIndividual />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/list-families" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListFamilies />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/families/:id" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <FamilyDetails />
//               </ProtectedRouteWrapper>
//             } />

//             {/* Add members - only Data Entry and Admin */}
//             <Route path="/families/:familyId/add-members" element={
//               <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                 <AddFamilyMembers />
//               </ProtectedRouteWrapper>
//             } />

//             {/* Settings - Admin only */}
//             <Route
//               path="/settings"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Administrator']}>
//                   <SettingsPage />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             {/* 404 Not Found - Keep your existing 404 route if you have one */}
//             <Route path="*" element={
//               <ProtectedRouteWrapper>
//                 <div className="min-h-screen flex items-center justify-center">
//                   <div className="text-center">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
//                     <p className="text-gray-600">Page not found</p>
//                   </div>
//                 </div>
//               </ProtectedRouteWrapper>
//             } />
//           </Routes>
//         </MembersPopupProvider>
//       </Suspense>
//     </div>
//   )
// }

// export default App






// import React, { Suspense, useEffect } from 'react'
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import { useAuth } from './contexts/AuthContext'
// import Layout from './components/layout/Layout'
// import LoadingSpinner from './components/ui/LoadingSpinner'
// import { MembersPopupProvider } from './contexts/MembersPopupContext'

// // Import role-based components
// import ProtectedRoute from './components/protectedRoutes'
// import LoginPage from './pages/Login'
// import SettingsPage from './pages/Settings'
// import AdminDashboard from './components/dashboard/admindashboard'
// import DataEntryDashboard from './components/dashboard/dataentrydashboards'
// import ViewerDashboard from './components/dashboard/admindashboard'
// import ListIdCards from './pages/listcards'
// import EditIndividual from './pages/EditIndividual'
// import ListHouses from './pages/listHouse'

// // Lazy load pages for better performance
// const Login = React.lazy(() => import('./pages/Login'))
// const Dashboard = React.lazy(() => import('./pages/Dashboard'))
// const AddIndividual = React.lazy(() => import('./pages/AddIndividual'))
// const AddFamily = React.lazy(() => import('./pages/AddFamily'))
// const AddFamilyMembers = React.lazy(() => import('./pages/addFamilyMembers'))
// const AddHouse = React.lazy(() => import('./pages/AddHouse'))
// const AddIdCard = React.lazy(() => import('./pages/AddIdCard'))
// const ListIndividuals = React.lazy(() => import('./pages/ListIndividuals'))
// const ListFamilies = React.lazy(() => import('./pages/ListFamilies'))
// const FamilyDetails = React.lazy(() => import('./pages/FamilyDetails'))

// // Loading component for suspense fallback
// const PageLoader = () => (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//     <div className="text-center">
//       <LoadingSpinner size="lg" />
//       <p className="mt-4 text-gray-600 font-medium">Loading page...</p>
//     </div>
//   </div>
// )

// // Role-based redirect component
// const RoleBasedRedirect = () => {
//   const { user } = useAuth();

//   console.log('RoleBasedRedirect - User:', user); // Debug log

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   switch (user.role) {
//     case 'Administrator':
//       return <Navigate to="/dashboard/admin" replace />;
//     case 'Data Entry':
//       return <Navigate to="/dashboard/data-entry" replace />;
//     case 'Viewer':
//       return <Navigate to="/dashboard/viewer" replace />;
//     default:
//       // Fallback to regular dashboard
//       return <Navigate to="/" replace />;
//   }
// };

// // Protected Route wrapper (updated)
// const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const location = useLocation();

//   console.log('ProtectedRouteWrapper:', { user, isAuthenticated, isLoading, allowedRoles }); // Debug

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     console.log('Not authenticated, redirecting to login');
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Check role-based access if allowedRoles is specified
//   if (allowedRoles && allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
//     console.log('Access denied for role:', user.role, 'Allowed:', allowedRoles);
//     return (
//       <Layout>
//         <div className="min-h-screen flex items-center justify-center p-6">
//           <div className="text-center">
//             <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
//             <p className="text-gray-600 mb-4">
//               Your role ({user.role}) doesn't have permission to access this page.
//             </p>
//             <button
//               onClick={() => window.history.back()}
//               className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return <Layout>{children}</Layout>;
// };

// // Public Route wrapper
// const PublicRouteWrapper = ({ children }) => {
//   const { isAuthenticated, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <LoadingSpinner size="lg" />
//           <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// function App() {
//   const location = useLocation();

//   // Scroll to top on route change
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <div className="App">
//       <Toaster position="top-right" />
//       <Suspense fallback={<PageLoader />}>
//         <MembersPopupProvider>
//           <Routes>
//             {/* Public Routes - using LoginPage component */}
//             <Route
//               path="/login"
//               element={
//                 <PublicRouteWrapper>
//                   <LoginPage />
//                 </PublicRouteWrapper>
//               }
//             />

//             {/* Old login route for backward compatibility */}
//             <Route
//               path="/old-login"
//               element={
//                 <PublicRouteWrapper>
//                   <Login />
//                 </PublicRouteWrapper>
//               }
//             />

//             {/* Role-specific dashboards */}
//             <Route path="/dashboard/admin" element={
//               <ProtectedRouteWrapper allowedRoles={['Administrator']}>
//                 <AdminDashboard />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/dashboard/data-entry" element={
//               <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                 <DataEntryDashboard />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/dashboard/viewer" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ViewerDashboard />
//               </ProtectedRouteWrapper>
//             } />

//             {/* Root path - redirects based on role */}
//             <Route
//               path="/"
//               element={<RoleBasedRedirect />}
//             />

//             {/* Old dashboard route for backward compatibility */}
//             <Route
//               path="/old-dashboard"
//               element={
//                 <ProtectedRouteWrapper>
//                   <Dashboard />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             {/* Data entry routes */}
//             <Route
//               path="/add-individual"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddIndividual />
//                 </ProtectedRouteWrapper>
//               }
//             />
//             <Route
//               path="/add-family"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddFamily />
//                 </ProtectedRouteWrapper>
//               }
//             />
//             <Route
//               path="/add-house"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddHouse />
//                 </ProtectedRouteWrapper>
//               }
//             />
//             <Route
//               path="/add-id-card"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                   <AddIdCard />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             {/* Listings */}
//             <Route path="/list-houses" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListHouses />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/list-id-cards" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListIdCards />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/list-individuals" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListIndividuals />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/edit-individual/:id" element={
//               <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                 <EditIndividual />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/list-families" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <ListFamilies />
//               </ProtectedRouteWrapper>
//             } />

//             <Route path="/families/:id" element={
//               <ProtectedRouteWrapper allowedRoles={['Viewer', 'Data Entry', 'Administrator']}>
//                 <FamilyDetails />
//               </ProtectedRouteWrapper>
//             } />

//             {/* Add members */}
//             <Route path="/families/:familyId/add-members" element={
//               <ProtectedRouteWrapper allowedRoles={['Data Entry', 'Administrator']}>
//                 <AddFamilyMembers />
//               </ProtectedRouteWrapper>
//             } />

//             {/* Settings - Admin only */}
//             <Route
//               path="/settings"
//               element={
//                 <ProtectedRouteWrapper allowedRoles={['Administrator']}>
//                   <SettingsPage />
//                 </ProtectedRouteWrapper>
//               }
//             />

//             {/* 404 Not Found */}
//             <Route path="*" element={
//               <ProtectedRouteWrapper>
//                 <div className="min-h-screen flex items-center justify-center">
//                   <div className="text-center">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
//                     <p className="text-gray-600">Page not found</p>
//                   </div>
//                 </div>
//               </ProtectedRouteWrapper>
//             } />
//           </Routes>
//         </MembersPopupProvider>
//       </Suspense>
//     </div>
//   );
// }

// export default App;





import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'; //aditional one
import { useAuth } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { MembersPopupProvider } from './contexts/MembersPopupContext';
import ListIdCards from '../src/pages/listcards';


// Lazy load pages for better performance
const Login = React.lazy(() => import('./pages/Login'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const AddIndividual = React.lazy(() => import('./pages/AddIndividual'))
const AddFamily = React.lazy(() => import('./pages/AddFamily'))
const AddFamilyMembers = React.lazy(() => import('./pages/addFamilyMembers'))
const AddHouse = React.lazy(() => import('./pages/AddHouse'))
const AddIdCard = React.lazy(() => import('./pages/AddIdCard'))
const ListIndividuals = React.lazy(() => import('./pages/ListIndividuals'))
const ListFamilies = React.lazy(() => import('./pages/ListFamilies'))
// const Search = React.lazy(() => import('./pages/Search'))
const Settings = React.lazy(() => import('./pages/Settings'))
const FamilyDetails = React.lazy(() => import('./pages/FamilyDetails'))
// const ListIdCards = React.lazy(() => import('./pages/listcards'));
const ListHouses = React.lazy(() => import('./pages/listHouse'))

//importing editindividual.jsx
import EditIndividual from './pages/EditIndividual';


// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600 font-medium">Loading page...</p>
    </div>
  </div>
)

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Layout>{children}</Layout>
}

// Public Route wrapper (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (


      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">


        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      // You could show a toast notification here
      console.log('App is online')
    }

    const handleOffline = () => {
      // You could show a toast notification here
      console.log('App is offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="App">
      <Toaster position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <MembersPopupProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/*here is for login page and role based dashboards*/}
            {/* Role-specific dashboards */}
            {/* <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={['Administrator']}>
                <AdminDashboard />
              </ProtectedRoute>
            } /> */}
            {/*end of login and role based dashboards*/}

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/*starting of adding role based route*/}

            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={['Administrator']}>
                  <Settings />
                </ProtectedRoute>
              }
            />

// For data entry clerk routes (no settings):
            <Route
              path="/add-individual"
              element={
                <ProtectedRoute
                  allowedRoles={['Administrator', 'Data Entry Clerk']}
                  requiredPermissions={['canAddCitizens']}
                >
                  <AddIndividual />
                </ProtectedRoute>
              }
            />

// For view-only routes:
            <Route
              path="/list-individuals"
              element={
                <ProtectedRoute
                  allowedRoles={['Administrator', 'Data Entry Clerk', 'View Only']}
                  requiredPermissions={['canViewReports']}
                >
                  <ListIndividuals />
                </ProtectedRoute>
              }
            />

            {/*ending of adding role based route*/}
            <Route
              path="/add-individual"
              element={
                <ProtectedRoute>
                  <AddIndividual />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-family"
              element={
                <ProtectedRoute>
                  <AddFamily />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-house"
              element={
                <ProtectedRoute>
                  <AddHouse />
                </ProtectedRoute>
              }
            />
            {/*Listing Houses*/}
            <Route path="/list-houses" element={<ListHouses />} />
            {/*ending of listing houses*/}
            <Route
              path="/add-id-card"
              element={
                <ProtectedRoute>
                  <AddIdCard />
                </ProtectedRoute>
              }
            />
            <Route path="/list-id-cards" element={<ListIdCards />} />
            <Route
              path="/list-individuals"
              element={
                <ProtectedRoute>
                  <ListIndividuals />
                </ProtectedRoute>
              }
            />
            <Route path="/edit-individual/:id" element={<EditIndividual />} />
            <Route
              path="/list-families"
              element={
                <ProtectedRoute>
                  <ListFamilies />
                </ProtectedRoute>
              }
            />
            {/*family details route*/}
            <Route path="/families/:id" element={<FamilyDetails />} />
            {/**/}

            {/* adding addmembers routes*/}
            <Route
              path="/families/:familyId/add-members"
              element={<AddFamilyMembers />} />

            {/* ending adding addmembers route*/}
            {/* <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/list-id-cards"
              element={
                <ProtectedRoute>
                  <ListIdCards />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Fallback routes */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            {/* 404 Not Found */}

          </Routes>
        </MembersPopupProvider>
      </Suspense>
    </div>
  )
}

export default App