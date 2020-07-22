const md5 = require('md5');
const express = require('express');
const Account = require("../models/account.model");

module.exports.postRegister= async function(req,res,next){
    let err = [];
    let username = req.body.Username;
    let account = await Account.find({userName:username});
    if(account.length > 0){
        err.push("Username đã tồn tại");
        res.render('account/register',{error:err,value:req.body});
        return;
    }
    next();
}

module.exports.postLogin = async function(req,res,next){
    let err = "";
    let username = req.body.Username;
    let pass = req.body.Password;
    let newPass = md5(pass);
    let account = await Account.find({userName:username,password:newPass});
    if(account.length === 0){
        err="Tài khoản không tồn tại";
        res.render('account/login',{error:err,value:req.body});
        return;
    }
    res.cookie('username',account[0]._id,{
        signed:true
    });
    next();
}