const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const app = express()
// mongoose.connect('mongodb+srv://d2dbikeservice:'+process.env.MONGO_ATLAS_PW+'@cluster0.4x7tz.mongodb.net/?retryWrites=true&w=majority&appName=dlocal')
// .then(()=> {
//   console.log("Connected to database!")
// })
// .catch((err) => {

//   console.log("Connection failed", err)
// })

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

// app.use("/api/bookings",bookingRoutes)
// app.use("/api/user",userRoutes)




// module.exports = app

app.use(cors());

//Url encoding parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bookings",bookingRoutes)
app.use("/api/user",userRoutes)
app.use("/api/expenses",expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
.catch(err=> {
  console.log(err);
})


app.listen(process.env.PORT, () => {
	console.log('Connected to port : ' + process.env.PORT);
});
