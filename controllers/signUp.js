var express = require('express')
    router = express.Router(),
    db = require('../models/userDB.js');

router.get('/',
	function(req, res){
		res.render('signUp', {username: req.session.username});
	}
);

router.post('/addUser', 
	function (req, res){
		db.addUser(email, username, password)
	}
);
module.exports = router;
