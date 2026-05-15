import React, { useState, useEffect } from 'react';

const API = '/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch(`${API}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    const res = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
    setTitle('');
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`${API}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    const updated = await res.json();
    setTodos(todos.map(t => t._id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Todo App</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Add
        </button>
      </div>
      {todos.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No todos yet. Add one above!</p>}
      {todos.map(todo => (
        <div key={todo._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', marginBottom: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id, todo.completed)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span style={{ flex: 1, fontSize: '16px', textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#333' }}>
            {todo.title}
          </span>
          <button
            onClick={() => deleteTodo(todo._id)}
            style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
