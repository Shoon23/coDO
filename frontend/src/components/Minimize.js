import { motion } from "framer-motion";

export const Minimize = ({ item, provided }) => {
  return (
    <div
      className="card w-11/12 h-14 bg-white text-white-content shadow-2xl"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <p className="text-left m-5">{item.todo_item}</p>
    </div>
  );
};
