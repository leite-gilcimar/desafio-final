const express = require("express");
const transactionRouter = express.Router();
const transaction = require("../services/transactionService.js");

transactionRouter.post("/", async (req, res) => {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;
  const data = await transaction.create(
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  );
  res.send(data);
});

transactionRouter.get("/", async (req, res) => {
  let period = req.query.period;
  const data = await transaction.findAll(period);
  let transactionsLength = data.reduce((accumulator, currentItem) => {
    return accumulator + 1;
  }, 0);

  const transactions = {
    length: transactionsLength,
    transactions: data,
  };
  res.send(transactions);
});

transactionRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  const data = await transaction.findOne(id);
  res.send(data);
});

transactionRouter.put("/:id", async (req, res) => {
  if (req.body) {
    const id = req.params.id;
    const data = await transaction.update(id, req.body);
    res.send(data);
  }
});

transactionRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const data = await transaction.remove(id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = transactionRouter;
