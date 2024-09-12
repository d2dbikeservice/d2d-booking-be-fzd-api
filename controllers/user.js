const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      userName:req.body.userName,
      userEmail:req.body.userEmail,
      userRole:req.body.userRole,
      password:hash
    })
    user
    .save()
    .then(result => {
      res.status(201).json({
        message:"User Created Successfully",
        data:result
      })
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
