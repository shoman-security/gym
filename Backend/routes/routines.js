const express = require('express');
const router = express.Router();
const Routine = require('../models/Routine');
const auth = require('../middleware/auth');

// @route   GET /api/routines/premade
// @desc    Get all premade routines
// @access  Public
router.get('/premade', async (req, res) => {
  try {
    const routines = await Routine.find({ isPremade: true });
    res.json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/routines/my
// @desc    Get user's custom routines
// @access  Private
router.get('/my', auth, async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.userId, isPremade: false });
    res.json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/routines/:id
// @desc    Get routine by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.json(routine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/routines
// @desc    Create a new custom routine
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, category, difficulty, duration, exercises } = req.body;

    const routine = new Routine({
      name,
      description,
      category: category || 'custom',
      difficulty,
      duration,
      exercises,
      userId: req.userId,
      isPremade: false
    });

    await routine.save();
    res.status(201).json(routine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/routines/:id
// @desc    Update a routine
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Check if user owns the routine
    if (routine.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this routine' });
    }

    const { name, description, category, difficulty, duration, exercises } = req.body;

    routine.name = name || routine.name;
    routine.description = description || routine.description;
    routine.category = category || routine.category;
    routine.difficulty = difficulty || routine.difficulty;
    routine.duration = duration || routine.duration;
    routine.exercises = exercises || routine.exercises;

    await routine.save();
    res.json(routine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/routines/:id
// @desc    Delete a routine
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Check if user owns the routine
    if (routine.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this routine' });
    }

    await routine.deleteOne();
    res.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
