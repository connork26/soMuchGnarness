var express = require('express')
    router = express.Router(),
    db = require('../models/userDB.js'),
    mongoDB = require('../models/mongoDB.js');

router.get('/newPost',
	function (req, res){
		res.render('newPost', {username: req.session.username, userID: req.session.userID});
	}
);

router.post('/newPost',
	function (req, res){
		console.log('hit server');
		var newPost = req.body;
		newPost.userID = req.session.userID;
		newPost.modTags = newPost.modTags.split(',');
		newPost.tags = [newPost.make, newPost.type, 
			(newPost.make + ' ' + newPost.model + ' ' + newPost.year)
		];

		mongoDB.newUserPost(newPost, 
			function (err, result){
				console.log('new post posted');
				res.send(true);
			}
		);
	}
);


module.exports = router;
