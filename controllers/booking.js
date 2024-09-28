const Booking = require('../models/booking')
require('dotenv/config');
const nodemailer = require('nodemailer')
const twilio = require('twilio');

// let transporter = nodemailer.createTransport({
//   host:"smtp.gmail.com",
//   port:587,
//   secure:false,
//   auth:{
//     user:process.env.USER_EMAIL,
//     pass:process.env.USER_PASS
//   }
// })

// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


exports.createBooking = (req, res, next) => {
  const booking = new Booking({
    customerName: req.body.customerName,
    vehicleModel: req.body.vehicleModel,
    userEmail: req.body.userEmail,
    address: req.body.address,
    city: req.body.city,
    contact: req.body.contact,
    serviceEnquiryDate:req.body.serviceEnquiryDate,
    serviceScheduledDate:req.body.serviceScheduledDate,
    serviceCompletedDate:req.body.serviceCompletedDate,
    status:req.body.status,
    totalBillAmount:req.body.totalBillAmount,
    totalPaidAmount:req.body.totalPaidAmount,
    isBillPaid:req.body.isBillPaid,
    isNewBooking:req.body.isNewBooking,
    comment:req.body.comment,
    assignedMechanic:req.body.assignedMechanic,
    updatedBy:req.body.updatedBy,
  })
  let userData = req.body
  
  booking.save().then( async createdBooking => {
    
  //   let mailOptions = {
  //     from:process.env.USER_EMAIL,
  //     to:req.body.userEmail,
  //     subject:"Your Vehicle Service is Booked",
  //     html:`<h3>Hi ${userData.customerName},</h3><br>
  //       <h4>Your Vehicle ${userData.vehicleModel} doorstep service is booked successfully for Address: ${userData.address} with D2D Bike Service for Date: ${userData.serviceScheduledDate}.</h4><br>
  //       <p>We will call you once mechanic is assiged for your Vehicle.</p><br>
  //       <h4>For any query/complaint, please contact on 8587078424.</h4><br>
  //       <p>Thank you for choosing D2D Bike Service.</p><br>
  //       <p>D2D Bike Service</p>
  //       <p>Beniganj Rampath, Ayodhya</p>
  //       <p>8587078424</p>`
  // }

//   try {
//     await new Promise((res, rej) => {
//       transporter.sendMail(mailOptions, (err, info) =>{
//         if(err){
//           console.log("err", err);
//           rej(err)
//         }else{
//           res(info)
//         }
//       })
//     })
//   }
//   catch (error) {
//      res.status(500).send({ message: 'Error sending email', error });
//  }
// })
// }
//      transporter.sendMail(mailOptions);
//     res.status(200).send({ message: 'Booked successfully & Email sent.' });
// } catch (error) {
//     res.status(500).send({ message: 'Error sending email', error });
// }

// try {  
//   const message = await twilioClient.messages.create({
//       from: '+15596488497', // Your Twilio WhatsApp number
//       // messagingServiceSid: 'MG7405ab28ab4e00d1fcbb25eb8a970063',
//       to: `+91${userData.contact}`, // Recipient's WhatsApp number
//       body: `Your two wheeler doorstep service for ${userData.vehicleModel} is booked on ${userData.serviceScheduledDate} with D2D Bike Service Our team will contact you once mechanic is assigned for your vehicle. For any Query/Complaint, please contact on 8587078424. Add:Beniganj Rampath, Ayodhya`
//   });
//   return res.status(200).send({ message: 'Booking successful, WhatsApp message sent!', sid: message.sid });
// } catch (error) {
//   console.log(error);
  
//   return res.status(500).send({ message: 'Booking successful, but failed to send WhatsApp message.', error: error.message });
// }
    res.status(201).json({
      message:"Booked successfully",
      booking:{
        ...createdBooking,
        id:createdBooking._id
      }
    })
  })
  .catch(error => {
    res.status(500).json({
      message:'Booking is failed!'
    })
  })
  
}

exports.editBooking = (req, res, next) => {
  const booking = new Booking({
    _id:req.body.id,
    customerName: req.body.customerName,
    vehicleModel: req.body.vehicleModel,
    userEmail: req.body.userEmail,
    address: req.body.address,
    city: req.body.city,
    contact: req.body.contact,
    serviceEnquiryDate:req.body.serviceEnquiryDate,
    serviceScheduledDate:req.body.serviceScheduledDate,
    serviceCompletedDate:req.body.serviceCompletedDate,
    status:req.body.status,
    totalBillAmount:req.body.totalBillAmount,
    totalPaidAmount:req.body.totalPaidAmount,
    isBillPaid:req.body.isBillPaid,
    isNewBooking:req.body.isNewBooking,
    comment:req.body.comment,
    assignedMechanic:req.body.assignedMechanic,
    updatedBy:req.body.updatedBy,
  })
  Booking.updateOne({ _id:req.params.id}, booking).then(result => {
    res.status(200).json({
      message:"Booking updated successfully"
    })
  })
  .catch(error => {
    res.status(500).json({
      message:"Booking Updation failed!"
    })
  })
}

exports.getBookings = (req, res, next) => {
  const {year, month} = req.query;

  if(!year || !month){
    return res.status(400).json({
      message:"Select Year and Month"
    })
  }

  const yearNumber = parseInt(year)
  const monthNumber = parseInt(month) - 1;

  const startDate = new Date(yearNumber, monthNumber, 1)
  const endDate = new Date(yearNumber, monthNumber+1, 1)  

  Booking.find({
    serviceScheduledDate:{$gte:(startDate) , $lt:(endDate)},status:{ $ne: "Service Completed" }}).then(document => {
    res.status(200).json({
      message:"Bookings fetched successfully!",
      bookings:document.reverse()
    })    
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching bookings failed!"
    })
  })
}

exports.getCompletedBookings =  (req, res, next) => {
  const {year, month} = req.query;

  if(!year || !month){
    return res.status(400).json({
      message:"Select Year and Month"
    })
  }

  const yearNumber = parseInt(year)
  const monthNumber = parseInt(month) - 1;

  const startDate = new Date(yearNumber, monthNumber, 1)
  const endDate = new Date(yearNumber, monthNumber+1, 1)
  Booking.find({status:"Service Completed", 
    serviceScheduledDate:{$gte:(startDate) , $lt:(endDate)}}).then(document => {
    res.status(200).json({
      message:"Bookings fetched successfully!",
      bookings:document.reverse()
    })
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching bookings failed!"
    })
  })
}

exports.getTodaysBookings = (req, res, next) => {
  const start = new Date();
  start.setHours(0,0,0,0);
  const end = new Date();
  end.setHours(23,59,59,999);

  Booking.find({serviceScheduledDate:{$gte: start, $lt: end}}).then(document => {
    res.status(200).json({
      message:"Bookings fetched successfully!",
      bookings:document.reverse()
    })
  })
  .catch(error => {
    res.status(500).json({
      message:"Fetching bookings failed!"
    })
  })
}

exports.deleteBooking = (req, res, next) => {
  Booking.deleteOne({_id:req.params.id}).then((result) => {
    res.status(200).json({
      message:"Booking deleted successfully"
    })
  })
  .catch(error => {
    res.status(500).json({
      message:"Deletion failed!"
    })
  })

}



