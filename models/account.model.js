var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName : String,
    password: String,
    typeAccount: Number,
    info:{
        fullName:String,
        address:String,
        phone:Number,
        email:String,
        birth:Date
    }
});
var account= mongoose.model('account',accountSchema,'account');
module.exports= account;