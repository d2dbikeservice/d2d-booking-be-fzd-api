const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/user');

// JUDex7wOnJX3SfP9
// process.env.MONGO_ATLAS_PW
const app = express()
mongoose.connect('mongodb+srv://d2dbikeservice:'+ process.env.MONGO_ATLAS_PW +'@cluster0.4x7tz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=> {
  console.log("Connected to database!")
})
.catch(() => {
  console.log("Connection failed")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader("Access-Control-Allow-Methods",
     "GET, POST, PATCH, PUT, DELETE, OPTIONS")
     next()
})

app.use("/api/bookings",bookingRoutes)
app.use("/api/user",userRoutes)




module.exports = app
