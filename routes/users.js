const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Verify if a user already sign up with this email
      let user = await User.findOne({ email }); // or { email: email }
      if (user) {
        res.status(404).json({ msg: 'User already exist' });
      }

      // Create a new User
      user = new User({
        name,
        email,
        password,
      });

      // hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user in the database
      await user.save();
      res.send('User saved');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
