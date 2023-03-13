import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
const ProtedtedRoute = ({ children }) => {
  const { admin } = useAppContext();
  if (!admin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtedtedRoute;
