# 🚀 Quick Start Guide - MERN Todo App with Authentication

## ✅ Your App is Ready!

Both servers are running:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

## 🎯 How to Use:

### First Time Users:

1. **Open** http://localhost:3000 in your browser
2. You'll see the **Login page**
3. Click "**Register here**" at the bottom
4. Fill in the form:
   - Name: Your name
   - Email: A valid email
   - Password: At least 6 characters
5. Click "**Register**"
6. You're in! Start adding todos!

### Existing Users:

1. **Open** http://localhost:3000
2. Enter your email and password
3. Click "**Login**"
4. See your todos!

## 📱 Features You Can Try:

✅ **Register** a new account
✅ **Login** with your credentials
✅ **Add todos** by typing and clicking "Add Todo"
✅ **Check off** completed todos
✅ **Delete** todos you don't need
✅ **Logout** safely when done
✅ **Multiple users** - Each user has their own todos!

## 🔒 Security:

- Passwords are encrypted (hashed with bcrypt)
- Secure JWT token authentication
- Each user only sees their own todos
- Token expires after 7 days

## 🛠️ If You Need to Restart:

### Stop servers:
Press `Ctrl + C` in both terminal windows

### Start Backend:
```bash
cd server
node index.js
```

### Start Frontend:
```bash
cd client
npm run dev
```

## 📊 View Your Database:

1. **Open MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. Database: `todo-app`
4. Collections:
   - `users` - All registered users
   - `todos` - All todos with owner info

## 🎓 What You Built:

**M**ongoDB - Database
**E**xpress - Backend API
**R**eact - Frontend UI
**N**ode.js - Server

Plus: JWT Authentication, Protected Routes, User Management

## 🐛 Troubleshooting:

**Can't see the login page?**
- Make sure frontend is running on port 3000
- Check http://localhost:3000

**Backend errors?**
- Make sure MongoDB is running
- Restart the backend server

**Frontend errors?**
- Check browser console (F12)
- Make sure backend is running on port 5000

---

**Have fun building your todo list! 🎉**

For more details, check `AUTHENTICATION_GUIDE.md`