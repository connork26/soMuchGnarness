var express = require('express')
    router = express.Router(),
    db = require('../models/userDB.js');

 router.route('/').get(
 	function (req, res) {
 		res.render('feed', {username: req.session.username});
 	}
);
module.exports = router;
