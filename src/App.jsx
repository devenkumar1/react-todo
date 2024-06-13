import React, { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-purple-300 p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Todo App</h1>
      <form onSubmit={addTodo} className="w-full max-w-md flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a todo"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
          Add
        </button>
      </form>
      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg divide-y divide-gray-200">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`p-4 flex justify-between items-center ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            <span
              className={`flex-grow cursor-pointer ${
                todo.completed ? 'text-gray-400' : 'text-gray-800'
              }`}
              onClick={() => toggleComplete(index)}
            >
              {todo.text}
            </span>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
