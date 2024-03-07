const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js')



// READ - Endpoint to get all users
router.get('/read', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});







// CREATE - Endpoint to create a new user
router.post('/create/register', async (req, res) => {
    try {
        const { university, course, name, adharNumber, gender, date,  marksheetNumber, contact, email, state, district, address ,qualification,caste,fcontact} = req.body;

        // Checking if all fields are provided
        if (!(university &&course &&name &&adharNumber &&gender &&date  &&marksheetNumber &&contact &&email &&state &&district &&address && fcontact && qualification && caste)) {
            res.status(400).json({ success: false, error: "Incomplete Details!" });
            return;
        }

        // Creating a new user
        const newUser = new User({ university, course, name, adharNumber, gender, date, marksheetNumber, contact, email, state, district, address,qualification,fcontact,caste });
        const savedUser = await newUser.save();

        // Counting total number of users
        const userCount = await User.countDocuments();

        res.status(201).json({ success: true, user: savedUser, count: userCount });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

    
    
// UPDATE - Endpoint to update a user
router.put('/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Endpoint to delete a user
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});























module.exports = router;