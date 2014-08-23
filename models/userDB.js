/* var mysql = require('mysql');

// Application initialization

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
});

// Database setup

connection.query('USE MotrGram', function (err) {
    if (err) throw err;
});
*/

var connection = require ('pg');

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    console.log('DB connected');
});


exports.checkForUser = function (email, password, callback){
	var query = 'SELECT email, username, userID FROM Users WHERE email = "' + email + '" AND password = "' + password + '";';
	console.log(query);
	connection.query(query, 
		function (err, result) {
			if (err) {
            	console.log(err);
            	callback(true);
            	return;
            }
            if (result.length > 0){
            	console.log('got a user');
            	callback(false, result[0]);
            } else {
            	return null;
            }
		}
	);
}
