const express = require('express');
const mysql = require('mysql');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connection  = require('express-myconnection'); 
var jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 5000;

// Declaer middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var auth = require('./routes/authentication');
app.use('/api/auth', auth);

app.listen(port, () => console.log(`Listening on port ${port}`));