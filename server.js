const express = require('express');
const mysql = require('mysql');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Declaer middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// connection MySQL Server
app.use(
  connection(mysql,{
    host: 'localhost',
    user: 'root', // your mysql user
    password : '123456', // your mysql password
    port : 3306, //port mysql
    database:'votingDB' // your database name
  },'pool') //or single
);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));