const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
  customerName:{type:String },
  vehicleModel:{type:String },
  userEmail:{type:String },
  address:{type:String},
  city:{type:String},
  contact:{type:String, required:true},
  serviceEnquiryDate:{type:Date},
  serviceScheduledDate:{type:Date},
  serviceCompletedDate:{type:Date},
  status:{type:String},
  totalBillAmount:{type:Number},
  totalPaidAmount:{type:Number},
  isBillPaid:{type:String},
  isNewBooking:{type:Boolean},
  comment:{type:String},
  assignedMechanic:{type:String},
  updatedBy:{type:String},
})

// bookings/ayodhya/2024/august

module.exports = mongoose.model('Booking', bookingSchema)
