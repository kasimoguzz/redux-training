import {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {  selectFiltredTodos , getTodoAsync ,toggleTodoAsync ,removeTodoAsync} from "../redux/todos/todoSlice";

import Error from './Error'
import Loading from './Loading';

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFiltredTodos)
  const isLoading = useSelector((state)=> state.todos.isLoading)
  const error = useSelector((state)=> state.todos.error)

  useEffect(()=>{
    dispatch(getTodoAsync())
  },[dispatch])


  const handleDestroy = async (id) => {
    if (window.confirm("are you sure")) {
     await dispatch(removeTodoAsync(id));
    }
  };

  const handleToogle = async ({id , completed}) => {
    await dispatch(toggleTodoAsync({id , data: {completed}}))
  } 

  if(isLoading){
    return <Loading />
  }
  if(error){
    return <Error message={error} />
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onChange={() => handleToogle({ id: item.id, completed: !item.completed })}
              checked={item.completed}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
