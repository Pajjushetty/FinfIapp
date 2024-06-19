const mongoose = require('mongoose');
const Role = require('./models/Role'); // Adjust the path to your Role model
require('dotenv').config();

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const roles = [
      { name: 'Initiator', accessLevels: { read: true, write: true } },
      { name: 'Approver', accessLevels: { read: true, write: true } },
      { name: 'Admin', accessLevels: { read: true, write: true } },
      { name: 'DataManager', accessLevels: { read: true, write: true } }
    ];

    for (const role of roles) {
      const roleExists = await Role.findOne({ name: role.name });
      if (!roleExists) {
        await Role.create(role);
      }
    }

    console.log('Roles seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding roles:', error);
    mongoose.disconnect();
  }
};

seedRoles();
