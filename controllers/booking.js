const Booking = require('../models/booking')

exports.createBooking = (req, res, next) => {
  const booking = new Booking({
    customerName: req.body.customerName,
    vehicleModel: req.body.vehicleModel,
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
  booking.save().then(createdBooking => {
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
    serviceScheduledDate:{$gte:(startDate) , $lt:(endDate)}}).then(document => {
    res.status(200).json({
      message:"Bookings fetched successfully!",
      bookings:document.reverse()
    })
    console.log(document);
    
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
    console.log('result', result);
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

