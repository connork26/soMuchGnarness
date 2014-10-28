// Module dependencies

var express     = require('express'),
    mysql       = require('mysql'),
    app         = express(),
    ejs         = require('ejs'),
    bodyparser  = require('body-parser'),
    connect     = require('connect'),
    session     = require('express-session'),
    aws         = require('aws-sdk');

// router 

var index      = require('./controllers/index'),
	feed       = require('./controllers/feed'),
	users     = require('./controllers/users'),
	posts     = require('./controllers/posts'),
    vehicles   = require('./controllers/vehicles');

// Configuration

//app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(session({
    secret: 'abcdefghijklmnopzyxwvutsr0129384756',
    saveUninitialized: true,
    resave: true
}));

// Begin listening

app.use('/', index);
app.use('/feed', feed);
app.use('/users', users);
app.use('/posts', posts);
app.use('/vehicles', vehicles);

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


app.listen(process.env.PORT || 5000);
console.log("Express server listening, server running");