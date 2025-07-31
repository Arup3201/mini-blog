import { Outlet, Navigate } from "react-router";

import useAuth from "../hooks/use-auth";
import Navbar from "./navbar";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? (
    <div className="d-flex flex-column">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
