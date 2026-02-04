import React, { useEffect, useState, useRef } from 'react';
import { ShoppingCart, User, Search, MapPin, LogOut, Navigation } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import logo from '../images/logo.png';
import Cart from './Cart';

const Navbar = ({ cartItems }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const serviceSuggestions = ['home repairs', 'decorating', 'plumbing', 'electrical', 'carpentry', 'furniture assembly'];
  
  const [placeholder, setPlaceholder] = useState('Search for "maid"');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState(cartItems || []);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false); 
  
  const userMenuRef = useRef(null);

  useEffect(() => {
    const getAutoLocation = () => {
      if ("geolocation" in navigator) {
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              const city = data.address.city || data.address.town || data.address.village || data.address.state;
              if (city) setLocationQuery(city);
            } catch (error) {
              console.error("Geocoding failed:", error);
            } finally {
              setIsLocating(false);
            }
          },
          (error) => {
            console.warn("Location blocked by user:", error.message);
            setIsLocating(false);
          }
        );
      }
    };

    getAutoLocation();
  }, []); 

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

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      navigate('/hire', { 
        state: { 
          query: searchQuery, 
          location: locationQuery 
        } 
      });
    }
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
        
        <div className="navbar-right">
          <div className="input-location-wrapper">
            <input
              type="text"
              placeholder={isLocating ? "Locating..." : "Enter Location"}
              className="input-location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={handleSearch}
            />

            {isLocating ? (
              <Navigation className="location-icon rotating" size={18} />
            ) : (
              <MapPin className="location-icon" size={18} />
            )}
          </div>

          <div className="input-service-wrapper">
            <input
              type="text"
              placeholder={placeholder}
              className="input-service"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <Search 
              className="search-icon" 
              size={18} 
              onClick={handleSearch} 
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="icon-buttons">
            <button className="icon-button" onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart size={22} />
              {navbarItems.length > 0 && <span className="cart-badge">{navbarItems.length}</span>}
            </button>
            
            {currentUser ? (
              <div className="user-menu-container" ref={userMenuRef}>
                <button className="icon-button user-button" onClick={() => setShowUserMenu(!showUserMenu)}>
                  <div className="user-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <span className="user-name">{currentUser.name}</span>
                    </div>
                    <div className="user-dropdown-actions">
                      <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                        <User size={16} /> <span>My Profile</span>
                      </Link>
                      <button onClick={handleLogout}><LogOut size={16} /> <span>Logout</span></button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login"><button className="icon-button"><User size={22} /></button></Link>
            )}
          </div>
        </div>
      </nav>
      <Cart
        cartItems={navbarItems}
        setCartItems={(newItems) => {
          if (cartItems?.setCartItems) cartItems.setCartItems(newItems);
          setNavbarItems(newItems);
        }}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;