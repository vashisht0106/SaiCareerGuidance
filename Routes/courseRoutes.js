const express = require('express');
const router = express.Router();
const Course = require('../models/courseSchema.js');



// GET all universities
router.get('/universities', async (req, res) => {
    try {
        const universities = await Course.find();
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }                                                          
});

// POST a new course to a university                                           
router.post('/universities/:universityId/courses', async (req, res) => {
    try {
        const university = await Course.findById(req.params.universityId);
        if (!university) return res.status(404).json({ message: 'University not found' });
        
        university.courses.push(req.body.course);
        await university.save();
        res.status(201).json(university);
    } catch (error) {    
        res.status(500).json({ message: error.message });
    }
});

  
  
module.exports = router;