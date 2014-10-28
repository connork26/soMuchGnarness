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
				res.send(data);
			}
		);
	}	
);


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


router.get('/addVehicles',
	function (req, res){
		res.render('addVehicles', {username: req.session.username, userID: req.session.userID});
	}
);
router.post('/addCar',
	function (req, res){
		mongoDB.addCar(req.session.userID, req.body.make, req.body.model, req.body.year,
		req.body.color, req.body.mods, req.body.description,
			function(err, result) {
				res.send('true');
			});

	}
);

module.exports = router;
