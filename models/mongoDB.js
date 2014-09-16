// local
var databaseUrl = 'motrgram';

// server
//var databaseUrl = "mongodb://heroku_app28817289:5uelqhb4329sn0vv47j2jdolsu@ds063899.mongolab.com:63899/heroku_app28817289";
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
			if (userResult.intrests.length == 0){
				db.posts.find( 
					function (err2, postResults) {
						if (err2){
							console.log(err2);
							return
						}
						callback(false, postResults);
					}
				);
			} else{ 
				db.posts.find({tags: { $in: userResult.intrests } }, 
					function (err2, postResults) {
						if (err2){
							console.log(err2);
							return
						}
						callback(false, postResults);
					}
			);
			}
		}
	);
}

exports.newUserPost = function (newPost, callback) {
	console.log('on db');
	db.posts.save({
			type: 'user', 
			vehical: {
				make: newPost.make,
				model: newPost.model,
				year: newPost.year,
			},
			tags: newPost.tags,
			modTags: newPost.modTags,
			vinID: null,
			content: {
				title: newPost.postTitle, 
				body: newPost.body,
				image: newPost.imageURl,
			},
			userID: newPost.userID,
			comments: [],
			likes: []
		},
		function (err, result){
			if(err){
				console.log(err);
				return
			}
			callback(false);
		}
	);
}