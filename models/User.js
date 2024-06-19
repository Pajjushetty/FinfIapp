const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emailId: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    firstName: { type: String, required: true },
    mobile: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
