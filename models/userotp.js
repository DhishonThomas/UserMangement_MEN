const mongoose = require('mongoose');

const userSchemaotp = new mongoose.Schema({
    email: String,
    otp: String,
});

module.exports = mongoose.model('Userotp', userSchemaotp);
