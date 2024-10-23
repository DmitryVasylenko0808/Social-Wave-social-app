import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default RequireAuth;
