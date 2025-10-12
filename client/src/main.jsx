import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import App from './App.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Landing from './Landing.jsx'
import OAuthSuccess from './OAuthSuccess.jsx'
import './index.css'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.5rem'
    }}>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

// Public Route Component (redirect to dashboard if logged in)
function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.5rem'
    }}>Loading...</div>;
  }
  
  return user ? <Navigate to="/dashboard" /> : children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)