import { useAuthContext } from "./useAuthContext";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await fetch("http://localhost:5000/api/user/refresh", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = await response.json();

    setAuth({ username: token.username, access: token.access });
    return { token, response };
  };

  return refresh;
};

export default useRefreshToken;
