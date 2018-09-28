
/**
 * This authentication controller aims to authenticate user.
 * Created by Jordan
 * 9.28 2018
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../config/database');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file
var common = require('../config/common');


exports.login =  function(req, res) {
    console.log('request body = ', req.body);
    var param = req.body;
    var bad_result = {
    }
    var sql = "SELECT * FROM users WHERE username = '" + param.username + "' OR email = '" + param.username + "'";
    db.query(sql, function(err, result) {
        if(err) {
            var message = "Sorry! Error occurred in Database.";
            console.log(message);
            common.sendFullResponse(res, 300,bad_result, message);
            return; 
        } else if (result.length == 0) {
            var message = "Sorry! User doesn't exist.";
            console.log(message);
            common.sendFullResponse(res, 300, bad_result, message);
            return;
        } else {
            var user = result[0];
            if(bcrypt.compareSync(param.password, user.password)) {
                // Passwords match
                var token = jwt.sign({ id: user.email }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                // update token action
                var sql = "UPDATE users SET token = '" + token + "' WHERE userId = '" + user.userId + "'";
                db.query(sql, function(err, result) {
                    if(err) {
                        var message = "Sorry! Error occurred in Database.";
                        console.log(message);
                        common.sendFullResponse(res, 300,bad_result, message);
                        return; 
                    } else {
                        var good_result = user;
                        var message = "Login Success.";
                        console.log(message);
                        common.sendFullResponse(res, 200, good_result, message)
                    }
                });
            } else {
                // Passwords don't match
                var message = "Sorry! Password is not correct.";
                console.log(message);
                common.sendFullResponse(res, 300,bad_result, message);
                return; 
            }
        }
    });
};
 
exports.logout =  function(req, res) {
    var good_result = user;
    var message = "Logout Success.";
    console.log(message);
    common.sendFullResponse(res, 200, good_result, message)
}; 

exports.register = function(req, res) {
  console.log('request body = ', req.body);
  var bad_result = {
  }
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  var currentDate = new Date();
  var user = {
      "email" : req.body.email,
      "username" : req.body.username,
      "password" : hashedPassword,
      "created_at" : currentDate,
      "modified_at" : currentDate
  }
  console.log('user = ', user);
  db.query('INSERT INTO users SET ?', user, function(error, result) {
    if(error) {
        var message = "Sorry! Error occurred in Database.";
        console.log(message);
        common.sendFullResponse(res, 300,bad_result, message);
        return;
    } else {
        var createdRowId = result.insertId;
        // create token and update db
        var token = jwt.sign({ id: user.email }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        var sql = "UPDATE users SET token = '" + token + "' WHERE userId = '" + createdRowId + "'";
        db.query(sql, function(err, result) {
            if(error) {
                var message = "Sorry! Error occurred in Database.";
                console.log(message);
                common.sendFullResponse(res, 300,bad_result, message);
                return;
            } else{
                // update token success
                // return new created object
                var sql = "SELECT * FROM users WHERE userId = '" + createdRowId + "'";
                db.query(sql, function(err, result) {
                    if(error) {
                        var message = "Sorry! Error occurred in Database.";
                        console.log(message);
                        common.sendFullResponse(res, 300,bad_result, message);
                        return;
                    } else {
                        console.log(' result = ', result);
                        var good_result  = result;
                        var message = "User register successfully.";
                        console.log(message);
                        common.sendFullResponse(res, 200, good_result, message)
                    }
                })
            }
        }); 
    }
  }); 

};

