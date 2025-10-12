# 📝 MERN Stack Todo App

A simple and beautiful Todo application built with MongoDB, Express, React, and Node.js.

## 🚀 Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Data persists in MongoDB
- ✅ Beautiful, responsive UI
- ✅ Real-time statistics

## 📋 Prerequisites

Before running this app, make sure you have:

1. **Node.js** installed (v14 or higher)
2. **MongoDB** installed and running
3. **MongoDB Compass** (optional but recommended for viewing data)

## 🔧 MongoDB Setup (For Beginners)

### Step 1: Install MongoDB

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install it with default settings
3. MongoDB will start automatically after installation

### Step 2: Install MongoDB Compass (GUI Tool)

1. Download from: https://www.mongodb.com/try/download/compass
2. Install it
3. Open MongoDB Compass
4. Connect using: `mongodb://localhost:27017`
5. You'll see your databases here!

### Step 3: Verify MongoDB is Running

- Windows: Open Services and look for "MongoDB Server"
- Or open Command Prompt and type: `mongo --version`

## 🏃‍♂️ How to Run the App

### 1. Install Dependencies

Open TWO terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

### 2. Start the Backend Server

In Terminal 1:
```bash
cd server
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

### 3. Start the Frontend

In Terminal 2:
```bash
cd client
npm run dev
```

You should see:
```
Local: http://localhost:3000
```

### 4. Open the App

Open your browser and go to: **http://localhost:3000**

## 🎯 How to Use

1. Type a todo in the input field
2. Click "Add Todo" button
3. Check the checkbox to mark as complete
4. Click the trash icon 🗑️ to delete

## 📊 View Your Data in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Look for database: `todo-app`
4. Click on collection: `todos`
5. You'll see all your todos stored in MongoDB!

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Styling:** Pure CSS

## 📁 Project Structure

```
TO DO APP/
├── server/
│   ├── index.js          # Express server + MongoDB connection
│   ├── package.json
│   └── node_modules/
├── client/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Styling
│   │   ├── main.jsx      # React entry point
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── node_modules/
└── README.md
```

## 🐛 Troubleshooting

### Backend won't start?
- Make sure MongoDB is running
- Check if port 5000 is available
- Run: `npm install` in the server folder

### Frontend won't connect?
- Make sure backend is running on port 5000
- Check browser console for errors
- Run: `npm install` in the client folder

### Can't connect to MongoDB?
- Open MongoDB Compass and try connecting to `mongodb://localhost:27017`
- Make sure MongoDB service is running
- Restart MongoDB service

## 🎓 Learning Resources

- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [React Documentation](https://react.dev/)
- [Node.js Tutorial](https://nodejs.org/en/docs/)

## 💡 Next Steps

Want to add more features? Try:
- User authentication
- Edit todo text
- Add due dates
- Add categories/tags
- Dark mode
- Filter by completed/pending

Happy Coding! 🚀