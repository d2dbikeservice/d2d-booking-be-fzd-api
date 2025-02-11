const Bonus = require('../models/mechanicBonus');

exports.createBonus = async (req, res, next) => {
  try {
    // Convert the date to "YYYY-MM-DD" format to remove time
    const formattedDate = new Date(req.body.date).toISOString().split("T")[0];

    // Check if a bonus already exists for the same vehicleNumber and date
    const existingBonus = await Bonus.findOne({
      vehicleNumber: req.body.vehicleNumber,
      date: formattedDate
    });

    if (existingBonus) {
      return res.status(400).json({
        message: "Bonus Not Added! Vehicle Number already exists for this date."
      });
    }

    // Create a new bonus entry
    const bonus = new Bonus({
      vehicleModel: req.body.vehicleModel,
      vehicleNumber: req.body.vehicleNumber,
      date: formattedDate, // Save date without time
      mechanicName: req.body.mechanicName,
      amount: req.body.amount,
      addedBy: req.body.addedBy,
      updatedBy: req.body.updatedBy,
      customerId: req.body.customerId,
    });

    const createdBonus = await bonus.save();

    res.status(201).json({
      message: "Bonus Added successfully",
      bonus: {
        ...createdBonus._doc,
        id: createdBonus._id
      }
    });

  } catch (error) {
    console.error("Error adding bonus:", error);
    res.status(500).json({
      message: "Bonus Not Added!",
      error: error.message
    });
  }
};

// exports.getBonus = (req, res, next) => {
//     const {year, month} = req.query;
  
//     if(!year || !month){
//       return res.status(400).json({
//         message:"Select Year and Month"
//       })
//     }
  
//     const yearNumber = parseInt(year)
//     const monthNumber = parseInt(month) - 1;
  
//     const startDate = new Date(yearNumber, monthNumber, 1)
//     const endDate = new Date(yearNumber, monthNumber+1, 1)  
  
//     Bonus.find({ date:{$gte:(startDate) , $lt:(endDate)}}).then(document => {
//       res.status(200).json({
//         message:"All Bonus fetched successfully!",
//         Bonus:document.reverse()
//       })    
//     })
//     .catch(error => {
//       res.status(500).json({
//         message:"Fetching Bonus failed!"
//       })
//     })
//   }


exports.getBonus = async (req, res, next) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: "Select Year and Month" });
    }

    const yearNumber = parseInt(year);
    const monthNumber = parseInt(month);

    // Convert to "YYYY-MM" format for filtering
    const monthString = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    const startDateString = `${yearNumber}-${monthString}-01`;
    const endDateString = `${yearNumber}-${monthString}-31`; // Covers the whole month

    // Query by date strings (not Date objects)
    const bonuses = await Bonus.find({
      date: { $gte: startDateString, $lte: endDateString }
    }).sort({ date: -1 }); // Sort by latest date first

    res.status(200).json({
      message: "All Bonus fetched successfully!",
      bonus: bonuses
    });

  } catch (error) {
    console.error("Error fetching bonus:", error);
    res.status(500).json({ message: "Fetching Bonus failed!" });
  }
};

exports.getBonusByCustomerId = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    // Find all bonus entries for the given customer ID
    const bonus = await Bonus.findOne({ customerId }).sort({ date: -1 });

    if (!bonus || bonus.length === 0) {
      return res.status(404).json({ message: "No bonuses found for this customer" });
    }

    res.status(200).json({
      message: "Bonuses fetched successfully!",
      bonus: bonus
    });

  } catch (error) {
    console.error("Error fetching bonus by customer ID:", error);
    res.status(500).json({ message: "Fetching Bonus failed!" });
  }
};


