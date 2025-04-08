import React, { useEffect, useState } from 'react';
import { ShoppingCart, User, Search , MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const serviceSuggestions = ['maid', 'carpenter', 'plumber', 'electrician', 'gardener'];
  const [placeholder, setPlaceholder] = useState('Search for "maid"');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % serviceSuggestions.length;
      setPlaceholder(`Search for "${serviceSuggestions[index]}"`);
    }, 2000); // rotates every 2 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">MyServiceApp</Link>

      {/* Center Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/book">Book</Link>
      </div>

      {/* Right: Search + Icons */}
      <div className="navbar-right">
      <div className="input-location-wrapper">
  <input
    type="text"
    placeholder="Enter Location"
    className="input-location"
  />
  <MapPin className="location-icon" size={18} />
</div>

        <div className="input-service-wrapper">
          <input
            type="text"
            placeholder={placeholder}
            className="input-service"
          />
          <Search className="search-icon" size={18} />
        </div>

        <div className="icon-buttons">
          <button className="icon-button"><ShoppingCart size={22} /></button>
          <button className="icon-button"><User size={22} /></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
