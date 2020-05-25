import React, { useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'Di cho' },
    { id: 2, title: 'Da bong' },
    { id: 3, title: 'Xem phim' }
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list", error.message);
      }
    }
    fetchPostList();
  }, [filters])

  function handlePageChange(newPage) {
    console.log('newPage', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('Form submit:', formValues);

    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  
  function handleFiltersChange(newFilters){
    console.log('New Filter:', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
    
  }

  return (
    <div className="App">
      <h2>Hello every body</h2>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <h2>Heloo effect</h2>
      <PostFiltersForm onSubmit={handleFiltersChange}/>
      <PostList posts={postList} />
      <Pagination
        pagination={pagination}
        onPagechange={handlePageChange}
      />

      <h2>React-hook CLock</h2>
      <Clock/>
      <h3>Better-clock</h3>
      <BetterClock/>
    </div>
  )
}

export default App;
