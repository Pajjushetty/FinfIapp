const express = require('express');
const User = require('../models/User');
const Role = require('../models/Role');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { emailId, status, firstName, mobile, employeeId, role } = req.body;

    if (!emailId || !status || !firstName || !mobile || !employeeId || !role) {
      return res.status(400).send({ message: 'All fields are required.' });
    }

    const roleExists = await Role.findById(role);
    if (!roleExists) {
      return res.status(404).send({ message: 'Role not found.' });
    }

    const user = new User({ emailId, status, firstName, mobile, employeeId, role });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const { emailId, status, firstName, mobile, employeeId, role } = req.body;

    if (role) {
      const roleExists = await Role.findById(role);
      if (!roleExists) {
        return res.status(404).send({ message: 'Role not found.' });
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, { emailId, status, firstName, mobile, employeeId, role }, { new: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
