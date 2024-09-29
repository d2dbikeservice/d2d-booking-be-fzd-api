const express = require('express');
const ExpenseController = require('../controllers/expense')
const router = express.Router();

router.post("", ExpenseController.createExpense)

router.get("", ExpenseController.getExpenses)

router.put("/:id",ExpenseController.editExpense)

router.delete("/:id", ExpenseController.deleteExpense)

module.exports = router

