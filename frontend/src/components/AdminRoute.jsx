import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

function AdminRoute({ children }) {
  const { user, isBootstrapping, isAuthenticated } = useAuth();

  if (isBootstrapping) {
    return <div className="screen-state">Checking permissions...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate replace to="/" />;
  }

  return children;
}

export default AdminRoute;
