const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// IMPORTANT: Load passport AFTER dotenv
const passport = require('./config/passport');

const app = express();

// If running behind a proxy (Render, Heroku, etc.) trust first proxy
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Session middleware (required for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production with HTTPS
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    // allow cookie to be transmitted in cross-site requests when in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// when behind a proxy, express-session needs proxy=true to correctly
// set secure cookies. Some deployments require this option to be true.
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Todo Schema (updated with owner field)
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// OAuth Routes
const oauthRoutes = require('./routes/oauth');
app.use('/api/auth', oauthRoutes);

// Auth Middleware
const auth = require('./middleware/auth');

// Get all todos for logged-in user
app.get('/api/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a todo
app.post('/api/todos', auth, async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      owner: req.userId
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle todo completion (optimized)
app.put('/api/todos/:id', auth, async (req, res) => {
  try {
    // First find the todo to check current state
    const currentTodo = await Todo.findOne({ _id: req.params.id, owner: req.userId }).lean();
    if (!currentTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    // Use findByIdAndUpdate for better performance
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: { completed: !currentTodo.completed } },
      { new: true, lean: true }
    );
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH endpoint for partial updates (faster)
app.patch('/api/todos/:id', auth, async (req, res) => {
  try {
    const updates = {};
    if (typeof req.body.completed !== 'undefined') {
      updates.completed = req.body.completed;
    }
    if (req.body.text) {
      updates.text = req.body.text;
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: updates },
      { new: true, lean: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo
app.delete('/api/todos/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});