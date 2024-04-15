import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = // logic to check if user is authenticated
    return (
        <Route {...rest} element={isAuthenticated ? children : <Navigate to="/login" />} />
    );
};

export default PrivateRoute;
