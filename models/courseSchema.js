const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    university: {
        type: String,
        required: true
    },
    courses: [{type: String,
        required: true}] 
});

module.exports = mongoose.model('Course', universitySchema);
