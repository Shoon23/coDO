import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

const useTodoContext = () => {
  const context = useContext(TodoContext)

  if(!context){
    return 'errpr'
  }
  return context
}

export default useTodoContext