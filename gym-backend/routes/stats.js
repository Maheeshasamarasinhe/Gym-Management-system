const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get gym statistics
router.get('/', async (req, res) => {
  try {
    const [totalUsers] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "user"');
    const [activeUsers] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "user" AND membership_status = "Active"');
    const [paidUsers] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "user" AND payment_status = "Paid"');
    const [pendingPayments] = await db.execute('SELECT COUNT(*) as count FROM users WHERE role = "user" AND payment_status = "Pending"');
    const [totalExercises] = await db.execute('SELECT COUNT(*) as count FROM exercises');
    
    const today = new Date().toISOString().split('T')[0];
    const [todayAttendance] = await db.execute('SELECT COUNT(*) as count FROM attendance WHERE attendance_date = ?', [today]);
    
    res.json({
      totalUsers: totalUsers[0].count,
      activeUsers: activeUsers[0].count,
      paidUsers: paidUsers[0].count,
      pendingPayments: pendingPayments[0].count,
      totalExercises: totalExercises[0].count,
      todayAttendance: todayAttendance[0].count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;