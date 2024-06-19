const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = {
  id: '66727790686f975756eb3005',  // Replace with the actual user ID from your database
  role: { name: 'Admin' }  // Adjust this as per your actual user schema
};

const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('Generated JWT Token:', token);
