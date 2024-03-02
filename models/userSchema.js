
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 



    university: String,
    course:String,
    name: String,
    adharNumber: String,
    gender: String,
    date: Date,
    marksheetNumber: String,
    contact: Number,
    email: String,
    state: String,
    district: String,
    address: String,

    count: { type: Number, default: 0 }
});
const User = new mongoose.model('User', userSchema);
module.exports = User
