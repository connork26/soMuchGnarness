var express = require('express')
router = express.Router(),
    db = require('../models/userDB.js'),
    mongoDB = require('../models/mongoDB.js');

exports.isLoggedIn = function (userID, next){
    if (userID){
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = router;
