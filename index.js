const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const loginRoutes = require('./Routes/loginRoutes')
const userRoutes = require('./Routes/userRoutes')
const universityRoutes = require('./Routes/universityRoutes')
const courseRoutes = require('./Routes/courseRoutes')
const enquiryRoutes = require('./Routes/enquiryRoutes.js')
const cookieParser = require('cookie-parser')
const dotenv=require('dotenv')

const app = express();
//const router = express.Router();
dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: true,  // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Allow credentials like cookies to be sent
}));


app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  // Set the Access-Control-Allow-Methods header to allow the HTTP methods specified
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Set the Access-Control-Allow-Headers header to allow the headers specified
  res.header('Access-Control-Allow-Headers', 'Origin ,X-Requested-With,Content-Type, Accept');
  // Call next middleware
  res.header('Access-Control-Allow-Credentials', true);
  next();
});



app.use('/api', loginRoutes);
app.use('/api', userRoutes);
app.use('/api', universityRoutes);
app.use('/api', courseRoutes);
app.use('/api',enquiryRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {

console.log('database connected');

});









app.listen(process.env.PORT||4002, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
