# 🚀 Quick Start Guide

Get your Gym Workout Website up and running in minutes!

## ⚡ Fast Setup (5 Minutes)

### Step 1: Install Backend Dependencies
```bash
cd Backend
npm install
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: MongoDB should be running as a service
- **Mac/Linux**: Run `mongod` in terminal
- **MongoDB Atlas**: Use your connection string in `.env`

### Step 3: Configure Backend
The `.env` file is already created in `Backend/.env`. Update if needed:
```env
MONGO_URI=mongodb://localhost:27017/gym-workout-db
PORT=5000
SECRET_KEY=your_super_secret_jwt_key_change_this_in_production_12345
```

### Step 4: Seed Database (Optional but Recommended)
```bash
node seed.js
```
This adds 6 pre-made workout routines to your database.

### Step 5: Start Backend Server
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 6: Install Frontend Dependencies (New Terminal)
```bash
cd Frontend
npm install
```

### Step 7: Start Frontend Server
```bash
npm run dev
```
✅ Frontend running on http://localhost:3000

### Step 8: Open Browser
Navigate to: **http://localhost:3000**

## 🎯 First Time Usage

1. **Create Account**
   - Click "Sign Up"
   - Enter email, password, age, height, weight
   - Select fitness level (Beginner/Expert)
   - Click "Sign Up"

2. **Choose Workout**
   - You'll be redirected to workout selection page
   - Choose from 4 options:
     - Pro Split
     - Push Pull Leg
     - Arnold Split
     - Add Your Routine (Custom)

3. **Browse Pre-made Routines** (if you selected first 3 options)
   - View available routines
   - See weekly schedule
   - Click "Select This Routine"

4. **Create Custom Routine** (if you selected "Add Your Routine")
   - Click "+ Add Exercise"
   - Fill in: Day, Exercise Name, Sets, Duration
   - Add more exercises as needed
   - Click "Save Routine"

## 📋 Checklist

Before starting, make sure you have:
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed and running
- ✅ Both Backend and Frontend dependencies installed
- ✅ Environment variables configured
- ✅ Database seeded with sample routines

## 🔧 Common Commands

### Backend
```bash
# Install dependencies
npm install

# Run in development mode (auto-restart)
npm run dev

# Run in production mode
npm start

# Seed database
node seed.js
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## 🐛 Quick Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `MONGO_URI` in `.env`
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `Frontend/.env.local`
- Look for CORS errors in browser console

### Login/Signup not working
- Check backend logs for errors
- Verify MongoDB connection
- Clear browser cookies and try again

### No pre-made routines showing
- Run the seed script: `node seed.js`
- Check MongoDB for `routines` collection
- Verify authentication token is valid

## 📱 Test the Application

1. **Test Authentication**
   - Create a new account
   - Logout and login again
   - Verify token persists for 7 days

2. **Test Pre-made Routines**
   - Select "Pro Split"
   - View available routines
   - Select a routine
   - Verify it's saved to your profile

3. **Test Custom Routine**
   - Click "Add Your Routine"
   - Add 3-4 exercises
   - Save the routine
   - Refresh page and verify data persists

## 🎨 Features to Try

- ✨ Responsive design (resize browser window)
- ✨ Form validation (try invalid inputs)
- ✨ Hover effects on cards
- ✨ Loading states during API calls
- ✨ Error messages for failed operations
- ✨ Logout functionality

## 📚 Next Steps

After setup:
1. Explore the code structure
2. Read inline comments for understanding
3. Customize the UI colors and styles
4. Add more pre-made routines
5. Extend functionality as needed

## 💡 Pro Tips

- Use **Postman** or **Thunder Client** to test API endpoints directly
- Check browser **DevTools Console** for frontend errors
- Check terminal logs for backend errors
- MongoDB Compass is great for viewing database contents
- Use `nodemon` for auto-restart during development (already configured)

## 🆘 Need Help?

1. Check the main `README.md` for detailed information
2. Review `Frontend/README.md` for frontend-specific details
3. Review `Backend/README.md` for backend-specific details
4. All code has extensive comments explaining each line

---

**Happy Coding! 💪🏋️**
