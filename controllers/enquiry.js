const Enquiry = require('../models/enquiry')

exports.createEnquiry = (req, res, next) => {
  const enquiry = new Enquiry({
      contact: req.body.contact,
      status: req.body.status,
      date:req.body.date,
      comments:req.body.comments,
      addedBy: req.body.addedBy,
      updatedBy: req.body.updatedBy,
  })  
  enquiry.save().then( async createdEnquiry => {
    res.status(201).json({
      message:"Enquiry Added successfully",
      enquiry:{
        ...createdEnquiry,
        id:createdEnquiry._id
      }
    })
  }).catch(error => {
    res.status(500).json({
      message:'Enquiry is failed!'
    })
  })
}


exports.getEnquiry = (req, res, next) => {
    // const {year, month} = req.query;
  
    // if(!year || !month){
    //   return res.status(400).json({
    //     message:"Select Year and Month"
    //   })
    // }
  
    // const yearNumber = parseInt(year)
    // const monthNumber = parseInt(month) - 1;
  
    // const startDate = new Date(yearNumber, monthNumber, 1)
    // const endDate = new Date(yearNumber, monthNumber+1, 1)  
  
    Enquiry.find().then(document => {
      res.status(200).json({
        message:"Enquiry fetched successfully!",
        expense:document.reverse()
      })    
    })
    .catch(error => {
      res.status(500).json({
        message:"Fetching Enquiry failed!"
      })
    })
  }

exports.editEnquiryStatus = (req, res, next) => {
const enquiry = new Enquiry({
    _id:req.params.id,
    contact: req.body.contact,
    status: req.body.status,
    date:req.body.date,
    comments:req.body.comments,
    updatedBy: req.body.updatedBy,
})

Enquiry.updateOne({ _id:req.params.id}, enquiry).then(result => {
    res.status(200).json({
    message:"Enquiry Updated successfully"
    })
})
.catch(error => {
    res.status(500).json({
    message:"Status Changed failed!"
    })
})
}

exports.deleteEnquiry = (req, res, next) => {
  Enquiry.deleteOne({_id:req.params.id}).then((result) => {
    res.status(200).json({
      message:"Enquiry deleted successfully"
    })
  })
  .catch(error => {
    res.status(500).json({
      message:"Deletion failed!"
    })
  })

}