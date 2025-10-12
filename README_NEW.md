# 🚀 MERN Stack Todo App

A beautiful, modern todo app with **3D Hyperspeed animation**, **liquid glass effects**, **glassmorphism UI**, and **Google OAuth authentication**.

## ✨ Features

- 🎨 **Stunning UI**: Liquid glass text effects, neon colors (cyan, magenta, green, pink)
- 🌌 **3D Background**: Hyperspeed racing highway animation with Three.js
- 🔐 **Dual Authentication**: Email/Password + Google OAuth
- 📝 **Full CRUD**: Create, Read, Update, Delete todos
- 💎 **Glassmorphism**: Modern frosted glass navigation bar
- 🎯 **User-specific**: Each user has their own todo list
- 📱 **Responsive**: Works on all devices

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- Vite 4.4.5
- React Router DOM
- Three.js (for 3D effects)
- Postprocessing library

### Backend
- Node.js & Express 4.18.2
- MongoDB & Mongoose 7.0.3
- JWT Authentication
- Passport.js (Google OAuth)
- Bcrypt for password hashing

## 📦 Quick Start

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Installation
```bash
# Install all dependencies
npm run install-all
```

### Run the App
```bash
# Single command to start everything!
npm run dev
```

**OR** Just **double-click** `start.bat` (Windows)!

### Access
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔐 Google OAuth Setup (Optional)

See `OAUTH_SETUP.md` for detailed instructions.

Quick version:
1. Get credentials from [Google Cloud Console](https://console.developers.google.com/)
2. Update `server/.env` with your Client ID and Secret
3. That's it!

## 🎮 Usage

1. **Register**: Create an account or use Google OAuth
2. **Login**: Sign in with email/password or Google
3. **Add Todos**: Type and click Add
4. **Mark Complete**: Click checkbox
5. **Delete**: Click delete button

## 🔧 Available Scripts

```bash
npm run dev           # Start both frontend & backend
npm run client        # Start frontend only
npm run server        # Start backend only
npm run install-all   # Install all dependencies
```

## 🎨 Design

- **Colors**: Black backgrounds with neon cyan, magenta, green, and pink accents
- **Effects**: Liquid glass text, glassmorphism, glowing animations
- **3D**: Hyperspeed racing highway with car lights and neon road
- **Fonts**: Orbitron, Rajdhani, Space Grotesk

## 📝 Do I Need to Run Commands Every Time?

**No!** After the initial setup:

### On Your PC (Development):
Just run **ONE** of these:
- `npm run dev` (in terminal)
- Double-click `start.bat` (Windows)

### After Deployment (Production):
**You don't run anything!** The hosting service (Vercel, Render, etc.) runs your app automatically. Just:
1. Push code to GitHub
2. Deploy once
3. Your app runs 24/7 on the cloud
4. Users access via your URL (e.g., `myapp.com`)

## 🚀 Deployment Guide

### Frontend (Vercel - Free & Easy)
```bash
cd client
npm run build
# Deploy the 'dist' folder to Vercel
```

### Backend (Render - Free Tier)
1. Create account on [Render](https://render.com)
2. Connect your GitHub repo
3. Set environment variables
4. Click Deploy
5. Done! Your backend runs 24/7

### Database (MongoDB Atlas - Free)
1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get connection string
3. Update backend with the connection string
4. Your data is in the cloud!

## 📂 Project Structure

```
TO DO APP/
├── client/              # React frontend
│   ├── src/
│   │   ├── App.jsx      # Dashboard
│   │   ├── Login.jsx    # Login with OAuth
│   │   ├── Register.jsx # Register with OAuth
│   │   ├── Landing.jsx  # Landing page
│   │   ├── Hyperspeed.jsx  # 3D animation
│   │   ├── Navbar.jsx   # Glassmorphism navbar
│   │   └── AuthContext.jsx # Auth state
│   └── package.json
├── server/              # Express backend
│   ├── config/
│   │   └── passport.js  # OAuth config
│   ├── models/
│   │   └── User.js      # User model
│   ├── routes/
│   │   ├── auth.js      # Auth routes
│   │   └── oauth.js     # OAuth routes
│   ├── middleware/
│   │   └── auth.js      # JWT middleware
│   ├── index.js         # Server entry
│   └── .env             # Environment variables
├── package.json         # Root config
├── start.bat           # Windows quick start
├── README.md           # This file
└── OAUTH_SETUP.md      # OAuth guide
```

## ❓ FAQ

**Q: Do I need to run commands after deployment?**  
A: No! Once deployed, the hosting service runs your app automatically.

**Q: What happens if I close my terminal?**  
A: During development, the app stops. After deployment, it runs on cloud servers 24/7.

**Q: Is it free to deploy?**  
A: Yes! Vercel (frontend), Render (backend), and MongoDB Atlas (database) all have free tiers.

**Q: Can others access my app?**  
A: During development (localhost), only you. After deployment, anyone with the URL!

## 📄 License

ISC

---

Built with ❤️ using the MERN stack

**Remember**: 
- Development = Run `npm run dev` or double-click `start.bat`
- Production = Deploy once, runs forever! ✨
