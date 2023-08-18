import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectPath = '/home', children, }){
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute