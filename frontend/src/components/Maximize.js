import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export const Maximize = ({
  newValue,
  setNewValue,
  handleUpdate,
  handleClose,
  item,
  openUpdate,
  handleDelete,
  isUpdate,
  Update,
  tableId,
  provided,
}) => {
  return (
    <div
      className="card w-11/12 bg-white text-white-content shadow-2xl"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="card-body">
        {isUpdate ? (
          <Update
            value={newValue}
            setValue={setNewValue}
            handleClick={handleUpdate}
            handleClose={handleClose}
          />
        ) : (
          <>
            <p className="break-all">{item.todo_item} </p>
            <div className="card-actions justify-end">
              <div className="w-7 h-7">
                <PencilIcon
                  className="w-7 h-7 hover:bg-warning rounded-md"
                  onClick={openUpdate}
                />
              </div>

              <button onClick={() => handleDelete(item.id, tableId)}>
                <TrashIcon className="w-7 h-7 hover:bg-error rounded-md" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
