const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')
require('dotenv/config');
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:587,
  secure:false,
  auth:{
    user:process.env.USER_EMAIL,
    pass:process.env.USER_PASS
  }
})

exports.createUser =  (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      userName:req.body.userName,
      userEmail:req.body.userEmail,
      userRole:req.body.userRole,
      password:hash
    })
    user.save()
    .then(async result => {
      let mailOptions = {
        from:process.env.USER_EMAIL,
        to:req.body.userEmail,
        subject:"Welcome to D2D Bike Service",
        html:`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          p {
            margin: 2px;
          }
        </style>
      </head>
    <body>
    <h3>Hi ${user.userName}</h3><br>
          <h4>You are successfully Registered with D2D Bike Service as ${user.userRole}.</h4>
          <p>Thank you joining us.</p><br>
          <p>D2D Bike Service</p>
          <p>Beniganj Rampath, Ayodhya</p>
          <p>8587078424</p>
    </body>
    </html>`
    }

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'User Registered & Email sent successfully' });
    } catch (error) {
              res.status(500).send({ message: 'Error sending email', error });
    }

    })
    .catch(err => {
      res.status(500).json({
        message:"Email is Already Registered."
      })
    })
  })
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({userEmail:req.body.userEmail}).then(user => {
    if(!user){
      return res.status(401).json({
        message:"Email is not Registered!"
      })
    }
    fetchedUser = user
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if(!result){
      return res.status(401).json({
        message:"Incorrect Password"
      })
    }
    if(!fetchedUser){
      return
    }
    const token = jwt.sign({userEmail:fetchedUser.userEmail, userId:fetchedUser._id},process.env.JWT_KEY,
      {expiresIn:'24h'}
    )
    const userDataTemp = {
      userName:fetchedUser.userName,
      userEmail:fetchedUser.userEmail,
      userRole:fetchedUser.userRole,
      userToken:token,
      expiresIn:3600*24,
    }
    res.status(200).json({
      message:"Login Success!",
      userData:userDataTemp,
    })
  })
  .catch(err => {
    return res.status(401).json({
      message:"Invalid Useremail or Password!"
    })
  })
}

async function sendMail(user, callback){
  console.log('user >', user);
  
  // let transporter = nodemailer.createTransport({
  //   host:"smtp.gmail.com",
  //   port:587,
  //   secure:false,
  //   auth:{
  //     user:process.env.USER_EMAIL,
  //     pass:process.env.USER_PASS
  //   }
  // })




} 