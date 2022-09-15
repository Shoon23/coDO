import React from "react";

export const Update = ({ value, setValue, handleClick, handleClose }) => {
  return (
    <>
      <label
        className="btn btn-error btn-sm btn-circle absolute right-2 top-2"
        onClick={handleClose}
      >
        ✕
      </label>

      <h3 className="font-bold text-lg mb-1">Edit</h3>
      <textarea
        className="textarea textarea-bordered resize-none	w-full m-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <div
        onClick={handleClick}
        className="btn bg-[#add8e6] text-stone-800 hover:bg-[#92b7c3] hover:border-[#92b7c3] border-[#add8e6]"
      >
        UPDATE
      </div>
    </>
  );
};
