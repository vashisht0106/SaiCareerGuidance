// userRoutes.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/loginSchema.js')


router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      
      
      if (!email || !password) {
          return res.status(400).json({ message: 'Please provide email and password' });
      }
      
      const user = await UserModel.findOne({ email, password });
      
      if (!user) {
          return res.status(404).json({ message: 'Invalid email or password' });
      }

     
      res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
