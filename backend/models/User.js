const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: String,
    profileImage: String,
    team: String,
    lastUpdated: Date,
    lastLogin: { type: Date, default: Date.now }
}, {
    timestamps: true // enable createdNow and lastUpdated values
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;