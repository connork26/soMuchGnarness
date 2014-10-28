var express 	= require('express')
    router 		= express.Router(),
    db 			= require('../models/userDB.js'),
    aws         = require('aws-sdk');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

router.get('/',
	function(req, res) {
  		res.redirect('/index');
	}
);

router.get('/index',
	function(req, res) {
		if (!req.session.username){
    		req.session.userID = null;
    		req.session.username = null;
    	}	
		res.render('index', {
			username: req.session.username,
			userID: req.session.userID
		});
	}
);

router.get('/sign_s3', function(req, res){
	console.log('looking to sign photo');
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.s3_object_name,
        Expires: 60,
        ContentType: req.query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

module.exports = router;
