// Import mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define schema for workout sessions (logged workouts)
// This tracks when users complete a workout routine
const workoutSchema = new mongoose.Schema({
  // Reference to the user who performed this workout
  userId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
    ref: 'User', // References the User model to link workout to a user
    required: true // This field is mandatory (must know who did the workout)
  },
  // Reference to the routine that was performed
  routineId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
    ref: 'Routine', // References the Routine model to link to the workout plan
    required: true // This field is mandatory (must know which routine was done)
  },
  // Date and time when the workout was performed
  date: {
    type: Date, // Data type is Date
    default: Date.now // Automatically set to current date/time when workout is logged
  },
  // How long the workout took in minutes
  duration: {
    type: Number, // Data type is number (in minutes)
    required: true // This field is mandatory (must track workout duration)
  },
  // Optional notes about the workout session (e.g., "Felt strong today", "Struggled with last set")
  notes: String, // Simple string field, not required
  // Flag to indicate if the workout was completed
  completed: {
    type: Boolean, // Data type is boolean (true/false)
    default: true // Default is true (assumes workout is completed when logged)
  }
});

// Export the Workout model based on the schema
// This creates a 'workouts' collection in MongoDB
module.exports = mongoose.model('Workout', workoutSchema);
