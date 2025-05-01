import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount 
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Function to register a new user
  function signup(userData) {
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists 
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already in use');
    }
    
    // Create new user with ID and encrypted password (simplified)
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      password: userData.password
    };
    
    // Add user to the list and save
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set as current user
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  }

  // Function to log in
  function login(email, password) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user by email and password
    const user = users.find(
      user => user.email === email && user.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Set as current user
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  }

  // Function to log out
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  // Function to update user profile
  function updateProfile(userData) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find and update the user
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return { ...user, ...userData };
      }
      return user;
    });
    
    // Update in localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current user
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}