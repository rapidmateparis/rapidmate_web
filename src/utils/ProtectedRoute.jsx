import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) =>state.auth );
  const user = useSelector((state) => state.auth.user);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  if(role == 'DELIVERY_BOY' || role== 'ENTERPRISE'){
    const { is_active, vehicleAdd } = user?.userDetails || {};
    if(is_active === 0 && vehicleAdd === true){
      return <Navigate to="/request-pending" />;
    }
  }
  return children;
};

export default ProtectedRoute;
