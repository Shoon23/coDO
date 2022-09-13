import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  const { auth } = useAuthContext();

  return auth?.access ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
export default PrivateRoutes;
