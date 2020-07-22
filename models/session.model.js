const mongoose = require("mongoose");
const Product = require("../models/product.model");

var sessionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  products: [
    {
      id: String,
      name: String,
      price: Number,
      typeProduct: String,
      size:
        {
          name: String,
          priceBonus: String,
        },
      sale: {
        hasSale: Boolean,
        name: String,
        percentSale: Number,
        priceSale: Number,
      },
      hot: Boolean,
      time: Date,
      image: String,
      description: String,
      amount: Number,
      sum: {
        type: Number,
        default: 0,
      },
    },
  ],
});

var session = mongoose.model("session", sessionSchema, "session");
module.exports = session;
