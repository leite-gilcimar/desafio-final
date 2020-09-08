const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

async function create(
  description,
  value,
  category,
  year,
  month,
  day,
  yearMonth,
  yearMonthDay,
  type
) {
  const transaction = new TransactionModel({
    description: description,
    value: value,
    category: category,
    year: year,
    month: month,
    day: day,
    yearMonth: yearMonth,
    yearMonthDay: yearMonthDay,
    type: type,
  });

  try {
    const data = await transaction.save();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function findAll(period) {
  //console.log("findAll Connection Status :" + mongoose.connection.readyState);
  let data = {};

  console.log("Period: " + period);
  //condicao para o filtro no findAll
  let condition = period
    ? { yearMonth: { $regex: new RegExp(period), $options: "i" } }
    : {};

  try {
    const data = await TransactionModel.find(condition);
    return data;
  } catch (error) {
    console.log(error);
  }
  return data;
}

async function findOne(id) {
  try {
    const data = await TransactionModel.findById({ _id: id });
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function remove(id) {
  try {
    const data = await TransactionModel.findByIdAndRemove({ _id: id });
    return { message: "transaction removido com sucesso." };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { create, findAll, findOne, remove };
