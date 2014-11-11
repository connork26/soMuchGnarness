// local
//var databaseUrl = 'motrgram';

// server
var databaseUrl = "mongodb://heroku_app28817289:5uelqhb4329sn0vv47j2jdolsu@ds063899.mongolab.com:63899/heroku_app28817289";
var collections = ["users", "posts", "vehicles"];
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
			} else { 
				db.posts.find({tags: { $in: userResult.intrests } }, 
					function (err2, postResults) {
						if (err2){
							console.log(err2);
							return
						}
						callback(false, postResults, userResult.intrests);
					}
			);
			}
		}
	);
}

exports.newUserPost = function (newPost, callback) {
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

exports.addUserInterest = function (userId, intrest, callback){
	db.users.update({_id: userId}, {$push: {intrests: intrest}}, 
		function (err, result){
			if(err){
				console.log(err);
				return;
			}
			callback(false);
		}
	);
}

exports.saveCar = function (userId, make, model, year, color, mods, description, vinID, callback){
	db.vehicles.save({
		type: 'auto',
		ownerID: userId,
		make: make,
		model: model,
		year: year,
		color: color,
		mods: mods,
		description: description
	},
		function (err, result){
			if(err){
				console.log(err);
				return;
			}
			callback(false);
		}
	);
}

exports.getVehiclesForUser = function (userID, callback){
	db.vehicles.find({ownerID: userID},
		function(err, result){
			if(err){
				console.log(err);
				return;
			}
			callback(false, result);
		}
	);
}

exports.getPostsByUser = function (userID, callback){
	db.posts.find({userID: userID},
		function (err, result){
			if (err){
				console.log(err);
				callback(true);
			} else {
				callback(false, result);
			}
		}
	);
}