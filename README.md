# 🏋️ Gym Workout Tracker

A modern full-stack web application for managing gym workout routines with user authentication, premade workout plans, and custom routine builder.

## 📋 Project Overview

This application allows users to:
- Register and login with secure authentication
- Browse and start premade workout routines
- Create custom workout routines with detailed exercises
- Track workout sessions and progress
- Manage personal fitness plans

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with `.jsx` file extensions
- **React 18** - UI library
- **CSS Modules** - Scoped component styling
- **Axios** - HTTP client for API calls
- **js-cookie** - Token management

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
gym-project/
├── Frontend/                    # Next.js frontend application
│   ├── pages/                   # Next.js pages (all .jsx files)
│   │   ├── _app.jsx            # App wrapper
│   │   ├── index.jsx           # Login/Register page
│   │   ├── workout-selection.jsx
│   │   ├── premade-routines.jsx
│   │   └── custom-routine.jsx
│   ├── styles/                  # CSS modules and global styles
│   │   ├── globals.css
│   │   ├── Auth.module.css
│   │   ├── WorkoutSelection.module.css
│   │   ├── PremadeRoutines.module.css
│   │   └── CustomRoutine.module.css
│   ├── package.json
│   ├── next.config.js          # Configured for .jsx extensions
│   └── .env.example
│
├── Backend/                     # Node.js backend API
│   ├── models/                  # Mongoose models
│   │   ├── User.js
│   │   ├── Routine.js
│   │   └── Workout.js
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── routines.js
│   │   └── workouts.js
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── server.js               # Main server file
│   ├── package.json
│   └── .env.example
│
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd gym-project
```

2. **Set up Backend:**
```bash
cd Backend
npm install
```

3. **Configure Backend environment variables:**

Edit `Backend/.env` file:
```env
MONGO_URI=mongodb://localhost:27017/gym-workout-db
PORT=5000
SECRET_KEY=your_super_secret_jwt_key_change_this_in_production
PASSWORD=your_mongodb_password_here
```

4. **Seed the database (optional but recommended):**
```bash
node seed.js
```

5. **Start Backend server:**
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

6. **Set up Frontend (in a new terminal):**
```bash
cd Frontend
npm install
```

7. **Configure Frontend environment variables:**

Edit `Frontend/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

8. **Start Frontend development server:**
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

9. **Open your browser:**
Navigate to `http://localhost:3000`

## 📱 Application Features

### 1. Authentication Page
- **Login**: Existing users can log in with email and password
- **Sign Up**: New users can create an account with:
  - Email address
  - Password (minimum 6 characters)
  - Age (13-120 years)
  - Height (in cm)
  - Weight (in kg)
  - Fitness Level (Beginner or Expert)

### 2. Workout Selection Page
Four workout routine options:

#### Pro Split
Advanced 5-6 day split focusing on individual muscle groups for maximum growth and definition.

#### Push Pull Leg
Popular 3-6 day split dividing workouts into pushing, pulling, and leg movements for balanced development.

#### Arnold Split
Classic 6-day split made famous by Arnold Schwarzenegger, combining muscle groups for intense training.

#### Add Your Routine (Custom)
Create your own personalized workout routine.

### 3. Pre-made Routines Page
- Browse ready-made workout schedules
- View weekly schedule breakdown
- Select and save routine to your profile
- Multiple routines available for each category

### 4. Custom Routine Builder
- Add multiple exercise cards
- Configure for each exercise:
  - **Day of Week**: Monday through Sunday
  - **Exercise Name**: e.g., Bench Press, Squats
  - **Number of Sets**: 1-20 sets
  - **Duration**: 1-180 minutes
- **Update** exercise details
- **Delete** individual exercises
- **Save** entire routine to database

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication (7-day expiration)
- Protected API routes with authentication middleware
- Input validation on all forms
- CORS configuration for secure cross-origin requests

## 📊 Database Schema

### User Collection
```javascript
{
  email: String (unique),
  password: String (hashed),
  age: Number,
  height: Number,
  weight: Number,
  level: String (Beginner/Expert),
  selectedRoutine: ObjectId (ref: Routine),
  customRoutine: {
    exercises: [{
      day: String,
      name: String,
      sets: Number,
      duration: Number
    }]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Routine Collection
```javascript
{
  name: String,
  type: String (pro-split/push-pull-leg/arnold-split),
  description: String,
  schedule: [{
    day: String,
    focus: String
  }],
  difficulty: String (Beginner/Intermediate/Advanced),
  duration: Number (weeks),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Features

- Modern gradient background (purple theme)
- Responsive design for mobile and desktop
- Card-based interface with hover effects
- Smooth animations and transitions
- Form validation with error messages
- Loading states for async operations

## 📝 Code Comments

Every line of code includes detailed comments explaining:
- Purpose of each function and variable
- How data flows through the application
- What each API endpoint does
- Database operations and validations
- Security considerations

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Routines (Protected)
- `GET /api/routines/premade/:type` - Get pre-made routines by type
- `POST /api/routines/select` - Select a pre-made routine
- `GET /api/routines/custom` - Get user's custom routine
- `POST /api/routines/custom` - Save custom routine
- `DELETE /api/routines/custom` - Delete custom routine
- `GET /api/routines/my-routine` - Get user's active routine

## 🧪 Testing the Application

1. **Start both servers** (Backend on port 5000, Frontend on port 3000)
2. **Create a new account** on the home page
3. **Select a workout type** from the four cards
4. **Browse pre-made routines** or create a custom one
5. **Add exercises** to your custom routine
6. **Save and manage** your workout plan

## 📦 Production Deployment

### Backend
1. Set strong `SECRET_KEY` in environment variables
2. Use MongoDB Atlas for database hosting
3. Enable HTTPS
4. Configure CORS for production domain
5. Set up logging and monitoring

### Frontend
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or similar platform

## 🤝 Contributing

This is a complete full-stack application ready for further development. Potential enhancements:
- Exercise library with images and instructions
- Progress tracking and analytics
- Social features (share routines)
- Workout timer and rest periods
- Nutrition tracking
- Mobile app version

## 📄 License

This project is open source and available for educational purposes.

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check Atlas connection string
- Verify `MONGO_URI` in `.env` file

### Frontend Can't Connect to Backend
- Check that backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS configuration in `server.js`

### Authentication Issues
- Clear browser cookies
- Check JWT token expiration (7 days)
- Verify `SECRET_KEY` matches between requests

## 📞 Support

For issues or questions:
1. Check the README files in Frontend and Backend directories
2. Review code comments for detailed explanations
3. Verify environment variables are correctly set
4. Ensure all dependencies are installed

---

**Built with ❤️ for fitness enthusiasts**
