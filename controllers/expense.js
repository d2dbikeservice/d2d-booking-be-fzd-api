const Expense = require('../models/expense')

exports.createExpense = (req, res, next) => {
  const expense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    updatedBy: req.body.updatedBy,
    date:req.body.date
  })  
  expense.save().then( async createdExpense => {
    res.status(201).json({
      message:"Expense Added successfully",
      booking:{
        ...createdExpense,
        id:createdExpense._id
      }
    })
  }).catch(error => {
    res.status(500).json({
      message:'Expense is failed!'
    })
  })
}


exports.getExpenses = (req, res, next) => {
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
  
    Expense.find({
      date:{$gte:(startDate) , $lt:(endDate)}}).then(document => {
      res.status(200).json({
        message:"Expenses fetched successfully!",
        expense:document.reverse()
      })    
    })
    .catch(error => {
      res.status(500).json({
        message:"Fetching Expenses failed!"
      })
    })
  }

  exports.editExpense = (req, res, next) => {
    const expense = new Expense({
      _id:req.params.id,
      description: req.body.description,
      amount: req.body.amount,
      updatedBy: req.body.updatedBy,
      date:req.body.date
    })
    console.log(req.body);
    
    Expense.updateOne({ _id:req.params.id}, expense).then(result => {
      res.status(200).json({
        message:"Expense updated successfully"
      })
    })
    .catch(error => {
      res.status(500).json({
        message:"Expense Updation failed!"
      })
    })
  }

  exports.deleteExpense = (req, res, next) => {
    Expense.deleteOne({_id:req.params.id}).then((result) => {
      res.status(200).json({
        message:"Expense deleted successfully"
      })
    })
    .catch(error => {
        console.log(error);
        
      res.status(500).json({
        message:error
      })
    })
  
  }