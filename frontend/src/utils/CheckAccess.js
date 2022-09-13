import { useAuthContext } from "../hooks/useAuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

export const CheckAccess = () => {
  const [isLoading, setLoading] = useState(true);
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyToken = async () => {
      const { token } = await refresh();
      setAuth({ username: token.username, access: token?.access });
      setLoading(false);
    };
    !auth?.access ? verifyToken() : setLoading(false);
  }, []);

  return auth?.access ? (
    navigate(-1)
  ) : isLoading ? (
    <div className="">loading....</div>
  ) : (
    <Outlet />
  );
};
