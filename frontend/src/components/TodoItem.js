import { useState } from "react";
import useTodoContext from "../hooks/useTodoContext";
import { Draggable } from "react-beautiful-dnd";

export const TodoItem = ({ item, index }) => {
  const [isUpdate, setIsUpdate] = useState("");
  const [newValue, setNewValue] = useState("");
  const { deleteTodo, updateTodo } = useTodoContext();

  const handleDelete = async (id) => {
    await deleteTodo(id);
  };
  const handleEdit = (id, item) => {
    setIsUpdate(id);
    setNewValue(item);
  };
  const handleUpdate = async (id) => {
    await updateTodo(id, newValue);
    setNewValue("");
    setIsUpdate("");
  };

  return isUpdate === item.id ? (
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      <div>
        <input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        <button onClick={() => handleUpdate(item.id)}>update</button>
      </div>
    </Draggable>
  ) : (
    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
      {(provided) => (
        <div
          className="todo-item"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="pa">{item.todo_item}</div>
          <div className="button-container">
            <button
              className="edit"
              onClick={() => handleEdit(item.id, item.todo_item)}
            >
              edit
            </button>
            <button className="delete" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
