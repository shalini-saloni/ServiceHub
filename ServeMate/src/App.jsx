// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Hire from './pages/Hire';
import Login from './pages/Login';
import About from './pages/About';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hire" element={<Hire setCartItems={setCartItems} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;