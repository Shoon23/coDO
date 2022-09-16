import { motion } from "framer-motion";
import useTodoContext from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { DragDropContext } from "react-beautiful-dnd";
import { Navbar } from "../components/Navbar";
import { TodoList } from "../components/TodoList";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

export const Home = () => {
  const { auth } = useAuthContext();
  const api = useFetch();
  const { state, fetchData, dispatch, updateStatus, switchCard } =
    useTodoContext();

  useEffect(() => {
    fetchData(auth.access);
  }, []);

  const handleDrag = async (result) => {
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    let add;
    const table1 = Array.from(state.progress);
    const table2 = Array.from(state.completed);

    if (result.source.droppableId === "progress") {
      add = table1[result.source.index];
      table1.splice(result.source.index, 1);
    } else {
      add = table2[result.source.index];
      table2.splice(result.source.index, 1);
    }

    if (result.destination.droppableId === "completed") {
      table2.splice(result.destination.index, 0, add);
      if (result.source.droppableId === "progress") {
        await updateStatus(add.id, "completed");
      }
      await switchCard(table1, "progress", table1, table2);
    } else {
      table1.splice(result.destination.index, 0, add);
      if (result.source.droppableId === "completed") {
        await updateStatus(add.id, "progress");
      }
      await switchCard(table1, "progress", table1, table2);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full">
        <DragDropContext onDragEnd={handleDrag}>
          <motion.div
            className="flex justify-center my-10 gap-10 items-start	"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <TodoList
              state={state.progress}
              tableId={"progress"}
              tableName={"In Progress"}
              isDelete={true}
            />
            <TodoList
              state={state.completed}
              tableId={"completed"}
              tableName={"Completed"}
              isDelete={false}
            />
          </motion.div>
        </DragDropContext>
      </div>
    </div>
  );
};
