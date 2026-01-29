import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true); // check auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // true if token exists
    setLoading(false); // done checking
  }, []);

  if (loading) return null; // render nothing while checking

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
