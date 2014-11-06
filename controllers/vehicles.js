var express = require('express')
    router = express.Router(),
    db = require('../models/userDB.js'),
    mongoDB = require('../models/mongoDB.js'),
    http = require('http');

var edmundsAPIKey = "vbw9x466kcx29mzt3pz4e5z7";

router.route('/getVehicleDetailsFromVin').get(
	function (req, res){
		getVehicleDetailsFromEdmunds(req.query.vin,
			function(data){
				var response = {
					make: data.make.name,
					model: data.model.name,
					year: data.years[0].year
				}
				res.send(response);
			}
		);
	}	
);





router.get('/addVehicles',
	function (req, res){
		res.render('addVehicles', {username: req.session.username, userID: req.session.userID});
	}
);

router.post('/addVehicle',
	function (req, res) {
		if (req.body.vin = ""){
			saveCarInfo(req.body, req.session.userID, null);
		} else {
			saveCarVin(req.body.vin, req.session.userID,
				function (vinID){
					saveCarInfo(req.body, req.session.userID, vinID);
					res.send(true);
				}
			);
		}
	}
);

router.get('/getUserVehicles',
	function (req, res){
		mongoDB.getVehiclesForUser(req.session.userID,
			function (err, result){
				res.send(JSON.stringify(result));
			}
		);
	}
);

function saveCarVin (vin, userID, callback){
	callback(1);
}

function saveCarInfo(info, userID, vinID){
	mongoDB.saveCar(userID, info.make, info.model, info.year, info.color, info.mods, info.description, vinID,
		function (err,result){
			return true;
		}
	);
};

function getVehicleDetailsFromEdmunds (vin, callback){
	var options = {
		host : 'api.edmunds.com',
		port : 80,
		path : '/api/vehicle/v2/vins/' + vin + '?api_key=' + edmundsAPIKey
	}
	var data = '';
	http.get(options,
		function (res){
			res.on('data', function (response){
				data += response;
			});
			res.on('end', function(){
				callback(JSON.parse(data));
			})
		}
	);
}
module.exports = router;
