var express = require('express')
    router = express.Router(),
    db = require('../models/userDB.js');

router.get('/',
	function(req, res) {
  		res.redirect('/index');
	}
);

router.get('/index',
	function(req, res) {
		if (!req.session.userID){
    		req.session.userID = null;
    		req.session.username = null;
    	}	
		res.render('index', {
			username: req.session.username,
			userID: req.session.userID
		});
	}
);

module.exports = router;
