# ✅ Setup Checklist

Complete this checklist to ensure your Gym Workout Website is properly configured and running.

## 📋 Pre-Installation Checklist

- [ ] Node.js installed (v16 or higher)
  - Check: `node --version`
- [ ] npm installed
  - Check: `npm --version`
- [ ] MongoDB installed and running
  - Local: `mongod --version`
  - Or MongoDB Atlas account created
- [ ] Code editor installed (VS Code recommended)
- [ ] Git installed (optional, for version control)

## 🔧 Backend Setup Checklist

### 1. Navigate to Backend Directory
```bash
cd Backend
```
- [ ] Confirmed in Backend directory

### 2. Install Dependencies
```bash
npm install
```
- [ ] express installed
- [ ] mongoose installed
- [ ] bcryptjs installed
- [ ] jsonwebtoken installed
- [ ] dotenv installed
- [ ] cors installed
- [ ] express-validator installed
- [ ] nodemon installed (dev dependency)
- [ ] No installation errors

### 3. Configure Environment Variables
- [ ] `.env` file exists in Backend directory
- [ ] `MONGO_URI` is set correctly
  - Local: `mongodb://localhost:27017/gym-workout-db`
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/gym-workout-db`
- [ ] `PORT` is set to `5000`
- [ ] `SECRET_KEY` is set (change default in production)
- [ ] `PASSWORD` is set (if using MongoDB Atlas)

### 4. Test MongoDB Connection
- [ ] MongoDB service is running
  - Windows: Check Services
  - Mac/Linux: Run `mongod` in terminal
  - Atlas: Connection string is correct
- [ ] Can connect to MongoDB
  - Test: `mongo` or `mongosh` command
  - Or use MongoDB Compass

### 5. Seed Database
```bash
node seed.js
```
- [ ] Seed script runs without errors
- [ ] See success message: "Successfully inserted X routines"
- [ ] Database `gym-workout-db` created
- [ ] Collection `routines` created with 6 documents

### 6. Start Backend Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See message: "Server is running on port 5000"
- [ ] See message: "MongoDB connected successfully"
- [ ] Can access http://localhost:5000 in browser
- [ ] See JSON response: "Gym Workout API is running"

## 🎨 Frontend Setup Checklist

### 1. Navigate to Frontend Directory (New Terminal)
```bash
cd Frontend
```
- [ ] Confirmed in Frontend directory

### 2. Install Dependencies
```bash
npm install
```
- [ ] react installed
- [ ] react-dom installed
- [ ] next installed
- [ ] axios installed
- [ ] js-cookie installed
- [ ] No installation errors

### 3. Configure Environment Variables
- [ ] `.env.local` file exists in Frontend directory
- [ ] `NEXT_PUBLIC_API_URL` is set to `http://localhost:5000`

### 4. Start Frontend Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] See message: "ready - started server on 0.0.0.0:3000"
- [ ] Can access http://localhost:3000 in browser
- [ ] See login/signup page with purple gradient background

## 🧪 Functionality Testing Checklist

### Authentication
- [ ] Can see login/signup page at http://localhost:3000
- [ ] Can toggle between Login and Sign Up forms
- [ ] Sign Up form shows all fields:
  - [ ] Email
  - [ ] Password
  - [ ] Age
  - [ ] Height
  - [ ] Weight
  - [ ] Level (Beginner/Expert)
- [ ] Can create a new account
- [ ] Redirected to workout selection page after signup
- [ ] Can logout
- [ ] Can login with created account
- [ ] Invalid credentials show error message

### Workout Selection Page
- [ ] See title "Choose Your Gym Workout Routine"
- [ ] See 4 workout cards:
  - [ ] Pro Split (with 💪 icon)
  - [ ] Push Pull Leg (with 🏋️ icon)
  - [ ] Arnold Split (with 🦾 icon)
  - [ ] Add Your Routine (with ✏️ icon, purple background)
- [ ] Logout button visible in top-right
- [ ] Cards have hover effect (lift up)
- [ ] Can click on each card

### Pre-made Routines
- [ ] Click on "Pro Split" card
- [ ] Redirected to pre-made routines page
- [ ] See routines loaded from database
- [ ] Each routine shows:
  - [ ] Name
  - [ ] Description
  - [ ] Weekly schedule
  - [ ] "Select This Routine" button
- [ ] Back button works
- [ ] Can select a routine
- [ ] Success message appears
- [ ] Redirected back to workout selection

