var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    price:Number,
    typeProduct:String,
    size:[{
        name:String,
        priceBonus:String
    }],
    sale:{
        hasSale:Boolean,
        name:String,
        percentSale:Number,
        priceSale:Number
    },
    hot:Boolean,
    time:Date,
    image:String,
    description:String
});

var product = mongoose.model("product",productSchema,"product");
module.exports= product;