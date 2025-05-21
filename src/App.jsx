import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import SlotSelection from './pages/SlotSelection';
import Confirmation from './pages/Confirmation';
import Booking from './pages/Booking';
import Pricing from './pages/Pricing';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  // Optional: Listen to storage events (e.g. logout from another tab)
  useEffect(() => {
    const syncLogin = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token')));
    };
    window.addEventListener('storage', syncLogin);
    return () => window.removeEventListener('storage', syncLogin);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isLoggedIn ? (
          <>
            <Route path="/booking" element={<Booking />} />
            <Route path="/slots" element={<SlotSelection />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/pricing" element={<Pricing />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
