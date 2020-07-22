var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:String
});

var category = mongoose.model("typeProduct",categorySchema,"typeProduct");
module.exports= category;