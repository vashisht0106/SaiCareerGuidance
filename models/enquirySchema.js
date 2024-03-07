const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({


    collage: String,
    name: String,
    fname: String,
    caste:String,
    religion:String,
    studies:String,
    date: Date,
    contact: Number,
   occupation:String,
    address: String,

    count: { type: Number, default: 0 }

   
});

module.exports = mongoose.model('Enquiry', enquirySchema);