// Import mongoose library for MongoDB object modeling
const mongoose = require('mongoose');
// Import bcryptjs for password hashing and comparison
const bcrypt = require('bcryptjs');

// Define the schema (structure) for User documents in MongoDB
const userSchema = new mongoose.Schema({
  // Username field configuration
  username: {
    type: String, // Data type is string
    required: [true, 'Username is required'], // Field is mandatory with custom error message
    unique: true, // Username must be unique across all users
    trim: true, // Remove whitespace from beginning and end
    minlength: [3, 'Username must be at least 3 characters long'] // Minimum length validation
  },
  // Email field configuration
  email: {
    type: String, // Data type is string
    required: [true, 'Email is required'], // Field is mandatory with custom error message
    unique: true, // Email must be unique across all users
    lowercase: true, // Convert email to lowercase before saving
    trim: true, // Remove whitespace from beginning and end
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'] // Regex validation for email format
  },
  // Password field configuration
  password: {
    type: String, // Data type is string
    required: [true, 'Password is required'], // Field is mandatory with custom error message
    minlength: [6, 'Password must be at least 6 characters long'] // Minimum length validation
  },
  // Timestamp field for when user account was created
  createdAt: {
    type: Date, // Data type is Date
    default: Date.now // Automatically set to current date/time when user is created
  }
});

// Pre-save middleware: runs before saving a user document to the database
// This automatically hashes the password before storing it
userSchema.pre('save', async function(next) {
  // Check if password field has been modified (to avoid re-hashing on every save)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt (random string) with complexity factor of 10
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    // Continue to save the document
    next();
  } catch (error) {
    // If error occurs during hashing, pass it to next middleware
    next(error);
  }
});

// Instance method: can be called on any user document
// Compares a plain text password with the hashed password in database
userSchema.methods.comparePassword = async function(candidatePassword) {
  // Returns true if passwords match, false otherwise
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the User model based on the schema
// This creates a 'users' collection in MongoDB
module.exports = mongoose.model('User', userSchema);
