const mongoose = require('mongoose');
const md5 = require('md5');
const Account = require('../models/account.model');

module.exports.login = function(req,res){
    res.render('account/login');
}
module.exports.postLogin = function(req,res){
    res.redirect('/home');
}
module.exports.register= function(req,res){
    res.render('account/register');
}
module.exports.postRegister = function(req,res){
    let username = req.body.Username;
    let password = req.body.Password;
    let birth = req.body.NgaySinh;
    let phone = req.body.Sdt;
    let email = req.body.Email;
    let name = req.body.HoTen;
    // resolve password 
    let newPass = md5(password);
    let id = new mongoose.mongo.ObjectId();
    var account = new Account({
        _id: id, 
        userName:username,
        password:newPass,
        typeAccount:2,
        info:{
            fullName:name,
            phone:phone,
            email:email,
            birth:birth
        }
    });
    account.save(function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect('/account/register');
}