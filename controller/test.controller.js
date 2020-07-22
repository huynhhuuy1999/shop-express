const mongoose = require("mongoose");
const Test = require('../models/test.model');
const { options } = require("../routes/home.route");

module.exports.test = async function (req, res) {
  var test = await Test.findOne({}).populate('product');
//   exec(function (err, test) {
//     if (err) return handleError(err);
//     console.log('get: ', test.product.price);
//   });
  console.log(test);
  res.send(test.product);
};

module.exports.createTest = async function(req,res){
  var test = await Test.create(req.body);
  res.json(test);
}

module.exports.getListTest = async function(req,res){
  let test = await Test.find({});
  res.json(test);
}

module.exports.deleteTest = async function(req,res){
  await Test.deleteOne({name:"huuhuu"});
  res.json({ok:"ok"});
}

module.exports.updateTest = async function(req,res){
  await Test.findOneAndUpdate({name:"huuhuu"},{age:30},options.new=false,function(err,doc){
  });
  res.json({update:"updated"});
}