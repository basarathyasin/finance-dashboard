import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

function PublicRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div className="screen-state">Checking your session...</div>;
  }

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return children;
}

export default PublicRoute;
