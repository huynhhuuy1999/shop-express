const shortId = require("shortid");

module.exports.session = function(req,res,next){
    if(!req.signedCookies.sessionid){
        let shortid = shortId.generate();
        res.cookie('sessionid', shortid, {
            signed: true,
          });
    }
    next();
}