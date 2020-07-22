const mongoose = require('mongoose');

const Product = require('../models/product.model');

var testSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: Product,
    },
    title:String,
    name:{
        type:String
    },
    age:{
        type:Number,
        default:0
    }
})

const test = mongoose.model('test',testSchema,'test');
module.exports= test;