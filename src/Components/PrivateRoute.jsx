import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for checking user

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);  // Set user if found
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
    
    setLoading(false);  // Stop loading after check
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // You can return a loading spinner here
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  // If user exists, render the children (protected routes)
  return children;
};

export default PrivateRoute;
