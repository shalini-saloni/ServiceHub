import React, { useEffect, useState } from 'react';
import { ShoppingCart, User, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';
import Cart from './Cart';

const Navbar = ({ cartItems }) => {
  const serviceSuggestions = ['maid', 'carpenter', 'plumber', 'electrician', 'gardener'];
  const [placeholder, setPlaceholder] = useState('Search for "maid"');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState(cartItems || []);

  // Keep navbarItems in sync with cartItems
  useEffect(() => {
    setNavbarItems(cartItems || []);
  }, [cartItems]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % serviceSuggestions.length;
      setPlaceholder(`Search for "${serviceSuggestions[index]}"`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left: Logo + Links */}
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/hire">Hire</Link>
            <Link to="/#contact">Contact Us</Link>
          </div>
        </div>
        {/* Right: Inputs + Icons */}
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
            <button className="icon-button" onClick={toggleCart}>
              <ShoppingCart size={22} />
              {navbarItems.length > 0 && (
                <span className="cart-badge">{navbarItems.length}</span>
              )}
            </button>
            <Link to="/login">
              <button className="icon-button">
                <User size={22} />
              </button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Cart Component */}
      <Cart 
        cartItems={navbarItems} 
        setCartItems={(newItems) => {
          // This assumes App.jsx passes setCartItems function in the cartItems prop
          if (cartItems && typeof cartItems.setCartItems === 'function') {
            cartItems.setCartItems(newItems);
          }
          setNavbarItems(newItems);
        }}
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  );
};

export default Navbar;