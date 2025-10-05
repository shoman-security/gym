# 📂 Project Structure Overview

Complete file structure of the Gym Workout Website with descriptions.

## 🌳 Directory Tree

```
gym-project/
│
├── Frontend/                           # Next.js React Frontend Application
│   ├── pages/                          # Next.js pages (routes)
│   │   ├── _app.js                    # App wrapper component
│   │   ├── index.js                   # Home page (Login/Signup) - Route: /
│   │   ├── workout-selection.js       # Workout selection page - Route: /workout-selection
│   │   ├── premade-routines.js        # Pre-made routines page - Route: /premade-routines
│   │   └── custom-routine.js          # Custom routine builder - Route: /custom-routine
│   │
│   ├── styles/                         # CSS styling files
│   │   ├── globals.css                # Global styles (applied to all pages)
│   │   ├── Auth.module.css            # Styles for authentication page
│   │   ├── WorkoutSelection.module.css # Styles for workout selection page
│   │   ├── PremadeRoutines.module.css # Styles for pre-made routines page
│   │   └── CustomRoutine.module.css   # Styles for custom routine builder
│   │
│   ├── package.json                    # Frontend dependencies and scripts
│   ├── next.config.js                  # Next.js configuration
│   ├── .env.local                      # Frontend environment variables
│   ├── .gitignore                      # Git ignore rules for frontend
│   └── README.md                       # Frontend documentation
│
├── Backend/                            # Node.js Express Backend API
│   ├── models/                         # Mongoose database models
│   │   ├── User.js                    # User schema (email, password, profile, routines)
│   │   └── Routine.js                 # Routine schema (pre-made workout routines)
│   │
│   ├── routes/                         # API route handlers
│   │   ├── auth.js                    # Authentication routes (login, signup)
│   │   └── routines.js                # Routine routes (CRUD operations)
│   │
│   ├── middleware/                     # Custom middleware functions
│   │   └── auth.js                    # JWT authentication middleware
│   │
│   ├── server.js                       # Main server entry point
│   ├── seed.js                         # Database seeding script
│   ├── package.json                    # Backend dependencies and scripts
│   ├── .env                            # Backend environment variables
│   ├── .gitignore                      # Git ignore rules for backend
│   └── README.md                       # Backend documentation
│
├── .gitignore                          # Root git ignore rules
├── README.md                           # Main project documentation
├── QUICK_START.md                      # Quick setup guide
└── PROJECT_STRUCTURE.md                # This file
```

## 📄 File Descriptions

### Frontend Files

#### Pages (Routes)

| File | Route | Description |
|------|-------|-------------|
| `_app.js` | N/A | Root component that wraps all pages |
| `index.js` | `/` | Login and signup page with form validation |
| `workout-selection.js` | `/workout-selection` | Main page with 4 workout routine cards |
| `premade-routines.js` | `/premade-routines?type=X` | Display pre-made routines by type |
| `custom-routine.js` | `/custom-routine` | Custom workout routine builder |

#### Styles

| File | Purpose |
|------|---------|
| `globals.css` | Global styles, reset, utility classes |
| `Auth.module.css` | Authentication page styling |
| `WorkoutSelection.module.css` | Workout selection cards and layout |
| `PremadeRoutines.module.css` | Pre-made routines display styling |
| `CustomRoutine.module.css` | Custom routine builder styling |

#### Configuration

| File | Purpose |
|------|---------|
| `package.json` | Dependencies: react, next, axios, js-cookie |
| `next.config.js` | Next.js settings and environment variables |
| `.env.local` | Frontend environment variables (API URL) |

### Backend Files

#### Models (Database Schemas)

| File | Purpose |
|------|---------|
| `User.js` | User schema with authentication and workout data |
| `Routine.js` | Pre-made workout routine schema |

**User Model Fields:**
- Authentication: email, password (hashed)
- Profile: age, height, weight, level
- Workouts: selectedRoutine, customRoutine

**Routine Model Fields:**
- Info: name, type, description, difficulty
- Schedule: array of {day, focus}
- Meta: duration, isActive, timestamps

#### Routes (API Endpoints)

| File | Endpoints | Purpose |
|------|-----------|---------|
| `auth.js` | `/api/auth/login`<br>`/api/auth/signup` | User authentication |
| `routines.js` | `/api/routines/premade/:type`<br>`/api/routines/select`<br>`/api/routines/custom`<br>`/api/routines/my-routine` | Workout routine management |

