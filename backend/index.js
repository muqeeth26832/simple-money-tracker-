const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Transaction = require("./models/Transaction");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("test ok check");
});

app.post("/api/transaction", async (req, res) => {
  // console.log(process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL);

  const { price, name, description, datetime } = req.body;
  console.log(req.body);

  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime,
  });

  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(4000);
console.log("listening at 4000");
