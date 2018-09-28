var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var db = require('../config/database')
var authenticationCtrl = require('../controllers/authentication');
var verifyToken = require('../middlewares/verifyToken');

//router.get('/logout', authenticationCtrl.logout);
router.post('/register', authenticationCtrl.register);
router.post('/login', authenticationCtrl.login);
router.get('/logout', verifyToken, authenticationCtrl.logout);

module.exports = router;