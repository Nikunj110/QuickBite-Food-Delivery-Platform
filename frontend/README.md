# QuickBite Frontend

## 🚨 White Screen Issue - Troubleshooting Guide

If you're experiencing a white screen, follow these steps:

### 1. **Check Backend Server**
The most common cause is that the backend server isn't running.

```bash
# Navigate to backend directory
cd ../backend

# Start the backend server
npm start
```

**Expected output:** `Server Started on port: 4000`

### 2. **Check Frontend Dev Server**
Make sure the frontend dev server is running:

```bash
# In frontend directory
npm run dev
```

### 3. **Check Browser Console**
Open browser DevTools (F12) and check the Console tab for errors.

**Common errors:**
- `ERR_NETWORK`: Backend server not running
- `ECONNABORTED`: Request timeout
- `Failed to fetch`: Network connectivity issues

### 4. **Verify Backend URL**
The frontend tries to connect to `http://localhost:4000`. Make sure:
- Backend is running on port 4000
- No firewall blocking the connection
- Backend is accessible at `http://localhost:4000/api/food/list`

### 5. **Test Backend API**
Open your browser and go to: `http://localhost:4000/api/food/list`

**Expected response:** JSON with food items or error message

### 6. **Clear Browser Cache**
- Hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache and cookies
- Try incognito/private browsing mode

### 7. **Check Network Tab**
In browser DevTools → Network tab:
- Look for failed requests to `/api/food/list`
- Check response status codes
- Verify request URLs

### 8. **Restart Everything**
```bash
# Stop all servers (Ctrl+C)
# Then restart in this order:

# 1. Backend
cd backend
npm start

# 2. Frontend (new terminal)
cd frontend  
npm run dev

# 3. Admin (new terminal)
cd admin
npm run dev
```

## 🔧 What I Fixed

1. **PostCSS Config**: Fixed Tailwind CSS import syntax
2. **Error Handling**: Added proper error states and loading indicators
3. **Network Timeouts**: Added 10-second timeout to prevent hanging
4. **Debug Logging**: Added console logs to help identify issues
5. **Fallback States**: Added loading, error, and empty states
6. **Safe Cart Calculations**: Protected against undefined food items

## 📱 Features

- **Loading State**: Shows spinner while fetching data
- **Error State**: Displays helpful error messages with retry button
- **Empty State**: Shows message when no food items exist
- **Debug Logging**: Console logs to help troubleshoot issues

## 🚀 Quick Start

```bash
# 1. Start Backend
cd backend && npm start

# 2. Start Frontend  
cd frontend && npm run dev

# 3. Start Admin
cd admin && npm run dev
```

## 🔍 Still Having Issues?

1. Check if MongoDB is running
2. Verify database connection in backend
3. Check backend console for errors
4. Ensure all dependencies are installed (`npm install`)
5. Try building the project (`npm run build`)

The white screen should now show helpful error messages instead of staying blank!
