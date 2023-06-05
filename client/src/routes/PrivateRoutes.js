import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoutes({ navigate, children }) {
  const { authState } = useContext(AuthContext);
  return authState.isAuthenticated ? <>{children}</> : <Navigate to={navigate} />;
}

export default PrivateRoutes;
