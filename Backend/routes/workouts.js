const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const auth = require('../middleware/auth');

// @route   GET /api/workouts
// @desc    Get all workouts for logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId })
      .populate('routineId')
      .sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/workouts
// @desc    Log a new workout
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { routineId, duration, notes } = req.body;

    const workout = new Workout({
      userId: req.userId,
      routineId,
      duration,
      notes,
      date: new Date()
    });

    await workout.save();
    const populatedWorkout = await Workout.findById(workout._id).populate('routineId');
    res.status(201).json(populatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete a workout
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await workout.deleteOne();
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
