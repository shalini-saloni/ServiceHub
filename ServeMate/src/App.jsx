// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Hire from './pages/Hire';
import Login from './pages/Login';
import About from './pages/About';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
