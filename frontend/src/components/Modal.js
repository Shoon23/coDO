export const Modal = ({
  buttonName,
  placeholder,
  header,
  handleClick,
  value,
  setValue,
  htmlFor,
}) => {
  return (
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor={htmlFor}
            className="btn btn-error btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg mb-5">{header}</h3>
          <textarea
            className="textarea textarea-bordered resize-none	w-full m-1"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <label
              htmlFor={htmlFor}
              className="btn bg-[#add8e6] text-stone-800 hover:bg-[#92b7c3] hover:border-[#92b7c3] border-[#add8e6]"
              onClick={handleClick}
            >
              {buttonName}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
