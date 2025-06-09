const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Manager Sign-In Route
router.post('/manager-signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is a manager
    if (user.role !== 'manager') {
      return res.status(403).json({ message: 'Access denied. Managers only.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, profileCompleted: user.profileCompleted },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        email: user.email,
        profileCompleted: user.profileCompleted,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in /manager-signin:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Token Validation Route
router.get('/validate', auth, (req, res) => {
  res.status(200).json({ message: 'Token is valid', profileCompleted: req.user.profileCompleted });
});

module.exports = router;