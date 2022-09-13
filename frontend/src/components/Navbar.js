import React from "react";

export const Navbar = () => {
  return (
    <div class="navbar bg-[#add8e6] text-primary-content flex justify-between">
      <a href="/" class="btn btn-ghost normal-case text-xl text-stone-600">
        co-Do
      </a>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a className="hover:bg-[#add8e6] text-stone-600">Settings</a>
          </li>
          <li>
            <a className="hover:bg-[#add8e6] text-stone-600">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
