import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'; //aditional one
import { useAuth } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy load pages for better performance
const Login = React.lazy(() => import('./pages/Login'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const AddIndividual = React.lazy(() => import('./pages/AddIndividual'))
const AddFamily = React.lazy(() => import('./pages/AddFamily'))
const AddHouse = React.lazy(() => import('./pages/AddHouse'))
const AddIdCard = React.lazy(() => import('./pages/AddIdCard'))
const ListIndividuals = React.lazy(() => import('./pages/ListIndividuals'))
const ListFamilies = React.lazy(() => import('./pages/ListFamilies'))
const Search = React.lazy(() => import('./pages/Search'))
const Settings = React.lazy(() => import('./pages/Settings'))
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

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/add-id-card"
            element={
              <ProtectedRoute>
                <AddIdCard />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
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
      </Suspense>
    </div>
  )
}

export default App