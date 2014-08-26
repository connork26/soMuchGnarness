// Module dependencies

var express     = require('express'),
    mysql       = require('mysql'),
    app         = express(),
    ejs         = require('ejs'),
    bodyparser  = require('body-parser'),
    connect     = require('connect'),
    session     = require('express-session');

// router 

var index      = require('./controllers/index'),
	feed       = require('./controllers/feed'),
	users     = require('./controllers/users');

// Configuration

app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({
  secret: 'abcdefghijklmnopzyxwvutsr0129384756'
}))

// Begin listening

app.use('/', index);
app.use('/feed', feed);
app.use('/users', users);


app.listen(process.env.PORT || 5000);
console.log("Express server listening, server running");