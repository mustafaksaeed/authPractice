import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function ProtectedRoute() {
  const { loginVal } = AuthContext();
  return loginVal ? <Outlet /> : <Navigate to="/" />;
}
