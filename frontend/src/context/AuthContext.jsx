import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nj_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('nj_admin_user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    localStorage.setItem('nj_admin_token', data.access_token);
    localStorage.setItem('nj_admin_user', JSON.stringify({
      username: data.username,
      full_name: data.full_name
    }));
    setToken(data.access_token);
    setUser({
      username: data.username,
      full_name: data.full_name
    });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('nj_admin_token');
    localStorage.removeItem('nj_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
