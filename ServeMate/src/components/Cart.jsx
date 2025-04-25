import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import './Cart.css';

const Cart = ({ cartItems, setCartItems, isOpen, onClose }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    
    const calculateTotal = () => {
      const items = Array.isArray(cartItems) ? cartItems : (cartItems?.items || []);
      const subtotalAmount = items.reduce((acc, item) => {
        const price = extractPrice(item.rate);
        return acc + (price * (item.quantity || 1));
      }, 0);
      
      const taxAmount = subtotalAmount * 0.08; // 8% tax rate
      const totalAmount = subtotalAmount + taxAmount;
      
      setSubTotal(subtotalAmount);
      setTax(taxAmount);
      setTotal(totalAmount);
    };
    
    calculateTotal();
  }, [cartItems]);
  
  
  const extractPrice = (rateString) => {
    if (!rateString) return 0;
    
    // Handle ranges like "$50-150"
    if (rateString.includes('-')) {
      const matches = rateString.match(/\$(\d+)-(\d+)/);
      if (matches && matches.length >= 3) {
        return (parseFloat(matches[1]) + parseFloat(matches[2])) / 2;
      }
    }
    
    // Handle hourly rates like "$65/hour"
    const matches = rateString.match(/\$(\d+)/);
    return matches ? parseFloat(matches[1]) : 0;
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    const items = Array.isArray(cartItems) ? cartItems : (cartItems?.items || []);
    const updatedCart = items.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (itemId) => {
    const items = Array.isArray(cartItems) ? cartItems : (cartItems?.items || []);
    const updatedCart = items.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  if (!isOpen) return null;
  const items = Array.isArray(cartItems) ? cartItems : (cartItems?.items || []);

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={item.image && !item.image.includes('example.com') 
                        ? item.image 
                        : '/api/placeholder/80/80'} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-rate">{item.rate}</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="payment-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>UPI</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Credit Card / Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Cash</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Net Banking</span>
                </label>
              </div>
              
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
              
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;