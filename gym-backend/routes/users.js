const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const [users] = await db.execute(`
      SELECT u.*, 
             COUNT(DISTINCT a.id) as attendance_count,
             COUNT(DISTINCT us.id) as exercise_count
      FROM users u
      LEFT JOIN attendance a ON u.id = a.user_id
      LEFT JOIN user_schedules us ON u.id = us.user_id
      WHERE u.role = 'user'
      GROUP BY u.id
    `);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user schedule
    const [schedule] = await db.execute(`
      SELECT e.*, us.sets, us.notes
      FROM user_schedules us
      JOIN exercises e ON us.exercise_id = e.id
      WHERE us.user_id = ?
    `, [req.params.id]);
    
    // Get attendance
    const [attendance] = await db.execute(
      'SELECT attendance_date FROM attendance WHERE user_id = ? ORDER BY attendance_date DESC',
      [req.params.id]
    );
    
    // Get fitness data
    const [fitnessData] = await db.execute(
      'SELECT * FROM fitness_data WHERE user_id = ? ORDER BY record_date DESC',
      [req.params.id]
    );
    
    const user = users[0];
    user.schedule = schedule;
    user.attendance = attendance.map(a => a.attendance_date);
    user.fitnessData = fitnessData;
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { payment_status, nutrition_plan } = req.body;
    await db.execute(
      'UPDATE users SET payment_status = ?, nutrition_plan = ?, last_payment = CURRENT_DATE WHERE id = ?',
      [payment_status, nutrition_plan, req.params.id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark attendance
router.post('/:id/attendance', async (req, res) => {
  try {
    const { date } = req.body;
    const attendanceDate = date || new Date().toISOString().split('T')[0];
    
    await db.execute(
      'INSERT IGNORE INTO attendance (user_id, attendance_date) VALUES (?, ?)',
      [req.params.id, attendanceDate]
    );
    res.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add fitness data
router.post('/:id/fitness', async (req, res) => {
  try {
    const { record_date, weight, body_fat, muscle_mass, notes } = req.body;
    
    await db.execute(
      'INSERT INTO fitness_data (user_id, record_date, weight, body_fat, muscle_mass, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [req.params.id, record_date, weight, body_fat, muscle_mass, notes]
    );
    res.json({ message: 'Fitness data added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete fitness data
router.delete('/:id/fitness/:fitnessId', async (req, res) => {
  try {
    await db.execute(
      'DELETE FROM fitness_data WHERE id = ? AND user_id = ?',
      [req.params.fitnessId, req.params.id]
    );
    res.json({ message: 'Fitness data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;