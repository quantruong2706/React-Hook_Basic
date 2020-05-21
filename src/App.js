import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';


function App() {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Di cho'},
    {id: 2, title: 'Da bong'},
    {id: 3, title: 'Xem phim'}
  ]);

  function handleTodoClick(todo){
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList);
  }
  
  function handleTodoFormSubmit(formValues){
    console.log('Form submit:', formValues);

    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      Hello every body
      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/>
    </div>
  )
}

export default App;
