// server.js

// set up ======================================================================
// get all the tools we need 
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');   //Way of talking to our database  //ex. collection, find, toArray
var passport = require('passport');     //user authentication (user, emails, passwords)
var flash    = require('connect-flash');    //for errors ("wrong password")

var morgan       = require('morgan');     //runs on my server .. logger .. logging everything in your server
var cookieParser = require('cookie-parser');    //cookies into the machine (keeps you logged in)
var bodyParser   = require('body-parser');    //form data
var session      = require('express-session');    //when you're looking from page to page you stay logged in

var configDB = require('./config/database.js');   //object sitting in configDB ... inside your server.js ... putting database into a seperate file you can git ignore this whole config folder
//^^^ all sensative stuff go in config file will go in git ignore
//an object that has a url property and a url property
//gives you the flexability in the gitignore file

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {     //setting up your whole database
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);        //require is a function
}); // connect to our database
//app - express
//passport - authentication
//db - database


//app.listen(port, () => {
    // MongoClient.connect(configDB.url, { useNewUrlParser: true }, (error, client) => {
    //     if(error) {
    //         throw error;
    //     }
    //     db = client.db(configDB.dbName);
    //     console.log("Connected to `" + configDB.dbName + "`!");
    //     require('./app/routes.js')(app, passport, db);
    // });
//});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms aka form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')) //serves up client side code

app.set('view engine', 'ejs'); // set up ejs for templating   //ejs is called view engine

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);     //turns on server
console.log('The magic happens on port ' + port);   //where to actually run the server
