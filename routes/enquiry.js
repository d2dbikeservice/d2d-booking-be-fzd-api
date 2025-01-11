const express = require('express');
const EnquiryController = require('../controllers/enquiry');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("",checkAuth, EnquiryController.createEnquiry)

router.get("", checkAuth,EnquiryController.getEnquiry)

router.put("/:id", checkAuth,EnquiryController.editEnquiryStatus)

router.delete("/:id", checkAuth, EnquiryController.deleteEnquiry)

module.exports = router;

