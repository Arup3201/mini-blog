import { Outlet, Navigate } from "react-router";

import useAuth from "../hooks/use-auth";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
