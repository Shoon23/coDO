import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { FormInput } from "../components/FormInput";
import { motion } from "framer-motion";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({
    emailError: "",
    emailStyle: "",
    usernameStyle: "",
    usernameError: "",
    passwordStyle: "",
    passwordError: "",
    exist: "",
  });
  const navigate = useNavigate();
  const { setAuth, register } = useAuthContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if ([e.target.name] == "email") {
      setErr({ ...err, emailError: "", emailStyle: "" });
      return;
    }
    if ([e.target.name] == "username") {
      setErr({ ...err, usernameError: "", usernameStyle: "" });
      return;
    }
    if ([e.target.name] == "password") {
      setErr({ ...err, passwordError: "", passwordStyle: "" });
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;
    if (!email) {
      setErr({
        ...err,
        emailError: "Email is Required",
        emailStyle: "input-error",
      });
      setFormData({ ...formData, password: "", confirmPassword: "" });
      return;
    }
    if (!username) {
      setErr({
        ...err,
        usernameError: "User name is required",
        usernameStyle: "input-error",
      });
      setFormData({ ...formData, password: "", confirmPassword: "" });
      return;
    }
    if (!password) {
      setErr({
        ...err,
        passwordError: "Password Required",
        passwordStyle: "input-error",
      });
      return;
    }
    if (password !== confirmPassword) {
      setErr({
        ...err,
        passwordError: "Password not matched",
        passwordStyle: "input-error",
      });
      setFormData({ ...formData, password: "", confirmPassword: "" });
      return;
    }
    const { response, access, error } = await register(
      email,
      username,
      password
    );
    if (response.status === 409) {
      setErr({ ...err, exist: error });

      return;
    }
    setAuth({ email, username, access });
    navigate("/");
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
          <p href="/register" className="text-center text-[#add8e6]">
            Join Now
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  items-center	gap-2 "
        >
          <FormInput
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter email"}
            handleChange={(e) => handleChange(e)}
            invalid={err.emailStyle}
            err={err.emailError}
            value={formData.email}
          />

          <FormInput
            label={"Username"}
            name={"username"}
            type={"text"}
            placeholder={"Enter Username"}
            handleChange={(e) => handleChange(e)}
            invalid={err.usernameStyle}
            err={err.usernameError}
            value={formData.username}
          />
          <FormInput
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter Password"}
            handleChange={(e) => handleChange(e)}
            invalid={err.passwordStyle}
            value={formData.password}
          />
          <FormInput
            label={"Confirm Password"}
            name={"confirmPassword"}
            type={"password"}
            pattern={formData.password}
            placeholder={"Confirm Password"}
            handleChange={(e) => handleChange(e)}
            invalid={err.passwordStyle}
            err={err.passwordError}
            value={formData.confirmPassword}
          />
          {err?.exist && <p className="text-success">{err.exist}</p>}
          <button
            type="submit"
            className="btn bg-[#add8e6] text-stone-800 hover:bg-[#92b7c3] hover:border-[#92b7c3] border-[#add8e6] w-2/3 "
          >
            Register
          </button>

          <p className="mt-5 mb-7">
            Alread have an account?
            <a className="text-[#add8e6]" href="/login">
              Login
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
