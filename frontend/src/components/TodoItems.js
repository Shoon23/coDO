import { Draggable } from "react-beautiful-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import useTodoContext from "../hooks/useTodoContext";
import { Update } from "./Update";
import { useState } from "react";

export const TodoItems = ({ item, index, tableId }) => {
  const { deleteTodo, updateTodo } = useTodoContext();
  const [newValue, setNewValue] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const handleDelete = async (id, table) => {
    await deleteTodo(id, table);
  };
  const handleUpdate = async () => {
    await updateTodo(item.id, newValue, tableId);
    setNewValue("");
    setIsUpdate(false);
  };
  const handleClose = () => {
    setIsUpdate(false);
  };
  const openUpdate = () => {
    setIsUpdate(true);
    setNewValue(item.todo_item);
  };
  return (
    <>
      <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
        {(provided, snapshot) => (
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
        )}
      </Draggable>
    </>
  );
};
