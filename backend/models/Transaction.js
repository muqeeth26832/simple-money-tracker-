const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  description: { type: String, required: false },
  datetime: { type: Date, required: true },
});

const TransactionModel = model("Transaction", transactionSchema);

module.exports = TransactionModel;
