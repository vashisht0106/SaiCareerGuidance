const express = require('express');
const router = express.Router();
const University = require('../models/universitySchema.js');



// READ - Endpoint to get all universities
router.get('/get_university', async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// CREATE - Endpoint to create a new university
router.post('/add_university', async (req, res) => {
    try {
        const {name,address,contact}=req.body
if(!name||!address||!contact){

return res.status(400).json({success:false,error:"Opps enter all details!"})

}

        const newUniversity = new University({name,address,contact});
        const savedUniversity = await newUniversity.save();
        const universityCount = await University.countDocuments();
        
        res.status(201).json({success:true,message:"University added successfuly completed!" ,user: savedUniversity, count: universityCount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE - Endpoint to update a university
router.put('/update_university/:id', async (req, res) => {



    try {
        const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUniversity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





router.put('/add_university_course/:id', async (req, res) => {
    try {
        const university = await University.findById(req.params.id);

        if (!university) {
            return res.status(404).json({ message: 'University not found' });
        }

        university.courses.push(req.body.courses); 

        const updatedUniversity = await university.save();

        res.status(200).json(updatedUniversity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});








// DELETE - Endpoint to delete a university
router.delete('/delete_university/:id', async (req, res) => {
    try {
        const deletedUniversity = await University.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUniversity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



























module.exports = router;