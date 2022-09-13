import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { FormInput } from "../components/FormInput";
import { motion } from "framer-motion";

export const LoginPage = () => {
  const { setAuth, login } = useAuthContext();
  const [formData, setFormData] = useState({
    email_username: "",
    password: "",
  });
  const [err, setErr] = useState({
    errorEmailUsername: "",
    email_username_style: "",
    errorPassword: "",
    passwordStyle: "",
    apiError: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  let from = location?.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if ([e.target.name] == "email_username") {
      setErr({
        ...err,
        errorEmailUsername: "",
        email_username_style: "",
        apiError: "",
      });
      return;
    }
    if ([e.target.name] == "password") {
      setErr({ ...err, errorPassword: "", passwordStyle: "", apiError: "" });
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email_username, password } = formData;

    if (!email_username) {
      setErr({
        ...err,
        errorEmailUsername: "Username or Email required",
        email_username_style: "input-error",
      });
      return;
    }
    if (!password) {
      setErr({
        ...err,
        errorPassword: "Missing Password",
        passwordStyle: "input-error",
      });
      return;
    }
    let email = "";
    let username = "";
    if (email_username.includes("@")) {
      email = email_username;
    } else {
      username = email_username;
    }

    const { response, error, access, usernameAuth, emailAuth } = await login(
      email,
      username,
      password
    );

    if (response.status === 400) {
      // email or username is invalid or i cannot find in the database
      setErr({ ...err, apiError: error });
      return;
    }

    if (response.status === 404) {
      // wrong password
      setErr({ ...err, apiError: error });

      return;
    }
    setAuth({ username: usernameAuth, email: emailAuth, access });
    setFormData({ email_username: "", password: "" });
    navigate(from);
  };

  return (
    <div className="w-full h-screen bg-[#D9D9D9] grid place-items-center">
      <motion.div
        animate={{ scale: 1, x: 0 }}
        initial={{ scale: 0, x: -1200 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="border w-3/4 bg-white rounded-md flex flex-col shadow-xl"
      >
        <div className="self-center w-max h-max ">
          <PencilSquareIcon className="w-10 h-10 mt-5 ml-2 sm:ml-24 hover:animate-bounce" />
          <p className="text-8xl  hidden sm:block hover:animate-bounce">
            co-Do
          </p>
          <p href="/register" className="text-center text-[#add8e6]"></p>
        </div>
        <form
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
          }}
          onSubmit={handleSubmit}
          className="flex flex-col  items-center	gap-2 "
        >
          <FormInput
            label={"Username or Email"}
            name={"email_username"}
            type={"text"}
            placeholder={"Enter Username or Email"}
            value={formData.email_username}
            handleChange={(e) => handleChange(e)}
            err={err.errorEmailUsername}
            invalid={err.email_username_style}
          />
          <FormInput
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter Password"}
            value={formData.password}
            handleChange={(e) => handleChange(e)}
            err={err.errorPassword}
            invalid={err.passwordStyle}
          />
          {err?.apiError && <p className="text-error">{err.apiError}</p>}

          <button
            type="submit"
            className="btn bg-[#add8e6] text-stone-800 hover:bg-[#92b7c3] hover:border-[#92b7c3] border-[#add8e6] w-2/3 "
          >
            Login
          </button>

          <p className="mt-5 mb-7">
            Create an Account
            <a className="text-[#add8e6] ml-2" href="/register">
              Here
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
