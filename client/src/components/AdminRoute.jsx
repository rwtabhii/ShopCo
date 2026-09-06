import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading, initialized } = useSelector(
    (state) => state.auth
  );

  if (!initialized && loading) {
    return <Loader text="Checking admin access..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
