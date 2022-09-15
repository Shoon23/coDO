import { useState, useEffect } from "react";
import useTodoContext from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { DragDropContext } from "react-beautiful-dnd";
import { Navbar } from "../components/Navbar";
import { TodoList } from "../components/TodoList";
import useFetch from "../hooks/useFetch";

export const Home = () => {
  const { auth } = useAuthContext();
  const api = useFetch();
  const { state, fetchData, dispatch } = useTodoContext();

  useEffect(() => {
    fetchData(auth.access);
  }, []);

  const handleDrag = (result) => {
    console.log(result);
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

      const updataStatus = async (id) => {
        const { data, response } = await api(
          `http://localhost:5000/api/todo/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.access}`,
            },
            body: JSON.stringify({ todo_item: "", isCompleted: 1 }),
          }
        );
        console.log(data);
        console.log(response);
      };
      updataStatus(add.id);
    } else {
      table1.splice(result.destination.index, 0, add);
    }
    console.log(table1);
    console.log(table2);
    console.log(result);
    dispatch({ type: "SET_TODO", progress: table1, completed: table2 });
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-full">
        <DragDropContext onDragEnd={handleDrag}>
          <div className="flex justify-center my-10 gap-10 items-start	">
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
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
