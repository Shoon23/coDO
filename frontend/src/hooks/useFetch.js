import { useAuthContext } from "./useAuthContext";
import jwt_decode from "jwt-decode";
import useRefreshToken from "./useRefreshToken";
const useFetch = () => {
  const { auth } = useAuthContext();
  const refresh = useRefreshToken();

  const callHooks = async (url, config) => {
    const { exp } = jwt_decode(auth.access);
    const expireIn = new Date(exp * 1000).toLocaleString();
    const currentDate = new Date().toLocaleString();

    if (currentDate > expireIn) {
      const { token } = await refresh();
      config.headers.Authorization = `Bearer ${token.access}`;
    }

    const response = await fetch(url, config);

    const data = await response.json();
    return {
      response,
      data,
    };
  };
  return callHooks;
};

export default useFetch;
