
const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
    name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  
  courses: [ {type:String,default:"Courses not found"} ]

});
const University = new mongoose.model('University', UniversitySchema);
module.exports = University
