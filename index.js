const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const loginRoutes = require('./Routes/loginRoutes')
const userRoutes = require('./Routes/userRoutes')
const universityRoutes = require('./Routes/universityRoutes')
const courseRoutes = require('./Routes/courseRoutes')
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')

const app = express();
//const router = express.Router();
dotenv.config()

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/api', loginRoutes);
app.use('/api', userRoutes);
app.use('/api', universityRoutes);
app.use('/api', courseRoutes);



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Login').then(() => {

console.log('database connected');

});









app.listen(process.env.PORT||4002, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
