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
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((item) => item.id !== action.payload),
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
    const { data } = await api("http://localhost:5000/api/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
      body: JSON.stringify({
        todo,
      }),
    });
    dispatch({ type: "ADD_TODO", payload: data });
  };
  const deleteTodo = async (id) => {
    const { data } = await api(`http://localhost:5000/api/todo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
    });
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const updateTodo = async (id, updatedTodo) => {
    const { data } = await api(`http://localhost:5000/api/todo/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
      body: JSON.stringify({ todo_item: updatedTodo }),
    });
    state.todos.map((item) => {
      if (item.id === id) {
        item.todo_item = updatedTodo;
      }
    });
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
