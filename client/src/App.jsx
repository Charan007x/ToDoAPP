import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import './App.css';

// API URL from environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch todos on component mount
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error('Error fetching todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: newTodo }),
      });
      const todo = await response.json();
      setTodos([todo, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Error adding todo!');
    }
    setLoading(false);
  };

  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="header">
          <div>
            <h1>📝 My Todo App</h1>
            <p className="subtitle">Welcome back, {user?.name}!</p>
          </div>
        </div>
        
        <form onSubmit={addTodo} className="add-todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>

        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(t => t.completed).length}</span>
          <span>Pending: {todos.filter(t => !t.completed).length}</span>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">
              No todos yet! Add one above to get started 🚀
            </li>
          ) : (
            todos.map(todo => (
              <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id)}
                  />
                  <span className="todo-text">{todo.text}</span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo._id)} 
                  className="delete-btn"
                  title="Delete todo"
                >
                  🗑️
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;