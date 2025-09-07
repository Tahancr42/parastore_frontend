import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManagerRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "GESTIONNAIRE") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ManagerRoute;
