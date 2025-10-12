const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// @route   GET /api/auth/google
// @desc    Redirect to Google for authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// @route   GET /api/auth/google/callback
// @desc    Google callback route
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:3000'}/login`,
    session: false 
  }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    const clientURL = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${clientURL}/oauth-success?token=${token}`);
  }
);

module.exports = router;
