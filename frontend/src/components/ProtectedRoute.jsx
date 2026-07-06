import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login if token is missing
    return <Navigate to="/login" replace />;
  }

  // Render children (if passed directly) or the nested route Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
