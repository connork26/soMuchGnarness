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

router.post('/login',
	function(req, res){
		db.checkForUser(req.body.email, req.body.password, 
			function (err, result){
				//console.log(message);
				console.log('hit login');
				if (!result) {
					console.log('invalid user');
					res.send(false);
				}
				else {
					console.log('successful login');
					console.log(result.userID);
					console.log(result.username);

					req.session.userID = result.userID;
					req.session.username = result.username;
					res.send(true);
				}
			}
		);
	}
);

router.get('/logout',
	function (req, res) {
		console.log('hit logout');
		req.session.userID = null;
		req.session.username = null;
		res.render('index', {username: req.session.username});
	}
);


module.exports = router;