### Custom Routine Builder
- [ ] Click on "Add Your Routine" card
- [ ] Redirected to custom routine page
- [ ] See "+ Add Exercise" button
- [ ] Click to add exercise card
- [ ] Exercise card shows:
  - [ ] Day of Week dropdown
  - [ ] Exercise Name input
  - [ ] Number of Sets input
  - [ ] Duration input
  - [ ] Delete Exercise button
- [ ] Can add multiple exercises
- [ ] Can delete exercises
- [ ] Can fill in all fields
- [ ] "Save Routine" button appears
- [ ] Can save routine
- [ ] Success message appears
- [ ] Redirected back to workout selection
- [ ] Refresh page - custom routine persists

## 🔒 Security Testing Checklist

- [ ] Password is not visible in signup form (type="password")
- [ ] Cannot access workout pages without login
  - [ ] Try: http://localhost:3000/workout-selection (should redirect to login)
- [ ] Token stored in cookie (check browser DevTools > Application > Cookies)
- [ ] Logout removes token
- [ ] API returns 401 for requests without token

## 🎨 UI/UX Testing Checklist

- [ ] Purple gradient background visible
- [ ] Cards have rounded corners
- [ ] Buttons have hover effects
- [ ] Form inputs have focus states (purple border)
- [ ] Error messages display in red
- [ ] Loading states show "Please wait..." or spinner
- [ ] Responsive design works (resize browser window)
- [ ] Text is readable on all backgrounds
- [ ] Icons display correctly (emojis)

## 📊 Database Verification Checklist

### Using MongoDB Compass or mongosh

- [ ] Database `gym-workout-db` exists
- [ ] Collection `users` exists
- [ ] Collection `routines` exists
- [ ] `routines` collection has 6 documents
- [ ] After signup, `users` collection has new document
- [ ] User password is hashed (not plain text)
- [ ] After selecting routine, user has `selectedRoutine` field
- [ ] After creating custom routine, user has `customRoutine.exercises` array

## 🐛 Error Handling Checklist

- [ ] Invalid email format shows error
- [ ] Short password shows error
- [ ] Empty fields show error
- [ ] Duplicate email shows "User already exists"
- [ ] Wrong password shows "Invalid credentials"
- [ ] Network errors show error message
- [ ] Backend errors logged in terminal

## 📝 Code Quality Checklist

- [ ] All files have comments explaining code
- [ ] No console errors in browser
- [ ] No errors in backend terminal
- [ ] No warnings in frontend terminal
- [ ] Code follows consistent formatting
- [ ] Environment variables not hardcoded

## 🚀 Production Readiness Checklist

### Before Deploying

- [ ] Change `SECRET_KEY` to strong random string
- [ ] Use MongoDB Atlas for production database
- [ ] Update `NEXT_PUBLIC_API_URL` to production backend URL
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up environment variables on hosting platform
- [ ] Test all features in production environment
- [ ] Set up error logging and monitoring
- [ ] Create database backups
- [ ] Document deployment process

## 📚 Documentation Checklist

- [ ] README.md reviewed
- [ ] QUICK_START.md reviewed
- [ ] PROJECT_STRUCTURE.md reviewed
- [ ] Frontend/README.md reviewed
- [ ] Backend/README.md reviewed
- [ ] All code comments are clear
- [ ] API endpoints documented

## ✅ Final Verification

### Backend
- [ ] Server running on port 5000
- [ ] MongoDB connected
- [ ] API responds at http://localhost:5000
- [ ] No errors in terminal

### Frontend
- [ ] Server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] No errors in browser console
- [ ] No errors in terminal

### Integration
- [ ] Frontend can communicate with backend
- [ ] Authentication works end-to-end
- [ ] Data persists in database
- [ ] All features functional

## 🎉 Success Criteria

You've successfully set up the Gym Workout Website when:

✅ Both servers are running without errors
✅ Can create an account and login
✅ Can view and select pre-made routines
✅ Can create and save custom routines
✅ Data persists after page refresh
✅ All UI elements display correctly
✅ No console errors or warnings

---

## 📞 Troubleshooting

If any checklist item fails, refer to:
1. **QUICK_START.md** - Setup instructions
2. **README.md** - Troubleshooting section
3. **Backend/README.md** - Backend-specific issues
4. **Frontend/README.md** - Frontend-specific issues

## 💡 Tips

- Keep both terminal windows open to monitor logs
- Use browser DevTools to inspect network requests
- Check MongoDB Compass to verify data
- Clear browser cache if experiencing issues
- Restart servers after changing environment variables

---

**Once all items are checked, you're ready to use and develop the application! 🎉**
