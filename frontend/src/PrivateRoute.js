import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Import your Auth context or hook

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth(); // Adjust based on your auth logic

    return (
        <Route
            {...rest}
            element={isAuthenticated ? children : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
