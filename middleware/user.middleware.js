const Account = require('../models/account.model');

module.exports.getUsername = async function(req,res,next){
    if(req.signedCookies.username){
        
        let uid = req.signedCookies.username;
        let account = await Account.find({_id:uid});console.log(account[0].userName);
        res.locals.username = account[0];
    }
    next();
}