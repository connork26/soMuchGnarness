var mysql = require('mysql');


// local Application initialization
/*
var dbConfig = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    port     : 3306,   
    database : 'MotrGram'
};

// Database setup

var connection = mysql.createConnection(dbConfig);
*/


 // on server db
var dbConfig = {
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b7e5e75776c034',
    password : '83551f85',
    database : 'heroku_ea0abd6d490b9c8'    
}

var connection = mysql.createConnection(dbConfig);

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

handleDisconnect();

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    //console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}