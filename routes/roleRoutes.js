const express = require('express');
const Role = require('../models/Role');
const { isAdmin } = require('../middleware/auth');
const router = express.Router();

// Create a new role (Admin only)
router.post('/roles', isAdmin, async (req, res) => {
    try {
        const { name, accessLevels } = req.body;

        if (!name || !accessLevels) {
            return res.status(400).send({ message: 'Name and access levels are required.' });
        }

        const role = new Role({ name, accessLevels, isCustom: true });
        await role.save();
        res.status(201).send(role);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get all roles
router.get('/roles', async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).send(roles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get role by ID
router.get('/roles/:id', async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).send({ message: 'Role not found.' });
        }
        res.status(200).send(role);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update role by ID (Admin only)
router.put('/roles/:id', isAdmin, async (req, res) => {
    try {
        const { name, accessLevels } = req.body;
        const role = await Role.findByIdAndUpdate(req.params.id, { name, accessLevels }, { new: true });
        if (!role) {
            return res.status(404).send({ message: 'Role not found.' });
        }
        res.status(200).send(role);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Delete role by ID (Admin only)
router.delete('/roles/:id', isAdmin, async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).send({ message: 'Role not found.' });
        }
        res.status(200).send({ message: 'Role deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
