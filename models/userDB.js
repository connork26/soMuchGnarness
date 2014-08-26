var mysql = require('mysql');

/*
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

var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b7e5e75776c034',
    password : '83551f85',
    database : 'heroku_ea0abd6d490b9c8'    
});

exports.checkForUser = function (email, password, callback) {
    var query = 'SELECT email, username, userID FROM Users WHERE email = "' + email + '" AND password = "' + password + '";';
    console.log(query);
    connection.query(query, 
        function (err, result) {
            if (err) {
                console.log(err);
                return null;
            }
            if (result.length > 0){
                console.log('got a user');
                callback(false, result[0]);
            } else {
                return null;
            }
        }
    );
};

exports.createUser = function (email, username, password, zip, birthyear, callback){
    var query = 'INSERT INTO Users (email, username, password, zipcode, birthyear) values (' +  
        '"' + email + '", "' + username + '", "' + password + '", ' + zip + ', ' + birthyear + ');';

    console.log(query);
    connection.query(query, 
        function (err, result){
            if (err) {
                console.log(err);
                callback(true, err);
                return;
            } else {
                callback(false);                
            }
        }
    );
}

