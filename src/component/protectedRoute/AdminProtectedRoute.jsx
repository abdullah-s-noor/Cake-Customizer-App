import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../context/User';
export default function AdminProtectedRoute({ children }) {//for admin protected route
  console.log("AdminProtectedRoute rendered");
  const { userToken } = React.useContext(UserContext);
  const location = useLocation();

  if (!userToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  let tokenInfo;
  try {
    tokenInfo = jwtDecode(userToken);
  } catch (err) {
    return <Navigate to="/login" replace />;
  }

  if (tokenInfo.role !== 'admin') {
    return <Navigate to="/notfound" replace />;
  }
  return children;
}
