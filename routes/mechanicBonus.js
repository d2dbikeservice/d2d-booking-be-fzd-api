const express = require('express');
const BonusController = require('../controllers/mechanicBonus');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("",checkAuth, BonusController.createBonus)

router.get("",checkAuth, BonusController.getBonus)
router.get("/:customerId",checkAuth, BonusController.getBonusByCustomerId)


module.exports = router;

