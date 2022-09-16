import { useState } from "react";
import {
  PencilSquareIcon,
  FolderMinusIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { Droppable } from "react-beautiful-dnd";
import { TodoItems } from "./TodoItems";
import { Modal } from "./Modal";
import useTodoContext from "../hooks/useTodoContext";
import { motion } from "framer-motion";

export const TodoList = ({ state, tableId, tableName, isDelete }) => {
  const { addTodo } = useTodoContext();
  const [todo, newTodo] = useState("");
  const [isMini, setIsMini] = useState(false);
  const handleClick = async () => {
    await addTodo(todo);
    newTodo("");
  };

  return (
    <Droppable droppableId={tableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col bg-sky-200 w-96 items-center gap-2 rounded-md "
        >
          <div className={`text-2xl m-5`}>{tableName}</div>

          {state?.map((item, index) => (
            <TodoItems
              key={item.id}
              item={item}
              index={index}
              tableId={tableId}
              isMini={isMini}
            />
          ))}
          {provided.placeholder}
          {isDelete ? (
            <div className="flex w-full justify-between">
              <div className="w-8 h-8 m-5">
                <label
                  htmlFor="my-add-modal"
                  className="btn-[#92b7c3] modal-button"
                >
                  <PencilSquareIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md" />
                </label>
                <Modal
                  htmlFor={"my-add-modal"}
                  placeholder={"Write something...."}
                  header={"Add new co-Do"}
                  buttonName={"add"}
                  handleClick={handleClick}
                  value={todo}
                  setValue={newTodo}
                />
              </div>

              <div
                className="w-8 h-8 m-5"
                onClick={() => setIsMini((prev) => !prev)}
              >
                {isMini ? (
                  <FolderPlusIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md " />
                ) : (
                  <FolderMinusIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md " />
                )}
              </div>
            </div>
          ) : (
            <div
              className="flex w-full justify-center"
              onClick={() => setIsMini((prev) => !prev)}
            >
              {isMini ? (
                <FolderPlusIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md " />
              ) : (
                <FolderMinusIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md " />
              )}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};
