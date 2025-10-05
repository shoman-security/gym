# Gym Workout Backend API

Backend API for the Gym Workout application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Custom workout routines
- Premade workout routines
- Workout logging and tracking
- RESTful API design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gym-workout
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

3. Start MongoDB (make sure MongoDB is installed and running)

4. Run the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Routines
- `GET /api/routines/premade` - Get all premade routines
- `GET /api/routines/my` - Get user's custom routines (protected)
- `GET /api/routines/:id` - Get routine by ID
- `POST /api/routines` - Create new routine (protected)
- `PUT /api/routines/:id` - Update routine (protected)
- `DELETE /api/routines/:id` - Delete routine (protected)

### Workouts
- `GET /api/workouts` - Get all user workouts (protected)
- `POST /api/workouts` - Log new workout (protected)
- `DELETE /api/workouts/:id` - Delete workout (protected)

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
