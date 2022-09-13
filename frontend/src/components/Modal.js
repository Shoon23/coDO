export const Modal = () => {
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="my-modal"
            className="btn btn-error btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="font-bold text-lg">Add new co-Do</h3>
          <textarea
            className="textarea textarea-bordered resize-none	w-full m-1"
            placeholder="Write something...."
          ></textarea>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn bg-[#add8e6] text-stone-800 hover:bg-[#92b7c3] hover:border-[#92b7c3] border-[#add8e6]"
              onClick={() => console.log("Click")}
            >
              add
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