#### Middleware

| File | Purpose |
|------|---------|
| `auth.js` | JWT token verification for protected routes |

#### Configuration

| File | Purpose |
|------|---------|
| `server.js` | Express app setup, middleware, routes |
| `seed.js` | Populate database with sample routines |
| `package.json` | Dependencies: express, mongoose, jwt, bcrypt |
| `.env` | Environment variables (MongoDB, JWT secret) |

## 🔄 Data Flow

### Authentication Flow
```
User Input (Frontend)
    ↓
POST /api/auth/signup or /api/auth/login
    ↓
Backend validates credentials
    ↓
Generate JWT token
    ↓
Return token to frontend
    ↓
Store token in cookie
    ↓
Include token in subsequent requests
```

### Workout Selection Flow
```
User selects workout type
    ↓
Navigate to premade-routines or custom-routine
    ↓
GET /api/routines/premade/:type (with JWT)
    ↓
Backend fetches routines from MongoDB
    ↓
Display routines to user
    ↓
User selects routine
    ↓
POST /api/routines/select (with JWT)
    ↓
Save to user's profile in MongoDB
```

### Custom Routine Flow
```
User adds exercises
    ↓
Fill in: day, name, sets, duration
    ↓
Click "Save Routine"
    ↓
POST /api/routines/custom (with JWT)
    ↓
Validate exercise data
    ↓
Save to user's customRoutine in MongoDB
    ↓
Return success response
```

## 🔐 Security Layers

1. **Password Hashing**: bcrypt with 10 salt rounds
2. **JWT Tokens**: 7-day expiration, signed with secret key
3. **Protected Routes**: Authentication middleware on all routine endpoints
4. **Input Validation**: express-validator on all POST requests
5. **CORS**: Configured to accept only frontend origin

## 📊 Database Collections

### users
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  age: Number,
  height: Number,
  weight: Number,
  level: String,
  selectedRoutine: ObjectId (ref: routines),
  customRoutine: {
    exercises: [
      {
        day: String,
        name: String,
        sets: Number,
        duration: Number
      }
    ]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### routines
```javascript
{
  _id: ObjectId,
  name: String,
  type: String,
  description: String,
  schedule: [
    {
      day: String,
      focus: String
    }
  ],
  difficulty: String,
  duration: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Components

### Reusable Elements
- **Card**: White rounded container with shadow
- **Button**: Primary (purple), Secondary (gray), Danger (red)
- **Input**: Text fields with focus states
- **Form Group**: Label + Input wrapper
- **Grid**: Responsive card layout
- **Spinner**: Loading indicator

### Page Layouts
- **Auth Page**: Centered box on gradient background
- **Selection Page**: Header + 4-card grid
- **Routines Page**: Header + scrollable card grid
- **Custom Builder**: Header + dynamic exercise cards

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "next": "^14.0.0",
  "axios": "^1.6.0",
  "js-cookie": "^3.0.5"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
```

## 🚀 Deployment Structure

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: mongodb://localhost:27017

### Production (Example)
- Frontend: https://gym-app.vercel.app
- Backend: https://api.gym-app.com
- Database: MongoDB Atlas cluster

## 📝 Code Organization

### Frontend
- **Pages**: Route components with data fetching
- **Styles**: CSS Modules for scoped styling
- **Utils**: Axios configuration, cookie management

### Backend
- **Models**: Database schema definitions
- **Routes**: API endpoint handlers
- **Middleware**: Authentication, validation, error handling
- **Utils**: JWT generation, password hashing

## 🔍 Key Features by File

| Feature | Frontend File | Backend File |
|---------|--------------|--------------|
| User Registration | `pages/index.js` | `routes/auth.js` |
| User Login | `pages/index.js` | `routes/auth.js` |
| Workout Selection | `pages/workout-selection.js` | - |
| Pre-made Routines | `pages/premade-routines.js` | `routes/routines.js` |
| Custom Routine | `pages/custom-routine.js` | `routes/routines.js` |
| Authentication | Cookie management | `middleware/auth.js` |
| Database Models | - | `models/User.js`, `models/Routine.js` |

---

**This structure provides a clean separation of concerns and follows best practices for full-stack development.**
