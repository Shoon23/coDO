import { PencilSquareIcon, FolderMinusIcon } from "@heroicons/react/24/outline";
import { Droppable } from "react-beautiful-dnd";
import { TodoItems } from "./TodoItems";
import { Modal } from "./Modal";
export const TodoList = ({ state, tableId, tableName, isDelete }) => {
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
            <TodoItems key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
          {isDelete ? (
            <div className="flex w-full justify-between">
              <div className="w-8 h-8 m-5">
                <label
                  htmlFor="my-modal"
                  className="btn-[#92b7c3] modal-button"
                >
                  <PencilSquareIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md" />
                </label>
                <Modal />
              </div>

              <FolderMinusIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md m-5" />
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <FolderMinusIcon className="w-8 h-8 hover:bg-[#92b7c3] rounded-md m-5" />
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};
