import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

export default function ProtectedRoute() {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
