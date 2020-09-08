const express = require("express");
const transactionRouter = express.Router();
const transaction = require("../services/transactionService.js");

transactionRouter.get("/", async (req, res) => {
  res.send("OKKKK ");
});

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

transactionRouter.get("/:period", async (req, res) => {
  let period = req.params.period;
  const data = await transaction.findAll(period);
  res.send(data);
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
