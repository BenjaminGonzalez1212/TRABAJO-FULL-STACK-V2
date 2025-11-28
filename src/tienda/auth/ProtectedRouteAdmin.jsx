import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRouteAdmin() {
  const auth = useAuth();

  if (!auth.isAuthenticated || auth.user?.role !== "admin") {
    return <Navigate to="/TRABAJO-FULL-STACK-V2/login" replace />;
  }

  return <Outlet />;
}