const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const [exercises] = await db.execute('SELECT * FROM exercises ORDER BY category, name');
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new exercise
router.post('/', async (req, res) => {
  try {
    const { name, category, difficulty, description } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO exercises (name, category, difficulty, description) VALUES (?, ?, ?, ?)',
      [name, category, difficulty, description]
    );
    
    res.json({ id: result.insertId, message: 'Exercise added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add exercise to user schedule
router.post('/assign', async (req, res) => {
  try {
    const { user_id, exercise_id, sets, notes } = req.body;
    
    await db.execute(
      'INSERT INTO user_schedules (user_id, exercise_id, sets, notes) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE sets = VALUES(sets), notes = VALUES(notes)',
      [user_id, exercise_id, sets, notes]
    );
    
    res.json({ message: 'Exercise assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove exercise from user schedule
router.delete('/assign/:userId/:exerciseId', async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM user_schedules WHERE user_id = ? AND exercise_id = ?',
      [req.params.userId, req.params.exerciseId]
    );
    res.json({ message: 'Exercise removed from schedule' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;