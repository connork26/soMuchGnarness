var express = require('express')
    router = express.Router(),
    userDB = require('../models/userDB.js'),
    mongoDB = require('../models/mongoDB.js');

router.post('/login',
	function(req, res){
		db.checkForUser(req.body.email, req.body.password, 
			function (err, result){
				console.log('hit login');
				if (!result) {
					console.log('invalid user');
					res.send(false);
				}
				else {
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

router.get('/signUp',
	function(req, res){
		res.render('signUp', {username: req.session.username});
	}
);

router.post('/newUser',
	function(req, res){
		userDB.createUser(req.body.email, req.body.username, req.body.password, req.body.zipcode, req.body.birthYear,
			function (err, addingResult){
				if(err){

				} else {
					userDB.checkForUser(req.body.email, req.body.password,
						function (err, checkResult){
							mongoDB.insertUser(checkResult.userID, checkResult.username, 
								function (err, mongoResult) {
									req.session.userID = checkResult.userID;
									req.session.username = checkResult.username;
									res.send(true);
								}
							);
						}
					);
				}
			}
		);
	}
);

router.post('/addIntrest',
	function (req, res){
		mongoDB.addUserIntrest(req.session.userID, req.body.intrest,
			function (err, result){
				if(err){
					return false;
				}
				return true;
			}
		);
	}
);

router.get('/account',
	function (req, res){
		mongoDB.getVehiclesForUser(req.session.userID,
			function(err, vehicles){
				mongoDB.getPostsByUser(req.session.userID,
					function(err2, posts){
						res.render('account', {username: req.session.username, vehicles: vehicles, posts: posts});
					}
				);
			}
		);
	}
);

router.get('/addVehicle',
	function (req, res){
		res.render('addVehicles', {username: req.session.username});
	}
);

module.exports = router;
