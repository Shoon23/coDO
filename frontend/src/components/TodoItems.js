import { Draggable } from "react-beautiful-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const TodoItems = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      {(provided, snapshot) => (
        <div
          className="card w-11/12 bg-white text-white-content shadow-2xl"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-body">
            <p className="break-all">{item.todo_item} </p>
            <div className="card-actions justify-end">
              <PencilIcon className="w-7 h-7 hover:bg-warning rounded-md" />

              <TrashIcon className="w-7 h-7 hover:bg-error rounded-md" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
