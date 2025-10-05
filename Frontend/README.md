# Gym Workout Tracker - Frontend

Modern, responsive frontend for the Gym Workout Tracker application built with React and Next.js using `.jsx` file extensions.

## Features

- 🔐 User authentication (login/register)
- 📋 Browse premade workout routines
- ✏️ Create custom workout routines
- 💪 Track workout sessions
- 🎨 Beautiful, modern UI with gradient design
- 📱 Fully responsive design

## Tech Stack

- **React** 18.2.0
- **Next.js** 14.0.0
- **Axios** for API calls
- **js-cookie** for token management
- **CSS Modules** for styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Frontend/
├── pages/
│   ├── _app.jsx           # App wrapper
│   ├── index.jsx          # Login/Register page
│   ├── workout-selection.jsx
│   ├── premade-routines.jsx
│   └── custom-routine.jsx
├── styles/
│   ├── globals.css
│   ├── Auth.module.css
│   ├── WorkoutSelection.module.css
│   ├── PremadeRoutines.module.css
│   └── CustomRoutine.module.css
├── next.config.js
└── package.json
```

## Pages

- **/** - Authentication (Login/Register)
- **/workout-selection** - Choose between premade or custom routines
- **/premade-routines** - Browse and start premade workout routines
- **/custom-routine** - Create your own custom workout routine

## Note

All React component files use the `.jsx` extension as configured in `next.config.js`.
