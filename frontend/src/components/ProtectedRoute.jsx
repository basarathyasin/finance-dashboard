import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return <div className="screen-state">Checking your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
