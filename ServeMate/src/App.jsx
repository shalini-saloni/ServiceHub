// App.jsx
import React, { useState,useEffect } from 'react';
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

  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser?.id) {
        try {
          const res = await fetch(`http://localhost:5001/api/cart/${currentUser.id}`);
          const data = await res.json();
          setCartItems(data || []);
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        }
      } else {
        setCartItems([]); 
      }
    };
    fetchCart();
  }, [currentUser]);

  useEffect(() => {
    const syncCart = async () => {
      if (currentUser?.id) {
        try {
          await fetch('http://localhost:5001/api/cart/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser.id, cartItems })
          });
        } catch (err) {
          console.error("Failed to sync cart:", err);
        }
      }
    };

    const timeoutId = setTimeout(syncCart, 1000);
    return () => clearTimeout(timeoutId);
  }, [cartItems, currentUser]);
  
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