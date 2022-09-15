import { createContext, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetch from "../hooks/useFetch";
const INITIAL_STATE = { progress: [], completed: [] };

export const TodoContext = createContext(INITIAL_STATE);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO":
      return {
        progress: action.progress,
        completed: action.completed,
      };
    case "ADD_TODO":
      return {
        progress: [...state.progress, action.payload],
      };
    case "DELETE_TODO_PROGRESS":
      return {
        progress: state.progress.filter((item) => item.id !== action.prog),
        completed: [...state.completed],
      };
    case "DELETE_TODO_COMPLETED":
      return {
        progress: [...state.progress],
        completed: state.completed.filter((item) => item.id !== action.comp),
      };

    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const api = useFetch();
  const { auth } = useAuthContext();

  const addTodo = async (todo) => {
    const order = state.progress.length;
    console.log(order);
    const { data } = await api("http://localhost:5000/api/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
      body: JSON.stringify({
        todo,
        order,
      }),
    });
    dispatch({ type: "ADD_TODO", payload: data });
    console.log(state.progress);
  };
  const deleteTodo = async (id, table) => {
    const { data } = await api(`http://localhost:5000/api/todo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
    });

    if (table === "progress") {
      dispatch({ type: "DELETE_TODO_PROGRESS", prog: id });
    } else {
      dispatch({ type: "DELETE_TODO_COMPLETED", comp: id });
    }
  };

  const updateTodo = async (id, updatedTodo, table) => {
    const { data, response } = await api(
      `http://localhost:5000/api/todo/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.access}`,
        },
        body: JSON.stringify({ todo_item: updatedTodo, isCompleted: "" }),
      }
    );
    if (table === "progress") {
      state.progress.map((item) => {
        if (item.id === id) {
          item.todo_item = updatedTodo;
        }
      });
    } else {
      state.completed.map((item) => {
        if (item.id === id) {
          item.todo_item = updatedTodo;
        }
      });
    }
  };

  const fetchData = async (accessToken) => {
    const { data } = await api("http://localhost:5000/api/todo/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const completed = data.filter((item) => item.isCompleted !== false);
    const progress = data.filter((item) => item.isCompleted !== true);

    dispatch({ type: "SET_TODO", progress: progress, completed: completed });
  };

  return (
    <TodoContext.Provider
      value={{ state, dispatch, addTodo, deleteTodo, updateTodo, fetchData }}
    >
      {children}
    </TodoContext.Provider>
  );
};
