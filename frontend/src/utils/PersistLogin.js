import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuthContext } from "../hooks/useAuthContext";
import { Outlet } from "react-router-dom";
export const PersistLogin = () => {
  const { auth, setAuth } = useAuthContext();
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyToken = async () => {
      const { token } = await refresh();

      setAuth({ username: token.username, access: token?.access });
      setLoading(false);
    };
    auth?.access ? setLoading(false) : verifyToken();
  }, []);

  return isLoading ? <div>loading....</div> : <Outlet />;
};
