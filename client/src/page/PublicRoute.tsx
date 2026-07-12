import { useAuthStore } from "@/store/AuthStore";
import { Navigate } from "react-router-dom";
import { Login } from "./Login";

export function PublicRoute() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }
  return <Login />;
}
