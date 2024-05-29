import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // ローカルストレージからトークンを取得してトークンがあるかどうかで判断
    const isAuthenticated = !!localStorage.getItem('token'); 

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
