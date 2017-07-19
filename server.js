//server.js

// require all tools we need
const express = require('express');
const expressStatic = require('express-static');

const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const passportStrategy = require('passport-local').Strategy;

const morgan = require('morgan');
const cors = require('cors');

//  set up
const app = express();
const port = 4787;

const configDB = require('./config/db')

//  Config passport Strategy
//    Strategy = passport-local
//    Users : array
//      /app/models/users.js
//      { id: 0, username: "valera", password: "valera", role: "valera" }
//
//      findById (id, callback)               => return callback(err, user)
//      findByUsername (username, callback)   => return callback(err, user)
//
//
//

const userDB = require('./app/models/users');

passport.use(new passportStrategy(
  function (username, password, done) {

    userDB.findByUsername(username, function (err, user) {
      if (err) {
        console.log("return error");
        return done(err);
      }
      if (!user) {
        console.log('return !user');
        return done(null, false);
      }
      if (user.password != password) {
        console.log('retrun wrong password');
        return done(null, false);
      }
      return done(null, user);
    })
  }
))

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  userDB.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  })
})

//app.use(expressStatic(__dirname));
//app.use(expressStatic(__dirname+'/app'));
app.use('/hq/', expressStatic(__dirname + '/app/views/hq'));
app.use('/store/', expressStatic(__dirname + '/app/views/store'));
app.use('/login/', expressStatic(__dirname + '/app/views/login'));
app.use('/asset/', expressStatic(__dirname + '/app/asset'));
app.use('/app/', expressStatic(__dirname + '/appjs/'));


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'This is secret',
  resave: false,
  saveUninitialized: false
}));

// sasasas

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, configDB.options, (err) => {
  if (err) return console.log('Error from mongoose connect ' + err);
  console.log('We connected to: ' + configDB.url);

  
  


  require('./app/routes')(app, mongoose.connection, passport);
})

// make db connect and do
// TODO Спросить как правильно: сейчас у нас получилось что если нет соединения с базой то не сработает ни один маршрут и вобще нихуя не покажеться польователю
// MongoClient.connect(configDB.url, (err, database) => {
//   if (err) return console.log(err);
//   require('./app/routes')(app,database);
// })

app.listen(port, () => {
  console.log('We are listening on ' + port);
})
