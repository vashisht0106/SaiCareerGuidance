// userRoutes.js
const express = require('express');
const router = express.Router();
const UserModel = require('../models/loginSchema.js')
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const options = {
    expiresIn: '1d' ,// Token expiration time (e.g., 1 day)
   
    // Cookie sent only over HTTPS
        // URL path for which the cookie is valid
  };
  

//register user
router.post('/registeruser' , async (req, res, next) => {
    
    
    
    try {
    let { name, email } = req.body
    let userF=await UserModel.findOne({email})
if(userF){

 res.status(200).json({success:false,message:"Email all ready exist!"})

}
 else {  let user = await UserModel.create({
        name, email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

        
     
       
    })

    const token = jwt.sign({id:user.id}, process.env.SECRET_KEY,options);
    console.log(token);

    res.status(201).cookie('token', token, options,{ httpOnly:true,}).json({ success: true,message:"Login successfully completed", user, token })
}
} catch (error) {
   res.status(500).json({succes:false,message:"internal server error"}) 
}
   


});














router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      
      
      if (!(email&&password)) {
          return res.status(200).json({success:false, message: 'Please provide email and password' });
      }
      
      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) {
          return res.status(200).json({success:false, message: 'Invalid email or password!' });
      }


 // Decrypt and compare passwords
 const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
 if (decryptedPassword !== password) {
     return res.status(200).json({ success: false, message: 'Incorrect email or password' });
 }


 const token = jwt.sign({id:user.id}, process.env.SECRET_KEY,options);



     
 res.status(200).cookie('token', token, {
   httpOnly:true,
//   domain:'.immortalfutureinfotech.com',
   path:'/',
//   secure:true
maxAge:1024*60*60*24*3,
sameSite:'lax'
   }
 )
 res.json({ success: true, user, token });
  }
  
  
  
  catch (error) {
      res.status(500).json({ message: error.message });
  }
});









module.exports = router;



router.get('/loaduser',async(req,res)=>{

const {token}=req.cookies;
//const token1=req.header;
console.log(token)
if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: Access Denied" });
}

jwt.verify(token, process.env.SECRET_KEY,async(err, decoded) => {
    if (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    console.log(decoded.id)
       
    const user=await UserModel.findById(decoded.id,)
    //req.user=user;
    //console.log(user)
    console.log( user)
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
    }


    res.status(200).json({success:true,token,user});
})







})



router.post('/logout', (req, res) => {
    try {
      res.cookie('token', 'null', { expires: new Date(Date.now()), httpOnly: true });
      // Set CORS headers
    //  res.setHeader('Access-Control-Allow-Origin', '*');
    //  res.setHeader('Access-Control-Allow-Credentials', 'true');
      // Send response
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });