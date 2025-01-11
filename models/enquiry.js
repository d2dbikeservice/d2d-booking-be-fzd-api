const mongoose = require('mongoose');

const enquirySchema = mongoose.Schema({
  contact:{type:Number, required:true,unique:true},
  date:{type:String, required:true },
  status:{type:String, required:true},
  comments:{type:String},
  addedBy:{type:String, required:true },
  updatedBy:{type:String },
})


module.exports = mongoose.model('Enquiry', enquirySchema)
