// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    birth: String,
    gender: String,
    email: String,
    phonenumber: Number,
    username: String,
    password: String,
    otp: String,
});

module.exports = mongoose.model('User', userSchema);
 