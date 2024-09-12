const express = require('express');

const router = express.Router();
const BookingController = require('../controllers/booking')
const checkAuth = require('../middleware/check-auth')


router.post("",checkAuth,BookingController.createBooking)

router.put("/:id",checkAuth,BookingController.editBooking)

// router.put("/:id", checkAuth,(req, res, next) => {
//   const booking = new Booking({
//     _id:req.body.id,
//     isNewBooking:req.body.isNewBooking,
//   })
//   Booking.updateOne({ _id:req.params.id}, booking).then(result => {
//     res.status(200).json({
//       message:"Marked old successfully"
//     })
//   })
//   .catch(error => {
//     res.status(500).json({
//       message:"Booking Updation failed!"
//     })
//   })
// })

router.get("", checkAuth,  BookingController.getBookings)
router.get("/completedService", checkAuth, BookingController.getCompletedBookings )
router.get("/todaysService", checkAuth,  BookingController.getTodaysBookings)

router.delete("/:id", checkAuth, BookingController.deleteBooking)


module.exports = router;
