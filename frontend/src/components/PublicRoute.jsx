import { Navigate } from "react-router-dom";
import LoadingState from "./LoadingState";
import { useAuth } from "../modules/auth/hooks/useAuth";

function PublicRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <LoadingState message="Checking your session..." />;
  }

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return children;
}

export default PublicRoute;
