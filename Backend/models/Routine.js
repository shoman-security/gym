// Import mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define schema for individual exercises within a routine
// This is a sub-document schema (embedded within routines)
const exerciseSchema = new mongoose.Schema({
  // Name of the exercise (e.g., "Bench Press", "Squats")
  name: {
    type: String, // Data type is string
    required: true // This field is mandatory
  },
  // Number of sets for this exercise
  sets: {
    type: Number, // Data type is number
    required: true, // This field is mandatory
    min: 1 // Minimum value is 1 (must do at least 1 set)
  },
  // Number of repetitions (can be a range like "8-12" or fixed like "10")
  reps: {
    type: String, // Data type is string to allow ranges
    required: true // This field is mandatory
  },
  // Rest time between sets (e.g., "60s", "90s")
  rest: {
    type: String, // Data type is string
    default: '60s' // Default rest time is 60 seconds
  },
  // Optional notes about the exercise (e.g., "Focus on form")
  notes: String // Simple string field, not required
});

// Define the main schema for workout routines
const routineSchema = new mongoose.Schema({
  // Name of the routine (e.g., "Upper Body Strength")
  name: {
    type: String, // Data type is string
    required: [true, 'Routine name is required'], // Mandatory with custom error message
    trim: true // Remove whitespace from beginning and end
  },
  // Description of what the routine is about
  description: {
    type: String, // Data type is string
    trim: true // Remove whitespace from beginning and end
  },
  // Category/type of workout
  category: {
    type: String, // Data type is string
    enum: ['strength', 'cardio', 'flexibility', 'sports', 'custom'], // Only these values allowed
    default: 'custom' // Default category is custom
  },
  // Difficulty level of the routine
  difficulty: {
    type: String, // Data type is string
    enum: ['beginner', 'intermediate', 'advanced'], // Only these three levels allowed
    default: 'beginner' // Default difficulty is beginner
  },
  // Expected duration of the workout (e.g., "45 min", "1 hour")
  duration: {
    type: String, // Data type is string
    default: '45 min' // Default duration is 45 minutes
  },
  // Array of exercises in this routine (uses exerciseSchema defined above)
  exercises: [exerciseSchema], // Array of embedded exercise documents
  // Reference to the user who created this routine (for custom routines)
  userId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
    ref: 'User', // References the User model
    required: function() {
      // Only required if the routine is custom (user-created)
      return this.category === 'custom';
    }
  },
  // Flag to indicate if this is a premade routine (created by admin/system)
  isPremade: {
    type: Boolean, // Data type is boolean (true/false)
    default: false // Default is false (user-created routine)
  },
  // Timestamp for when the routine was created
  createdAt: {
    type: Date, // Data type is Date
    default: Date.now // Automatically set to current date/time
  }
});

// Export the Routine model based on the schema
// This creates a 'routines' collection in MongoDB
module.exports = mongoose.model('Routine', routineSchema);
