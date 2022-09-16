import { Draggable } from "react-beautiful-dnd";
import useTodoContext from "../hooks/useTodoContext";
import { Update } from "./Update";
import { useState } from "react";
import { Minimize } from "./Minimize";
import { Maximize } from "./Maximize";
import { motion } from "framer-motion";

export const TodoItems = ({ item, index, tableId, isMini }) => {
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
        {(provided, snapshot) =>
          isMini ? (
            <Minimize item={item} provided={provided} />
          ) : (
            <Maximize
              newValue={newValue}
              setNewValue={setNewValue}
              handleUpdate={handleUpdate}
              handleClose={handleClose}
              item={item}
              provided={provided}
              openUpdate={openUpdate}
              handleDelete={handleDelete}
              isUpdate={isUpdate}
              Update={Update}
              tableId={tableId}
            />
          )
        }
      </Draggable>
    </>
  );
};
