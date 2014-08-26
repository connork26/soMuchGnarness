var databaseUrl = "mongodb://heroku_app28817289:5uelqhb4329sn0vv47j2jdolsu@ds063899.mongolab.com:63899/heroku_app28817289";
var collections = ["users", "posts"];
var db = require("mongojs").connect(databaseUrl, collections);

exports.insertUser = function (userID, username, callback) {
	db.users.save({_id: userID, username: username, vehicals: [], intrests: []}, 
		function (err, result){
			if(err){
				console.log(err);
			} else {
				callback(false);
			}
		}
	);	
}

exports.getPostsWithUserID = function (userID, callback) {
	db.users.findOne(userID, 
		function (err, userResult){
			if (err) {
				console.log(err);
				return;
			}
			db.posts.find({modTags: { $in: userResult.intrests } }, 
				function (err2, postResults) {
					if (err2){
						console.log(err2);
						return
					}
					callback(false, postResults);
				}
			);
		}
	);
}