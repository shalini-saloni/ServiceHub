import React, { useEffect, useState, useRef } from 'react';
import { ShoppingCart, User, Search, MapPin, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import logo from '../images/logo.png';
import Cart from './Cart';

const Navbar = ({ cartItems }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const serviceSuggestions = ['maid', 'carpenter', 'plumber', 'electrician', 'gardener'];
  const [placeholder, setPlaceholder] = useState('Search for "maid"');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState(cartItems || []);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

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

  // Handle clicks outside user menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
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
            
            {currentUser ? (
              <div className="user-menu-container" ref={userMenuRef}>
                <button className="icon-button user-button" onClick={toggleUserMenu}>
                  <div className="user-avatar">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <span className="user-name">{currentUser.name}</span>
                      <span className="user-email">{currentUser.email}</span>
                    </div>
                    <div className="user-dropdown-actions">
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <button onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="icon-button">
                  <User size={22} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      
      {/* Cart Component */}
      <Cart
        cartItems={navbarItems}
        setCartItems={(newItems) => {
          
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