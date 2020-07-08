const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../middleware/auth');

// User Model
const User = require('../models/User');

// @route   GET /api/auth
// @desc    Get a logged user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
  '/',
  [
    body('email', 'Please enter an  email').isEmail(),
    body('password', 'Please enter a password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      // Check if the password is correct
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Json Web Token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
