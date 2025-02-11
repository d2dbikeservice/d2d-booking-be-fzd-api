const mongoose = require('mongoose');

const bonusSchema = mongoose.Schema({
  vehicleModel:{type:String, required:true},
  vehicleNumber:{type:String, required:true},
  date:{type:String, required:true},
  mechanicName:{type:String, required:true},
  amount:{type:Number,required:true},
  addedBy:{type:String, required:true },
  updatedBy:{type:String, required:true },
  customerId:{type:String, required:true },
})

// Create a compound unique index on vehicleNumber and date
bonusSchema.index({ vehicleNumber: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Bonus', bonusSchema)


