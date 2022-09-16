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
        completed: [...state.completed],
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
    const progressLen = state.progress.length;
    const completedLen = state.completed.length;

    const order = progressLen + completedLen;
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
  const deleteTodo = async (id, tableId) => {
    const { data } = await api(`http://localhost:5000/api/todo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
      body: JSON.stringify({ tableId }),
    });

    if (tableId === "progress") {
      dispatch({ type: "DELETE_TODO_PROGRESS", prog: id });
    } else {
      dispatch({ type: "DELETE_TODO_COMPLETED", comp: id });
    }
  };

  const updateTodo = async (id, todo_item, tableId) => {
    const { data, response } = await api(
      `http://localhost:5000/api/todo/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.access}`,
        },
        body: JSON.stringify({ todo_item, tableId }),
      }
    );
    if (tableId === "progress") {
      state.progress.map((item) => {
        if (item.id === id) {
          item.todo_item = todo_item;
        }
      });
    } else {
      state.completed.map((item) => {
        if (item.id === id) {
          item.todo_item = todo_item;
        }
      });
    }
  };
  const updateStatus = async (id, tableId) => {
    const { data, response } = await api(
      `http://localhost:5000/api/todo/move/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.access}`,
        },
        body: JSON.stringify({ tableId }),
      }
    );
  };
  const switchCard = async (orders, tableId, table1, table2) => {
    const { data } = await api("http://localhost:5000/api/todo/switch", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access}`,
      },
      body: JSON.stringify({
        orders,
        tableId,
      }),
    });
    dispatch({ type: "SET_TODO", progress: table1, completed: table2 });
  };
  const fetchData = async (accessToken) => {
    const { data } = await api("http://localhost:5000/api/todo/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({
      type: "SET_TODO",
      progress: data.progress,
      completed: data.completed,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        addTodo,
        deleteTodo,
        updateTodo,
        fetchData,
        updateStatus,
        switchCard,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
