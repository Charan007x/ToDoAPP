# 🔐 Google OAuth Setup Instructions

## Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project (or select an existing one)
3. Enable the **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Select "Web application"
   - Add these **Authorized redirect URIs**:
     ```
     http://localhost:5000/api/auth/google/callback
     ```
   - Click "Create"

5. Copy your **Client ID** and **Client Secret**

## Step 2: Update .env File

Open `server/.env` and add your credentials:

```env
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

## Step 3: Restart the Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
cd server
node index.js
```

## Step 4: Test OAuth

1. Go to `http://localhost:3000/login`
2. Click "Continue with Google"
3. Sign in with your Google account
4. You'll be redirected to the dashboard

## 🎉 That's it!

Your users can now sign in with:
- ✅ Email/Password (local authentication)
- ✅ Google OAuth

## For Production Deployment

When deploying, update:

1. **Google Console**:
   - Add your production URL to Authorized redirect URIs:
     ```
     https://your-domain.com/api/auth/google/callback
     ```

2. **Backend** (`server/routes/oauth.js`):
   - Update the redirect URLs to your production frontend URL

3. **Frontend** (Login.jsx, Register.jsx):
   - Update the button URLs to your production backend URL
