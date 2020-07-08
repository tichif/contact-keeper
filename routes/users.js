const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// User Model
const User = require('../models/User');

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    body('name', 'Please enter the name').notEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body(
      'password',
      'Please enter a valid password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.send(req.body);
  }
);

module.exports = router;
