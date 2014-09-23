var express = require('express')
    router = express.Router(),
    db = require('../models/userDB.js'),
    mongoDB = require('../models/mongoDB.js');

 router.route('/').get(
 	function (req, res) {
 		if (req.session.userID) {
	 		mongoDB.getPostsWithUserID(req.session.userID, 
	 			function (err, result, userInterests){
	 				if(!userInterests){
	 					userInterests = ['All'];
	 				}
	 				res.render('feed', {	
							username: req.session.username, 
							posts: result, 
							userInterests: userInterests
						}
	 				);
	 			}
 			);
	 	} else {
	 		res.redirect('/users/signUp');
	 	}
 	}
);
module.exports = router;
