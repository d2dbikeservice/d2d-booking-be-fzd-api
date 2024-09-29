const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  description:{type:String, required:true},
  amount:{type:Number, required:true },
  updatedBy:{type:String, required:true },
  date:{type:Date, required:true },

})


module.exports = mongoose.model('Expense', expenseSchema)
