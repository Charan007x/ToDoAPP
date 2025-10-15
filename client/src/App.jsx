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
    
    // Create temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimisticTodo = {
      _id: tempId,
      text: newTodo,
      completed: false,
      _saving: true
    };
    
    // Optimistic update - add to UI immediately
    setTodos([optimisticTodo, ...todos]);
    setNewTodo('');
    
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: optimisticTodo.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const todo = await response.json();
      
      // Replace temp todo with real one from server
      setTodos(prev => prev.map(t => 
        t._id === tempId ? { ...todo, _saving: false } : t
      ));
    } catch (error) {
      console.error('Error adding todo:', error);
      
      // Remove temp todo on error
      setTodos(prev => prev.filter(t => t._id !== tempId));
      setNewTodo(optimisticTodo.text); // Restore text
      alert('Failed to add todo. Please try again.');
    }
    
    setLoading(false);
  };

  const toggleTodo = async (id) => {
    // Find the todo we're toggling
    const todo = todos.find(t => t._id === id);
    if (!todo) return;

    // Optimistic update - update UI immediately
    const optimisticTodos = todos.map(t => 
      t._id === id ? { ...t, completed: !t.completed, _saving: true } : t
    );
    setTodos(optimisticTodos);

    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      
      // Update with server response and remove saving flag
      setTodos(prev => prev.map(t => 
        t._id === id ? { ...updatedTodo, _saving: false } : t
      ));
    } catch (error) {
      console.error('Error toggling todo:', error);
      
      // Rollback on error - revert to original state
      setTodos(prev => prev.map(t => 
        t._id === id ? { ...todo, _saving: false } : t
      ));
      
      alert('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    // Store original todos for rollback
    const originalTodos = [...todos];
    
    // Optimistic delete - remove from UI immediately
    setTodos(todos.filter(todo => todo._id !== id));
    
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      
      // Rollback on error
      setTodos(originalTodos);
      alert('Failed to delete todo. Please try again.');
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
                    disabled={todo._saving}
                  />
                  <span className="todo-text">
                    {todo.text}
                    {todo._saving && <span className="saving-indicator"> ⏳</span>}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo._id)} 
                  className="delete-btn"
                  title="Delete todo"
                  disabled={todo._saving}
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