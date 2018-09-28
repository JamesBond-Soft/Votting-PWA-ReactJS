var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var common = require('../config/common');
var db  = require('../config/database');
function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers.token;
  var bad_result = {}
  if (!token) {
     var message = "No Token Provided";
     console.log(message);
     common.sendFullResponse(res, 300, bad_result, message);
     return;
  }
   // return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
    {
        //return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
        var message = "Failed to authenticate token.";
        console.log(message);
        common.sendFullResponse(res, 300, bad_result, message);
    }
    else {
      var sql = "SELECT * FROM users WHERE token = '" + token + "'";
      db.query(sql, function(err, result) {
          if(err) {
            var message = "Sorry! Error occurred in Database.";
            console.log(message);
            common.sendFullResponse(res, 300, bad_result, message);
          } else if(result.length == 0){
            var message = "Your token expired, Please login again.";
            console.log(message);
            common.sendFullResponse(res, 300, bad_result, message);
            return;
          } else {
            next();
          }
      });
    }
    // if everything is good, save to request for use in other routes
    //req.userId = decoded.id;
  });

}

module.exports = verifyToken;