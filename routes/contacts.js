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
    const contacts = await Contact.find({ user: req.body.id }).sort({
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
router.post('/', (req, res) => {
  res.send('Add new contact');
});

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
