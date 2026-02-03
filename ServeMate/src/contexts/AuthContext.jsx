import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE = "http://localhost:5000/api/auth";

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) setCurrentUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  async function signup(userData) {
    const res = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setCurrentUser(data.user);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  }

  async function login(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    setCurrentUser(data.user);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  }

  async function updateProfile(userData) {
    const res = await fetch(`${API_BASE}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, id: currentUser.id })
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Update failed");
    setCurrentUser(data);
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, updateProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}