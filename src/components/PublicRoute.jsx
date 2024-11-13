import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check if token is present

    if (token) {
        // Redirect to the homepage (or any protected route) if the user is logged in
        return <Navigate to="/" replace />;
    }

    // Allow access to the route if not authenticated
    return children;
};

export default PublicRoute;
