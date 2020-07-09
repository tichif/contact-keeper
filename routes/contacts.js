const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../middleware/auth');

// User Model
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET /api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [auth, [body('name', 'Name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      // Save the contact into the DB
      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/contacts/:id
// @desc    Update Contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route   DELETE /api/contacts
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('delete contact');
});

module.exports = router;
