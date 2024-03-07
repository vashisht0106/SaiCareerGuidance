const express = require('express');
const router = express.Router();
const Enquiry = require('../models/enquirySchema.js');

// GET all enquiries
router.get('/enquiry', async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new enquiry
router.post('/add/enquiry', async (req, res) => {

        try {
            const { collage, name, date, contact, religion, studies, caste, occupation, fname, address } = req.body;

console.log( collage, name, date, contact, religion, studies, caste, occupation, fname, address )
            const newEnquiry = new Enquiry({ collage, name, date, contact, religion, studies, caste, occupation, fname, address });
            const savedEnquiry = await newEnquiry.save();

            const enquiryCount = await Enquiry.countDocuments();

            res.status(201).json({ success: true, enquiry: savedEnquiry, count: enquiryCount });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });



       

module.exports = router;
