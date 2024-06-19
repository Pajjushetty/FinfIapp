const mongoose = require('mongoose');

const accessLevelsSchema = new mongoose.Schema({
    read: { type: Boolean, required: true },
    write: { type: Boolean, required: true }
});

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    accessLevels: { type: accessLevelsSchema, required: true },
    isCustom: { type: Boolean, default: false }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
