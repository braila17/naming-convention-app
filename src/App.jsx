import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NamingApp from './NamingApp';
import AdminPanel from './AdminPanel';
import Login from './Login';

export default function App() {
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NamingApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
