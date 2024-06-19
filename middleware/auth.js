const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is Admin
async function isAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        if (user.role.name === 'Admin') {
            req.user = user;
            next();
        } else {
            res.status(403).send({ message: 'Forbidden: Not an Admin.' });
        }
    } catch (error) {
        res.status(401).send({ message: 'Unauthorized: Invalid token.' });
    }
}

module.exports = { isAdmin };
