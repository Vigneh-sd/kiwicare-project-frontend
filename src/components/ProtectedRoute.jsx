import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ allowedRoles, children }) {
  const token = localStorage.getItem('accessToken');

  // 🔒 Redirect if token is missing
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded?.authorities?.[0]?.replace('ROLE_', '');

    // 🚫 Redirect if user role not allowed
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }

    // ✅ Access granted
    return children;
  } catch (error) {
    console.error('Token decode failed:', error);
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
