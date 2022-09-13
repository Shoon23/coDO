import { createContext, useState } from "react";

const initialize = {
  email: "",
  access: "",
  username: "",
};

export const AuthContext = createContext(initialize);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialize);

  const login = async (email, username, password) => {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password,
      }),
    });

    const { error, access, usernameAuth, emailAuth } = await response.json();
    return { response, error, access, usernameAuth, emailAuth };
  };
  const register = async (email, password, username) => {
    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });
    const { error, access } = await response.json();

    return { response, error, access };
  };

  const value = {
    auth,
    setAuth,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
