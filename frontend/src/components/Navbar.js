import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { auth, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-[#add8e6] text-primary-content flex justify-between">
      <a href="/" className="btn btn-ghost normal-case text-xl text-stone-600">
        co-Do
      </a>
      <div className="dropdown dropdown-end">
        <label
          tabIndex="0"
          className="btn btn-ghost normal-case text-xl text-stone-600"
        >
          <div className="">{auth.username}</div>
        </label>
        <ul
          tabIndex="0"
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="hover:bg-[#add8e6] text-stone-600">Settings</a>
          </li>
          <li>
            <a
              className="hover:bg-[#add8e6] text-stone-600"
              onClick={handleLogout}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
