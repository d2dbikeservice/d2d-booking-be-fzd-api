const express = require('express');
const ExpenseController = require('../controllers/expense')
const router = express.Router();

router.post("", ExpenseController.createExpense)

router.get("", ExpenseController.getExpenses)

// router.put("/:id", UserController.userLogin)

// router.delete("/:id", UserController.userLogin)

module.exports = router

