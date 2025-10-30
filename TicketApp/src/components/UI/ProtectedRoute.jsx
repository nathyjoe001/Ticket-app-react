import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../../utils/auth";

export default function ProtectedRoute() {
  const session = getSession();

  // Optional: log if session is missing (useful for debugging)
  if (!session) {
    console.warn("ProtectedRoute: no session found, redirecting to login.");
  }

  return session ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
