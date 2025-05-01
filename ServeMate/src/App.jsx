// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Hire from './pages/Hire';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  
  return (
    <Router>
      <Navbar cartItems={{ items: cartItems, setCartItems }} user={currentUser} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hire" element={<Hire cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;